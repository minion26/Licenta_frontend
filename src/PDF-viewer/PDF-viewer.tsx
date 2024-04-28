// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import styles from './PDF-viewer.module.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


// Your render function
function PdfViewer({documentURL} : {documentURL: string}) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin(
        // props?: DefaultLayoutPluginProps
    );
    return(
        <div >

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {/* Your document viewer */}
                <div className={styles.container} >
                    {/*<Viewer fileUrl="src/assets/Levy Rozman - How to Win at Chess_ The Ultimate Guide for Beginners and Beyond-Ten Speed Press (2023).pdf"*/}
                    {/*        defaultScale={SpecialZoomLevel.PageWidth}*/}
                    {/*        plugins={[defaultLayoutPluginInstance]}*/}
                    {/*/>*/}

                    <Viewer fileUrl={documentURL}
                            defaultScale={SpecialZoomLevel.PageWidth}
                            plugins={[defaultLayoutPluginInstance]}
                    />

                </div>
            </Worker>
        </div>
    )
}

export default PdfViewer;