import styled from "styled-components";

interface BookImage {
  width?: string;
  height?: string;
}

export const BoxWrapper = styled.div`
  perspective: 500px;
`;

export const BoxBook = styled.div<BookImage>`
  min-width: ${({ width }) => (width ? width : "200px")};
  height: ${({ height }) => (height ? height : "300px")};
  display: flex;
  flex-direction: row;
  background-color: #747bff;
  border-radius: 8px;
  box-shadow: 0 12px 15px 3px rgba(0, 0, 0, 0.31);
  -webkit-box-shadow: 0 12px 15px 3px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: 0 12px 15px 3px rgba(0, 0, 0, 0.31);
  transform: rotateX(9deg) rotateY(0deg) scale(1);
  transform-style: preserve-3d;
  transition: transform 0.4s ease;

  &:hover {
    transform: rotateX(0deg) rotateY(0deg) scale(1.03);
    transform-style: preserve-3d;
  }
`;
export const BoxLeft = styled.div`
  width: 4px;
  height: 300px;
  background-color: #646bf3;
  border-radius: 8px;
`;
export const BoxLeftOne = styled.div`
  width: 10px;
  height: 300px;
  background-color: #747bff;
  border-radius: 8px;
`;
export const BoxRight = styled.div`
  width: 200px;
  height: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  background-color: #747bff;
  border-radius: 8px;
  color: linear-gradient(to right, #ffd700, #ffc72c, #fffacd, #ffdab9);
`;

export const ContainerLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const LineHorizontal = styled.div`
  width: 100px;
  height: 2px;
  background-color: #d2f5f0;
`;

export const RombBox = styled.div`
  width: 8px;
  height: 8px;
  rotate: 45deg;
  background-color: #fff;
`;
export const RombBoxSmall = styled.div`
  width: 4px;
  height: 4px;
  rotate: 45deg;
  background-color: #fff;
`;

export const TextName = styled.h3`
  background: linear-gradient(to right, #ffd700, #ffc72c, #fffacd, #ffdab9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 12px;
  font-family: "Apple Color Emoji";
`;
export const TextTitle = styled.h3`
  //background: linear-gradient(to right, #cfc09f 14%, #634f2c 16%, #cfc09f 20%, #cfc09f 22%, #ffecb3 40%, #3a2c0f 84%);
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #8d7131 62.5%,
      #5d4a1f 100%
    );
  -webkit-background-clip: text;
  //box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 16px 20px rgba(0, 0, 0, 0.2);
  background-clip: text;
  color: transparent;
`;
