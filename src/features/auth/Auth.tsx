import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "./Auth.module.css";
import { CRED, REG_INFO } from "../types";
import { AppDispatch } from "../../app/store";
import { fetchAsyncLogin, fetchAsyncRegister } from "./authSlice";

enum MODE {
  Login = 0,
  Register = 1,
}

const initRegInfo: REG_INFO = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Oleo Script",
  },
  wrap: {
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 6),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [mode, setMode] = useState(MODE.Login);
  const [regInfo, setRegInfo] = useState<REG_INFO>(initRegInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
  };

  const toggleView = () => {
    if (mode === MODE.Login) {
      setMode(MODE.Register);
    } else if (mode === MODE.Register) {
      setMode(MODE.Login);
    }
  };

  const login = async (e: any) => {
    e.preventDefault();
    let cred: CRED = regInfo;
    await dispatch(fetchAsyncLogin(cred));
  };

  const register = async (e: any) => {
    e.preventDefault();
    const res = await dispatch(fetchAsyncRegister(regInfo));
    if (fetchAsyncRegister.fulfilled.match(res)) {
      let cred: CRED = regInfo;
      await dispatch(fetchAsyncLogin(cred));
    }
  };

  return (
    <div className={styles.Auth}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Typography className={classes.title} component='h1' variant='h2'>
          Fluent Task
        </Typography>
        <form>
          <Grid
            className={classes.wrap}
            container
            justifyContent='center'
            alignItems='center'
            spacing={2}
          >
            {mode === MODE.Login && (
              <>
                <Grid item xs={8}>
                  <TextField
                    autoFocus
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    size='small'
                    value={regInfo.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    size='small'
                    value={regInfo.password}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}

            {mode === MODE.Register && (
              <>
                <Grid item xs={4}>
                  <TextField
                    autoComplete='fname'
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    id='firstName'
                    name='first_name'
                    label='First Name'
                    autoFocus
                    size='small'
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='lastName'
                    name='last_name'
                    label='Last Name'
                    autoComplete='lname'
                    size='small'
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    size='small'
                    value={regInfo.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    size='small'
                    value={regInfo.password}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={mode === MODE.Login ? login : register}
              >
                {mode === MODE.Login ? "ログイン" : "サインアップ"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link variant='body2' onClick={toggleView}>
                {mode === MODE.Login ? "アカウント作成" : "ログイン画面に戻る"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={8}>
          <Typography variant='body2' color='textSecondary' align='center'>
            {"Copyright © "}
            <Link color='inherit' href=''>
              KITS CREATE
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Auth;
