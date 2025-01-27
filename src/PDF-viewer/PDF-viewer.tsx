// // Import the main component
// import { Viewer } from '@react-pdf-viewer/core';
// import { Worker } from '@react-pdf-viewer/core';
// import { SpecialZoomLevel } from '@react-pdf-viewer/core';
//
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import styles from './PDF-viewer.module.css';
//
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
//
// // Import styles
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Your render function
// function PdfViewer({documentURL} : {documentURL: string}) {
//     const defaultLayoutPluginInstance = defaultLayoutPlugin(
//         // props?: DefaultLayoutPluginProps
//     );
//     return(
//         <div >
//
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//                 {/* Your document viewer */}
//                 <div className={styles.container} >
//                     {/*<Viewer fileUrl="src/assets/Levy Rozman - How to Win at Chess_ The Ultimate Guide for Beginners and Beyond-Ten Speed Press (2023).pdf"*/}
//                     {/*        defaultScale={SpecialZoomLevel.PageWidth}*/}
//                     {/*        plugins={[defaultLayoutPluginInstance]}*/}
//                     {/*/>*/}
//
//                     <Viewer fileUrl={documentURL}
//                             defaultScale={SpecialZoomLevel.PageWidth}
//                             plugins={[defaultLayoutPluginInstance]}
//                     />
//
//                 </div>
//             </Worker>
//         </div>
//     )
// }
//
// export default PdfViewer;

import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import type {
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import styles from "./PDF-viewer.module.css";
import Button from "@mui/material/Button";

function PdfViewer({
  fileURL,
  fileType,
}: {
  fileURL: string;
  fileType: string;
}) {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    // Download: () => <></>,
    // DownloadMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
  });

  // const [docContent, setDocContent] = useState<string | null>(null);

  // useEffect(() => {
  //     if (fileType === 'docx' || fileType === 'doc'){
  //         console.log("HERE");
  //         fetch(fileURL)
  //             .then(response => response.arrayBuffer())
  //             .then(arrayBuffer => {
  //                 mammoth.convertToHtml({arrayBuffer: arrayBuffer})
  //                     .then(function(result){
  //                         const html = result.value; // The generated HTML
  //                         setDocContent(html);
  //                     })
  //                     .catch(function(err){
  //                         console.log(err);
  //                     });
  //             });
  //     }
  // }, [fileURL, fileType]);

  // Check if fileURL is defined
  if (!fileURL) {
    return <div>No file URL provided</div>;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "file." + fileType; // set the file name and type
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (fileURL.startsWith("blob:")) {
    const fileExtension = fileType;

    // if (docContent) {
    //     return <div className={styles.container}>
    //         <iframe srcDoc={docContent} title="file content" style={{width: '100%', height: '100%'}}/>
    //     </div>
    //
    // }

    console.log("Before switch, fileType:", fileType);
    switch (fileExtension) {
      // case 'docx':
      //     fetch(fileURL)
      //         .then(response => {
      //             console.log('fetch response:', response);
      //             return response.arrayBuffer();
      //         })
      //         .then(arrayBuffer => {
      //             console.log('arrayBuffer:', arrayBuffer);
      //             mammoth.convertToHtml({arrayBuffer: arrayBuffer})
      //                 .then(function(result){
      //                     const html = result.value; // The generated HTML
      //                     setDocContent(html);
      //                 })
      //                 .catch(function(err){
      //                     console.log('mammoth.convertToHtml error:', err);
      //                 });
      //         })
      //         .catch(function(err){
      //             console.log('fetch error:', err);
      //         });
      //     return <div>Loading...</div>;
      case "pdf":
        return (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className={styles.container}>
              <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
              <Viewer
                fileUrl={fileURL}
                defaultScale={SpecialZoomLevel.PageWidth}
                plugins={[toolbarPluginInstance]}
              />
            </div>
          </Worker>
        );
      case "png":
        return (
          <div className={styles.container}>
            <img src={fileURL} alt="file content" />
          </div>
        );
      case "jpg":
        return (
          <div className={styles.container}>
            <img src={fileURL} alt="file content" />
          </div>
        );
      case "txt":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "py":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "cpp":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "java":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "c":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "html":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "css":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "js":
        return (
          <div className={styles.container}>
            <iframe
              src={fileURL}
              title="file content"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      case "mp4":
        return (
          <video width="320" height="240" controls>
            <source src={fileURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "pptx":
        return (
          <div className={styles.container2}>
            <Button variant="contained" onClick={handleDownload}>
              Download PPTX
            </Button>
            {/*<p>Downloading the pptx file.</p>*/}
            {/*<iframe src={fileURL} title="file content" style={{width: '100%', height: '100%'}}/>*/}
          </div>
        );
      default:
        return <div>File type not supported</div>;
    }
  }
}

export default PdfViewer;
