import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { classicNameResolver } from "typescript";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: "left",
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

  const handleClose = () => {
    props.setOpen(false);
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
        <DialogTitle id='form-dialog-title'>タスクを登録</DialogTitle>
        <form className={classes.root} noValidate autoComplete='off'>
          <Grid container direction='row' justifyContent='center'>
            <Grid
              className={classes.gridcol}
              container
              justifyContent='flex-start'
              alignItems='center'
              xs={11}
            >
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <TextField
                    className={classes.input}
                    autoFocus
                    variant='outlined'
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
                <Grid item xs={10}>
                  <TextField
                    className={classes.input}
                    variant='outlined'
                    fullWidth
                    margin='dense'
                    size='small'
                    id='name'
                    label='タスク名'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={3}>
                  <TextField
                    className={classes.input}
                    variant='outlined'
                    fullWidth
                    margin='dense'
                    size='small'
                    id='status'
                    label='ステータス'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <TextField
                    className={classes.input}
                    variant='outlined'
                    fullWidth
                    margin='dense'
                    size='small'
                    id='name'
                    label='担当者'
                    type='email'
                    InputLabelProps={{
                      shrink: true,
                    }}
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
