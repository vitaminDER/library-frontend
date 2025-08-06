import styled from "styled-components";

export const ReviewWrapper = styled.div`
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  color: #09090c;
  font-family: "Apple SD Gothic Neo";
  font-size: 14px;
`;

export const ReviewInfo = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ReviewTextComment = styled.div`
  min-height: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
  background-color: #f9f9f9;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #f9f9f9 transparent transparent transparent;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
`;
