import React from 'react';
import { Typography, Toolbar, Tooltip, IconButton, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.text.primary
  },
  root: {
    width: "100%",
  },
  table: {
    tableLayout: "fixed",
  },
  button: {
    margin: theme.spacing(3),
  },
  small: {
    margin: "auto",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  container: {
    marginTop: 20,
    maxHeight: 440,
  },
  checkbox: {
    color: "primary"
  }
}));



interface Column {
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    label: "カテゴリー",
    minWidth: 40,
  },
  {
    label: "タスク名",
    minWidth: 120,
  },
  {
    label: "ステータス",
    minWidth: 120,
  },
  {
    label: "開始予定日",
    minWidth: 120,
  },
  {
    label: "終了予定日",
    minWidth: 120,
  },
  {
    label: "予定工数 (日)",
    minWidth: 120,
  },
  {
    label: "担当",
    minWidth: 120,
  },
  {
    label: "コメント",
    minWidth: 120,
  }

];

let rowCount = 10;

interface Data {
  name: string;
  status: string,
  category: string;
  startdate: string;
  enddate: string;
  manhour: number;
  assigned: string;
  comment: string;
}

function createData(
  category: string,
  name: string,
  status: string,
  startdate: string,
  enddate: string,
  manhour: number,
  assigned: string,
  comment: string,
): Data {
  return { category, name, status, startdate, enddate, manhour, assigned, comment };
}

const rows = [
  createData('製造', 'A機能製造', '進行中', '2021-07-04', '2021-07-04', 1, '製造担当A', 'テストデータA使用'),
  createData('製造', 'B機能製造', '開始前', '2021-07-05', '2021-07-05', 1, '製造担当A', 'テストデータA使用'),
  createData('製造', 'C機能製造', '開始前', '2021-07-06', '2021-07-06', 1, '製造担当A', 'テストデータA使用'),
  createData('製造', 'D機能製造', '開始前', '2021-07-07', '2021-07-07', 1, '製造担当A', 'テストデータA使用'),
  createData('製造', 'E機能製造', '開始前', '2021-07-08', '2021-07-08', 1, '製造担当A', 'テストデータA使用'),
  createData('製造', 'F機能製造', '開始前', '2021-07-09', '2021-07-09', 1, '製造担当A', 'テストデータA使用'),
  createData('製造', 'G機能製造', '開始前', '2021-07-10', '2021-07-10', 1, '製造担当A', 'テストデータA使用'),
];

const Task = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5" component="h2">
        タスク一覧
      </Typography>
      <Toolbar>
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="フィルター">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="登録">
          <IconButton aria-label="filter list">
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="編集">
          <IconButton aria-label="filter list">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="削除">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table size="medium" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  className={classes.checkbox}
                  indeterminate
                  // indeterminate={selected.length > 0 && selected.length < rows.length}
                  // checked={rowCount > 0 && selected.length === rowCount}
                  // onChange={onSelectAllClick}
                  // inputProps={{ 'aria-label': 'select all desserts' }}
                  color="primary"
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  align={col.align}
                  style={{ minWidth: col.minWidth }}>
                  {col.label}
                </TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                {(Object.keys(row)).map((key: string, colIndex: number) => (
                  <TableCell>
                    <span>{row[key as keyof Data]}</span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Task;
