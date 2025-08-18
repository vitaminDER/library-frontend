import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PeopleIcon from "@mui/icons-material/People";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { JSX, SyntheticEvent, useEffect, useState } from "react";

import { fetchGenres } from "@/App/store/reducers/adminReducer/services/fetchGenres";
import { useAppDispatch } from "@/App/store/storeHooks";
import {
  TabButtonContainer,
  TabWrapper,
} from "@/widgets/ui/AdminPanel/ui/styles";
import { TabPanel } from "@/widgets/ui/AdminPanel/ui/TabPanel";
import { a11yProps } from "@/widgets/ui/AdminPanel/utils/utils";
import { CreateBook } from "@/widgets/ui/CreateBook";
import { ManagementBooks } from "@/widgets/ui/ManagementBooks";

interface AdminPanelTab {
  tab: string;
  tabPanel: JSX.Element;
  icon: JSX.Element;
}

const adminPanelTabs: AdminPanelTab[] = [
  {
    tab: "Все книги",
    tabPanel: <ManagementBooks />,
    icon: <ImportContactsIcon />,
  },
  { tab: "Добавить книгу", tabPanel: <CreateBook />, icon: <NoteAddIcon /> },
  { tab: "Пользователи", tabPanel: <>Пользователи</>, icon: <PeopleIcon /> },
  {
    tab: "Настройки",
    tabPanel: <div>Настройки</div>,
    icon: <SettingsOutlinedIcon />,
  },
];

export const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabButtons = adminPanelTabs.map(adminPanelTab => {
    return (
      <Tab
        key={adminPanelTab.tab}
        label={
          <TabButtonContainer>
            {adminPanelTab.icon}
            <div>{adminPanelTab.tab}</div>
          </TabButtonContainer>
        }
        {...a11yProps(2)}
        style={{
          alignItems: "flex-start",
          paddingLeft: "50px",
        }}
      />
    );
  });

  const tabPages = adminPanelTabs.map((adminPanelTab, index) => {
    return (
      <TabPanel key={index} value={value} index={index}>
        <TabWrapper>{adminPanelTab.tabPanel}</TabWrapper>
      </TabPanel>
    );
  });

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        height: "70vh",
        boxSizing: "border-box",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "260px",
        }}
        onChange={handleChange}
      >
        {tabButtons}
      </Tabs>
      {tabPages}
    </Box>
  );
};
