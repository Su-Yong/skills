# oai-docs-ui

Pen에서 사용하는 편집 디자인 시스템과 A4 문서·16:9 발표 제작 스킬입니다.

| 파일 | 역할 |
| --- | --- |
| [oai-docs-ui.lib.pen](oai-docs-ui.lib.pen) | 가져와 연결하는 디자인 라이브러리: 공통 변수, 핵심 12개 구성군의 15개 컴포넌트, 두 판형 예시 6개 |
| [oai-style-docs/SKILL.md](oai-style-docs/SKILL.md) | 원문을 보존하는 A4 세로 문서 제작 |
| [oai-style-ppt/SKILL.md](oai-style-ppt/SKILL.md) | 사실·수치·출처를 유지하며 요약하는 16:9 발표 제작 |

새 결과물은 아래처럼 **일반 작업 파일을 먼저 저장한 뒤 라이브러리를 가져오는 방식**을 사용합니다.

## 사용

1. 이 폴더 전체를 원하는 위치에 두고 Pen에서 새 일반 `.pen` 작업 파일을 만들어 저장합니다.
2. 작업 파일의 **Libraries → Imported Libraries 옆 `+`**에서 `oai-docs-ui.lib.pen`을 가져옵니다. **Components**에서 `OAI/` 컴포넌트를 골라 배치합니다. 다른 작업 파일에서도 같은 라이브러리를 가져올 수 있습니다.
3. Pen 채팅의 `/` → **Add SKILL.md file…**에서 두 스킬 폴더를 각각 추가합니다. 폴더 이름이 스킬 이름입니다.
4. 사용할 스킬을 선택하고 원고·목적·키 컬러를 전달합니다. 키 컬러를 생략하면 `#5477C4`를 사용합니다. 작업 파일의 Pretendard 등록과 한글·굵기 표시를 확인합니다.
5. 완성 페이지 프레임만 PDF로 내보냅니다. 공유 디자인을 고칠 때만 `.lib.pen`을 수정하고, 개별 원고·색상·배치는 일반 작업 파일에 저장합니다.

연결은 각 작업 파일의 **Libraries**에 저장됩니다. Dashboard의 **Design Systems** 기본 카드 목록에 사용자 라이브러리가 추가되는 방식은 아닙니다. 라이브러리의 저장된 컴포넌트·변수 변경은 연결된 문서를 다시 열 때 반영되며, 인스턴스별 수정이 우선합니다. [공식 라이브러리 안내](https://docs.pen.dev/core-concepts/design-libraries)

라이브러리가 연결된 작업 파일을 **Save As**로 복제하면 Pen이 라이브러리까지 `작업명-assets/`에 복사하고 그 복사본에 연결할 수 있습니다. 이 경우 원본 라이브러리의 후속 변경은 전달되지 않습니다. 같은 원본을 계속 공유하려면 Libraries에서 항목 이름을 눌러 실제 연결 파일을 확인하고, 패키지의 `oai-docs-ui.lib.pen`을 다시 가져와 사용 중인 인스턴스를 그 라이브러리에 연결한 뒤 복사본 연결을 제거합니다. 공유 업데이트가 필요 없는 독립 스냅샷으로 쓸 때는 복사된 자산 폴더를 함께 보존합니다.

```text
/oai-style-docs
이 원고를 A4 보고서로 만들어줘. 원문과 출처를 보존하고 키 컬러는 #5477C4로 해줘.
```

```text
/oai-style-ppt
이 원고를 16:9 발표 자료로 만들어줘. 핵심 사실과 수치는 유지하고 5장을 목표로 요약해줘.
```

폰트·이미지는 문서에 상대 경로로 연결되어 있습니다. `.lib.pen`이나 SKILL.md만 따로 옮기지 말고 `assets/`, `references/`, `scripts/`와 함께 이동하세요. 작업 파일을 전달할 때는 연결된 라이브러리와 자산도 함께 보존하고, 이동 후 Libraries의 연결과 실제 이미지·글꼴 표시를 확인합니다. 저장 과정에서 생성된 `작업명-assets/` 폴더가 있으면 함께 보존합니다. 스킬 경로가 바뀌거나 내용을 수정하면 Pen에서 다시 추가합니다.

## 실행 자원

새 표지와 색상 토큰 생성에는 Node.js 20 이상을 사용합니다. 추가 npm 패키지는 필요 없습니다. 정확한 A4 PDF 페이지 크기 보정에는 Python 3와 `pypdf`가 필요합니다.

```sh
node scripts/palette.mjs '#5477C4'
node scripts/palette.mjs --check
python3 scripts/normalize-a4.py --check
```

Pretendard와 표지 생성 코드의 라이선스는 [폰트 고지](assets/fonts/LICENSE.txt), [표지 코드 고지](scripts/vendor/NOTICE.md)에 있습니다. 제작 절차·기하·출력 주의점은 [pen-workflow.md](references/pen-workflow.md)를 따릅니다.
