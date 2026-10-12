#!/usr/bin/env python3
"""Feature Planner 패키지의 재현 가능한 정적 검사.

Python 표준 라이브러리만 사용한다. 실제 에이전트를 호출하지 않으므로 대화
행동, 도구 사용 순서, 원문 저장·재개 행동의 통과를 증명하지 않는다.
외부 의존성 없이 검사하기 위해 이 패키지에서 사용하는 단순 YAML 형식만
확인한다. 일반적인 YAML 문서를 처리하는 파서가 아니다.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class Check:
    name: str
    passed: bool
    detail: str


def load_text(path: Path) -> str:
    """파일이 없거나 UTF-8이 아니면 호출자에게 오류를 전달한다."""
    return path.read_text(encoding="utf-8")


def all_present(text: str, terms: Iterable[str]) -> bool:
    return all(term in text for term in terms)


def extract_blocks(text: str) -> list[str]:
    return [block.strip() for block in re.findall(r"```markdown\n(.*?)\n```", text, re.S)]


def quoted_value(text: str, key: str, indent: int = 0) -> str | None:
    """패키지에서 채택한 JSON 호환 큰따옴표 YAML 값 한 개를 확인한다."""
    pattern = rf'^{" " * indent}{re.escape(key)}: ("(?:[^"\\]|\\.)*")$'
    matches = re.findall(pattern, text, re.M)
    if len(matches) != 1:
        return None
    try:
        value = json.loads(matches[0])
    except json.JSONDecodeError:
        return None
    return value if isinstance(value, str) else None


def validate(root: Path) -> list[Check]:
    results: list[Check] = []

    def check(name: str, passed: bool, detail: str) -> None:
        results.append(Check(name, bool(passed), detail))

    required = (
        "SKILL.md",
        "agents/openai.yaml",
        "assets/planning-document-template.md",
        "README.md",
        "tests/behavior-scenarios.md",
        "tests/validate_skill.py",
        "tests/validation-report.md",
    )
    for relative in required:
        path = root / relative
        check(f"파일 존재: {relative}", path.is_file() and not path.is_symlink(), relative)

    texts: dict[str, str] = {}
    for relative in required:
        try:
            texts[relative] = load_text(root / relative)
        except (OSError, UnicodeError) as exc:
            check(f"UTF-8 읽기: {relative}", False, str(exc))
    if len(texts) != len(required):
        return results
    check("모든 필수 파일의 UTF-8 읽기", True, f"{len(required)}개 파일")

    skill = texts["SKILL.md"]
    config = texts["agents/openai.yaml"]
    asset = texts["assets/planning-document-template.md"]
    readme = texts["README.md"]
    scenarios = texts["tests/behavior-scenarios.md"]
    report = texts["tests/validation-report.md"]

    front_match = re.match(r"\A---\n(.*?)\n---\n", skill, re.S)
    front = front_match.group(1) if front_match else ""
    check("진입점의 YAML 머리말", bool(front_match), "문서 시작과 머리말 구분자")
    check("스킬 식별자", re.findall(r"^name: (.+)$", front, re.M) == ["feature-planner"], "name: feature-planner")
    description = quoted_value(front, "description")
    check("설명과 호출 조건", bool(description) and all_present(description or "", ("상세한 질문", "한국어 질답 기록", "실행 가능한 구현 계획", "$feature-planner", "수정·재개")), "스킬 머리말의 역할·적용 조건 문구")
    check("머리말의 제한된 구성", len(front.splitlines()) == 2, "name과 description만 사용")

    expected_prompt = "$feature-planner를 사용해 필요한 맥락만 짧게 확인하고, 독립적인 질문을 상세한 양식으로 함께 제시하면서 원하는 결과와 구현 방법을 구체화해 줘."
    check("표시 이름", quoted_value(config, "display_name", 2) == "Feature Planner", "interface.display_name")
    short = quoted_value(config, "short_description", 2)
    check("짧은 설명", bool(short) and all_present(short or "", ("상세 질문", "구현", "한국어")), "interface.short_description")
    check("기본 프롬프트의 명세 일치", quoted_value(config, "default_prompt", 2) == expected_prompt, "명세의 기본 프롬프트와 완전 일치")
    expected_config_lines = [
        "interface:",
        '  display_name: "Feature Planner"',
        f"  short_description: {json.dumps(short, ensure_ascii=False)}",
        f"  default_prompt: {json.dumps(expected_prompt, ensure_ascii=False)}",
        "",
        "policy:",
        "  allow_implicit_invocation: true",
    ]
    check("설정의 단순 YAML 구조와 자동 호출 허용", config.splitlines() == expected_config_lines, "interface / policy.allow_implicit_invocation: true")

    contracts: tuple[tuple[str, tuple[str, ...]], ...] = (
        ("질문 우선과 전면 조사 비강제 문구", ("첫 질문에 꼭 필요한", "기획서 전체 초안", "전면 자료 조사", "선행 조건으로 요구하지 않는다")),
        ("질문 묶음의 비고정 개수 문구", ("기본 기준은 5개", "7~10개 이상", "30~40개", "독립적인 질문")),
        ("주제 혼합과 답변 의존성 문구", ("주제와 관계없이", "선택지가 달라지는 후속 질문만 미룬다")),
        ("깊이·단계·모드 비분리 문구", ("별도 모드로 나누거나", "질문 깊이의 상한", "세부 동작과 예외")),
        ("질문 식별자 연속성과 재사용 구분 문구", ("Q-001", "같은 번호", "이전 번호를 재사용하거나", "번호를 초기화하지 않는다")),
        ("확인·충돌·종료 질문 계약 문구", ("짧은 확인, 충돌 해결, 종료", "번호 선택지", "장단점과 적합한 상황")),
        ("추천 근거와 자유 응답 문구", ("근거가 있는 선택지에만", "정해진 답변 문법을 요구하지 않는다", "명확한 선택지 조합")),
        ("다섯 결정 구분 문구", ("**사용자 결정:**", "**확인한 사실:**", "**추천:**", "**에이전트 임시 결정:**", "**미결정 사항:**")),
        ("중요 결정의 사용자 권한 문구", ("기능 범위·사용자 경험·데이터 처리·비용·핵심 구현 구조", "수정 비용이 크거나", "다른 결정에 미치는 영향이 크면 질문")),
        ("임시 결정 제한과 미응답 비승인 문구", ("사소하고 쉽게 되돌릴 수 있는 사항만", "사용자 미응답을 승인으로 바꾸지 않는다")),
        ("임시 결정 알파벳 연속성과 수정 문구", ("Z, AA, AB", "같은 알파벳을 유지", "변경되지 않은 결정은 반복하지 않는다")),
        ("원문·추가 조건·변경 이력 보존 문구", ("모든 선택지", "답변 원문", "이전 질문과 답변의 원문을 지우거나 고쳐 쓰지 않는다", "원문 기록을 요약문으로 대체하지 않는다")),
        ("증분 저장과 중복 원장 비강제 문구", ("변경된 기록만 짧게 저장", "전체 문서 갱신", "중복 원장", "필수로 요구하지 않는다")),
        ("사실·출처와 확인되지 않은 위치 구분 문구", ("출처", "추론이나 제안을 확인한 사실로 쓰지 않는다", "확인하지 않은 위치를 이미 존재하는 코드처럼 쓰지 않는다")),
        ("경로 우선순위와 다른 파일 보호 문구", ("사용자가 지정한 경로와 프로젝트 관례를 우선", "docs/specs/", "<기획명>-interview.md", "<기획명>-spec.md", "관련 없는 문서를 덮어쓰지 않는다")),
        ("저장 실패 시 원문·최종 문서 보존 문구", ("저장 실패", "응답으로 보존", "최종 기획서도 응답으로 보존", "저장 성공을 확인하지 않고 저장했다고 말하지 않는다")),
        ("부분 답변·보류 처리 문구", ("**부분 답변:**", "**건너뛰기·보류:**", "인터뷰 전체를 막지 않는다")),
        ("중단과 재개 처리 문구", ("**중단:**", "**재개:**", "최종 기획서를 만들지 않는다", "최대 사용 지점을 기록에서 확인")),
        ("종료 제안과 비자동 종료 문구", ("**종료 제안:**", "한 번 제안할 수 있다", "자동 종료하지 않는다")),
        ("명시적 종료의 무질문·미정 유지 문구", ("**명시적 종료:**", "더 묻지 않는다", "미정 사항이 모두 해결되었다는 뜻이 아니다")),
        ("구체적인 구현 조건의 보존 문구", ("댓글 등록 시 로그인 여부를 확인하고 비회원 요청을 거절하기", "기대 결과를 완료 기준에 포함", "실제 기획의 확정 요구사항으로 복사하지 않는다")),
        ("기획 비실행과 한국어 문구", ("실행 허가가 아니다", "한국어만 사용", "영문 정본", ".ko.md")),
        ("모델 독립과 외부 규칙 비의존 문구", ("모든 모델에 같은 규칙", "모델 감지, 프로필 선택", "외부 문서의 규칙을 필수 실행 조건으로 삼지 않는다")),
        ("최종 계획의 자립성과 가정 구분 문구", ("구현에 필요한 결정과 추가 조건을 본문에 직접", "미결정 사항과 남은 가정", "근거가 없는 추천을 확정 계획에 섞지 않는다")),
    )
    for name, terms in contracts:
        missing = [term for term in terms if term not in skill]
        check(name, not missing, "필수 문구 존재 확인" if not missing else "누락: " + " / ".join(missing))

    skill_blocks = extract_blocks(skill)
    asset_blocks = extract_blocks(asset)
    check("진입점의 질문·기록·최종 문서 양식 내장", len(skill_blocks) == 3, f"markdown 양식 {len(skill_blocks)}개")
    check("자산의 두 문서 양식", len(asset_blocks) == 2, f"markdown 양식 {len(asset_blocks)}개")
    check("필수 양식의 진입점·자산 완전 일치", len(skill_blocks) == 3 and len(asset_blocks) == 2 and skill_blocks[1:] == asset_blocks, "양식 본문 비교")
    question_block = skill_blocks[0] if skill_blocks else ""
    check("질문·임시 결정 출력 양식의 필드", all_present(question_block, ("## 에이전트 임시 결정", "### A.", "- 무엇을:", "- 어떻게:", "- 왜:", "## 질문", "**[Q-001] :", "1. **", "2. **", "\n---\n", "번호나 자유로운 문장으로 답하시면 됩니다.")), "출력 양식의 필수 요소")
    final_block = skill_blocks[-1] if len(skill_blocks) == 3 else ""
    check("최종 할 일의 네 필드", all_present(final_block, ("- [ ]", "- 동작과 조건:", "- 구현 위치:", "- 순서와 의존성:", "- 완료 기준:")), "구체적인 구현 작업 양식")

    markdown_texts = {name: text for name, text in texts.items() if name.endswith(".md")}
    balanced = all(sum(line.startswith("```") for line in text.splitlines()) % 2 == 0 for text in markdown_texts.values())
    check("Markdown 코드 구역의 짝", balanced, "모든 배포 Markdown 파일")
    check("복사 과정의 제목 이스케이프 제거", not any(re.search(r"^\\#", text, re.M) for text in markdown_texts.values()), "제목 앞의 불필요한 역슬래시 없음")
    scenario_ids = re.findall(r"^## (\d{2})\. ", scenarios, re.M)
    check("18개 행동 검증 시나리오 제공", scenario_ids == [f"{number:02d}" for number in range(1, 19)], "입력·관찰 기준 문서이며 실행 증거는 아님")
    check("행동 검증의 미실시 상태 공개", all_present(scenarios, ("실행하지 않았다", "기대 결과는 합격 조건이지 관찰된 결과가 아니다")) and "미실시" in report, "검증 계획과 실제 결과의 구분")
    check("안내의 설치·검증 범위 공개", all_present(readme, ("설치·활성화되지는 않는다", "정적 검사 통과만으로 대화 행동이 검증됐다고 판단하지 않는다")), "설치 완료 또는 행동 통과를 주장하지 않음")
    check("모델별 파일·번역본 없음", not any(path.is_file() and (path.name.endswith(".ko.md") or "model-profile" in path.name.lower()) for path in root.rglob("*")), "배포 트리의 실제 파일 검사")
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Feature Planner 정적 검사. 실제 대화 행동은 검사하지 않습니다.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1], help="검사할 feature-planner 폴더")
    parser.add_argument("--json", dest="json_path", type=Path, help="선택 사항: JSON 결과를 쓸 경로")
    args = parser.parse_args()

    if not args.root.is_dir():
        parser.error(f"패키지 폴더를 찾을 수 없습니다: {args.root}")
    results = validate(args.root)
    passed = sum(result.passed for result in results)
    for result in results:
        status = "통과" if result.passed else "실패"
        print(f"[{status}] {result.name}: {result.detail}")
    print(f"\n정적 검사: {passed}/{len(results)} 통과. 실제 대화 행동 검증은 포함하지 않습니다.")

    if args.json_path:
        payload = {
            "scope": "정적 검사. 실제 대화 행동 검증은 포함하지 않음.",
            "total": len(results),
            "passed": passed,
            "failed": len(results) - passed,
            "checks": [asdict(result) for result in results],
        }
        try:
            args.json_path.parent.mkdir(parents=True, exist_ok=True)
            args.json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        except OSError as exc:
            print(f"검사 결과 저장 실패: {exc}", file=sys.stderr)
            return 2
    return 0 if passed == len(results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
