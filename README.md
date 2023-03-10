# React + typescript 를 사용해 보자

## 라이브러리 추가할 때 declare 된 type 이 없다고 뜨면 어떻게 해야 할까?

- yarn add @types/라이브러리 하면 된다
- @types 는 엄청 큰 npm 레포지토리라고 생각하면 된다.
- github 에 DefenitelyTyped 라는 리포지토리가 있는데 그 하위에서 type 정의가 되었다면 @types/라이브러리 로 설치가 가능하다

## Component 의 props 에 타입을 정의하려면 어떻게 해야 할까?

- Component: interface (객체에 타입 정의) 를 정의한 뒤, 컴포넌트의 props 에 타입을 넘겨 주면 된다.

```typescript
interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor}></Container>;
}
```

- Styled Component: interface 를 정의한 뒤, styled component 정의할 때 제네릭으로 넘겨 주면 된다.

```typescript
interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;
```

### PropsTypes 와 typescript 를 사용하는 건 어떻게 다를까?

- PropsTypes 를 이용하여 타입 정의를 할 수도 있는데, 그건 코드 실행 후에 잘못된 것을 알 수 있고  
  typescript 는 코드 실행 전에 알 수 있다는 점에서 다르다.
- 개발자를 돕는 건 코드 실행 전에 알고 주의해 주는 것이기 때문에, typescript 를 사용하는 편이 더 좋다

## Component 에 props 를 optional 로 주려면 어떻게 해야 할까?

- 지금은 required 로 동작한다. (해당 props 가 없으면 error 로 떨어지고 있음)
- 만약에 이걸 있어도 되고 없어도 되는 props 로 만들어 주고 싶다면,  
  만들었던 interface 에 optional 옵션을 주면 된다.

```typescript
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}
```

## state 에 타입을 지정하는 법은 없을까?

- setState 를 사용하고, 기본값을 넣어 준다면 typescript 의 타입 추론으로 알아서 타입이 지정된다.
- 하지만 만약에 타입을 두 가지 넣어 주고 싶다면, 제네릭을 쓰면 된다.

```tsx
const [value, setValue] = useState<string | number>(0);
setValue(3); // 정상
setValue("TEST"); // 정상
setValue(true); // 에러
```

- 하지만 보통은 setState 에 타입을 넣어 줄 땐 하나의 타입으로 쭉 가기 때문에, 별로 사용은 안 한다.
- 그냥 있다는 정도만 알고 있으면 될 것 같다

## form 에서 타입스크립트 사용하기

- form 에서 타입스크립트를 사용하는 법은 간단하다.
- React에서 지원해 주는 타입을 사용하면 되는데, 아래처럼 지정해 주면 된다.

```tsx
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  const {
    currentTarget: { value },
  } = event;
  setUsername(value);
};
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("hello", username);
};
```

- 여기서 target 과 currentTarget 은 같은 거라고 생각하면 되는데, react 에서는 currentTarget 을 선택했다

## Theme 에 typescript 적용하기

- styled-components 에 타입을 확장시키면 된다.
- 파일명에 d.ts 를 포함할 경우 type declare 파일이 되는데, styled.d.ts 파일처럼 타입 선언 파일을 하나 생성한 뒤, 아래처럼 모듈에 interface 를 추가해 주면 된다.

```typescript
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

- 그리고 추가해 줄 theme 파일에 theme 을 추가하면 되는데, 추가해 준 theme 인터페이스 타입으로 지정해 주면 된다.

```typescript
import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "tomato",
};
```

- 이렇게 했을 때의 이점은, `DefaultTheme` 에서 추가한 타입들과 맞지 않았을 때 오류를 내뱉어 주고, required 속성을 바로 잡았을 때 좋다.
- 추가한 lightTheme 을 사용해 주고 싶다면, index 에 가서 ThemeProvider 에 props 로 추가해 주면 되고, 추가한 style 을 styled component 에서 사용할 수 있다.

```tsx
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
```

- 이렇게 했을 때의 이점은, theme 인 interface 타입 추론이 되기 때문에, theme 에 없는 속성을 불러올 경우 에러를 내뱉에서 개발자의 실수를 덜어 줄 수 있다.
