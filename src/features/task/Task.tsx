import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { makeStyles, Theme, alpha } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TaskDialog from "./TaskDialog";
import TaskFilter from "./TaskFilter";
import {
  selectTasks,
  selectFilterTask,
  setEditTaskOpen,
  setFilterTaskOpen,
} from "./taskSlice";
import { TASK } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.text.primary,
  },
  buttonRight: {
    margin: "0 0 0 auto",
  },
  container: {
    maxHeight: 440,
  },
  tablerow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
    },
  },
  tableCheckCell: {
    width: "4%",
  },
  tableCell: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  tableNumericCell: {
    paddingLeft: 0,
    paddingRight: "5%",
  },
  link: {
    cursor: "pointer",
  },
}));

type ColumnNames =
  | "task_name"
  | "category"
  | "status"
  | "scheduled_startdate"
  | "scheduled_enddate"
  | "estimate_manhour"
  | "assigned"
  | "description";

interface ColumnInfo {
  name: ColumnNames;
  label: string;
  type: "string" | "number" | "Date";
  width: string;
}

const columns: ColumnInfo[] = [
  { name: "task_name", label: "タスク名", type: "string", width: "13%" },
  { name: "category", label: "カテゴリー", type: "string", width: "10%" },
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
  { name: "assigned", label: "担当", type: "string", width: "10%" },
  { name: "description", label: "備考", type: "string", width: "15%" },
];

interface SORT_STATE {
  order: "asc" | "desc";
  columnName: "" | ColumnNames;
}

const Task = () => {
  const classes = useStyles();
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
    let newSelected = Array.from(selected);
    const index = newSelected.indexOf(id);
    if (index === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(index, 1);
    }
    setSelected(newSelected);
  };

  const handleSelectAllClic = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(tasks.map((row) => row.task_id));
    } else {
      setSelected([]);
    }
  };

  const handleClickSortColumn = (colName: ColumnNames) => {
    setSortState({
      order:
        sortState.columnName !== colName || sortState.order === "desc"
          ? "asc"
          : "desc",
      columnName: colName,
    });
  };

  const sortRows = (ts: TASK[]): TASK[] => {
    if (!sortState.columnName) {
      return ts;
    }
    const sortedRows = Array.from(ts).sort((a, b) => {
      if (
        a[sortState.columnName as ColumnNames] >
        b[sortState.columnName as ColumnNames]
      ) {
        return sortState.order === "asc" ? 1 : -1;
      }
      if (
        a[sortState.columnName as ColumnNames] <
        b[sortState.columnName as ColumnNames]
      ) {
        return sortState.order === "desc" ? -1 : 1;
      }
      return 0;
    });
    return sortedRows;
  };

  const filterTasks = (ts: TASK[]): TASK[] => {
    const filtered = ts.filter((row, index) => {
      const columnValue = row[filterTask[index].column as ColumnNames];
      const filterValue = filterTask[index].value;
      const operator = filterTask[index].operator;

      if (operator === "=") {
        return columnValue === filterValue;
      } else if (operator === "start_from") {
        return columnValue.startsWith(filterValue);
      } else if (operator === "include") {
        return columnValue.indexOf(filterValue) === -1 ? false : true;
      } else if (operator === "exclude") {
        return columnValue.indexOf(filterValue) === -1 ? true : false;
      }
    });
    return filtered;
  };

  return (
    <>
      <Typography className={classes.title} variant="h5" component="h2">
        タスク一覧
      </Typography>
      <Toolbar disableGutters>
        <Tooltip title="登録">
          <IconButton aria-label="filter list">
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="編集">
          <IconButton aria-label="edit task" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="削除">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="フィルター">
          <IconButton
            ref={filterAnchorEl}
            className={classes.buttonRight}
            aria-label="filter list"
            onClick={handleFilterClick}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCheckCell} padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < tasks.length
                  }
                  checked={
                    selected.length > 0 && selected.length === tasks.length
                  }
                  onChange={handleSelectAllClic}
                  color="primary"
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell className={classes.tableCell} key={col.name}>
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
                className={classes.tablerow}
                onClick={(event) => handleRowClick(event, row.task_id)}
                hover
                selected={selected.indexOf(row.task_id) !== -1}
              >
                <TableCell
                  className={classes.tableCheckCell}
                  padding="checkbox"
                >
                  <Checkbox
                    checked={selected.indexOf(row.task_id) !== -1}
                    color="primary"
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell
                    className={
                      col.type === "number"
                        ? classes.tableNumericCell
                        : classes.tableCell
                    }
                    width={col.width}
                    align={col.type === "number" ? "right" : "inherit"}
                  >
                    <Typography>
                      {col.name === "task_name" ? (
                        <Link
                          className={classes.link}
                          underline="always"
                          color="textPrimary"
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
      <TaskDialog />
      <TaskFilter anchorEl={filterAnchorEl} />
    </>
  );
};

export default Task;
