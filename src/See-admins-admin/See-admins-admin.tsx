import Header from "../Header-admin/Header-admin.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import styles from "../See-Students-Admin/See-Students-Admin.module.css";
import CardElongated from "../Card-Elongated/Card-Elongated.tsx";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
// import {Link} from "react-router-dom";
import {AdminName} from "../types.ts";
import {useEffect, useState} from "react";


function SeeAdminsAdmin() {
    const [searchInput, setSearchInput] = useState('');

    const [admins , setAdmins] = useState<AdminName[]>([]);

    useEffect( () => {
        fetch("http://localhost:8081/api/v1/users/admins", {
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
                setAdmins(data);
            }
            )
            .catch(error => console.error('An error occured!', error));
        }, []
    );

    const handleSearch = (searchValue: string) => {
        setSearchInput(searchValue);
    };

    const filteredAdmins = searchInput
        ? admins.filter(admin =>
            admin.firstName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
            admin.lastName.toLowerCase().startsWith(searchInput.toLowerCase())
        )
        : admins;

  return (
      <div>
          <Header/>
          <UpperHeader title={"See accounts"} subtitle={"Students"} buttons={[{ key: "Search", label: "Search" }]} onSearch={handleSearch}/>
          <div className={styles.cardContainer}>
              {
                  filteredAdmins.map(
                      (admin, index) => (
                          <CardElongated key={index} title={`${admin.firstName} ${admin.lastName}`} cardIndex={index+1} height={100}>
                              <Box sx={{ display: "flex" }}>
                                  <CardContent
                                      sx={{
                                          flex: "1 0 auto",
                                          display: "flex",
                                          flexDirection: "row",
                                      }}
                                  >
                                      {/*<Button*/}
                                      {/*    variant="contained"*/}
                                      {/*    endIcon={<DeleteIcon />}*/}
                                      {/*    sx={{*/}
                                      {/*        width: "50px",*/}
                                      {/*        height: "50px",*/}
                                      {/*        backgroundColor: "#F5F5F5",*/}
                                      {/*        borderRadius: "20px",*/}
                                      {/*        color: "rgba(0,0,0,0.75)",*/}
                                      {/*        fontFamily: "Inter",*/}
                                      {/*        fontSize: "12px",*/}
                                      {/*        fontWeight: "semi-bold",*/}
                                      {/*        alignSelf: "flex-end",*/}
                                      {/*        marginLeft: "auto",*/}
                                      {/*        marginRight: "20px",*/}
                                      {/*        marginBottom: "10px",*/}
                                      {/*        border: "none",*/}
                                      {/*        textTransform: "none",*/}
                                      {/*    }}*/}
                                      {/*    // component={Link}*/}
                                      {/*    // to="/homeworks-per-lecture"*/}

                                      {/*    onClick={() => {*/}
                                      {/*        Swal.fire({*/}
                                      {/*            title: "Are you sure?",*/}
                                      {/*            text: "You won't be able to revert this!",*/}
                                      {/*            icon: "warning",*/}
                                      {/*            showCancelButton: true,*/}
                                      {/*            confirmButtonColor: "#3085d6",*/}
                                      {/*            cancelButtonColor: "#d33",*/}
                                      {/*            confirmButtonText: "Yes, delete it!"*/}
                                      {/*        }).then((result) => {*/}
                                      {/*            if (result.isConfirmed) {*/}
                                      {/*                //MAKE DELETE REQUEST*/}
                                      {/*                fetch(`http://localhost:8081/api/v1/users/delete/${admin.idUsers}`, {*/}
                                      {/*                    method: 'DELETE',*/}
                                      {/*                    credentials: 'include',*/}
                                      {/*                    headers: {*/}
                                      {/*                        'Content-Type': 'application/json',*/}
                                      {/*                        // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,*/}
                                      {/*                        "Access-Control-Allow-Origin": "*",*/}
                                      {/*                    },*/}
                                      {/*                })*/}
                                      {/*                    .then(response => {*/}
                                      {/*                        if (!response.ok) {*/}
                                      {/*                            console.error(`Server responded with status code ${response.status}`);*/}
                                      {/*                            throw new Error('Failed to delete student');*/}
                                      {/*                        }*/}
                                      {/*                        return response.json();*/}
                                      {/*                    })*/}
                                      {/*                    .then(data => {*/}
                                      {/*                        console.log(data);*/}
                                      {/*                        Swal.fire({*/}
                                      {/*                            title: "Deleted!",*/}
                                      {/*                            text: "The account has been deleted.",*/}
                                      {/*                            icon: "success"*/}
                                      {/*                        });*/}

                                      {/*                        navigate("/main-page-admin");*/}
                                      {/*                    })*/}
                                      {/*                    .catch(error => {*/}
                                      {/*                        console.error('An error occured!', error);*/}

                                      {/*                    });*/}
                                      {/*            }*/}
                                      {/*        });*/}

                                      {/*    }}*/}
                                      {/*>*/}
                                      {/*</Button>*/}

                                      {/*<Button*/}
                                      {/*    variant="contained"*/}
                                      {/*    endIcon={<CreateOutlinedIcon />}*/}
                                      {/*    sx={{*/}
                                      {/*        width: "50px",*/}
                                      {/*        height: "50px",*/}
                                      {/*        backgroundColor: "#F5F5F5",*/}
                                      {/*        borderRadius: "20px",*/}
                                      {/*        color: "rgba(0,0,0,0.75)",*/}
                                      {/*        fontFamily: "Inter",*/}
                                      {/*        fontSize: "12px",*/}
                                      {/*        fontWeight: "semi-bold",*/}
                                      {/*        alignSelf: "flex-end",*/}
                                      {/*        marginLeft: "auto",*/}
                                      {/*        marginRight: "20px",*/}
                                      {/*        marginBottom: "10px",*/}
                                      {/*        border: "none",*/}
                                      {/*        textTransform: "none",*/}
                                      {/*    }}*/}
                                      {/*    component={Link}*/}
                                      {/*    to={`/see-admin-account-admin/${admin.idUsers}`}*/}

                                      {/*>*/}
                                      {/*</Button>*/}
                                  </CardContent>
                              </Box>
                          </CardElongated>
                      )
                  )
              }

          </div>


      </div>
  );
}

export default SeeAdminsAdmin;