import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CommonTextField from "../../common/CommonTextField";
import CommonDatePicker from "../../common/CommonDatePicker";
import { setFilterTask } from "../task/taskSlice";
import { TARGET } from "../types";
import CommonSelect from "../../common/CommonSelect";
import {
  selectFilterTaskOpen,
  selectFilterTask,
  setFilterTaskOpen,
} from "./taskSlice";
import {
  ListColumns,
  FilterOperatorOfString,
  FilterOperatorOfNumber,
  FilterOperatorOfDate,
} from "../../selectionOptions";
import { columnsInfo } from "./Task";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const TaskFilter: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const filterTaskOpen = useSelector(selectFilterTaskOpen);
  const filterTask = useSelector(selectFilterTask);

  const handleAddClick = (index: number) => {
    if (filterTask[index].value !== "") {
      dispatch(
        setFilterTask([
          ...filterTask,
          {
            columnName: "task_name",
            type: "string",
            operator: "=",
            value: "",
            startDate: null,
            endDate: null,
          },
        ])
      );
    }
  };

  const handleClearClick = (index: number) => {
    const target = [...filterTask];
    target.splice(index, 1);
    if (index !== 1 || filterTask.length !== 1) {
      dispatch(setFilterTask(target));
    }
  };

  const handleInputChange = (target: TARGET) => {
    if (target.index != null) {
      dispatch(
        setFilterTask([
          ...filterTask.slice(0, target.index),
          { ...filterTask[target.index], [target.name]: target.value },
          ...filterTask.slice(target.index + 1),
        ])
      );
    }
  };

  const handleColumnSelectChange = (target: TARGET) => {
    if (target.index != null) {
      console.log(target.name);
      const newType = columnsInfo.filter((col) => col.name === target.value)[0]
        .type;
      if (newType !== filterTask[target.index].type) {
        dispatch(
          setFilterTask([
            ...filterTask.slice(0, target.index),
            {
              ...filterTask[target.index],
              [target.name]: target.value,
              operator: "=",
              value: "",
              type: newType,
            },
            ...filterTask.slice(target.index + 1),
          ])
        );
      } else {
        dispatch(
          setFilterTask([
            ...filterTask.slice(0, target.index),
            {
              ...filterTask[target.index],
              [target.name]: target.value,
            },
            ...filterTask.slice(target.index + 1),
          ])
        );
      }
    }
  };

  const handleClose = () => {
    dispatch(setFilterTaskOpen(false));
  };

  const theme = useTheme();
  const styles = {
    paper: css`
      width: 600;
      paddingright: ${theme.spacing(1)};
      paddingbottom: ${theme.spacing(1)};
    `,
    form: css`
      width: 100%;
    `,
    gridIcon: css`
      paddingtop: 20;
    `,
    gridItem: css`
      marginleft: ${theme.spacing(1)};
      marginright: ${theme.spacing(1)};
    `,
  };

  return (
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
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form css={styles.form} noValidate autoComplete="off">
            {filterTask.map((filter, index) => (
              <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
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
                    label="対象"
                    name="columnName"
                    options={ListColumns}
                    value={filter.columnName}
                    index={index}
                    onChange={handleColumnSelectChange}
                  />
                </Grid>

                <Grid css={styles.gridItem} item xs={3}>
                  {filter.type === "string" ? (
                    <CommonSelect
                      label="演算子"
                      name="operator"
                      options={FilterOperatorOfString}
                      value={filter.operator}
                      index={index}
                      onChange={handleInputChange}
                    />
                  ) : filter.type === "number" ? (
                    <CommonSelect
                      label="演算子"
                      name="operator"
                      options={FilterOperatorOfNumber}
                      value={filter.operator}
                      index={index}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <CommonSelect
                      label="演算子"
                      name="operator"
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
                      label="値"
                      name="value"
                      value={filter.value}
                      index={index}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <CommonDatePicker
                      label="値"
                      name="value"
                      value={filter.value}
                      index={index}
                      onChange={handleInputChange}
                    />
                  )}
                </Grid>
                <Grid css={styles.gridIcon} item xs={1}>
                  {(filterTask.length !== 1 || index !== 0) && (
                    <IconButton onClick={() => handleClearClick(index)}>
                      <ClearIcon color="action" />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
          </form>
        </Grid>
      </Paper>
    </Popover>
  );
};

export default TaskFilter;
