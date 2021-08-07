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
import Close from "@material-ui/icons/Close";
import CommonTextField from "../../common/CommonTextField";
import CommonDatePicker from "../../common/CommonDatePicker";
import { Typography } from "@material-ui/core";
import { AnyCnameRecord } from "dns";
import { selectEditedTask } from "../task/taskSlice";
import { setEditedTask } from "../task/taskSlice";
import { TARGET } from "../../types";

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
    // background: "blue",
    // flexGrow: 1,
  },
  input: {
    // width: "80%",
  },
}));

type Props = {
  open: boolean;
  setOpen: Function;
};

const TaskDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editedTask = useSelector(selectEditedTask);
  const [value, setValue] = useState({});
  const [date, setDate] = useState("");

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedTask({ ...editedTask, [target.name]: target.value }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleOnChange = (input: string) => {
    setValue(input);
  };

  return (
    <>
      <Dialog
        open={props.open}
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
              <Close />
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
                    className={classes.input}
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
                  <CommonTextField
                    label='ステータス'
                    name='title'
                    value={editedTask.status}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <TextField
                    className={classes.input}
                    variant='standard'
                    fullWidth
                    margin='dense'
                    size='small'
                    id='assigned'
                    label='担当者'
                    type='email'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={2}>
                  <CommonTextField
                    label='見積工数'
                    name='estimate_manhour'
                    type='number'
                    value={editedTask.estimate_manhour}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
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
              <Grid item xs={12}>
                <Grid item xs={2}>
                  {/* <CommonTextField
                    label='開始日'
                    handleOnChange={handleOnChange}
                  /> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={2}>
                  <CommonDatePicker
                    label='開始予定日'
                    name='scheduled_startdate'
                    value={editedTask.scheduled_startdate}
                    onChange={handleInputChange}
                    // label='開始日'
                    // handleOnChange={handleOnChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleClose} color='primary'>
                Subscribe
              </Button>
            </DialogActions> */}
        </form>
      </Dialog>
    </>
  );
};

export default TaskDialog;
