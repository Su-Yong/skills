# Personal Skills

Codex에서 개인적으로 사용하기 위해 관리하는 스킬 저장소입니다.

각 스킬은 독립적으로 사용할 수 있습니다. 스킬별 `README.md`에서 사용법과 예시를, `SPEC.md`에서 상세 설계를 확인할 수 있습니다.

## 포함된 스킬

- [feature-planner](feature-planner/README.md): 아이디어나 기능 요구 사항을 구체화하고, 구현에 활용할 수 있는 계획 문서를 작성합니다.
- [feature-implementer](feature-implementer/README.md): 계획 문서의 요구사항에 맞춰 구현하고, 서브에이전트를 활용해 병렬적으로 구현하여 빠른 구현을 목표로합니다.
- [respect-project-code](respect-project-code/README.md): 기존 저장소의 구조와 정책을 최대한 유지하며, 최소한의 변경으로 문제를 해결합니다.

### 구버전 스킬

- [feature-planner-old](feature-planner-old/README.md): `feature-planner`와 `feature-implementer`, `respect-project-code`의 원형이 된 구버전 스킬입니다.

## Usage

권장하는 스킬 사용 방법입니다. 각 스킬별 구체적인 사용법은 스킬별 `README.md`를 참고하세요.

| 상황 | 사용할 스킬 |
| --- | --- |
| 새 기능을 개발하고 싶을때 | `feature-planner`로 기획한 뒤 `feature-implementer`와 `respect-project-code`로 구현 |
| 새 기능을 기획하고 싶을때 | `feature-planner` |
| 요구사항이 작성된 문서대로 구현하고 싶을때 | `feature-implementer` |
| 기존 코드 스타일을 최대한 유지하며 구현하고 싶을때 | `respect-project-code` |

아래 예시는 스킬을 사용할 수 있는 환경에서 채팅에 입력하는 요청입니다. 문서 경로와 기능 이름은 실제 프로젝트에 맞게 바꿔 사용하세요.

다음은 사용 예시입니다.

### 1. 북마크 기능 기획부터 구현까지

기존 게시판에 북마크 기능을 추가하고 싶지만 세부 정책은 아직 정하지 못한 상황입니다. 먼저 `feature-planner`로 범위와 동작을 구체화합니다.

```text
$feature-planner
현재 프로젝트에 게시글 북마크 기능을 추가하고 싶어.
기존 로그인과 게시글 구조를 확인하고 필요한 정책을 함께 정해 줘.
북마크 폴더와 공개 공유는 이번 범위에서 제외할게.
기획서는 docs/plans/bookmark-spec.md에 작성해 줘.
```

질문에 답하면서 저장 권한, 중복 처리, 목록 표시 방식과 검증 기준을 정합니다. 필요한 결정이 끝나면 기획 종료를 명시적으로 요청합니다.

```text
기획 완료해줘.
```

다음 요청으로 구현을 시작합니다. `feature-implementer`는 요구사항에 따른 작업 분배와 통합·검증을 맡고, `respect-project-code`는 각 변경이 기존 구조와 코드 관례를 따르도록 적용합니다.

```text
$feature-implementer
$respect-project-code
docs/plans/bookmark-spec.md 대로 구현해줘.
```

기획 문서가 구현과 검증의 공통 기준이 됩니다. `respect-project-code`는 구현 중 함께 적용하는 변경 원칙이므로, 별도의 마지막 단계로 실행할 필요는 없습니다.

### 2. 아이디어를 기획 문서로 정리하기

팀에서 사용할 회의실 예약 서비스의 운영 정책을 먼저 정하고 싶은 상황입니다.

```text
$feature-planner
사내 회의실 예약 서비스를 기획해 줘.
예약 승인 방식, 시간 제한과 취소 권한은 아직 정하지 못했어.
```

결과는 범위, 사용자 흐름, 요구사항, 결정 이력과 미정 사항이 담긴 기획 문서입니다. 이후 같은 문서를 지정해 기획을 이어갈 수 있습니다.

### 3. 이미 작성된 계획 구현하기

팀에서 요구사항과 완료 조건을 정리한 관리자 CSV 내보내기 계획이 있는 상황입니다. `feature-planner`로 만든 문서가 아니어도 사용할 수 있습니다.

```text
$feature-implementer
docs/plans/admin-export.md 대로 구현을 시작해.
```

계획을 기준으로 구현을 나누고 병렬적으로 구현한뒤, 오케스트레이션 담당 에이전트가 각 요구사항의 충족 여부와 실제 검증 결과를 확인합니다.

### 4. 기존 코드와 일체감 있게 기능 구현하기

기존 주문 목록에 상태 필터를 추가하면서, 주변 코드와 자연스럽게 어울리고 읽기 쉬운 구현을 원하는 상황입니다.

```text
$respect-project-code
주문 목록에 주문 상태 필터를 추가해 줘.
```

기존 필터와 목록 조회 코드의 구조, 이름, 처리 흐름을 확인해 저장소에 작성된 코드와 거의 동일한 방식으로 구현합니다.
