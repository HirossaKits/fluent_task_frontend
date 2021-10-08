import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { dummyUsers } from "../../DummyData";
import { USER_PROFILE } from "../types";

const Org = () => {
  return (
    <Box>
      {dummyUsers.map((user: USER_PROFILE) => (
        <Card sx={{ minWidth: 275 }}>
          {user.avatar_img ? (
            <Avatar src={user.avatar_img} sx={{ width: 56, height: 56 }} />
          ) : (
            <Avatar>OP</Avatar>
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {`${user.last_name} ${user.first_name}`}
            </Typography>
            <Typography variant="h5" component="div">
              {`${user.comment}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Org;
