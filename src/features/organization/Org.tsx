import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { dummyUsers } from "../../DummyData";
import { USER_PROFILE } from "../types";

const Org = () => {
  const theme = useTheme();
  const styles = {
    wrap: css`
      display: flex;
      flex-direction: column;
    `,
    card: css`
      width: 256px;
      height: 160px;
    `,

    avatar: css`
      width: 100px;
      height: 100px;
      margin: ${theme.spacing(2)};
    `,
  };
  return (
    <Box css={styles.wrap}>
      {dummyUsers.map((user: USER_PROFILE) => (
        <Card css={styles.card}>
          <Box sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              {user.avatar_img ? (
                <Avatar css={styles.avatar} src={user.avatar_img} />
              ) : (
                <Avatar>OP</Avatar>
              )}
            </CardContent>
            <Box sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5" component="div">
                {`${user.last_name} ${user.first_name}`}
              </Typography>
              <Typography variant="body2" component="div">
                {`${user.comment}`}
              </Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default Org;
