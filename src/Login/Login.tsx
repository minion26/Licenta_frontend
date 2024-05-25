import styles from "./Login.module.css";
import {ChangeEvent, FormEvent, useState} from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../Header-main-page/Header.tsx";
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword /*setShowPassword*/] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

    useEffect(() => {
        if (role === 1) {
            navigate("/main-page-admin");
        } else if (role === 2) {
            navigate("/main-page-teacher");
        } else if (role === 3) {
            navigate("/main-page-student");
        }
    }, [role, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle form submission logic here
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Remember Me:", rememberMe);

      // Create an object representing the login data
      const loginData = {
          facultyEmail: email,
          password: password,
      };

      // Send a POST request to the login endpoint
      fetch('http://localhost:8081/api/v1/auth/authenticate', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Login failed');
              }
              console.log(response)
              return response.json();
          })
          .then(data => {

              // Handle the response data here
              // For example, you might store the returned token in local storage
              // sessionStorage.setItem('token', data.token);
              console.log(data)

              // Make a second API call to get the user details
              return fetch(`http://localhost:8081/api/v1/users/email/${encodeURIComponent(email)}`, {
                  method: 'GET',
                  credentials: 'include',
                  headers: {
                      'Content-Type': 'application/json',
                      // 'Authorization': `Bearer ${data.token}`,
                      "Access-Control-Allow-Origin": "*",
                  },
              });

             //  // Redirect to the main page
             // navigate('/main-page-student');
          })
          .then(response => {
              if (!response.ok) {
                  console.error(`Server responded with status code ${response.status}`);
                  throw new Error('Failed to get user details');
              }
              return response.json();
          })
          .then(data => {

              console.log(data.roleId)
              setRole(data.roleId);
              console.log(role)




          })
          .catch(error => {
              // Handle the error here
              console.error('Error:', error);
          });
  };

  // const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword);
  // };

  return (
    <div>
      <Header showButton={false} />
      <div className={styles.loginContainer}>
        <Card
          sx={{
            borderRadius: "24px",
            overflow: "hidden",
            width: { xs: "90%", sm: "300px", md: "400px" },
            height: { xs: "auto", sm: "400px", md: "500px" },
            backgroundColor: "#FFFFFF",
            margin: { xs: "auto", sm: "initial" },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              height: "100%",
              fontSize: "24px",
            }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2
                className={styles.h2}
                style={{ fontFamily: "Inter", fontSize: "24px" }}
              >
                Sign in
              </h2>
              <TextField
                label="Email or phone number"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
                InputProps={{
                  style: { borderRadius: "24px" },
                }}
              />
              <TextField
                className={styles.myCustomMargin}
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
                InputProps={{
                  style: { borderRadius: "24px" },
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
              {/* /main-page-admin */}
              {/*<Link to="/main-page-student">*/}
                <Button variant="contained" type="submit">
                  Sign in
                </Button>
              {/*</Link>*/}

              <p
                className={styles.p}
                style={{ textAlign: "right", fontSize: "14px" }}
              >
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Need help?
                </a>
              </p>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "14px",
                }}
              >
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. &nbsp;
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
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
