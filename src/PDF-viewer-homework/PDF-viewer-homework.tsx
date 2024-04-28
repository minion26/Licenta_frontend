// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


import styles from './PDF-viewer-homework.module.css';
import {useState} from "react";





// Your render function
function PdfViewerHomework({documentURL} : {documentURL: string}) {
    const [loading, setLoading] = useState(true);
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
    )
}

export default PdfViewerHomework;