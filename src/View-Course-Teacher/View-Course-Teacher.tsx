import styles from "./View-Course-Teacher.module.css";
import Header from "../Header-teacher/Header.tsx";
import UpperHeader from "../Upper-Header/Upper-Header.tsx";
import PDFViewer from "../PDF-viewer/PDF-viewer.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Materials} from "../types.ts";
import Swal from "sweetalert2";

function ViewCourseTeacher() {
    const { idLectures, materialType} = useParams();
    const [materials, setMaterials] = useState<Materials[]>([]);
    const [type, setType] = useState<string[]>([]);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/materials/list-by-type/${idLectures}/${materialType}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                });

                if(!response.ok) {
                    const err = await response.json();
                    console.error('Error:', err.message);
                    Swal.fire({
                        icon: 'error',
                        title: err.message || 'An error occurred',
                        showConfirmButton: false,
                        // timer: 1500
                    });

                    setHasError(true);
                }else{
                    const data = await response.json();
                    console.log("file url: ", data);
                    setMaterials(data);
                }



            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, []);

    useEffect(() => {
        console.log("materials: ", materials);
        for (let i = 0; i < materials.length; i++) {
            const fileName = materials[i].key;
            const fileType = fileName.split('.').pop();
            if (fileType) {
                setType((prev) => [...prev, fileType]);
            }
        }
        console.log("type: ", type);
    }, [materials]);

    const [fileUrls, setFileUrls] = useState<string[]>([]); // Change to an array of strings


    useEffect(() => {
        const fetchPromises = materials.map(material => {
            const encodedKey = encodeURIComponent(material.key);
            return fetch(`http://localhost:8081/api/v1/materials/list/${encodedKey}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(response => response.blob())
                .then(blob => URL.createObjectURL(blob));
        });

        Promise.all(fetchPromises)
            .then(urls => setFileUrls(urls))
            .catch(error => console.error('Error fetching materials:', error));
    }, [materials]);




  return (
    <div>
      <Header />
      <UpperHeader title="WEEK 1" subtitle="Course" />
        <div className={styles.container}>
            {
                !hasError && fileUrls.map((url, index) => {
                    return (
                    <div key={index} style={{marginBottom:'120px'}}>
                        <PDFViewer fileURL={url} fileType={type[index]} />
                    </div>
                    )
                })
            }

        </div>
    </div>
  );
}

export default ViewCourseTeacher;
