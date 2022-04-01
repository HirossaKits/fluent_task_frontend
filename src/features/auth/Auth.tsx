import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { AppDispatch } from '../../app/store';
import { SIGNIN_INFO, SIGNUP_INFO } from '../types';
import {
  selectLang,
  setLang,
  fetchAsyncSignin,
  fetchAsyncSignup,
} from './authSlice';
import loginPageAnimation from '../../img/loginPageAnimation.json';
import CommonLanguageSelect from '../../components/CommonLanguageSelect';

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
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loginPageAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };

  const dispatch: AppDispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState(MODE.Login);
  const [regInfo, setRegInfo] = useState<SIGNUP_INFO>(initRegInfo);

  useEffect(() => {
    let lang = localStorage.getItem('lang');
    if (!lang) lang = 'ja';
    i18n.changeLanguage(lang);
    dispatch(setLang(lang));
    localStorage.setItem('lang', lang);

    // if (lang) {
    //   switch (navigator.language) {
    //     case 'ja':
    //       i18n.changeLanguage(lang);
    //       // dispatch(setLang('ja'));
    //       localStorage.setItem('lang', 'ja');
    //       break;
    //     default:
    //       i18n.changeLanguage(lang);
    //       // dispatch(setLang('en'));
    //       localStorage.setItem('lang', 'en');
    //   }
    // } else {
    //   i18n.changeLanguage('ja');
    //   // dispatch(setLang('ja'));
    //   localStorage.setItem('lang', 'ja');
    // }
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
    await dispatch(fetchAsyncSignin(cred));
  };

  const signup = async (e: any) => {
    e.preventDefault();
    await dispatch(fetchAsyncSignup(regInfo));
  };

  return (
    <div css={styles.root}>
      <Container css={styles.container} component='main' maxWidth='xs'>
        <CssBaseline />
        <Typography css={styles.title} variant='h2'>
          Fluent Task
        </Typography>
        <form css={styles.form}>
          <Grid
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
                    label={t('login.email')}
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
                    label={t('login.password')}
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
                    autoFocus
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='lastName'
                    name='last_name'
                    label={t('login.firstName')}
                    autoComplete='lname'
                    size='small'
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    id='firstName'
                    name='first_name'
                    label={t('login.lastName')}
                    autoComplete='fname'
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
                    label={t('login.email')}
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
                    label={t('login.password')}
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
                css={styles.submit}
                onClick={mode === MODE.Login ? signin : signup}
              >
                {mode === MODE.Login ? t('login.login') : t('login.signup')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link variant='body2' onClick={toggleView}>
                {mode === MODE.Login
                  ? t('login.createAccount')
                  : t('login.backToLogin')}
              </Link>
            </Grid>
            <Grid item xs={6}>
              <CommonLanguageSelect width='100%' value={lang} />
            </Grid>
          </Grid>
        </form>
      </Container>
      <Container component='main' maxWidth='sm'>
        <Lottie options={lottieOptions} />
        <Box>
          <Typography variant='body2' color='textSecondary' align='center'>
            {/* {"Copyright © "} */}
            {'Copyright   '}
            <Link color='inherit' href=''>
              Hirohisa Kitsuka
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Auth;
