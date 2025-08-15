import styled from "styled-components";

interface CreateReviewWrapperProps {
  isHover: boolean;
}

export const CreateReviewWrapper = styled.div<CreateReviewWrapperProps>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  ${({ isHover }) =>
    isHover &&
    `
      &:hover{
        cursor: pointer;
        background-color: #e0ccbc2e;
    }`}
`;

export const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CreateReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextAriaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const TextAriaCount = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  font-size: 13px;
  color: #a8a5a5;
`;

export const TextAriaResize = styled.textarea`
  //width: 100%;
  //min-height: 100px;
  resize: none;
  //border-radius: 8px;
  border: 1px solid #ddd;
  //padding: 0.5rem;
  color: #666;
  box-shadow: inset 0 0 0.25rem #ddd;

  &:focus {
    outline: none;
    border: 1px solid #ddd;
    box-shadow: inset 0 0 0.5rem #ddd;
  }

  &[placeholder] {
    font-style: italic;
    font-size: 0.875rem;
  }

  min-height: 90px;
  //background-color:#f9f9f9;
  padding: 10px;
  border-radius: 4px;
  //border:none;
  //resize: vertical;
  //font-family: "Apple SD Gothic Neo";
  //font-size: 14px;
  //box-shadow: -1px 3px 8px 0px rgba(34, 60, 80, 0.2);
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
