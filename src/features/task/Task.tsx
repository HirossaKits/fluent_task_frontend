import React, { useState } from "react";
import {
  Button,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Link,
} from "@material-ui/core";
import { makeStyles, Theme, lighten } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TaskDialog from "./TaskDialog";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.text.primary,
  },
  root: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  table: {
    // fixedHeader:false,
    // width: "100%",
    // tableLayout: "auto",
  },
  buttonRight: {
    margin: "0 0 0 auto",
  },
  // small: {
  //   margin: "auto",
  //   width: theme.spacing(3),
  //   height: theme.spacing(3),
  // },
  toolbar: {
    // background:'green',
    // disableGutters:true
  },
  container: {
    maxHeight: 440,
  },
  checkbox: {
    color: "primary",
  },
  tablerow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
    },
  },
  tableCheckCell: {
    width: "4%",
    // paddingLeft:0,
    // paddingRight: "20%",
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

type COLUMN_ID =
  | "category"
  | "name"
  | "status"
  | "startdate"
  | "enddate"
  | "manhour"
  | "assigned"
  | "comment";

interface Column {
  name: COLUMN_ID;
  label: string;
  isNumeric: boolean;
  width: string;
}

const columns: Column[] = [
  { name: "name", label: "タスク名", isNumeric: false, width: "13%" },
  { name: "category", label: "カテゴリー", isNumeric: false, width: "10%" },
  { name: "status", label: "ステータス", isNumeric: false, width: "10%" },
  { name: "startdate", label: "開始予定日", isNumeric: false, width: "12%" },
  { name: "enddate", label: "終了予定日", isNumeric: false, width: "12%" },
  { name: "manhour", label: "見積工数", isNumeric: true, width: "10%" },
  { name: "assigned", label: "担当", isNumeric: false, width: "10%" },
  { name: "comment", label: "コメント", isNumeric: false, width: "15%" },
];

let rowCount = 10;

interface Data {
  id: string;
  category: string;
  name: string;
  status: string;
  startdate: string;
  enddate: string;
  manhour: number;
  assigned: string;
  comment: string;
}

function createData(
  id: string,
  category: string,
  name: string,
  status: string,
  startdate: string,
  enddate: string,
  manhour: number,
  assigned: string,
  comment: string
): Data {
  return {
    id,
    category,
    name,
    status,
    startdate,
    enddate,
    manhour,
    assigned,
    comment,
  };
}

const rows = [
  createData(
    "1",
    "製造",
    "A機能製造",
    "進行中",
    "2021-07-04",
    "2021-07-04",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
  createData(
    "2",
    "製造",
    "B機能製造",
    "開始前",
    "2021-07-05",
    "2021-07-05",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
  createData(
    "3",
    "製造",
    "C機能製造",
    "開始前",
    "2021-07-06",
    "2021-07-06",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
  createData(
    "4",
    "製造",
    "D機能製造",
    "開始前",
    "2021-07-07",
    "2021-07-07",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
  createData(
    "5",
    "製造",
    "E機能製造",
    "開始前",
    "2021-07-08",
    "2021-07-08",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
  createData(
    "6",
    "製造",
    "F機能製造",
    "開始前",
    "2021-07-09",
    "2021-07-09",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
  createData(
    "7",
    "製造",
    "G機能製造",
    "開始前",
    "2021-07-10",
    "2021-07-10",
    1,
    "製造担当A",
    "テストデータA使用"
  ),
];

interface SORT_STATE {
  order: "asc" | "desc";
  column: "" | COLUMN_ID;
}

const Task = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<SORT_STATE>({
    order: "asc",
    column: "",
  });
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(!open);
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
      setSelected(rows.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleClickSortColumn = (colId: COLUMN_ID) => {
    setSort({
      order: sort.column !== colId || sort.order === "desc" ? "asc" : "desc",
      column: colId,
    });
  };

  const sortRows = (rs: typeof rows): typeof rows => {
    if (!sort.column) {
      return rows;
    }
    const sortedRows = Array.from(rs).sort((a, b) => {
      if (a[sort.column as keyof Data] > b[sort.column as keyof Data]) {
        return sort.order === "asc" ? 1 : -1;
      }
      if (a[sort.column as keyof Data] < b[sort.column as keyof Data]) {
        return sort.order === "desc" ? -1 : 1;
      }
      return 0;
    });
    return sortedRows;
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant='h5' component='h2'>
        タスク一覧
      </Typography>
      <Toolbar className={classes.toolbar} disableGutters>
        <Tooltip title='登録'>
          <IconButton aria-label='filter list'>
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='編集'>
          <IconButton onClick={handleEditClick} aria-label='filter list'>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='削除'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='フィルター'>
          <IconButton className={classes.buttonRight} aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table size='medium' className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCheckCell} padding='checkbox'>
                <Checkbox
                  className={classes.checkbox}
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rowCount > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClic}
                  color='primary'
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell className={classes.tableCell} key={col.name}>
                  <TableSortLabel
                    active={sort.column === col.name}
                    direction={sort.column === col.name ? sort.order : "asc"}
                    onClick={() => handleClickSortColumn(col.name)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRows(rows).map((row, rowIndex) => (
              <TableRow
                className={classes.tablerow}
                onClick={(event) => handleRowClick(event, row.id)}
                hover
                selected={selected.indexOf(row.id) !== -1}
              >
                <TableCell
                  className={classes.tableCheckCell}
                  padding='checkbox'
                >
                  <Checkbox
                    checked={selected.indexOf(row.id) !== -1}
                    color='primary'
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell
                    className={
                      col.isNumeric
                        ? classes.tableNumericCell
                        : classes.tableCell
                    }
                    width={col.width}
                    align={col.isNumeric ? "right" : "inherit"}
                  >
                    <Typography variant='body2'>
                      {col.name === "name" ? (
                        <Link
                          className={classes.link}
                          underline='always'
                          color='textPrimary'
                          onClick={(event: any) => {
                            event.stopPropagation();
                            setOpen(true);
                          }}
                        >
                          {row[col.name] as keyof Data}
                        </Link>
                      ) : (
                        (row[col.name] as keyof Data)
                      )}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TaskDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Task;
