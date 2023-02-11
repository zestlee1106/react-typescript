import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  // 두 개의 타입을 줄 수도 있지만 이걸 쓰는 일은 별로 없을 거임
  // const [value, setValue] = useState<number | string>(0);
  const [value, setValue] = useState(0);
  setValue(0);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
