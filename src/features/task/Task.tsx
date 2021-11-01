import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { selectTasks } from "./taskSlice";
import CommonTable from "../../common/CommonTable";
import TaskDialog from "./TaskDialog";
import { setEditTaskOpen } from "./taskSlice";
import { COLUMN_INFO } from "../types";

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

const Task = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const hendleEditClick = () => {
    dispatch(setEditTaskOpen(true));
  };

  return (
    <CommonTable
      data={tasks}
      columnInfo={columnInfo}
      showToolBar={true}
      editDialog={<TaskDialog />}
      handleEditClick={hendleEditClick}
    />
  );
};

export default Task;
