import {
  BoxBook,
  BoxLeft,
  BoxLeftOne,
  BoxRight,
  BoxWrapper,
  ContainerLine,
  LineHorizontal,
  RombBox,
  RombBoxSmall,
  TextName,
} from "./styles";

interface BookImageProps {
  author: string | undefined;
  bookName: string | undefined;
}

export const BookImage = (props: BookImageProps) => {
  const { author = "author", bookName = "bookName" } = props;
  return (
    <BoxWrapper>
      <BoxBook>
        <BoxLeftOne />
        <BoxLeft />
        <BoxRight>
          <TextName>{author?.toUpperCase()}</TextName>
          <TextName>{bookName?.toUpperCase()}</TextName>
          <ContainerLine>
            <RombBoxSmall />
            <RombBox />
            <LineHorizontal />
            <RombBox />
            <RombBoxSmall />
          </ContainerLine>
        </BoxRight>
      </BoxBook>
    </BoxWrapper>
  );
};
