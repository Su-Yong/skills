# shadcn/ui 기본 디자인과 테마

화면의 스타일을 적용하거나 변경할 때 읽는다. 실제 컴포넌트 선택은 [컴포넌트 기준](components.md), 페이지 구성은 [레이아웃 기준](layout.md)을 따른다. 명령별 실행 절차는 [스킬 진입점](../SKILL.md)에서 해당 문서로 이동한다.

## 기본 디자인을 먼저 보존한다

**기본 스타일은 현재 프로젝트가 선택한 shadcn/ui의 공식 기본 디자인이며, 글꼴 종류만 사용자가 지정한 Pretendard를 사용한다.** 이전의 커스텀 글자 크기·행간·간격·모서리·그림자·전환 시간은 기본값으로 다시 적용하지 않는다.

shadcn.io에서 선택한 확장 UI는 해당 출처의 기본 구조·스타일·기능을 유지하며 프로젝트의 기존 의미 토큰과 테마에 연결한다. 필요한 추가 스타일은 해당 컴포넌트 범위에 적용한다. 확장 UI를 shadcn/ui 기본 컨트롤처럼 보이게 다시 작성하거나 프로젝트 전체의 테마를 교체하지 않는다. 원본 데모의 불필요한 설명·장식은 제거하되 사용자가 요청한 기능과 접근성 동작은 보존한다.

- 공식 컴포넌트의 높이, 내부 여백, 경계선, 배경, 글자 크기, 모서리, 그림자, 포커스, 기본 전환 클래스를 유지한다.
- `Button`, `Input`, `Select` 등을 가져온 뒤 전역 CSS나 공통 클래스로 외형을 다시 만들지 않는다. `Select`는 공식 Trigger·Content·Item 조합을 실제로 사용한다.
- 화면의 데이터 배치와 페이지 계층을 조정하되, 레이아웃을 간결하게 만든다는 이유로 컨트롤의 기본 높이나 패딩을 줄이지 않는다.
- 불필요한 설명·장식·카드 묶음을 덜어내는 것과 공식 컴포넌트의 그림자·테두리를 제거하는 것은 구분한다. 공식 컴포넌트가 사용하는 그림자와 포커스 표시를 기본으로 유지한다.
- 기존 프로젝트의 shadcn 스타일·기반 라이브러리·테마 설정을 확인한다. 서로 다른 공식 스타일의 클래스나 반경 계산식을 임의로 섞지 않는다.
- 명시적인 스타일 변경 요청이 있을 때만 해당 속성이나 공식 `variant`·`size`를 조정한다. 요청 범위 밖의 기본 디자인은 유지한다.

Pretendard는 기본 디자인에서 명시적으로 요청된 유일한 기준 변경이다. 폰트 패밀리만 연결하고, 공식 컴포넌트의 글자 크기·굵기·행간이나 높이·패딩을 함께 바꾸지 않는다.

## 제공 자산의 공식 출처

[스타일 자산](../assets/styles.css)은 공식 테마 값의 프로젝트용 사본이다. 원본 컴포넌트를 꾸미는 추가 CSS, 폰트 로딩, 고정 크기, 그림자 제거 규칙을 포함하지 않는다.

자산을 복사할 때 함께 제공된 [shadcn MIT 고지](../assets/LICENSE.shadcn)를 보존한다.

