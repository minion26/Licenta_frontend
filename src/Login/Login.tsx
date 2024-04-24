import styles from './Login.module.css';
import  { ChangeEvent, FormEvent , useState} from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Header from "../Header-main-page/Header.tsx";
import {Link} from "react-router-dom";
// import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, /*setShowPassword*/] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <div>
        <Header showButton={false} />
            <div className={styles.loginContainer}>
                <Card  sx={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    width: { xs: '90%', sm: '300px', md: '400px' },
                    height: { xs: 'auto', sm: '400px', md: '500px' },
                    backgroundColor: '#FFFFFF',
                    margin: { xs: 'auto', sm: 'initial' },

                }}>
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '24px',
                        height: '100%',
                        fontSize: '24px',
                    }}>
                        <form className={styles.form} onSubmit={handleSubmit}>

                            <h2 className={styles.h2} style={{fontFamily: 'Inter',
                                    fontSize: '24px',
                            }}>Sign in</h2>
                            <TextField
                                label="Email or phone number"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    style: {borderRadius: "24px"}

                                }}
                            />
                            <TextField
                                className={styles.myCustomMargin}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    style: {borderRadius: "24px"},
                                    // endAdornment: (
                                    //     <Button onClick={togglePasswordVisibility}>
                                    //         {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    //     </Button>
                                    // ),
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                }
                                label="Remember me"
                            />
                            {/*/main-page-student*/}
                            {/*/main-page-teacher*/}
                            <Link to="/main-page-teacher">
                                <Button variant="contained" type="submit">
                                    Sign in
                                </Button>
                            </Link>

                            <p className={styles.p} style={{textAlign: 'right', fontSize: '14px',}}><a
                                href="https://www.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{textDecoration: 'none', color: 'inherit'}}
                            >
                                Need help?
                            </a></p>
                            <p style={{
                                fontWeight: 'normal',
                                fontSize: '14px',

                            }}>
                                This page is protected by Google reCAPTCHA to ensure you're not a bot.  &nbsp;
                                <a
                                    href="https://www.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    Learn more.
                                </a>
                            </p>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}

export default LoginForm;

