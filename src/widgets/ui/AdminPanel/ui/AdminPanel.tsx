import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PeopleIcon from "@mui/icons-material/People";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";

import { TabButtonContainer } from "@/widgets/ui/AdminPanel/ui/styles";
import { TabPanel } from "@/widgets/ui/AdminPanel/ui/TabPanel";
import { a11yProps } from "@/widgets/ui/AdminPanel/utils/utils";
import { CreateBook } from "@/widgets/ui/CreateBook/ui/CreateBook";

export const AdminPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        height: "70vh",
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
          width: "300px",
        }}
        onChange={handleChange}
      >
        <Tab
          label={
            <TabButtonContainer>
              <ImportContactsIcon />
              <div>Все книги</div>
            </TabButtonContainer>
          }
          {...a11yProps(0)}
          style={{ alignItems: "flex-start", paddingLeft: "50px" }}
        />
        <Tab
          label={
            <TabButtonContainer>
              <NoteAddIcon />
              <div>Добавить книгу</div>
            </TabButtonContainer>
          }
          {...a11yProps(1)}
          style={{ alignItems: "flex-start", paddingLeft: "50px" }}
        />
        <Tab
          label={
            <TabButtonContainer>
              <PeopleIcon />
              <div>Пользователи</div>
            </TabButtonContainer>
          }
          {...a11yProps(2)}
          style={{ alignItems: "flex-start", paddingLeft: "50px" }}
        />
        <Tab
          label={
            <TabButtonContainer>
              <SettingsOutlinedIcon />
              <div>Настройки</div>
            </TabButtonContainer>
          }
          {...a11yProps(3)}
          style={{ alignItems: "flex-start", paddingLeft: "50px" }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        Все книги
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateBook />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>Пользователи</div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>Настройки</div>
      </TabPanel>
    </Box>
  );
};
