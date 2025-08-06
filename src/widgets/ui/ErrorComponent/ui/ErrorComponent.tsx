import { useMemo } from "react";

import { Bug } from "@/assets/Bug";
import { ErrorNotFound } from "@/assets/ErrorNotFound";
import {
  ErrorContainer,
  ErrorWrapper,
  TextBox,
} from "@/widgets/ui/ErrorComponent/ui/styles";

type ImageType = "bug" | "errorNotFound";

interface ErrorComponentProps {
  title?: string;
  description?: string;
  width?: string;
  height?: string;
  image?: ImageType;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  const {
    title,
    description,
    width = "200px",
    height = "200px",
    image,
  } = props;

  const imageValue = useMemo(() => {
    switch (image) {
      case "bug": {
        return <Bug width={width} height={height} />;
      }
      case "errorNotFound": {
        return <ErrorNotFound width={width} height={height} />;
      }
      default: {
        return <Bug width={width} height={height} />;
      }
    }
  }, [height, image, width]);

  return (
    <ErrorWrapper>
      <ErrorContainer>
        <div>{imageValue}</div>
        <TextBox>
          {title}
          {description}
        </TextBox>
      </ErrorContainer>
    </ErrorWrapper>
  );
};
