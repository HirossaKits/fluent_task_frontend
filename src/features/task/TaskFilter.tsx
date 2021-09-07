import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 600,
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  form: {
    width: "100%",
  },
  gridIcon: {
    paddingTop: 20,
  },
  gridItem: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const TaskFilter: React.FC<Props> = (props) => {
  const classes = useStyles();
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
      <Paper className={classes.paper}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <form className={classes.form} noValidate autoComplete='off'>
            {filterTask.map((filter, index) => (
              <Grid
                item
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                <Grid className={classes.gridIcon} item xs={1}>
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
                <Grid className={classes.gridItem} item xs={3}>
                  <CommonSelect
                    label='対象'
                    name='columnName'
                    options={ListColumns}
                    value={filter.columnName}
                    index={index}
                    onChange={handleColumnSelectChange}
                  />
                </Grid>

                <Grid className={classes.gridItem} item xs={3}>
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
                <Grid className={classes.gridItem} item xs={3}>
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
                <Grid className={classes.gridIcon} item xs={1}>
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
  );
};

export default TaskFilter;
