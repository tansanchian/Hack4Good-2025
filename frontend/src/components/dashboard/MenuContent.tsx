import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { Link } from "react-router";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";
import { getPathName } from "../../utils/utils";

export default function MenuContent() {
  const mainListItems = [
    { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
    { text: "Products", icon: <ShoppingCart />, path: "/products" },
    { text: "Vouchers", icon: <AnalyticsRoundedIcon />, path: "/vouchers" },
    { text: "Transaction History", icon: <HistoryRounded />, path: "/history" },
  ];

  const secondaryListItems = [
    { text: "Settings", icon: <SettingsRoundedIcon /> },
    { text: "About", icon: <InfoRoundedIcon /> },
    { text: "Feedback", icon: <HelpRoundedIcon /> },
  ];

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    let index : number = 0;

    // path (may include / at the end)
    const path = getPathName();

    for (index = 0; index < mainListItems.length; index++) {
      if (path === mainListItems[index].path) break;
    }
    setSelectedIndex(index);
  });

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
