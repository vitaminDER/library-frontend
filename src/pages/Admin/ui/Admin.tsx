import { Divider, Typography } from "@mui/material";

import { AdminWrapper } from "@/pages/Admin/ui/styles";
import { AdminPanel } from "@/widgets/ui/AdminPanel";

export const Admin = () => {
  return (
    <AdminWrapper>
      <Typography variant={"h6"}>Панель администратора</Typography>
      <Divider color={"divider"} />
      <Divider flexItem orientation="horizontal" />
      <AdminPanel />
    </AdminWrapper>
  );
};