- 기본 `neutral`: [공식 neutral 레지스트리](https://ui.shadcn.com/r/colors/neutral.json)의 `cssVarsV4` 값을 사용한다.
- 선택형 `blue`·`green`·`violet`·`orange`: [공식 테마 정의](https://github.com/shadcn-ui/ui/blob/4101ec98af37e2d812f859e3f540bceafbbc5200/apps/v4/registry/themes.ts)의 해당 이름별 `cssVars`를 사용한다.
- 테마 연결 방식: [shadcn/ui 테마 문서](https://ui.shadcn.com/docs/theming)를 따른다.

이 자산은 위 공식 소스의 스냅샷이다. 선택형 색상 테마는 공식 `neutral` 바탕 위에 공식 색상 테마가 선언한 값만 덮어쓴다. 공식 정의에 없는 색을 추정하여 추가하거나 기존의 수제 팔레트를 공식 팔레트라고 부르지 않는다. 차트 변수도 공식 테마의 일부이며, 차트 UI나 추가 지표를 만들라는 뜻은 아니다.

## 프로젝트에 적용하는 순서

1. `components.json`, 실제 `components/ui` 구현, 전역 CSS, 테마 처리와 폰트 설정을 확인한다.
2. 이미 공식 기본 테마와 컴포넌트가 적용되어 있다면 그대로 사용한다. 이 파일을 매번 복사해 프로젝트의 기존 테마를 덮지 않는다.
3. 새 프로젝트의 neutral 기준이 필요하거나 명시적으로 기본 테마 복원을 요청받은 경우에 자산을 현재 프로젝트 안으로 복사하거나 필요한 변수만 반영한다.
4. 이전 작업에서 추가한 크기·패딩·글자 크기·그림자·테두리 재정의가 공식 디자인을 바꾸고 있다면, 해당 변경의 소유 범위를 확인해 제거하고 기존 공식 컴포넌트 값으로 복원한다. 요청된 Pretendard 폰트 패밀리는 유지하고, 작업과 관계없는 사용자 수정도 보존한다.
5. 사용자가 색상 변경을 요청한 경우에만 `data-palette` 값을 바꾸거나 요청한 테마를 적용한다. 명시하지 않은 색상과 모서리 변경을 함께 수행하지 않는다.

프로젝트의 Tailwind 버전을 확인한다. 아래는 v4에서 공식 의미 토큰을 연결하는 예시이며, 현재 shadcn 초기화 결과에 이미 있는 선언을 중복 추가하거나 다른 스타일의 반경 매핑으로 교체하지 않는다. 기존 애니메이션·shadcn 스타일 가져오기도 보존한다.

`src/index.css`에서 프로젝트 사본 `src/styles/create-ui.css`를 사용하는 경우:

```css
@import "tailwindcss";
@import "./styles/create-ui.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

이 별칭은 `bg-background`, `text-foreground`, `border-input` 같은 공식 컴포넌트의 의미 클래스를 연결한다. 색상은 완전한 CSS 값이므로 `hsl(var(--primary))`처럼 다시 감싸지 않는다. 기존 공식 body·base 스타일은 유지하며, 여기에 전역 글자 크기·패딩·높이·그림자 재정의를 추가하지 않는다.

## 선택형 팔레트 참고값

속성을 생략하거나 `data-palette="neutral"`이면 공식 중립 테마이다. 색상 테마는 명시적인 선택이 있을 때만 적용한다.

```html
<html lang="ko" class="dark" data-palette="blue">
```

| 팔레트 | 테마 | `--primary` | `--primary-foreground` |
| --- | --- | --- | --- |
| neutral | 라이트 | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| neutral | 다크 | `oklch(0.922 0 0)` | `oklch(0.205 0 0)` |
| blue | 라이트 | `oklch(0.488 0.243 264.376)` | `oklch(0.97 0.014 254.604)` |
| blue | 다크 | `oklch(0.424 0.199 265.638)` | `oklch(0.97 0.014 254.604)` |
| green | 라이트 | `oklch(0.527 0.154 150.069)` | `oklch(0.982 0.018 155.826)` |
| green | 다크 | `oklch(0.448 0.119 151.328)` | `oklch(0.982 0.018 155.826)` |
| violet | 라이트 | `oklch(0.491 0.27 292.581)` | `oklch(0.969 0.016 293.756)` |
| violet | 다크 | `oklch(0.432 0.232 292.759)` | `oklch(0.969 0.016 293.756)` |
| orange | 라이트 | `oklch(0.553 0.195 38.402)` | `oklch(0.98 0.016 73.684)` |
| orange | 다크 | `oklch(0.47 0.157 37.304)` | `oklch(0.98 0.016 73.684)` |

색상 테마의 공식 override에는 `secondary`, 차트, 사이드바의 주요 행동 값도 포함된다. 전체 값은 CSS 자산을 따른다. 아래 표의 표면·강조·포커스는 neutral 기준을 유지하며, 색상 테마를 선택했다고 임의로 색을 입히지 않는다.

| 변수 | 라이트 | 다크 |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--card`, `--popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `--card-foreground`, `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--muted`, `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

자산의 neutral 기본 `--radius`는 공식 레지스트리의 `0.625rem`이다. 개별 컨트롤에 같은 반경을 직접 지정하지 말고 현재 공식 컴포넌트가 쓰는 `rounded-*` 매핑을 유지한다. 공식 기본에 없는 `destructive-foreground`를 만들어 오류 버튼의 글자색을 일괄 바꾸지 않는다.

## 라이트·다크

라이트·다크를 모두 지원하고 시스템 설정을 기본으로 따른다. 기존 테마 제공자가 있으면 재사용한다. 새로 연결하는 경우 앱에서 현재 선택을 `.light` 또는 `.dark`로 해석하며 두 클래스가 동시에 붙지 않게 한다.

- 초기 화면을 그리기 전에 현재 선택과 `prefers-color-scheme`을 반영한다.
- `system` 선택일 때만 운영체제 테마 변경을 따른다. 명시적인 라이트·다크 선택을 덮지 않는다.
- 기존 사용자 설정의 저장 방식을 유지한다. 저장소에 접근할 수 없어도 테마 선택 자체는 작동해야 한다.
- 전역 테마 전환은 [공식 Vite 다크 모드 문서](https://ui.shadcn.com/docs/dark-mode/vite)의 `ModeToggle` 구성을 따른다. 실제 shadcn/ui `Button`과 `DropdownMenu`, `lucide-react`의 `Sun`·`Moon` 아이콘을 사용하고 공식 기본 스타일·키보드 조작·포커스 복귀를 유지한다.
- `Select`는 실제 입력 필드나 필터에서 선택지를 고르는 용도로 사용한다. 전역 테마 전환 UI까지 `Select`로 통일하지 않는다.

## Pretendard 폰트 패밀리

기존 Pretendard 로딩이 있으면 재사용한다. 없으면 [공식 배포본](https://github.com/orioncactus/pretendard)의 필요한 파일과 라이선스를 현재 프로젝트에서 제공한다. 정적 파일 경로를 사용하여 외부 폰트 요청을 기본으로 추가하지 않는다. 로딩 실패 시에는 시스템 글꼴로 대체한다.

다음은 공식 가변 폰트 파일을 프로젝트의 `public/fonts/PretendardVariable.woff2`에 배치한 경우의 연결 예시다. 실제 파일 경로와 [공식 폰트 선언](https://github.com/orioncactus/pretendard/blob/main/dist/web/variable/pretendardvariable.css)을 확인하고 적용한다.

```css
@font-face {
  font-family: "Pretendard Variable";
  src: url("/fonts/PretendardVariable.woff2") format("woff2-variations");
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-sans: "Pretendard Variable", Pretendard, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

`@font-face`의 `font-weight` 범위는 파일이 지원하는 굵기를 선언하며 UI의 기본 글자 굵기를 변경하지 않는다. 이미 `--font-sans`가 다른 변수에 연결되어 있다면 그 기존 정의를 변경한다. 두 개의 상충하는 폰트 매핑을 추가하지 않는다. 기존의 `font-sans` 적용 지점은 유지하고 컴포넌트마다 별도 폰트 클래스를 덧붙이지 않는다. 이 설정은 폰트 패밀리만 바꾸며, `font-size`, `line-height`, 글자 굵기, 간격, 반경을 재정의하지 않는다. 공식 테마 색상 자산에도 폰트 로딩이나 크기 규칙을 섞지 않는다.

## 현재 프로젝트에서 변경하고 확인한다

설치된 스킬 자산이나 다른 프로젝트를 수정하지 않는다. 명시적인 스타일 요청은 현재 프로젝트의 실제 변수·컴포넌트 변형에 반영한다. 레이아웃 조정은 [레이아웃 기준](layout.md)을 따르고, 아이콘은 [컴포넌트 기준](components.md)의 Lucide 규칙을 따른다.

기본 디자인을 복원할 때는 공식 원본과 달라진 사용자 지정 클래스·전역 재정의를 확인한다. shadcn.io 확장 UI는 선택한 출처의 원본과 대조한다. 원본 높이·패딩·경계선·그림자·포커스를 유지한 상태에서 실제 열린 Select, 버튼, 입력창과 오버레이를 비교한다. 명시적으로 요청된 프로젝트별 변경까지 자동으로 지우지 않는다.

테스트 파일·테스트 스위트·별도 검증 스크립트를 기본으로 생성하지 않는다. 변경한 실제 앱을 브라우저에서 확인한다. 데스크톱·모바일, 라이트·다크, 긴 내용·빈 상태·오류, 키보드 접근과 움직임 줄이기 설정에서 실제 사용을 살핀다. 확인하지 못한 동작을 성공으로 보고하지 않는다.
