import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import CommonSelect from '../components/CommonSelect';
import CommonTextField from '../components/CommonTextField';
import CommonDatePicker from '../components/CommonDatePicker';
import CommonTooltip from './CommonTooltip';
import { TARGET } from '../features/types';
import {
  ListColumns,
  FilterOperatorOfString,
  FilterOperatorOfNumber,
  FilterOperatorOfDate,
} from '../selectionOptions';

interface Props<T, K extends keyof T> {
  data: T[];
  elementFactory: { [key in K]: (param: T) => JSX.Element };
  columnInfo: {
    name: keyof T;
    label: string;
    type: 'string' | 'number' | 'Date';
    width: string;
    isJsxElement?: boolean;
  }[];
  idColumn: keyof T;
  showToolBar: boolean;
  editDialog?: JSX.Element;
  handleRegisterClick?: Function;
  handleEditClick?: Function;
  handleDeleteClick?: Function;
}

type ListComponent = <T, K extends keyof T>(
  props: Props<T, K>
) => React.ReactElement<T>;

const CommonTable: ListComponent = (props) => {
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
    paper: css`
      width: 600px;
      padding-right: ${theme.spacing(1)};
      padding-bottom: ${theme.spacing(1)};
    `,
    form: css`
      width: 100%;
    `,
    gridIcon: css`
      padding-top: 20px;
    `,
    gridItem: css`
      margin-left: ${theme.spacing(1)};
      marginr-ight: ${theme.spacing(1)};
    `,
  };

  type FACTORY = keyof typeof props.elementFactory;
  type DATA = typeof props.data[0];
  type ROW = { id: number } & DATA;
  type ROW_ITEM = keyof ROW;

  interface SORT_STATE {
    order: 'asc' | 'desc';
    columnName: '' | ROW_ITEM;
  }

  interface FILTER {
    columnName: ROW_ITEM;
    type: 'string' | 'number' | 'Date';
    operator: string;
    value: string;
  }

  const table = props.data.map((row, index) => ({ ...row, id: index }));

  const filterAnchorEl = useRef(null);

  const [selected, setSelected] = useState<number[]>([]);
  const [sortState, setSortState] = useState<SORT_STATE>({
    order: 'asc',
    columnName: '',
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FILTER[]>([
    {
      columnName: props.columnInfo[0].name as ROW_ITEM,
      type: props.columnInfo[0].type,
      operator: '=',
      value: '',
    },
  ]);

  const handleRegisterClick = () => {
    props.handleRegisterClick && props.handleRegisterClick();
  };

  const handleEditClick = () => {
    console.log(
      'test',
      table.filter((row) => selected.includes(row.id)) as DATA[]
    );
    props.handleEditClick &&
      props.handleEditClick(
        table.filter((row) => selected.includes(row.id)) as DATA[]
      );
  };

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

  const handleClickSortColumn = (colName: ROW_ITEM) => {
    setSortState({
      order:
        sortState.columnName !== colName || sortState.order === 'desc'
          ? 'asc'
          : 'desc',
      columnName: colName,
    });
  };

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleAddClick = (index: number) => {
    if (filters[index].value !== '') {
      setFilters([
        ...filters,
        {
          columnName: props.columnInfo[0].name as ROW_ITEM,
          type: props.columnInfo[0].type,
          operator: '=',
          value: '',
        },
      ]);
    }
  };

  const handleClearClick = (index: number) => {
    const target = [...filters];
    target.splice(index, 1);
    if (index !== 1 || filters.length !== 1) {
      setFilters(target);
    }
  };

  const handleInputChange = (target: TARGET) => {
    if (target.index != null) {
      setFilters([
        ...filters.slice(0, target.index),
        { ...filters[target.index], [target.name]: target.value },
        ...filters.slice(target.index + 1),
      ]);
    }
  };

  const handleColumnSelectChange = (target: TARGET) => {
    if (target.index != null) {
      const newType = props.columnInfo.filter(
        (col) => col.name === target.value
      )[0].type;
      if (newType !== filters[target.index].type) {
        setFilters([
          ...filters.slice(0, target.index),
          {
            ...filters[target.index],
            [target.name]: target.value,
            operator: '=',
            value: '',
            type: newType,
          },
          ...filters.slice(target.index + 1),
        ]);
      } else {
        setFilters([
          ...filters.slice(0, target.index),
          {
            ...filters[target.index],
            [target.name]: target.value,
          },
          ...filters.slice(target.index + 1),
        ]);
      }
    }
  };

  const sortRows = (tbl: ROW[]): ROW[] => {
    if (sortState.columnName === '') return tbl;
    const sortedRows = tbl.slice().sort((next, now) => {
      const nextVal = next[sortState.columnName as ROW_ITEM];
      const nowVal = now[sortState.columnName as ROW_ITEM];

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
        return sortState.order === 'asc' ? 1 : -1;
      }
      if (nextVal < nowVal) {
        return sortState.order === 'desc' ? -1 : 1;
      }
      return 0;
    });
    return sortedRows;
  };

  const filterTable = (tbl: ROW[]): ROW[] => {
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

        if (type === 'string') {
          if (operator === '=') {
            validity = columnValue === filterValue;
          } else if (operator === 'start_from') {
            validity = columnValue.toString().startsWith(filterValue);
          } else if (operator === 'include') {
            validity =
              columnValue.toString().indexOf(filterValue) === -1 ? false : true;
          } else if (operator === 'exclude') {
            validity =
              columnValue.toString().indexOf(filterValue) === -1 ? true : false;
          }
        }

        if (type === 'number' || type === 'Date') {
          if (operator === '=') {
            validity = columnValue === filterValue;
          } else if (operator === '<=') {
            validity = columnValue <= filterValue;
          } else if (operator === '>=') {
            validity = columnValue >= filterValue;
          }
        }
      });

      return validity;
    });
    return filtered;
  };

  const displayContext = sortRows(filterTable(table));
  console.log(displayContext);
  console.log(selected);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {props.showToolBar && (
          <Toolbar disableGutters>
            <CommonTooltip title='登録'>
              <IconButton
                aria-label='register task'
                onClick={handleRegisterClick}
              >
                <PlaylistAddIcon />
              </IconButton>
            </CommonTooltip>
            <CommonTooltip title='編集'>
              <IconButton aria-label='edit task' onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </CommonTooltip>
            <CommonTooltip title='削除'>
              <IconButton
                aria-label='delete task'
                onClick={() =>
                  props.handleDeleteClick &&
                  props.handleDeleteClick(
                    table.filter((row) => selected.includes(row.id)) as DATA[]
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
            </CommonTooltip>
            <CommonTooltip title='フィルター'>
              <IconButton
                ref={filterAnchorEl}
                css={styles.filterButton}
                aria-label='filter list'
                onClick={handleFilterClick}
              >
                <FilterListIcon />
              </IconButton>
            </CommonTooltip>
          </Toolbar>
        )}
        <TableContainer css={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell css={styles.tableCheckCell} padding='checkbox'>
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < table.length
                    }
                    checked={
                      selected.length > 0 && selected.length === table.length
                    }
                    onChange={handleSelectAllClic}
                    color='primary'
                  />
                </TableCell>
                {props.columnInfo.map((col, idx) => (
                  <TableCell css={styles.tableCell} key={idx}>
                    <TableSortLabel
                      active={sortState.columnName === col.name}
                      direction={
                        sortState.columnName === col.name
                          ? sortState.order
                          : 'asc'
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
              {displayContext.map((row, rowIndex) => (
                <TableRow
                  css={styles.tableRow}
                  onClick={(event) => handleRowClick(event, row.id)}
                  hover
                  selected={selected.indexOf(row.id) !== -1}
                >
                  <TableCell css={styles.tableCheckCell} padding='checkbox'>
                    <Checkbox
                      checked={selected.indexOf(row.id) !== -1}
                      color='primary'
                    />
                  </TableCell>
                  {props.columnInfo.map((col) => (
                    <TableCell
                      css={
                        col.type === 'number'
                          ? styles.tableNumericCell
                          : styles.tableCell
                      }
                      width={col.width}
                      align={col.type === 'number' ? 'right' : 'left'}
                    >
                      {col.isJsxElement === true ? (
                        <>
                          {props.elementFactory &&
                            props.elementFactory[col.name as FACTORY](
                              row as DATA
                            )}
                        </>
                      ) : (
                        <Typography>{row[col.name]}</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {props.editDialog && <>{props.editDialog}</>}
      <Popover
        open={filterOpen}
        anchorEl={filterAnchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleFilterClose}
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
              {filters.map((filter, index) => (
                <Grid
                  item
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Grid css={styles.gridIcon} item xs={1}>
                    {index === filters.length - 1 &&
                      (filters[index].value === '' ? (
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
                      value={filter.columnName as string}
                      index={index}
                      onChange={handleColumnSelectChange}
                    />
                  </Grid>
                  <Grid css={styles.gridItem} item xs={3}>
                    {filter.type === 'string' ? (
                      <CommonSelect
                        label='演算子'
                        name='operator'
                        options={FilterOperatorOfString}
                        value={filter.operator}
                        index={index}
                        onChange={handleInputChange}
                      />
                    ) : filter.type === 'number' ? (
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
                    {filter.type === 'string' || filter.type === 'number' ? (
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
                    {(filters.length !== 1 || index !== 0) && (
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
      <>{props.editDialog}</>
    </>
  );
};

export default CommonTable;
