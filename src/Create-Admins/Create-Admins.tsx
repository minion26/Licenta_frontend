import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header-admin/Header-admin";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types.ts";
// import styles from "./Create-Admins.module.css";

function CreateAdmins() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState<User>({
    idUsers: "",
    firstName: "",
    lastName: "",
    facultyEmail: "",
    personalEmail: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Get the user from the server
    fetch("http://localhost:8081/api/v1/users/get-the-superuser", {
      method: "GET",
      credentials: "include", // This will include cookies in the request
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server responded with status code ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Failed to get user", error);
      });
  }, []);

  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    facultyEmail: "",
    personalEmail: "",
    roleId: 1,
  });

  const initialAdminState = {
    firstName: "",
    lastName: "",
    facultyEmail: "",
    personalEmail: "",
    roleId: 1,
  };

  const handleCancel = () => {
    setAdmin(initialAdminState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setAdmin({
      ...admin,
      [e.target.name]: value,
    });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in admin) {
      if (admin[key as keyof typeof admin] === "") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please fill all fields",
          showConfirmButton: false,
          timer: 1500,
        });
        return; // Prevent form submission
      }
    }

    console.log(admin);

    admin.roleId = 1;

    const response = await fetch("http://localhost:8081/api/v1/users/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    });

    if (response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The account has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        console.log(data);
      }

      navigate("/main-page-admin");
    } else {
      //iau mesajul de eroare de pe server
      const data = await response.json();

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: data || "The account has not been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <Header />
      <UpperHeader title={"Create accounts"} subtitle={"Admins"} />
      {user.idUsers && (
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
              value={admin.firstName}
              name={"firstName"}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              id="outlined-start-adornment-lastname"
              sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
              value={admin.lastName}
              name={"lastName"}
              onChange={handleChange}
            />

            <TextField
              sx={{ m: 1, marginBottom: "20px" }}
              fullWidth
              label="Faculty Email"
              id="fullWidth"
              value={admin.facultyEmail}
              name={"facultyEmail"}
              onChange={handleChange}
            />

            <TextField
              sx={{ m: 1, marginBottom: "20px" }}
              fullWidth
              label="Personal Email"
              id="fullWidth"
              value={admin.personalEmail}
              name={"personalEmail"}
              onChange={handleChange}
            />

            <TextField
              id="outlined-number"
              label="Role"
              type="number"
              sx={{ m: 1, width: "25ch", marginBottom: "20px" }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 1,
                max: 1,
              }}
              value={admin.roleId}
              name={"roleId"}
              onChange={handleChange}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
                m: 1,
              }}
            >
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" type={"submit"}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </form>
  );
}

export default CreateAdmins;
