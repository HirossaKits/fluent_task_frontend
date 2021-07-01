import React from 'react';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    tableLayout: "fixed",
  },
  button: {
    margin: theme.spacing(3),
  },
  small: {
    margin: "auto",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  container: {
    marginTop: 20,
    maxHeight: 440,
  },
}));

const header = ["カテゴリー", "タスク名", "開始日", "終了日", "担当"];

const Task = () => {
  const classes = useStyles();
  return (
    <>
      <Button
        // className={classes.button}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddIcon />}
      // onClick={() => {
      // dispatch(
      //   editTask({
      //     id: 0,
      //     task: "",
      //     description: "",
      //     criteria: "",
      //     responsible: loginUser.id,
      //     status: "1",
      //     category: 1,
      //     estimate: 0,
      //   })
      // );
      // dispatch(selectTask(initialState.selectedTask));
      // }}
      >タスクを追加
      </Button>
      <TableContainer className={classes.container}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              {header.map((text) => (<TableCell>{text}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Task;
