import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
// import {useTheme} from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import styles from "../See-Students-Admin/See-Students-Admin.module.css";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import {useState, useEffect} from "react";
import {StudentName} from "../types.ts";


function SeeStudentsAdmin() {
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [students, setStudents] = useState<StudentName[]>([]);

    useEffect( () => {
        fetch("http://localhost:8081/api/v1/students", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            }
            )
            .catch(error => console.error('An error occured!', error));
        }, []

    );

return (
    <div>
        <Header/>
        <UpperHeader title={"See accounts"} subtitle={"Students"} buttons={[{ key: "Search", label: "Search" }]}/>
        <div className={styles.cardContainer}>
            {
                students.map(
                    (student, index) => (
                        <CardElongated key={index} title={`${student.firstName} ${student.lastName}`} cardIndex={index+1} height={100}>
                                <Box sx={{ display: "flex" }}>
                                    <CardContent
                                        sx={{
                                            flex: "1 0 auto",
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                <Button
                                    variant="contained"
                                    endIcon={<DeleteIcon />}
                                    sx={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#F5F5F5",
                                        borderRadius: "20px",
                                        color: "rgba(0,0,0,0.75)",
                                        fontFamily: "Inter",
                                        fontSize: "12px",
                                        fontWeight: "semi-bold",
                                        alignSelf: "flex-end",
                                        marginLeft: "auto",
                                        marginRight: "20px",
                                        marginBottom: "10px",
                                        border: "none",
                                        textTransform: "none",
                                    }}
                                    // component={Link}
                                    // to="/homeworks-per-lecture"

                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "The account has been deleted.",
                                                    icon: "success"
                                                });
                                                // Here you can add the code to actually delete the student
                                            }
                                        });
                                    }}

                                >
                                </Button>
                                <Button
                                    variant="contained"
                                    endIcon={<CreateOutlinedIcon />}
                                    sx={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#F5F5F5",
                                        borderRadius: "20px",
                                        color: "rgba(0,0,0,0.75)",
                                        fontFamily: "Inter",
                                        fontSize: "12px",
                                        fontWeight: "semi-bold",
                                        alignSelf: "flex-end",
                                        marginLeft: "auto",
                                        marginRight: "20px",
                                        marginBottom: "10px",
                                        border: "none",
                                        textTransform: "none",
                                    }}
                                    component={Link}
                                    to={`/see-student-account-admin/${student.idUsers}`}

                                >
                                </Button>
                                    </CardContent>
                                </Box>
                        </CardElongated>
                    )
                )
            }
            {/*<CardElongated title={"Jitca Diana"} cardIndex={1} height={100}>*/}
            {/*    <Box sx={{ display: "flex" }}>*/}
            {/*        <CardContent*/}
            {/*            sx={{*/}
            {/*                flex: "1 0 auto",*/}
            {/*                display: "flex",*/}
            {/*                flexDirection: "row",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        endIcon={<DeleteIcon />}*/}
            {/*        sx={{*/}
            {/*            width: "50px",*/}
            {/*            height: "50px",*/}
            {/*            backgroundColor: "#F5F5F5",*/}
            {/*            borderRadius: "20px",*/}
            {/*            color: "rgba(0,0,0,0.75)",*/}
            {/*            fontFamily: "Inter",*/}
            {/*            fontSize: "12px",*/}
            {/*            fontWeight: "semi-bold",*/}
            {/*            alignSelf: "flex-end",*/}
            {/*            marginLeft: "auto",*/}
            {/*            marginRight: "20px",*/}
            {/*            marginBottom: "10px",*/}
            {/*            border: "none",*/}
            {/*            textTransform: "none",*/}
            {/*        }}*/}
            {/*        // component={Link}*/}
            {/*        // to="/homeworks-per-lecture"*/}

            {/*        onClick={() => {*/}
            {/*            Swal.fire({*/}
            {/*                title: "Are you sure?",*/}
            {/*                text: "You won't be able to revert this!",*/}
            {/*                icon: "warning",*/}
            {/*                showCancelButton: true,*/}
            {/*                confirmButtonColor: "#3085d6",*/}
            {/*                cancelButtonColor: "#d33",*/}
            {/*                confirmButtonText: "Yes, delete it!"*/}
            {/*            }).then((result) => {*/}
            {/*                if (result.isConfirmed) {*/}
            {/*                    Swal.fire({*/}
            {/*                        title: "Deleted!",*/}
            {/*                        text: "The account has been deleted.",*/}
            {/*                        icon: "success"*/}
            {/*                    });*/}
            {/*                    // Here you can add the code to actually delete the student*/}
            {/*                }*/}
            {/*            });*/}
            {/*        }}*/}

            {/*    >*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        endIcon={<CreateOutlinedIcon />}*/}
            {/*        sx={{*/}
            {/*            width: "50px",*/}
            {/*            height: "50px",*/}
            {/*            backgroundColor: "#F5F5F5",*/}
            {/*            borderRadius: "20px",*/}
            {/*            color: "rgba(0,0,0,0.75)",*/}
            {/*            fontFamily: "Inter",*/}
            {/*            fontSize: "12px",*/}
            {/*            fontWeight: "semi-bold",*/}
            {/*            alignSelf: "flex-end",*/}
            {/*            marginLeft: "auto",*/}
            {/*            marginRight: "20px",*/}
            {/*            marginBottom: "10px",*/}
            {/*            border: "none",*/}
            {/*            textTransform: "none",*/}
            {/*        }}*/}
            {/*        component={Link}*/}
            {/*        to="/see-student-account-admin"*/}
            {/*    >*/}
            {/*    </Button>*/}
            {/*        </CardContent>*/}
            {/*    </Box>*/}
            {/*</CardElongated>*/}
        </div>
            {/*<h2>Jitca Diana</h2>*/}
            {/*<p>Faculty Email: jtc.didi@uaic.ro</p>*/}
            {/*<p>Personal Email: jtc.didi@personal.com</p>*/}
            {/*<p>Matriculation Number: 123456</p>*/}
            {/*<p>Year of Study: 3</p>*/}
            {/*<p>Semester: 2</p>*/}
            {/*<p>Group of Study: A4</p>*/}
            {/*<p>Enrollment Date: 2023-09-01T00:00:00</p>*/}

    </div>
);
}

export default SeeStudentsAdmin;