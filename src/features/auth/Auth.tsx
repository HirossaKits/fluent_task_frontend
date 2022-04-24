import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { AppDispatch } from '../../app/store';
import { SIGNIN_INFO, SIGNUP_INFO } from '../types';
import {
  selectLang,
  fetchAsyncSignin,
  fetchAsyncSignup,
  fetchAsyncGetLoginUser,
  // setIsAuthenticated,
} from './authSlice';
import loginPageAnimation from '../../img/loginPageAnimation.json';
import LanguageSelect from '../../components/LanguageSelect';
import DarkModeSwitch from '../../components/DarkModeSwitch';

enum MODE {
  Login = 0,
  Register = 1,
}

const initRegInfo: SIGNUP_INFO = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const Auth: React.FC = () => {
  const theme = useTheme();
  const styles = {
    root: css`
      min-height: 100vh;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    `,
    container: css`
      margin-top: ${theme.spacing(18)};
    `,
    title: css`
      font-family: 'Oleo Script', cursive;
    `,
    form: css`
      margin-top: ${theme.spacing(3)};
    `,
    submit: css`
      margin-top: ${theme.spacing(3)};
      padding: ${theme.spacing(1, 6)};
    `,
    lottie: css`
      margin-top: 20px;
      margin-right: 20px;
      width: 400px;
    `,
    topRight: css`
      position: absolute;
      margin: 2px;
      top: 10px;
      right: 10px;
    `,
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loginPageAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState(MODE.Login);
  const [regInfo, setRegInfo] = useState<SIGNUP_INFO>(initRegInfo);

  useEffect(() => {
    // 自動ログイン
    dispatch(fetchAsyncGetLoginUser);
  }, []);

  const lang = useSelector(selectLang);

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

  const signin = async (e: any) => {
    e.preventDefault();
    let cred: SIGNIN_INFO = regInfo;
    const res = await dispatch(fetchAsyncSignin(cred));
    if (fetchAsyncSignin.fulfilled.match(res)) {
      history.push('/');
      // dispatch(setIsAuthenticated(true));
    }
  };

  const signup = async (e: any) => {
    e.preventDefault();
    const res = await dispatch(fetchAsyncSignup(regInfo));
    if (fetchAsyncSignup.fulfilled.match(res)) {
      history.push('/');
      // dispatch(setIsAuthenticated(true));
    }
  };

  const handleDemoClick = async () => {
    const id = Math.random() * 9 + 1;
    const res = await dispatch(
      fetchAsyncSignin({
        email: `demo${id}@gmail.com`,
        password: `demo${id}`,
      })
    );
    if (fetchAsyncSignin.fulfilled.match(res)) {
      history.push('/');
      // dispatch(setIsAuthenticated(true));
    }
  };

  return (
    <>
      <div css={styles.root}>
        <Container css={styles.container} component="main" maxWidth="xs">
          <CssBaseline />
          <Typography css={styles.title} variant="h2">
            Fluent Task
          </Typography>
          <form css={styles.form}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {mode === MODE.Login && (
                <>
                  <Grid item xs={8}>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label={t('login.email')}
                      name="email"
                      autoComplete="email"
                      size="small"
                      value={regInfo.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label={t('login.password')}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      size="small"
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
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="lastName"
                      name="last_name"
                      label={t('login.firstName')}
                      autoComplete="lname"
                      size="small"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      id="firstName"
                      name="first_name"
                      label={t('login.lastName')}
                      autoComplete="fname"
                      size="small"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label={t('login.email')}
                      name="email"
                      autoComplete="email"
                      size="small"
                      value={regInfo.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label={t('login.password')}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      size="small"
                      value={regInfo.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  css={styles.submit}
                  onClick={mode === MODE.Login ? signin : signup}
                >
                  {mode === MODE.Login ? t('login.login') : t('login.signup')}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link variant="body2" onClick={toggleView}>
                  {mode === MODE.Login
                    ? t('login.createAccount')
                    : t('login.backToLogin')}
                </Link>
              </Grid>
              <Grid item xs={6}>
                <LanguageSelect width="100%" value={lang} />
              </Grid>
            </Grid>
          </form>
        </Container>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box css={styles.lottie}>
            <Lottie options={lottieOptions} />
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary" align="center">
              {/* {"Copyright © "} */}
              {'Copyright   '}
              <Link color="inherit" href="">
                Hirohisa Kitsuka
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Stack>
      </div>
      <Stack
        css={styles.topRight}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <DarkModeSwitch />
        <Card>
          <CardContent>
            <Typography align="left">
              {t('login.demoExplanation1')}
              <br />
              {t('login.demoExplanation2')}
              <br />
              {t('login.demoExplanation3') + '💡'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleDemoClick}>
              {t('login.demoLogin')}
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
};

export default Auth;
