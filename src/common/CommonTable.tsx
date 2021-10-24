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
  columnInfo: {
    name: keyof T;
    label: string;
    type: "string" | "number" | "Date";
    width: string;
  }[];
}

type ListComponent = <T>(props: Props<T>) => React.ReactElement<Props<T>>;

const CommonTable: ListComponent = (props) => {
  type TABLE = typeof props.data;
  type ROW = typeof props.data[0];
  type ROW_ITEM = keyof typeof props.data[0];
  const columnNames = Object.keys(props.data[0]);

  interface SORT_STATE {
    order: "asc" | "desc";
    columnName: ROW_ITEM;
  }

  interface FILTER {
    columnName: ROW_ITEM;
    type: "string" | "number" | "Date";
    operator: string;
    value: string;
  }

  const table = props.data.map((row, index) => ({ id: index, ...row }));
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortState, setSortState] = useState<SORT_STATE>({
    order: "asc",
    columnName: columnNames[0] as ROW_ITEM,
  });
  const [filters, setFilters] = useState<FILTER[]>([
    {
      columnName: props.columnInfo[0].name,
      type: props.columnInfo[0].type,
      operator: "=",
      value: "",
    },
  ]);

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
      setSelected(table.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const sortRows = (tbl: TABLE) => {
    if (!sortState.columnName) return tbl;
    const sortedRows = tbl.slice().sort((next, now) => {
      const nextVal = next[sortState.columnName];
      const nowVal = now[sortState.columnName];

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

  const handleClickSortColumn = (colName: ROW_ITEM) => {
    setSortState({
      order:
        sortState.columnName !== colName || sortState.order === "desc"
          ? "asc"
          : "desc",
      columnName: colName,
    });
  };

  const filterTasks = (tbl: TABLE): TABLE => {
    if (filters.length < 1) return tbl;

    const filtered = tbl.filter((row, rowId) => {
      let validity = true;

      filters.forEach((filter, filterId) => {
        if (!validity) return;
        if (!filter.value) return;

        const columnValue = String(row[filter.columnName]);
        const filterValue = filter.value;
        const operator = filter.operator;
        const type = props.columnInfo.filter(
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
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={
                      selected.length > 0 && selected.length === data.length
                    }
                    onChange={handleSelectAllClic}
                    color='primary'
                  />
                </TableCell>
                {props.columnInfo.map((col) => (
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
      <Popover
        open={filterTaskOpen}
        anchorEl={props.anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
        keepMounted
      >
        <Paper css={styles.paper}>
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
          >
            <form css={styles.form} noValidate autoComplete='off'>
              {filterTask.map((filter, index) => (
                <Grid
                  item
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Grid css={styles.gridIcon} item xs={1}>
                    {index === filterTask.length - 1 &&
                      (filterTask[index].value === "" ? (
                        <IconButton disabled>
                          <AddIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleAddClick(index)}>
                          <AddIcon />
                        </IconButton>
                      ))}
                  </Grid>
                  <Grid css={styles.gridItem} item xs={3}>
                    <CommonSelect
                      label='対象'
                      name='columnName'
                      options={ListColumns}
                      value={filter.columnName}
                      index={index}
                      onChange={handleColumnSelectChange}
                    />
                  </Grid>

                  <Grid css={styles.gridItem} item xs={3}>
                    {filter.type === "string" ? (
                      <CommonSelect
                        label='演算子'
                        name='operator'
                        options={FilterOperatorOfString}
                        value={filter.operator}
                        index={index}
                        onChange={handleInputChange}
                      />
                    ) : filter.type === "number" ? (
                      <CommonSelect
                        label='演算子'
                        name='operator'
                        options={FilterOperatorOfNumber}
                        value={filter.operator}
                        index={index}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <CommonSelect
                        label='演算子'
                        name='operator'
                        options={FilterOperatorOfDate}
                        value={filter.operator}
                        index={index}
                        onChange={handleInputChange}
                      />
                    )}
                  </Grid>
                  <Grid css={styles.gridItem} item xs={3}>
                    {filter.type === "string" || filter.type === "number" ? (
                      <CommonTextField
                        label='値'
                        name='value'
                        value={filter.value}
                        index={index}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <CommonDatePicker
                        label='値'
                        name='value'
                        value={filter.value}
                        index={index}
                        onChange={handleInputChange}
                      />
                    )}
                  </Grid>
                  <Grid css={styles.gridIcon} item xs={1}>
                    {(filterTask.length !== 1 || index !== 0) && (
                      <IconButton onClick={() => handleClearClick(index)}>
                        <ClearIcon color='action' />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
            </form>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
};

export default CommonTable;
