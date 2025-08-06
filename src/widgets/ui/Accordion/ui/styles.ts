import styled from "styled-components";

export const AccordionCollapsed = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
`;

export const AccordionUnCollapsed = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  box-sizing: border-box;
`;
export const ReviewContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #9256212e;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
