import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/material/styles";
import { Theme } from "../types";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CommonTextField from "../../common/CommonTextField";
import CommonDatePicker from "../../common/CommonDatePicker";
import { selectEditedTask } from "../task/taskSlice";
import { setEditedTask } from "../task/taskSlice";
import { TARGET } from "../types";
import CommonSelect from "../../common/CommonSelect";
import { Status, DemoMember } from "../../selectionOptions";
import { selectEditTaskOpen, setEditTaskOpen } from "./taskSlice";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%",
  },
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(0),
  },
  close: {
    margin: 10,
  },
  gridcol: {
    textAlign: "center",
  },
  arrowIcon: {
    marginTop: 22,
  },
}));

const TaskDialog: React.FC = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editTaskOpen = useSelector(selectEditTaskOpen);
  const editedTask = useSelector(selectEditedTask);

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedTask({ ...editedTask, [target.name]: target.value }));
  };

  const handleClose = () => {
    dispatch(setEditTaskOpen(false));
  };

  return (
    <>
      <Dialog
        open={editTaskOpen}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth='sm'
        fullWidth
      >
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid className={classes.title} item>
            <DialogTitle>タスクを登録</DialogTitle>
          </Grid>
          <Grid className={classes.close} item>
            <IconButton size='small' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <form className={classes.form} noValidate autoComplete='off'>
          <Grid container direction='row' justifyContent='center'>
            <Grid
              className={classes.gridcol}
              container
              justifyContent='flex-start'
              alignItems='center'
              xs={10}
            >
              <Grid item xs={12}>
                <Grid item xs={10}>
                  <CommonTextField
                    label='プロジェクト'
                    name='title'
                    value={editedTask.task_name}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={10}>
                  <CommonTextField
                    label='タスク名'
                    name='title'
                    value={editedTask.task_name}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <CommonSelect
                    label='カテゴリー'
                    name='status'
                    options={Status}
                    value={editedTask.status}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={3}>
                  <CommonSelect
                    label='ステータス'
                    name='status'
                    options={Status}
                    value={editedTask.status}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <CommonSelect
                    label='担当者'
                    name='assigned'
                    options={DemoMember}
                    value={editedTask.assigned_name}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                xs={12}
              >
                <Grid item xs={2}>
                  <CommonTextField
                    label='見積工数'
                    name='estimate_manhour'
                    type='number'
                    value={editedTask.estimate_manhour}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SwapHorizIcon className={classes.arrowIcon} />
                </Grid>
                <Grid item xs={2}>
                  <CommonTextField
                    label='実工数'
                    name='actual_manhour'
                    type='number'
                    value={editedTask.actual_manhour}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='開始予定日'
                    name='scheduled_start_date'
                    value={editedTask.scheduled_startdate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SwapHorizIcon className={classes.arrowIcon} />
                </Grid>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='開始日'
                    name='actual_start_date'
                    value={editedTask.actual_startdate}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='終了予定日'
                    name='scheduled_start_date'
                    value={editedTask.scheduled_startdate}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={2}>
                  <SwapHorizIcon className={classes.arrowIcon} />
                </Grid>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='終了日'
                    name='actual_end_date'
                    value={editedTask.actual_enddate}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              キャンセル
            </Button>
            <Button onClick={handleClose} color='primary'>
              登録
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TaskDialog;
