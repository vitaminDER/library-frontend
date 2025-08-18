import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import {
  fetchRegistration,
  RequestRegistration,
} from "@/App/store/reducers/authReducer/services/fetchRegistration";
import { useAppDispatch } from "@/App/store/storeHooks";
import { PATH } from "@/constants";
import type { FormStates } from "@/widgets/ui/RegistrationForm/ui/interface";
import { FormContainer } from "@/widgets/ui/RegistrationForm/ui/styled";

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { isRegistered } = useAuth();
  const [login, setLogin] = useState<FormStates>({ value: "", error: "" });
  const [email, setEmail] = useState<FormStates>({ value: "", error: "" });
  const [pass, setPass] = useState<FormStates>({ value: "", error: "" });
  const [passConfirm, setPassConfirm] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueLogin: string = e.target.value;
    setLogin({ ...login, value: valueLogin, error: "" });
  };
  const handleEmail = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueEmail: string = e.target.value;
    setEmail({ ...email, value: valueEmail, error: "" });
  };
  const handlePass = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valuePass: string = e.target.value;
    if (valuePass.length <= 8) {
      setPass({ ...pass, value: valuePass, error: "" });
      setPassConfirm({ ...passConfirm, error: "" });
    }
  };
  const handlePassConfirm = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valuePassConfirm: string = e.target.value;
    if (valuePassConfirm.length <= 8) {
      setPassConfirm({ ...passConfirm, value: valuePassConfirm, error: "" });
      setPass({ ...pass, error: "" });
    }
  };
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(show => !show);
  const handleMouseDownConfirmPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpConfirmPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validateForm = useCallback(() => {
    const valLogin = login.value?.length >= 4 && login.value?.length <= 10;
    const hasNonLetters = !/[^a-zA-Zа-яА-ЯёЁ]/.test(login.value);
    const valEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email.value
    );
    const valPass =
      !!pass.value && !!passConfirm.value && pass.value === passConfirm.value;

    if (!valLogin || !hasNonLetters) {
      setLogin({
        ...login,
        error:
          "Логин должен содержать от 4 до 10 символов и содержать только буквы",
      });
    }
    if (!valLogin && hasNonLetters) {
      setLogin({
        ...login,
        error: "Логин должен содержать от 4 до 10 символов",
      });
    }
    if (!hasNonLetters && valLogin) {
      setLogin({ ...login, error: "Логин должен содержать только буквы" });
    }

    if (!email.value) {
      setEmail({ ...email, error: "Поле email должно быть заполнено" });
    }
    if (email.value && !valEmail) {
      setEmail({ ...email, error: "Не валидный email адрес" });
    }

    if (pass.value.length !== 8) {
      setPass({ ...pass, error: "Пароль должен содержать 8 символов" });
    }

    if (passConfirm.value.length !== 8) {
      setPassConfirm({ ...pass, error: "Пароль должен содержать 8 символов" });
    }

    if (pass.value !== passConfirm.value) {
      setPassConfirm({ ...passConfirm, error: "Пароли не совпадают" });
    }

    const isValidForm =
      hasNonLetters && valLogin && valEmail && !!email.value && valPass;

    if (isValidForm) {
      const requestParams: RequestRegistration = {
        login: login.value,
        email: email.value,
        password: pass.value,
      };
      dispatch(fetchRegistration(requestParams));
    }
  }, [dispatch, email, login, pass, passConfirm]);

  if (isRegistered) {
    return <Navigate to={PATH.AUTH} />;
  }

  return (
    <FormContainer>
      <h3>Регистрация</h3>
      <TextField
        value={login.value}
        helperText={login.error}
        error={!!login.error}
        id="login"
        label="Login"
        sx={{ width: "500px" }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handleLogin(e)
        }
      />
      <TextField
        value={email.value}
        helperText={email.error}
        error={!!email.error}
        type="email"
        id="email"
        label="Email"
        sx={{ width: "500px" }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handleEmail(e)
        }
      />

      <TextField
        type={showPassword ? "text" : "password"}
        value={pass.value}
        helperText={pass.error}
        error={!!pass.error}
        id="pass"
        label="Password"
        sx={{ width: "500px" }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handlePass(e)
        }
      />
      <TextField
        type={showConfirmPassword ? "text" : "password"}
        value={passConfirm.value}
        helperText={passConfirm.error}
        error={!!passConfirm.error}
        id="passConfirm"
        label="Confirm password"
        sx={{ width: "500px" }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  edge="end"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handlePassConfirm(e)
        }
      />
      <Button
        sx={{ width: "500px", height: "50px" }}
        variant="contained"
        onClick={() => {
          validateForm();
        }}
      >
        Зарегистрироваться
      </Button>
    </FormContainer>
  );
};
