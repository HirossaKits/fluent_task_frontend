import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CommonTable from "../../common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../task/taskSlice";
import { COLUMN_INFO } from "../types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const columnInfo: COLUMN_INFO[] = [
  { name: "task_name", label: "タスク名", type: "string", width: "13%" },
  { name: "category_name", label: "カテゴリー", type: "string", width: "10%" },
  { name: "status", label: "ステータス", type: "string", width: "10%" },
  {
    name: "scheduled_startdate",
    label: "開始予定日",
    type: "Date",
    width: "12%",
  },
  {
    name: "scheduled_enddate",
    label: "終了予定日",
    type: "Date",
    width: "12%",
  },
  {
    name: "estimate_manhour",
    label: "見積工数",
    type: "number",
    width: "10%",
  },
  { name: "assigned_name", label: "担当", type: "string", width: "10%" },
  { name: "description", label: "備考", type: "string", width: "15%" },
];

const Proj = () => {
  const dispatch = useDispatch();
  const task = useSelector(selectTasks);

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
          <Tab label='Item One' />
          <Tab label='Item Two' />
          <Tab label='Item Three' />
          <Tab label='Item Three' />
          <Tab label='Item Three' />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <CommonTable data={task} columnInfo={columnInfo} />
      </Box>
    </Box>
  );
};

export default Proj;
