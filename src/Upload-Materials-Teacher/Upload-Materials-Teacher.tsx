import React, { useState } from "react";
import styles from "./Upload-Materials-Teacher.module.css";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

function UploadMaterialsTeachers ()  {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [files, setFiles] = useState<FileList | null>(null);
    const [status, setStatus] = useState<
        "initial" | "uploading" | "success" | "fail"
    >("initial");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setStatus("initial");
            setFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (files) {
            setStatus("uploading");

            const formData = new FormData();

            [...files].forEach((file) => {
                formData.append("files", file);
            });

            try {
                const result = await fetch("https://httpbin.org/post", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
                setStatus("success");
            } catch (error) {
                console.error(error);
                setStatus("fail");
            }
        }
    };

    return (
        <>
            <div className={styles["input-group"]}>

                <label htmlFor="file" className={styles["sr-only"]}>
                    Choose files
                </label>
                <input id="file" type="file" multiple onChange={handleFileChange} />
            </div>
            <div className={styles.container}>
            {files &&
                [...files].map((file, index) => (
                    <Card
                        key={index}
                        sx={{ display: 'flex',
                        width: isSmallScreen ? '100%' : '250px',
                        height: isSmallScreen ? '50%' : '200px',
                        backgroundColor: "#FAFAF5",
                        borderRadius: '24px',
                        alignSelf: 'center',

                    }}>
                    <Box>
                        <CardContent sx={{ flex: '1 0 auto',
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <section key={file.name}>
                                File number {index + 1} details:
                                <ul>
                                    <li>Name: {file.name}</li>
                                    <li>Type: {file.type}</li>
                                    <li>Size: {file.size} bytes</li>
                                </ul>
                            </section>

                        </CardContent>

                     </Box>

                    </Card>
                ))}

                <div>
                {files && (
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpload} className={styles["submit"]}>
                    Upload {files.length > 1 ? "files" : "a file"}
                    </Button>
                )}
                    <Result status={status} />
                </div>
            </div>


        </>
    );
}

const Result = ({ status }: { status: string }) => {
    if (status === "success") {
        return <p>✅ Uploaded successfully!</p>;
    } else if (status === "fail") {
        return <p>❌ Upload failed!</p>;
    } else if (status === "uploading") {
        return <p>⏳ Uploading started...</p>;
    } else {
        return null;
    }
};

export default UploadMaterialsTeachers;