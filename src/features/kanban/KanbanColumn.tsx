import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircleIcon from "@mui/icons-material/Circle";
import KanbanCard from "./KanbanCard";
import { demoData } from "../../DummyData";
import { TASK } from "../types";

type Props = {
  themeColor: string;
  headerText: string;
  status: string;
};

const KanbanColumn: React.FC<Props> = (props: Props) => {
  const theme = useTheme();

  // 要素が重なった際のイベントを定義
  const handleDragEnter = (e: any) => {
    e.target.classList.add("over");
    console.log("-----over-----");
  };

  // 要素が離れた際のイベントを定義
  const handleDragLeave = (e: any) => e.target.classList.remove("over");

  const styles = {
    stack: css`
      padding: ${theme.spacing(2)};
      overflow: auto;
    `,
    column: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 28%;
      height: 83vh;
      background-color: ${theme.palette.action.hover};
    `,
    header: css`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 12px 3px 0px;
      box-shadow: 0px 0px 12px -5px #777777;
    `,
    icon: css`
      color: ${props.themeColor};
      margin: 0px 14px 2px 0px;
    `,
  };

  return (
    <div
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <Card css={styles.column}>
        <Box css={styles.header}>
          <CircleIcon css={styles.icon} />
          <Typography gutterBottom variant='h6' component='div'>
            {props.headerText}
          </Typography>
        </Box>
        <Divider />
        <Stack spacing={2} css={styles.stack}>
          {demoData.map((task: TASK) => (
            <KanbanCard title={task.task_name} status={task.status} />
          ))}
        </Stack>
      </Card>
    </div>
  );
};

export default KanbanColumn;
