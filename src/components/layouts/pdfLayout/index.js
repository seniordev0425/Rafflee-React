import React, { Component, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/entry.webpack';
import './pdf.css';
import 'react-pdf/dist/Page/AnnotationLayer.css'; 
import pdfGeneral from '../../../assets/pdf/general.pdf'
import pdfPolicy from '../../../assets/pdf/policy.pdf'
import Loading from '../../common/Loading';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfLayout(props) {
    const { name } = props
    const [numPages, setNumPages] = useState(null)

    const onDocumentLoadSuccess = (pdf) => {
        setNumPages(pdf.numPages)
    }
    
    const renderPages = () => {
        return (
            Array.from(Array(numPages).keys()).map((index) =>
            <div key={index} className="PDFPage">
                <Page 
                    pageNumber={index + 1} 
                    renderTextLayer={false} 
                    renderInteractiveForms={false} 
                    width={window.innerWidth * 0.8}
                />
                <div className="mb-3 font-size-13 text-center">{index + 1}</div>
            </div>
            )
        )
    }
    
    return (
        <div className="ResumeContainer">
           <Document loading={<Loading/>} className={"PDFDocument"} file={name === 'general' ? pdfGeneral : pdfPolicy} onLoadSuccess={onDocumentLoadSuccess}>
                {renderPages()}
            </Document> 
        </div>
    )
}

export default PdfLayout;