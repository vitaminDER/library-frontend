import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContent } from "@/App/AppContent";
import ProtectedRoute from "@/App/Provider/ProtectedRoute";
import { useAuth } from "@/App/store/hooks/useAuth";
import { UserRole } from "@/App/store/reducers/authReducer/authSchema";
import { PATH } from "@/constants";
import { Admin } from "@/pages/Admin";
import { Auth } from "@/pages/Auth";
import { Books } from "@/pages/Books";
import { NotFound } from "@/pages/NotFound";
import { Profile } from "@/pages/Profile/Profile";
import { Registration } from "@/pages/Registration";
import { BookItem } from "@/widgets/ui/BookItem";

export const BrowserProvider = () => {
  const { isAuth, role } = useAuth();

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path={PATH.BASE} element={<AppContent />}>
          <Route index path={PATH.BASE} element={<Books />} />
          <Route
            path={PATH.BOOKITEM}
            element={
              <Suspense fallback={<CircularProgress size="30px" />}>
                <BookItem />
              </Suspense>
            }
          ></Route>
          <Route path={PATH.AUTH} element={<Auth />} />
          <Route path={PATH.REGISTRATION} element={<Registration />} />
          <Route
            path={PATH.PROFILE}
            element={
              <ProtectedRoute isAuth={isAuth} redirectPath={PATH.AUTH}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATH.ADMIN}
            element={
              <ProtectedRoute
                isAuth={isAuth && role.includes(UserRole.ADMIN)}
                redirectPath={PATH.AUTH}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
