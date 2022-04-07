import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
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
import useCreateOption from '../hooks/optionCreater';

interface Props<T, K extends keyof T> {
  data: T[];
  elementFactory: { [key in K]: (param: T) => JSX.Element };
  columnInfo: {
    name: string;
    label: string;
    type: 'string' | 'number' | 'Date' | 'select';
    width: string;
    selection?: { value: string; label: string }[];
    isJsxElement?: boolean;
  }[];
  idColumn: keyof T;
  showToolBar: boolean;
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
      width: 580px;
      padding-right: ${theme.spacing(1)};
      padding-left: ${theme.spacing(1)};
      padding-bottom: ${theme.spacing(1)};
    `,
    form: css`
      width: 100%;
    `,
    iconGrid: css`
      width: 36px;
      margin-top: 24px;
    `,
    textGrid: css`
      margin: 0 ${theme.spacing(1)};
    `,
  };

  const { t } = useTranslation();
  const FilterOperatorOfString = [
    {
      value: 'start_from',
      label: t('table.startFrom'),
    },
    {
      value: 'include',
      label: t('table.include'),
    },
    {
      value: 'exclude',
      label: t('table.exclude'),
    },
    {
      value: '=',
      label: t('table.equal'),
    },
  ];

  const FilterOperatorOfNumber = [
    {
      value: '=',
      label: t('table.equal'),
    },
    {
      value: '<=',
      label: t('table.orLess'),
    },
    {
      value: '>=',
      label: t('table.orMore'),
    },
  ];

  const FilterOperatorOfDate = [
    {
      value: '=',
      label: t('table.equal'),
    },
    {
      value: '<=',
      label: t('table.orBefore'),
    },
    {
      value: '>=',
      label: t('table.orAfter'),
    },
  ];

  const FilterOperatorOfSelect = [
    {
      value: '=',
      label: t('table.equal'),
    },
    {
      value: '!=',
      label: t('table.notEqual'),
    },
  ];

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
    type: 'string' | 'number' | 'Date' | 'select';
    operator: string;
    value: string | number;
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
  const createOption = useCreateOption();

  const filterTargetOption = createOption(props.columnInfo, 'name', 'label');

  const handleRegisterClick = () => {
    props.handleRegisterClick && props.handleRegisterClick();
  };

  const handleEditClick = () => {
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
    const sortedRows = tbl.slice().sort((a, b) => {
      const valA = a[sortState.columnName as ROW_ITEM];
      const valB = b[sortState.columnName as ROW_ITEM];
      if (valA === null && valB === null) {
        return 0;
      }
      if (valA === null) {
        return 1;
      }
      if (valB === null) {
        return -1;
      }
      if (valA > valB) {
        return sortState.order === 'asc' ? 1 : -1;
      }
      if (valA < valB) {
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

        const columnValue = row[filter.columnName];
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
            validity = String(columnValue).startsWith(String(filterValue));
          } else if (operator === 'include') {
            validity =
              String(columnValue).indexOf(String(filterValue)) === -1
                ? false
                : true;
          } else if (operator === 'exclude') {
            validity =
              String(columnValue).indexOf(String(filterValue)) === -1
                ? true
                : false;
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

        if (type === 'select') {
          validity = columnValue === filterValue;
        }
      });

      return validity;
    });
    return filtered;
  };

  const displayContext = sortRows(filterTable(table));

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {props.showToolBar && (
          <Toolbar disableGutters>
            <CommonTooltip title={t('table.add')}>
              <IconButton
                aria-label='register task'
                onClick={handleRegisterClick}
              >
                <PlaylistAddIcon />
              </IconButton>
            </CommonTooltip>
            <CommonTooltip title={t('table.edit')}>
              <IconButton aria-label='edit task' onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </CommonTooltip>
            <CommonTooltip title={t('table.remove')}>
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
            <CommonTooltip title={t('table.filter')}>
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
                      onClick={() =>
                        handleClickSortColumn(col.name as keyof DATA)
                      }
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
                      {col.isJsxElement ? (
                        <>
                          {props.elementFactory &&
                            props.elementFactory[col.name as FACTORY](
                              row as DATA
                            )}
                        </>
                      ) : col.type === 'select' ? (
                        <Typography>
                          {
                            col.selection?.find(
                              (item) =>
                                String(item.value) ===
                                String(row[col.name as keyof DATA])
                            )?.label
                          }
                        </Typography>
                      ) : (
                        <Typography>{row[col.name as keyof DATA]}</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
      >
        <Paper css={styles.paper}>
          <form css={styles.form} noValidate autoComplete='off'>
            {filters.map((filter, index) => (
              <Grid
                item
                container
                direction='row'
                justifyContent='space-around'
                alignItems='center'
              >
                <Grid css={styles.iconGrid} item>
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
                <Grid css={styles.textGrid} item xs={3}>
                  <CommonSelect
                    label={t('table.target')}
                    name='columnName'
                    options={filterTargetOption}
                    value={filter.columnName as string}
                    index={index}
                    onChange={handleColumnSelectChange}
                    width={'100%'}
                  />
                </Grid>
                <Grid css={styles.textGrid} item>
                  {filter.type === 'string' ? (
                    <CommonSelect
                      label={t('table.operator')}
                      name='operator'
                      options={FilterOperatorOfString}
                      value={filter.operator}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  ) : filter.type === 'number' ? (
                    <CommonSelect
                      label={t('table.operator')}
                      name='operator'
                      options={FilterOperatorOfNumber}
                      value={filter.operator}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  ) : filter.type === 'Date' ? (
                    <CommonSelect
                      label={t('table.operator')}
                      name='operator'
                      options={FilterOperatorOfDate}
                      value={filter.operator}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  ) : (
                    // <CommonSelect
                    //   label="演算子"
                    //   name="operator"
                    //   options={FilterOperatorOfSelect}
                    //   value={filter.operator}
                    //   index={index}
                    //   onChange={handleInputChange}
                    //   width="140px"
                    // />
                    <CommonSelect
                      label={t('table.operator')}
                      name='operator'
                      options={FilterOperatorOfSelect}
                      value={filter.operator}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  )}
                </Grid>
                <Grid css={styles.textGrid} item>
                  {filter.type === 'string' ? (
                    <CommonTextField
                      label={t('table.value')}
                      name='value'
                      value={filter.value}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  ) : filter.type === 'number' ? (
                    <CommonTextField
                      label={t('table.value')}
                      type='number'
                      name='value'
                      value={filter.value}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  ) : filter.type === 'Date' ? (
                    <CommonDatePicker
                      label={t('table.value')}
                      name='value'
                      value={String(filter.value)}
                      index={index}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  ) : (
                    <CommonSelect
                      label={t('table.value')}
                      name='value'
                      index={index}
                      options={
                        props.columnInfo.find(
                          (col) => col.name === filter.columnName
                        )?.selection
                      }
                      value={filter.value}
                      onChange={handleInputChange}
                      width='140px'
                    />
                  )}
                </Grid>
                <Grid css={styles.iconGrid} item>
                  {(filters.length !== 1 || index !== 0) && (
                    <IconButton onClick={() => handleClearClick(index)}>
                      <ClearIcon color='action' />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
          </form>
        </Paper>
      </Popover>
    </>
  );
};

export default CommonTable;
