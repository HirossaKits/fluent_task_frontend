import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Proj = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedIndex(newIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={selectedIndex}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
        >
          <Tab label='Item Oneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' />
          <Tab label='Item Twoooooooooooooooooooooooooooooooooooooooooooooooo' />
          <Tab label='Item Threeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' />
          <Tab label='Item Threeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' />
          <Tab label='Item Threeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography>{"test"}</Typography>
      </Box>
    </Box>
  );
};

export default Proj;
