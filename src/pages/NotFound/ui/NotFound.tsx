import { ErrorComponent } from "@/widgets/ui/ErrorComponent";

import { ContentContainer } from "./styles";

export const NotFound = () => {
  return (
    <ContentContainer>
      <ErrorComponent image={"errorNotFound"} width="400px" height={"400px"} />
    </ContentContainer>
  );
};
