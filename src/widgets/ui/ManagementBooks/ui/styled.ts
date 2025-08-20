import styled from "styled-components";

interface BookElement {
  isLast?: boolean;
}

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
  border: 1px solid #1976d2;
  border-radius: 5px;
`;
export const RowTableBookList = styled.div<BookElement>`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #1976d25c;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.2fr 0.2fr;
  grid-template-rows: auto;
  gap: 0 0;
  grid-auto-flow: row;
  grid-template-areas: ". . . . .";
  ${({ isLast }) => isLast && `border-bottom: 1px solid #1976d25c`};
`;

export const TableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0 20px;
  border-right: 1px solid #1976d25c;
`;

export const BookElement = styled.div<BookElement>`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 3px 10px;
  //border-bottom: 1px solid #1976d25c;
  ${({ isLast }) => isLast && `border-bottom: 1px solid #1976d25c`};

  box-sizing: border-box;
  //border-radius: 5px;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 60px;
  box-sizing: border-box;
`;
