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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "./Auth.module.css";
import { CRED, REG_INFO } from "../types";
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
  root: {
    // marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // background: "green",
  },
  wrap: {
    // background: "green",
  },
  title: {
    fontFamily: "Oleo Script",
  },
  form: {
    // width: "100%",
    // marginTop: theme.spacing(4),
    // background: "blue",
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(6, 0, 1),
    padding: theme.spacing(1, 6),
  },
}));

const SignIn: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    const res = await dispatch(fetchAsyncLogin(cred));
    console.log(res);
    window.location.href = "/app";
  };

  const register = async (e: any) => {
    e.preventDefault();
    const res = await dispatch(fetchAsyncRegister(regInfo));
    console.log(res);
  };

  return (
    <div className={styles.Auth}>
      <header className={styles.Auth_header}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          {/* <div className={classes.root}> */}

          <form className={classes.form}>
            <Grid
              className={classes.wrap}
              container
              direction='column'
              alignItems='center'
              spacing={2}
              xs={12}
            >
              <Typography className={classes.title} component='h1' variant='h2'>
                Fluent Task
              </Typography>
              {mode === MODE.Register && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.input}
                      autoComplete='fname'
                      name='firstName'
                      variant='outlined'
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      autoFocus
                      size='small'
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.input}
                      variant='outlined'
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      autoComplete='lname'
                      size='small'
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  variant='outlined'
                  margin='normal'
                  // required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  size='small'
                  value={regInfo.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  className={classes.input}
                  variant='outlined'
                  margin='normal'
                  // required
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
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              </Grid>
              <Grid item xs={10}>
                <Button
                  // type="submit"
                  // fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={mode === MODE.Login ? login : register}
                >
                  {mode === MODE.Login ? "ログイン" : "サインアップ"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link href='#' variant='body2' onClick={toggleView}>
                  {mode === MODE.Login
                    ? "アカウント作成"
                    : "ログイン画面に戻る"}
                </Link>
              </Grid>
            </Grid>

            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          </form>
          {/* </div> */}
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
      </header>
    </div>
  );
};

export default SignIn;
