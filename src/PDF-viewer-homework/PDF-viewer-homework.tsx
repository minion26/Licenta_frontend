// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


import styles from './PDF-viewer-homework.module.css';
import {useState} from "react";





// Your render function
function PdfViewerHomework({documentURL, fileType} : {documentURL: string, fileType:string}) {
    const [loading, setLoading] = useState(true);

    // Check if fileURL is defined
    if (!documentURL) {
        return <div>No file URL provided</div>;
    }

    if (documentURL.startsWith('blob:')) {
        const fileExtension = fileType;

        switch(fileExtension) {
            case 'pdf':
                return(
                    <div >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            {/* Your document viewer */}
                            <div className={styles.container} >
                                {loading}

                                <Viewer fileUrl={documentURL}
                                        defaultScale={SpecialZoomLevel.PageWidth}
                                        onDocumentLoad={() => setLoading(false)}
                                />

                            </div>
                        </Worker>
                    </div>
                );
            case 'png':
                return <img src={documentURL} alt="file content"/>;
            case 'jpg':
                    return <img src={documentURL} alt="file content"/>;
            case 'txt':
            case 'py':
                return (
                    <div className={styles.container}>
                        <iframe src={documentURL} title="file content" className={styles.responsiveIframe} />
                    </div>
                );
            case 'cpp':
                return (
                    <iframe src={documentURL} title="file content" style={{width: '100%', height: '100%'}}/>
                );
            case 'java':
                return (
                    <iframe src={documentURL} title="file content" style={{width: '100%', height: '100%'}}/>
                );
            case 'mp4':
                return (
                    <video width="320" height="240" controls>
                        <source src={documentURL} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                );
            default:
                return <div>File type not supported</div>;
        }
    }





}

export default PdfViewerHomework;