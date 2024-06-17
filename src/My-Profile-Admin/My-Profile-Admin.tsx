// import styles from "./My-Profile-Admin.module.css";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderAdmin from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";
import {User, UserChangePasswordDTO} from "../types.ts";
import {useNavigate} from "react-router-dom";

function MyProfileAdmin(){
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    // const [username, setUsername] = useState('');
    const [user, setUser] = useState<User>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        password: '',
        role: '',

    });

    const [userBackup, setUserBackup] = useState<User>({
        idUsers: '',
        firstName: '',
        lastName: '',
        facultyEmail: '',
        personalEmail: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/v1/username', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                const data = await response.json();
                console.log("email: " + data.username);
                // setUsername(data.username);

                const userResponse = await fetch(`http://localhost:8081/api/v1/users/email/${data.username}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });
                const userData = await userResponse.json();
                console.log(userData);
                setUser(userData);
                setUserBackup(userData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    function handleInputChange(property: keyof User, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newValue = event.target.value;
        setUser((prevUser) => ({
            idUsers: prevUser?.idUsers || '',
            firstName: prevUser?.firstName || '',
            lastName: prevUser?.lastName || '',
            facultyEmail: prevUser?.facultyEmail || '',
            personalEmail: prevUser?.personalEmail || '',
            password: prevUser?.password || '',
            role: prevUser?.role || '',
            [property]: newValue,
        }));
    }

    function handleCancel(){
        setUser(userBackup);
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
    }

    const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);
        fetch(`http://localhost:8081/api/v1/users/update/${user.idUsers}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(user),
        })
            .then(async (response) => {
                const text = await response.text();
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);

                }
                return text ? JSON.parse(text) : {};
            })
            .then((data) => {
                console.log(data);
                Swal.fire({
                    title: "Profile updated!",
                    text: "Your profile has been updated.",
                    icon: "success",
                });

                navigate("/main-page-admin")

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const [userChangePassword, setUserChangePassword] = useState<UserChangePasswordDTO>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');

    const validatePassword = (password : string) => {
        const hasEightCharacters = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

        return hasEightCharacters && hasNumber && hasUpperCase && hasSpecialCharacter;
    }

    const hadlePost = async () => {
        if(newPass !== confirmPass){
            Swal.fire({
                title: "Error!",
                text: "Passwords do not match.",
                icon: "error",
            });
            return;
        }

        if(!validatePassword(newPass)){
            Swal.fire({
                title: "Error!",
                text: "Password must contain at least 8 characters, a number, an uppercase letter and a special character.",
                icon: "error",
            });
            return;
        }

        setUserChangePassword({
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass,
        });


        const response = await fetch('http://localhost:8081/api/v1/users/changePassword', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(userChangePassword),
        });

        if(response.ok){
            Swal.fire({
                title: "Success!",
                text: "Password changed successfully.",
                icon: "success",
            });
        } else {
            const errorData = await response.text();
            Swal.fire({
                title: "Error!",
                text: errorData,
                icon: "error",
            });
        }

    }

    return(
        <form onSubmit={handleSubmit}>
            <HeaderAdmin/>
            <UpperHeader
                title="My Profile"
                subtitle="date"
                buttons={[{ key: "Logout", label: "Logout" }]}
            />

            <Box
                sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginLeft: isSmallScreen ? "0px" : "125px",
                    marginTop: "20px",
                    width: "75%",
                }}
            >
                <Box>
                    <TextField
                        label="First Name"
                        id="outlined-start-adornment-firstname"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={user.firstName}
                        name={"firstName"}
                        onChange={(e) => handleInputChange("firstName", e)}
                    />
                    <TextField
                        label="Last Name"
                        id="outlined-start-adornment-lastname"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        value={user.lastName}
                        name={"lastName"}
                        onChange={(e) => handleInputChange("lastName", e)}
                    />

                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        fullWidth
                        label="Faculty Email"
                        id="fullWidth-faculty-email"
                        value={user.facultyEmail}
                        name={"facultyEmail"}
                        onChange={(e) => handleInputChange("facultyEmail", e)}
                    />

                    <TextField
                        sx={{ m: 1, marginBottom: "20px" }}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label="Personal Email"
                        id="fullWidth-personal-email"
                        value={user.personalEmail}
                        name={"personalEmail"}
                        onChange={(e) => handleInputChange("personalEmail", e)}
                    />

                    <TextField
                        id="outlined-old-password-input"
                        label="Old Password"
                        type="password"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        autoComplete="current-password"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                    />
                    <TextField
                        id="outlined-new-password-input"
                        label="New Password"
                        type="password"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        autoComplete="current-password"
                        value={newPass}
                        onChange={(e) => {
                            setNewPass(e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />

                    <TextField
                        id="outlined-new-password-input"
                        label="Confirm New Password"
                        type="password"
                        sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
                        autoComplete="current-password"
                        value={confirmPass}
                        onChange={(e) => {
                            setConfirmPass(e.target.value);
                        }}
                    />

                    <Button
                        sx={{ m: 1, marginTop: isSmallScreen ? "0px" : "20px" }}
                        variant="contained"
                        onClick={hadlePost}
                    >
                        Confirm Password
                    </Button>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "20px",
                            m: 1,
                        }}
                    >
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                        <Button
                            variant="contained"
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
}

export default MyProfileAdmin;