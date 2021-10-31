import React, { useState, useRef } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  title: string;
  status: string;
};

const KanbanCard: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const [drag, setDrag] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    container: css`
      opacity: 1;
    `,
    card: css`
      draggable: true;
      position: relative;
      display: flex;
      justify-content: space-between;
      min-height: 50px;
      cursor: move;
    `,
    title: css`
      display: flex;
      flex-grow: 1;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      margin-left: 15px;
    `,
    status: css`
      min-width: 45px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin-left: 10px;
    `,
    dot: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
  };

  const handleDragStart = (e: any) => {
    e.target.classList.add("dragging");
    e.dataTransfer.effectAllowed = "copyMove";
    const { id } = e.target;
    e.dataTransfer.setData("application/json", JSON.stringify({ id }));
    console.log("------------Start------------");
  };

  const handleDragEnd = (e: any) => e.target.classList.remove("dragging");

  const handleDragOver = (e: any) => {
    // 要素が重なった際のブラウザ既定の処理を変更
    e.preventDefault();

    // 子要素へのドラッグを制限
    if ([...e.target.classList].includes("item")) {
      // ドラッグ不可のドロップ効果を設定
      e.dataTransfer.dropEffect = "none";
      return;
    }
  };

  const handleDrop = (e: any) => {
    // 要素がドロップされた際のブラウザ既定の処理を変更
    e.preventDefault();
    e.target.classList.remove("over");

    // ブラウザ外からのファイルドロップを制限
    if (e.dataTransfer.files.length > 0) {
      return;
    }

    // 転送データの取得
    const { id } = JSON.parse(e.dataTransfer.getData("application/json"));

    // if (event.ctrlKey) {
    //   // 要素の複製
    //   const oldItem = document.getElementById(id);
    //   const newItem = oldItem!.cloneNode(true);
    //   const newId = `item${[...document.querySelectorAll(".item")].length + 1}`;
    //   newItem!.id = newId;
    //   newItem!.classList.remove("dragging");

    //   // cloneNode() で引き継げない要素
    //   newItem.addEventListener("dragstart", handleDragStart, false);
    //   newItem.addEventListener("dragend", handleDragEnd, false);

    //   // ドロップ先に要素を追加する
    //   e.target.appendChild(newItem);
    // } else {
    //   // 要素の移動
    //   // ドロップ先に要素を追加する
    //   e.target.appendChild(document.getElementById(id));
    // }
  };

  return (
    <div
      draggable='true'
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <Card css={styles.card}>
        <Box
          css={styles.title}
          component='div'
          sx={{
            textOverflow: "ellipsis",
            my: 2,
            overflow: "hidden",
          }}
        >
          <Typography variant='body1' component='div' noWrap>
            {props.title}
          </Typography>
        </Box>
        <Box css={styles.status}>
          <Typography variant='body1' component='div'>
            {props.status}
          </Typography>
        </Box>
        <Box css={styles.dot}>
          <IconButton onClick={handleClick}>
            <MoreVertIcon fontSize='small' />
          </IconButton>
        </Box>
      </Card>
    </div>
    // <Popover
    //   open={Boolean(anchorEl)}
    //   anchorEl={anchorEl}
    //   onClose={handleClose}
    //   anchorOrigin={{
    //     vertical: "bottom",
    //     horizontal: "left",
    //   }}
    // >
    //   <MenuItem>
    //     <ListItemIcon>
    //       <EditIcon fontSize='small' />
    //     </ListItemIcon>
    //     <ListItemText>タスクをを編集</ListItemText>
    //     <ListItemText>タスクを削除</ListItemText>
    //   </MenuItem>
    // </Popover>
  );
};

export default KanbanCard;
