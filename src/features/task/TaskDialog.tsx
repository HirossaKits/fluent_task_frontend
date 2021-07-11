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
  grid: {
    textAlign: "center",
  },
  gridtest: {
    textAlign: "center",
    // background: "green",
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
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <form className={classes.root} noValidate autoComplete='off'>
          <DialogTitle id='form-dialog-title'>タスクを登録</DialogTitle>
          <Grid
            className={classes.root}
            container
            direction='column'
            alignContent='space-between'
            alignItems='center'
          >
            <Grid className={classes.grid} item xs={4}>
              <TextField
                className={classes.input}
                autoFocus
                fullWidth
                // margin='dense'
                id='category'
                label='カテゴリー'
                type='email'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.gridtest} item xs={4}>
              <TextField
                className={classes.input}
                fullWidth
                // margin='dense'
                id='name'
                label='タスク名'
                type='email'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid className={classes.grid} item xs={6}>
              <TextField
                className={classes.input}
                fullWidth
                variant='standard'
                margin='dense'
                id='assigned'
                label='Email Address'
                type='email'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.grid} item xs={6}>
              <TextField
                autoFocus
                variant='outlined'
                margin='dense'
                id='name'
                label='タスク名'
                type='email'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.grid} item xs={6}>
              <TextField
                autoFocus
                variant='outlined'
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleClose} color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default TaskDialog;
