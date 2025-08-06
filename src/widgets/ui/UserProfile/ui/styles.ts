import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const UserProfileLeftContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const UserProfileRightContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  margin: 0 0 20px 0;
`;

export const AvatarLink = styled(Link)`
  all: unset;
  text-decoration: none;

  &:hover {
    color: #09090c;
    text-decoration: none;
  }

  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;

export const ProfileLinksContainer = styled.div`
  margin: 0 0 0 5px;
  padding: 5px 10px 5px 10px;

  &:hover {
    background-color: rgba(3, 44, 201, 0.06);
    border-radius: 8px;
  }
`;
