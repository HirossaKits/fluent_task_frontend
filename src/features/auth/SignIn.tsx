import React,{useState} from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  CRED,
  JWT,
} from '../types';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  title: {
    fontFamily:'Oleo Script',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom:theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(6, 0, 1),
    padding:theme.spacing(1,6)
  },

}));



const SignIn:React.FC = () => {
  const classes = useStyles();

  const [cred,setCred] = useState<CRED>({
    email:'',
    password: '',
  })

  const login = async (e: any) => {
    e.preventDefault()
    const res = await axios.post<JWT>(`${process.env.API_URL}/auth/jwt/create`,
      cred,
      {
        headers: {
          "Content-type": "application/json",
        },
      });
    return res.data;
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {   
    setCred({...cred,[e.target.id]:e.target.value})
  }

  console.log('reload!')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h2">
          Fluent Task
        </Typography>
        <form className={classes.form}>
          <TextField
            className = {classes.input}
            variant="outlined"
            margin="normal"
            // required = {true}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
            value = {cred.email}
            onChange = {handleInputChange}
          />
          <TextField
            className = {classes.input}
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
            value = {cred.password}
            onChange = {handleInputChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            // type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {login}
          >
            ログイン
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item xs={12}>
              <Link href="#" variant="body2">
                {"アカウント作成"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        KITS CREATE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
      </Box>
    </Container>
  );
}

export default SignIn