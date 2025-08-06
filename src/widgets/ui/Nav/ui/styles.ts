import styled from "styled-components";

export const NavWrapper = styled.div`
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const NavContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: rgb(100 180 255 / 6%);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 180, 255, 0.7);
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.4);
`;

export const LinkContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
