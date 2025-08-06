import { getAuth } from "@/App/store/reducers/authReducer/authSelectors";
import { useAppSelector } from "@/App/store/storeHooks";

export const useAuth = () => {
  const { id, login, isAuth, isRegistered, role } = useAppSelector(getAuth);
  return {
    id,
    login,
    isAuth,
    isRegistered,
    role,
  };
};
