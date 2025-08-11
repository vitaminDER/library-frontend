import { getAuth } from "@/App/store/reducers/authReducer/authSelectors";
import { useAppSelector } from "@/App/store/storeHooks";

export const useAuth = () => {
  const {  isRegistered, authData } = useAppSelector(getAuth);
  return {
    id: authData.id,
    login: authData.login,
    isAuth: authData.isAuth,
    isRegistered,
    role: authData.role,
  };
};
