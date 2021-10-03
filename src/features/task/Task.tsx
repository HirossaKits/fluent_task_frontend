import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FilterListIcon from "@mui/icons-material/FilterList";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskDialog from "./TaskDialog";
import TaskFilter from "./TaskFilter";
import {
  selectTasks,
  selectFilterTask,
  setEditTaskOpen,
  setFilterTaskOpen,
} from "./taskSlice";
import { TASK, COLUMN_NAME } from "../types";

export interface COLUMN_INFO {
  name: COLUMN_NAME;
  label: string;
  type: "string" | "number" | "Date";
  width: string;
  related?: any;
}

export const columnsInfo: COLUMN_INFO[] = [
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

interface SORT_STATE {
  order: "asc" | "desc";
  columnName: "" | COLUMN_NAME;
}

const Task = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const filterTask = useSelector(selectFilterTask);

  const [selected, setSelected] = useState<string[]>([]);
  const [sortState, setSortState] = useState<SORT_STATE>({
    order: "asc",
    columnName: "",
  });

  const filterAnchorEl = useRef(null);

  const handleEditClick = () => {
    dispatch(setEditTaskOpen(true));
  };

  const handleFilterClick = () => {
    dispatch(setFilterTaskOpen(true));
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    console.log(id);
    let newSelected = selected.slice();
    const index = newSelected.indexOf(id);
    if (index === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(index, 1);
    }
    console.log(newSelected);
    setSelected(newSelected);
  };

  const handleSelectAllClic = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(tasks.map((row) => row.task_id));
    } else {
      setSelected([]);
    }
  };

  const handleClickSortColumn = (colName: COLUMN_NAME) => {
    setSortState({
      order:
        sortState.columnName !== colName || sortState.order === "desc"
          ? "asc"
          : "desc",
      columnName: colName,
    });
  };

  const sortRows = (ts: TASK[]): TASK[] => {
    if (!sortState.columnName) return ts;
    const sortedRows = ts.slice().sort((next, now) => {
      const nextVal = next[sortState.columnName as COLUMN_NAME];
      const nowVal = now[sortState.columnName as COLUMN_NAME];

      if (nowVal === null && nextVal === null) {
        return 1;
      }
      if (nextVal === null) {
        return 1;
      }
      if (nowVal === null) {
        return -1;
      }
      if (nextVal > nowVal) {
        return sortState.order === "asc" ? 1 : -1;
      }
      if (nextVal < nowVal) {
        return sortState.order === "desc" ? -1 : 1;
      }
      return 0;
    });
    return sortedRows;
  };

  const filterTasks = (tsk: TASK[]): TASK[] => {
    if (filterTask.length < 1) return tsk;

    const filtered = tsk.filter((row, rowId) => {
      let validity = true;

      filterTask.forEach((filter, filterId) => {
        if (!validity) return;
        if (!filter.value) return;

        const columnValue = row[filter.columnName];
        const filterValue = filter.value;
        const operator = filter.operator;
        const type = columnsInfo.filter(
          (col) => col.name === filter.columnName
        )[0].type;

        if (columnValue === null) {
          validity = false;
          return;
        }

        if (type === "string") {
          if (operator === "=") {
            validity = columnValue === filterValue;
          } else if (operator === "start_from") {
            validity = columnValue.toString().startsWith(filterValue);
          } else if (operator === "include") {
            validity =
              columnValue.toString().indexOf(filterValue) === -1 ? false : true;
          } else if (operator === "exclude") {
            validity =
              columnValue.toString().indexOf(filterValue) === -1 ? true : false;
          }
        }

        if (type === "number" || type === "Date") {
          if (operator === "=") {
            validity = columnValue === filterValue;
          } else if (operator === "<=") {
            validity = columnValue <= filterValue;
          } else if (operator === ">=") {
            validity = columnValue >= filterValue;
          }
        }
      });

      return validity;
    });
    return filtered;
  };

  const theme = useTheme();
  const styles = {
    filterButton: css`
      margin: 0 0 0 auto;
    `,
    tableContainer: css`
      maxheight: 440;
    `,
    tableRow: css`
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: ${alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      )};
  `,
    tableCell: css``,
    tableCheckCell: css`
      width: 4%;
    `,
    tableNumericCell: css`
      padding-right: 5%;
    `,
    link: css``,
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Toolbar disableGutters>
          <Tooltip title='登録'>
            <IconButton aria-label='filter list'>
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='編集'>
            <IconButton aria-label='edit task' onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='削除'>
            <IconButton aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='フィルター'>
            <IconButton
              ref={filterAnchorEl}
              css={styles.filterButton}
              aria-label='filter list'
              onClick={handleFilterClick}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer css={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell css={styles.tableCheckCell} padding='checkbox'>
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < tasks.length
                    }
                    checked={
                      selected.length > 0 && selected.length === tasks.length
                    }
                    onChange={handleSelectAllClic}
                    color='primary'
                  />
                </TableCell>
                {columnsInfo.map((col) => (
                  <TableCell css={styles.tableCell} key={col.name}>
                    <TableSortLabel
                      active={sortState.columnName === col.name}
                      direction={
                        sortState.columnName === col.name
                          ? sortState.order
                          : "asc"
                      }
                      onClick={() => handleClickSortColumn(col.name)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortRows(filterTasks(tasks)).map((row, rowIndex) => (
                <TableRow
                  css={styles.tableRow}
                  onClick={(event) => handleRowClick(event, row.task_id)}
                  hover
                  selected={selected.indexOf(row.task_id) !== -1}
                >
                  <TableCell css={styles.tableCheckCell} padding='checkbox'>
                    <Checkbox
                      checked={selected.indexOf(row.task_id) !== -1}
                      color='primary'
                    />
                  </TableCell>
                  {columnsInfo.map((col) => (
                    <TableCell
                      css={
                        col.type === "number"
                          ? styles.tableNumericCell
                          : styles.tableCell
                      }
                      width={col.width}
                      align={col.type === "number" ? "right" : "left"}
                    >
                      <Typography>
                        {col.name === "task_name" ? (
                          <Link
                            css={styles.link}
                            underline='always'
                            color='textPrimary'
                            onClick={(event: any) => {
                              event.stopPropagation();
                              setEditTaskOpen(true);
                            }}
                          >
                            {row[col.name]}
                          </Link>
                        ) : (
                          row[col.name]
                        )}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TaskDialog />
      <TaskFilter anchorEl={filterAnchorEl} />
    </>
  );
};

export default Task;
