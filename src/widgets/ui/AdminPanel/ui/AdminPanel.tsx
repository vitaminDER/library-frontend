import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";

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
          width: "250px",
        }}
        onChange={handleChange}
      >
        <Tab
          label="Все книги"
          {...a11yProps(1)}
          style={{ alignItems: "flex-start", paddingLeft: "50px" }}
        />
        <Tab
          label="Добавить книгу"
          {...a11yProps(0)}
          style={{ alignItems: "flex-start", paddingLeft: "50px" }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        Все книги
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateBook />
      </TabPanel>
    </Box>
  );
};
