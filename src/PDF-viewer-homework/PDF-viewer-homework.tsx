// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "../../node_modules/pdfjs-dist/web/pdf_viewer.css";

import styles from "./PDF-viewer-homework.module.css";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

// import * as mammoth from "mammoth";

// Your render function
function PdfViewerHomework({
  documentURL,
  fileType,
}: {
  documentURL: string;
  fileType: string;
}) {
  const [loading, setLoading] = useState(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (
      documentURL.startsWith("blob:") &&
      (fileType === "txt" ||
        fileType === "py" ||
        fileType === "cpp" ||
        fileType === "java" ||
        fileType === "c" ||
        fileType === "html" ||
        fileType === "css" ||
        fileType === "js" ||
        fileType === "dart")
    ) {
      const iframe = iframeRef.current;
      iframe.onload = function () {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        iframe.style.height = doc.body.scrollHeight + "px";
      };
    }
  }, [documentURL, fileType]);

  // const [docContent, setDocContent] = useState<string | null>(null);
  // Check if fileURL is defined
  if (!documentURL) {
    return <div>No file URL provided</div>;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = documentURL;
    link.download = "file." + fileType; // set the file name and type
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (documentURL.startsWith("blob:")) {
    const fileExtension = fileType;

    switch (fileExtension) {
      // case 'docx':
      //     fetch(documentURL)
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
      //     if (docContent) {
      //         return <div dangerouslySetInnerHTML={{ __html: docContent }} />;
      //     } else {
      //         return <div>Loading...</div>;
      //     }
      case "pdf":
        return (
          <div>
            {/*<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">*/}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              {/* Your document viewer */}
              <div className={styles.container}>
                {loading}

                <Viewer
                  fileUrl={documentURL}
                  defaultScale={SpecialZoomLevel.PageWidth}
                  onDocumentLoad={() => setLoading(false)}
                />
              </div>
            </Worker>
          </div>
        );
      case "png":
        return (
          <div className={styles.container}>
            <img src={documentURL} alt="file content" />;
          </div>
        );
      case "jpg":
        return (
          <div className={styles.container}>
            <img src={documentURL} alt="file content" />
          </div>
        );
      case "txt":
      case "py":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "cpp":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "java":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "c":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "html":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "css":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "js":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "dart":
        return (
          <div className={styles.container}>
            <iframe
              ref={iframeRef}
              src={documentURL}
              title="file content"
              className={styles.responsiveIframe}
            />
          </div>
        );
      case "mp4":
        return (
          <video width="320" height="240" controls>
            <source src={documentURL} type="video/mp4" />
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

export default PdfViewerHomework;
