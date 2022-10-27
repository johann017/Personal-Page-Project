import Top from '../Top';
import React from 'react'
import resume from '../Johann_Resume.pdf';
import { Document, Page, pdfjs } from "react-pdf";
import './Resume.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => {
  return(
    <div className="resume-back">
        <Top/>
        <br/><br/><br/><br/>
        <center>
            <Document file={resume}>
              <Page  scale={1.75} pageNumber={1} />
            </Document>
        </center>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}
 export default Resume
