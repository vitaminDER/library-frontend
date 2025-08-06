import { Button, Tooltip } from "@mui/material";
import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import { UserRole } from "@/App/store/reducers/authReducer/authSchema";
import { BooksSvg } from "@/assets/BooksSvg";
import { PATH } from "@/constants";

import {
  LinkContainer,
  NavContainer,
  NavWrapper,
  RightContainer,
} from "./styles";

export const Nav = (): JSX.Element => {
  const { isAuth, role } = useAuth();

  const navigate = useNavigate();

  return (
    <NavWrapper>
      <NavContainer>
        <LinkContainer>
          <Tooltip
            arrow
            color={"#fff"}
            title="На главную"
            placement="right-start"
          >
            <Link to={PATH.BASE}>
              <BooksSvg />
            </Link>
          </Tooltip>
        </LinkContainer>
        <RightContainer>
          <Button
            sx={{ width: "100px" }}
            variant="outlined"
            size="small"
            onClick={() => {
              navigate(PATH.AUTH);
            }}
          >
            Вход
          </Button>
          {isAuth && <Link to={PATH.PROFILE}>Профиль</Link>}
          {isAuth && role.includes(UserRole.ADMIN) && (
            <Link to={PATH.ADMIN}>Admin</Link>
          )}
        </RightContainer>
      </NavContainer>
    </NavWrapper>
  );
};
