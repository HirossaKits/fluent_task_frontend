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
import TaskDialog from "../features/task/TaskDialog";
// import TaskFilter from "./TaskFilter";

interface Props<T> {
  data: T[];
}

type ListComponent = <T>(props: Props<T>) => React.ReactElement<Props<T>>;

interface SORT_STATE {
  order: "asc" | "desc";
  columnName: string;
}

const CommonTable: ListComponent = (props) => {
  const table = props.data.map((row, index) => ({ id: index, ...row }));

  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortState, setSortState] = useState<SORT_STATE>({
    order: "asc",
    columnName: "",
  });

  const handleRowClick = (event: React.MouseEvent<unknown>, id: number) => {
    let newSelected = selected.slice();
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
      setSelected(data.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleClickSortColumn = (colName: string) => {
    setSortState({
      order:
        sortState.columnName !== colName || sortState.order === "desc"
          ? "asc"
          : "desc",
      columnName: colName,
    });
  };

  const handleFilterClick = () => {
    setFilterOpen(true);
  };
  const filterAnchorEl = useRef(null);

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
            <IconButton aria-label='edit task'>
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

export default CommonTable;
