import React, { useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
  CRED,
  REG_INFO,
  JWT,
} from '../types';
import CopyRight from './CopyRight';
import useStyles from './styles';

enum MODE {
  Login = 0,
  Register = 1
}

const initRegInfo: REG_INFO = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const SignIn: React.FC = () => {
  const classes = useStyles();

  const [mode, setMode] = useState(MODE.Login);
  const [cred, setCred] = useState<REG_INFO>(initRegInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const toggleView = () => {
    if (mode === MODE.Login) {
      setMode(MODE.Register);
    }
    else if (mode === MODE.Register) {
      setMode(MODE.Login);
    }
  };

  const login = async (e: any) => {
    e.preventDefault();
    const res = await axios.post<JWT>(`${process.env.API_URL}/auth/jwt/create`,
      cred,
      {
        headers: {
          "Content-type": "application/json",
        },
      });
    return res.data;
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h2">
          Fluent Task
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            {mode === MODE.Register &&
              (<>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    size="small"
                  />
                </Grid></>)
            }
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                size="small"
                value={cred.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                value={cred.password}
                onChange={handleInputChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            </Grid>
          </Grid>
          <Button
            // type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            {mode === MODE.Login ? "ログイン" : "サインアップ"}
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item xs={12}>
              <Link href="#" variant="body2" onClick={toggleView}>
                {mode === MODE.Login ? "アカウント作成" : "ログイン画面に戻る"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <CopyRight />
    </Container>
  );
};

export default SignIn;