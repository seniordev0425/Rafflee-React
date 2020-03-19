import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/entry.webpack';
import './general.css';
import './node_modules/react-pdf/dist/Page/AnnotationLayer.css';
import pdfFile from './general.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class GeneralConditionsLayout extends Component {
    state = {
        file: pdfFile,
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { file, pageNumber } = this.state;
        return (
            <div id="ResumeContainer">
                <Document className={"PDFDocument"} file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
                    <div className="PDFPage PDFPageOne">
                        <Page 
                            pageNumber={pageNumber} 
                            renderTextLayer={false} 
                            renderInteractiveForms={false} 
                            width={window.innerWidth * 0.8}
                        />
                        <div className="mb-3 font-size-13 text-center">1</div>
                    </div>
                    <Page className={"PDFPage PDFPageOne"} pageNumber={pageNumber + 1} renderTextLayer={false} renderInteractiveForms={false} width={window.innerWidth * 0.8}/>
                    <Page className={"PDFPage PDFPageOne"} pageNumber={pageNumber + 2} renderTextLayer={false} renderInteractiveForms={false} width={window.innerWidth * 0.8}/>
                </Document>
            </div>
        );
    }
}

export default GeneralConditionsLayout;