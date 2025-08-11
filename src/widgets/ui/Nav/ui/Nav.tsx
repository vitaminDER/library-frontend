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
import {useAppDispatch} from "@/App/store/storeHooks";
import {authSliceAction} from "@/App/store/reducers/authReducer/authSlice";

export const Nav = (): JSX.Element => {
  const { isAuth, role } = useAuth();
  const dispatch = useAppDispatch();

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
              if(isAuth){
                dispatch(authSliceAction.setLogout())
              }else {
              navigate(PATH.AUTH);
              }
            }}
          >
            {isAuth ? 'Выйти' :'Вход'}
          </Button>
          {isAuth && <Link to={PATH.PROFILE}>Профиль</Link>}
          {isAuth && role === UserRole.ADMIN && (
            <Link to={PATH.ADMIN}>Admin</Link>
          )}
        </RightContainer>
      </NavContainer>
    </NavWrapper>
  );
};
