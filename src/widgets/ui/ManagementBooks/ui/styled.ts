import styled from "styled-components";

export const ManagementBooksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const FilterPanelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  box-sizing: border-box;
`;

export const BookListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #828080;
  border-radius: 5px;
`;

interface BookElement {
  isLast: boolean;
}

export const BookElement = styled.div<BookElement>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 3px 10px;
  //border-bottom: 1px solid #828080;
  ${({ isLast }) => isLast && `border-bottom: 1px solid #828080`};

  box-sizing: border-box;
  //border-radius: 5px;
`;
