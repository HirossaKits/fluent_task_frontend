import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CommonTextField from "../../common/CommonTextField";
import CommonDatePicker from "../../common/CommonDatePicker";
import { Typography } from "@material-ui/core";
import { AnyCnameRecord } from "dns";
import { selectEditedTask } from "../task/taskSlice";
import { setEditedTask } from "../task/taskSlice";
import { TARGET } from "../types";
import CommonSelect from "../../common/CommonSelect";
import { Status, DemoMember } from "../../selectionOptions";
import { selectEditTaskOpen, setEditTaskOpen } from "./taskSlice";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginLeft: theme.spacing(3),
  },
  close: {
    margin: theme.spacing(1),
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
          alignItems='center'
        >
          <Grid className={classes.title} item>
            <DialogTitle>タスクを登録</DialogTitle>
          </Grid>
          <Grid className={classes.close} item>
            <IconButton size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <form className={classes.root} noValidate autoComplete='off'>
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
                    label='タスク名'
                    name='title'
                    value={editedTask.title}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <TextField
                    autoFocus
                    variant='standard'
                    fullWidth
                    margin='dense'
                    size='small'
                    id='category'
                    label='カテゴリー'
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    value={editedTask.assigned}
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
                    value={editedTask.scheduled_start_date}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SwapHorizIcon className={classes.arrowIcon} />
                </Grid>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='実開始日'
                    name='actual_start_date'
                    value={editedTask.actual_start_date}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='終了予定日'
                    name='scheduled_start_date'
                    value={editedTask.scheduled_start_date}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={2}>
                  <SwapHorizIcon className={classes.arrowIcon} />
                </Grid>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='実終了日'
                    name='actual_end_date'
                    value={editedTask.actual_end_date}
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
