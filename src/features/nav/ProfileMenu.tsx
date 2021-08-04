import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CommonSwitch from "../../common/CommonSwitch";
import { selectProfileMenuOpen } from "./navSlice";
import { setProfileMenuOpen } from "./navSlice";
import { profile } from "console";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 140,
    padding: theme.spacing(1),
  },
  wrapper: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  avatorLarge: {
    background: theme.palette.grey[600],
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatorSmall: {
    background: theme.palette.grey[600],
    border: `4px solid ${theme.palette.background.paper}`,
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft: 10,
    marginTop: 10,
    hover: "pointer",
  },
}));

const ProfileMenu: React.FC<Props> = (props) => {
  const classes = useStyles();
  const profileMenuOpen = useSelector(selectProfileMenuOpen);
  const dispatch = useDispatch();

  const handleProfileColse = () => {
    dispatch(setProfileMenuOpen(false));
  };

  return (
    <Popover
      open={profileMenuOpen}
      anchorEl={props.anchorEl.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={handleProfileColse}
      keepMounted
    >
      <Paper className={classes.paper}>
        <Badge
          overlap='circular'
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <Avatar className={classes.avatorSmall}>
              <AddAPhotoIcon fontSize='small' />
            </Avatar>
          }
        >
          <Avatar className={classes.avatorLarge} />
        </Badge>
        <input
          type='file'
          id='imageInput'
          hidden={true}
          // onChange={(event) => {
          //   setCover(event.target.files[0]);
          //   event.target.value = "";
          // }}
        />
        <div className={classes.wrapper}>
          <CommonSwitch label={"ダークモード"} labelWidth={10} />
          <CommonSwitch label={"test"} labelWidth={10} />
          <CommonSwitch label={"test"} labelWidth={10} />
        </div>
      </Paper>
    </Popover>
  );
};

export default ProfileMenu;
