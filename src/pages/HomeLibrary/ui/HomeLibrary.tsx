import React from "react";

import { HomeLibraryWrapper } from "@/pages/HomeLibrary/ui/styled";
import { Books } from "@/widgets/ui/Books";

export const HomeLibrary = () => {
  return (
    <HomeLibraryWrapper>
      <Books />
    </HomeLibraryWrapper>
  );
};
