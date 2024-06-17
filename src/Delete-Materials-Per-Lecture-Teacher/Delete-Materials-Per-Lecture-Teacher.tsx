import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import Header from "../Header-teacher/Header.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {MaterialsInfoDTO} from "../types.ts";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import styles from "./Delete-Materials-Per-Lecture-Teacher.module.css"

function DeleteMaterialsPerLectureTeacher(){
    const {idLectures} = useParams();
    const [materials, setMaterials] = useState<MaterialsInfoDTO[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/v1/materials/get/idLectures=${idLectures}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message);
                    });
                }
                 return response.json()
            })
            .then((data) => {
                console.log(data);
                setMaterials(data);
            })
            .catch(error => {
                console.error('An error occured!', error);
                Swal.fire({
                    icon: 'error',
                    title: error.message || 'An error occurred',
                    showConfirmButton: false,
                    // timer: 1500
                });
            });
    }, [idLectures]);

    return(
        <div>
            <UpperHeader title={"Delete"} subtitle={"Materials"}/>
            <Header/>
            <div className={styles.cardContainer}>
                {materials.map((material, index) => (
                    <CardElongated height={145} title={material.name} cardIndex={index} key={index}>
                        <Box sx={{ display: "flex" }}>
                            <Box
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
                                        marginBottom: "25px",
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
                                                fetch(`http://localhost:8081/api/v1/materials/delete/${material.idMaterial}`, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        "Access-Control-Allow-Origin": "*",
                                                    },
                                                })
                                                    .then((response) => {
                                                        if (!response.ok) {
                                                            console.error(`Server responded with status code ${response.status}`);
                                                            throw new Error('Failed to delete the account');
                                                        }

                                                        // daca se returneaza un json, atunci returnez
                                                        if(response.headers.get('content-type')?.includes('application/json')) {
                                                            return response.json();
                                                        }else{
                                                            console.log('The server did not respond with JSON data');
                                                        }

                                                    })
                                                    .then((data) => {
                                                        console.log(data);
                                                        Swal.fire({
                                                            title: "Deleted!",
                                                            text: "The file has been deleted.",
                                                            icon: "success"
                                                        });

                                                        window.location.reload();
                                                    })
                                                    .catch((error) => {
                                                        console.error('Error:', error);
                                                    });
                                            }
                                        });
                                    }}

                                >
                                </Button>
                            </Box>
                        </Box>
                    </CardElongated>
                ))}
            </div>
        </div>
    );
}

export default DeleteMaterialsPerLectureTeacher;