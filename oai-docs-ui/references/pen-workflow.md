# pen.dev 작업·저장·검수·출력

이 절차는 `oai-style-docs`와 `oai-style-ppt`가 공유한다. 경로는 패키지를 옮긴 실제 위치에서 결정한다. `oai-docs-ui.lib.pen`은 연결해 쓰는 공유 디자인 소스이고, 원고와 결과는 별도의 일반 `.pen` 작업 파일에 저장한다.

## 패키지와 스킬 등록

`oai-docs-ui.lib.pen`, 두 스킬 폴더, `references/`, `assets/`, `scripts/`를 한 폴더 안에 유지한다. pen.dev 채팅의 `/` 메뉴 → **Add SKILL.md file…**에서 사용할 스킬 폴더 또는 그 안의 SKILL.md를 추가한다. 이름은 `oai-style-docs`와 `oai-style-ppt`다. 이동하거나 수정한 뒤에는 같은 파일을 다시 추가해 경로·내용을 갱신한다. 두 SKILL.md만 떼어 옮기면 공통 자산 경로가 끊긴다. [공식 Skills 안내](https://docs.pen.dev/core-concepts/ai-agents)

라이브러리는 각 작업 파일의 **Libraries**에서 가져온다. Dashboard의 **Design Systems**는 기본 템플릿 목록이므로 사용자 라이브러리의 연결 여부를 그 화면으로 판단하지 않는다. `.lib.pen`의 저장된 컴포넌트·변수 변경은 연결된 문서를 다시 열 때 반영되며, 인스턴스별 수정이 우선한다. [공식 라이브러리 안내](https://docs.pen.dev/core-concepts/design-libraries)

스킬을 읽은 에이전트는 스킬 파일의 실제 위치를 기준으로 상위 폴더를 `OAI_PACKAGE_ROOT`라고 부른다. 셸 명령을 사용할 때 이 변수를 **실제 절대 경로로 먼저 설정**한다. `.pen` 내부 이미지 fill URL의 상대 경로 기준은 SKILL.md가 아니라 **.pen 파일 위치**다.

## 시작·재사용

1. MCP의 `read_skill()`과 `get_app_state()`로 열린 문서·현재 상태·실행 지침을 확인한다. `read_skill({path:"pen-schema.md"})`, `read_skill({path:"execute.md"})`, `read_skill({path:"guide/components.md"})`를 읽는다. 발표 작업은 `guide/slides.md`도 읽는다. 현재 도구가 반환하는 API·스키마를 우선하며 호출 이름·지원 속성을 추측하지 않는다. 시각 디자인과 내용 편집은 사용자의 명시적 요청, 이 패키지의 OAI 규격 순으로 따른다. 내장 가이드의 일반 서체·레이아웃 계약·감성적 시작/마무리를 이 체계에 강제로 적용하거나 원고에 없는 마케팅 내용을 만들지 않는다.
2. `.pen`·`.lib.pen` 읽기·검색·편집은 pen.dev MCP로만 수행한다. 파일을 일반 텍스트처럼 열거나 셸·JSON 도구로 수정하지 않는다. 새 결과물에는 일반 `.pen` 파일을 만들고 **라이브러리를 가져오기 전에 먼저 저장**한다. 가장 간단한 위치는 패키지 루트의 `작업명.pen`이다. 기존 작업을 이어갈 때는 해당 작업 파일을 연다.
3. 작업 파일의 **Libraries → Imported Libraries 옆 `+`**에서 패키지의 `oai-docs-ui.lib.pen`을 가져온다. 이미 연결되어 있으면 중복으로 가져오지 않는다. **Components**에서 `OAI/` 컴포넌트를 확인하고 클릭하거나 끌어 배치한다. 원본을 Save As한 독립 복사본 대신 가져온 라이브러리의 컴포넌트 연결을 유지한다.
4. 현재 작업 파일의 경로를 다시 확인하고 이후 `execute`의 `filePath`에 그 경로를 전달한다. 현재 execute API에는 `.pen` 저장 함수가 없으므로 임의 `Save()` 호출을 만들지 않는다. 앱의 저장을 사용하고 최종 파일을 재열어 라이브러리 연결과 표시를 확인한다.
5. `get_app_state()`에 표시되는 가져온 컴포넌트 ID와 `GetVariables()`의 변수·theme을 읽는다. `Get` visitor의 로컬 `reusable` 목록만으로 가져온 라이브러리가 비었다고 판단하지 않는다. 가져온 ID가 `B:QTLX1` 같은 형태일 때 `B`는 해당 작업의 라이브러리 별칭이다. `Get(가져온ID)`로 자식·속성을 확인하고 실제 별칭을 사용한다. `B`를 다른 파일에 고정하지 않는다. 원본을 조사할 때는 `.lib.pen`의 `OAI/` 본체와 `Docs /`·`PPT /` 예시를 읽되 작업 내용을 쓰지 않는다.

일반 작업 파일의 **Save As**도 연결된 라이브러리를 `작업명-assets/oai-docs-ui.lib.pen`으로 복사하고 import 대상을 바꿀 수 있다. 저장·이동 후에는 Libraries 항목의 이름을 눌러 실제 소스를 열고 경로를 확인한다. 원본의 후속 변경을 받아야 한다면 패키지 루트의 `oai-docs-ui.lib.pen`을 가져오고, 기존 인스턴스의 참조·theme·변수·자식 수정 경로를 새 별칭에 맞춰 연결한 뒤 이전 복사본의 라이브러리 연결을 제거한다. 재열기·렌더로 인스턴스 수정과 공유 연결이 유지되는지 확인한다. 이름이 같거나 Imported Libraries에 표시된다는 이유만으로 같은 원본이라고 판단하지 않는다. 독립 스냅샷이 목적이면 복사된 라이브러리와 자산을 함께 보존하고 원본 업데이트가 전달되지 않음을 명시한다.

현재 작업 문서에서 theme 이름을 확인하는 execute 예시:

```js
Print(GetVariables())
```

가져온 컴포넌트의 변수 참조는 `$B:accent-tint`, 폰트는 `$B:font-family`, 자식 ID는 `B:FbMXo` 같은 형태다. `Get(인스턴스ID, {resolveInstances:true})`로 읽으면 자식 수정 경로는 `인스턴스ID/B:자식ID`로 확인할 수 있다. 컴포넌트 생성에는 가져온 ID, 수정에는 현재 인스턴스의 실제 경로를 사용한다.

## 글꼴과 자산

커스텀 폰트 등록은 문서 범위다. OS 설치나 라이브러리 연결만으로 작업 문서의 폰트 등록을 가정하지 않는다. 작업 파일에서 실제 한글·영문·숫자와 400·500·600·700 굵기를 확인하고, 누락되면 Typography 글꼴 선택기의 **Add custom fonts**에서 `assets/fonts/Pretendard-{Regular,Medium,SemiBold,Bold}.ttf`를 추가한다. family는 **Pretendard**다. 동봉 Bold 파일이 내부 family `Pretendard Variable`로 표시되는 경우 등록 family를 `Pretendard`로 맞춰 다른 굵기와 함께 사용한다. 실제 표시·굵기·경고를 검수하며 문자열 선언만으로 완료 처리하지 않는다.

표지 생성·색상 계산은 [공통 디자인 규칙](design-system.md)의 동봉 스크립트를 사용한다. 작업별 고유 이름의 PNG·JSON을 생성하고 이전 출력을 덮어쓰지 않는다. 이미지는 `type: "image"`인 노드를 만들지 않고 스키마의 image **fill**로 프레임에 적용한다. 패키지 루트의 작업 파일에는 `./assets/` 아래 실제 생성 파일의 상대 URL을 사용한다. 다른 폴더로 저장하면 연결된 라이브러리와 필요한 자산도 함께 보존하고 MCP에서 URL을 맞춘 뒤 재열어 확인한다. Save As가 자산을 `작업명-assets/`로 복사했다면 그 폴더도 결과물과 함께 보존한다. 절대 자산 경로를 최종 이동 가능한 결과에 남기지 않는다.

## 구성과 수정

- 문서별로 가져온 `format` theme에 `docs` 또는 `ppt`를 적용한다. `GetVariables()`가 `B:format`을 반환했다면 페이지 frame에는 `theme:{"B:format":"docs"}` 또는 `theme:{"B:format":"ppt"}`를 쓴다. 일반 `format` 키로 바꾸지 말고 현재 문서의 실제 별칭을 사용한다. 기존 인스턴스·예시의 theme을 확인하고 판형을 바꿀 때 필요한 참조에도 동일하게 적용한다. 가져온 변수에 있는 서체·색·간격·타이포그래피를 우선 사용한다.
- `font-family`, `body-size`, `title-size`, `label-size`, `value-size`, `small-size`, `meta-size`, `quote-size`, `kpi-size`, 각 역할의 lineHeight 변수, `space-small/medium/large`, `panel-padding`이 공통 변수다. 표 값·차트 축 라벨의 `value-size`는 docs 10.5 / ppt 30이며 `value-line`에는 각 판형의 행간 비율을 적용한다. theme은 글자·간격·패딩을 바꾸지만 차트의 수치 좌표나 프레임 기하를 자동 배율 변환하지 않는다. 판형을 바꾸면 차트 폭·높이·라벨 영역과 구분선 두께를 해당 규격의 숫자로 다시 계산한다.
- 개별 작업의 키 컬러는 [팔레트 계산기](../scripts/palette.mjs)의 `accent`·`accent-soft`·`accent-tint`·`accent-mid`·`accent-ink`·`data-strong`·`on-accent`를 작업 문서의 `oai-` 접두사 로컬 변수로 만든다. 예: `SetVariables({"oai-accent-soft":{type:"color",value:"#FFFCF4"}})`. 이 함수는 기본 병합을 사용하며 기존 변수를 보존한다. 공유 `.lib.pen`이나 `B:accent-soft` 같은 가져온 변수는 수정하지 않는다. 로컬 변수를 만든 것만으로 가져온 참조가 대체되지는 않는다. `Get(인스턴스ID,{resolveInstances:true})`로 펼친 뒤 해당 색상 바인딩을 `$oai-accent-soft` 등으로 바꿔 **현재 인스턴스**에 적용한다. 루트 배경은 `Update(인스턴스ID,{fill:"$oai-accent-soft"})`, 자식 색은 `Update(현재자식경로,{fill:"$oai-accent-ink"})`처럼 실제 경로로 수정한다. fill의 배열·gradient 등 기존 구조를 보존하고 해당 색상 참조만 바꾼다. 파생색·관련 인스턴스·새 표지를 함께 갱신한 뒤 렌더와 공유 기본색 보존을 확인한다. 검증 예시의 노란색은 설명용이며 작업에는 사용자가 지정한 색의 계산 결과를 쓴다.
- 컴포넌트는 `Insert`의 `type:"ref"`와 현재 작업에서 확인한 라이브러리 component 참조로 사용하고 자식의 내용은 `descendants`에 ID/경로/유일한 이름으로 override한다. `Copy`하면서 자식을 바꿀 때는 그 호출의 `descendants`에 함께 전달한다. 원본 자식 ID로 복제본을 수정하지 않는다.
- 새 페이지·슬라이드는 최상위 frame이다. 실제 판형·`clip:true`를 지정하되 잘림을 넘침 해결로 쓰지 않는다. 작업 중인 루트 프레임은 `placeholder:true`, 완성·검수 뒤 `false`다. 루트 프레임 배치는 `FindEmptySpace`로 기존 작업과 겹치지 않게 한다.
- 본문은 `textGrowth:"fixed-width"`, 실제 폭과 필요한 `fill`·fontFamily·fontSize·fontWeight·lineHeight를 명시한다. lineHeight는 배율이다. 내용 높이는 Get의 bounds로 읽고 다음 블록을 배치한다. CSS의 margin·퍼센트 크기·지원되지 않는 baseline/stretch 정렬을 사용하지 않는다.
- 고정 판형·표지 위치에는 절대 배치를 쓸 수 있고 본문 그룹·표 행·비교열은 가능한 layout으로 정렬한다. `fit_content` 부모를 전부 `fill_container` 자식으로만 채우는 순환 크기를 만들지 않는다.
- 현재 검증된 앱에서는 `width`·`height`의 숫자 변수 참조가 0 또는 fit_content로 처리되는 경우가 있다. 두 속성은 변수의 **계산된 숫자 값** 또는 `fill_container`/`fit_content`로 전달한다. fontSize·gap·padding·fill은 변수 바인딩을 유지한다. 생성 후 실제 bounds로 확인한다.
- execute는 작은 구간으로 나누고 모든 노드에 알아볼 이름을 준다. 경고는 다음 호출에서 고친다. 실패하면 반환된 `editId`와 `edits`로 해당 코드를 수정한다. 같은 생성 코드를 새 input으로 다시 보내 중복 생성하지 않는다.

## 렌더링과 내용 검사

구간이 완성되면 `Get` visitor의 `ctx.bounds`와 `ctx.problems`로 실제 크기·잘림을 확인한다. 수정은 기존 객체에 적용하며 검수를 이유로 사용자 작업을 지우고 다시 만들지 않는다. 대표 페이지가 완성된 시점에 `TakeScreenshot([실제프레임ID])`로 글자·색·여백·정렬을 확인한다. 구조 검사는 bounds, 시각 검사는 스크린샷으로 나눠 필요한 증거를 확인한다.

원고와 결과의 텍스트를 대조하고 docs는 모든 원고 블록, ppt는 핵심 주장·수치·조건·출처를 역추적한다. 출력 샘플의 가상 값·출처·제목이 실제 문서에 남지 않았는지 확인한다. 색을 바꾼 뒤에는 표지·장 도입·설명·인용·KPI·차트·로드맵을 확인하며 실제 로고·사진은 원래 색을 유지한다.

## PDF 내보내기와 A4 보정

완성 페이지 ID를 원하는 순서대로 모아 execute의 `Export(pageIds, "pdf", outputDirectory, {scale:1})`를 사용한다. `pageIds`와 `outputDirectory`는 현재 작업에서 확인한 ID 배열과 실제 출력 디렉터리다. 해당 디렉터리에 다중 페이지 `export.pdf`가 생성된다. 응답의 실제 출력 경로를 사용하고 기존 결과와 충돌하지 않는 디렉터리를 선택한다. 기본 export 배율에 의존하지 않는다.

API를 사용할 수 없는 경우 앱의 Slides → Export PDF → Export selected slides를 사용할 수 있다. 보이는 최상위 frame이 슬라이드 목록에 포함되므로 **완성 출력 프레임만 선택**하고 라이브러리 보드·다른 판형 예시는 내보내지 않는다. [공식 슬라이드/PDF 안내](https://docs.pen.dev/core-concepts/presentations)

**A4:** 원본 frame은 `595.275590551×841.88976378`로 유지한다. 현재 검증된 native PDF exporter는 scale 1에서도 페이지를 `595×841pt`로 내림한다. 내보낸 PDF의 MediaBox를 검사하고, 같은 반올림이 확인되면 PDF 도구로 MediaBox·CropBox를 정확한 `595.275590551×841.88976378pt`로 맞춘다. 이 경우 내용의 좌표·크기는 이미 pt 기준이므로 확대하지 않는다. 다른 배율·차원의 결과라면 이 보정을 적용하지 말고 export 설정을 먼저 고친다. 최종 모든 페이지가 210×297mm인지 다시 확인한다.

정확한 A4가 필요한 경우 [동봉 보정 도우미](../scripts/normalize-a4.py)를 사용한다. 이 단계에만 Python 3와 `pypdf`가 필요하다. 기존 사용 가능한 런타임을 확인하고 의존성이 없으면 그 제한을 표시한다. 도우미는 A4와 치수 차이가 각각 1pt 이내이고, 회전이 없으며 원점이 0인 입력만 처리한다. 다른 판형을 조용히 A4로 바꾸지 않고 기존 출력도 덮어쓰지 않는다.

```sh
python3 "$OAI_PACKAGE_ROOT/scripts/normalize-a4.py" raw/export.pdf final.pdf
python3 "$OAI_PACKAGE_ROOT/scripts/normalize-a4.py" --check
```

위 `raw/export.pdf`와 `final.pdf`는 현재 작업의 실제 입력·미사용 출력 경로로 지정한다. 보정 후 최종 PDF의 치수와 렌더링을 다시 확인한다. 의존성을 사용하지 못해 보정하지 않았다면 native PDF가 근사 A4라는 사실을 전달하고 정확한 210×297mm 검증 통과로 보고하지 않는다.

**16:9:** scale 1에서 1920×1080pt, 가로/세로=16/9인지 확인한다. A4 보정을 발표 PDF에 적용하지 않는다. 두 판형은 별도의 출력 PDF로 제공한다.

최종 PDF는 전체 페이지 렌더와 100% 보기를 확인한다. 한글 선택·검색·복사와 폰트 임베딩·링크도 결과에서 확인한다. exporter가 텍스트를 path로 바꾸는 등 제한이 있으면 편집 가능한 `.pen`과 함께 그 제한을 명시하며 검색 가능 PDF라고 부르지 않는다. `.pen` 저장·재열기와 자산 연결까지 확인한 뒤 실제 결과 경로를 전달한다.
