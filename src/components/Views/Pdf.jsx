import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import {
    pharmacyLogo,
    pharmacyName,
    pharmacyAddress,
    pharmacyEmail,
    pharmacyLocation,
    pharmacyPhoneContact,
} from "../../app/features/authSlice/authSlice";
import logoEc from '../../logo.svg'

const Pdf = forwardRef(({ body, title, columnMapping }, ref) => {
    const pdfContainerRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const columns = Object.keys(columnMapping);
    const logo = useSelector(pharmacyLogo);
    const name = useSelector(pharmacyName);
    const address = useSelector(pharmacyAddress);
    const email = useSelector(pharmacyEmail);
    const location = useSelector(pharmacyLocation);
    const phone = useSelector(pharmacyPhoneContact);

    // Load image only once
    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = logo;
    }, [logo]);
    function formatData(key, value) {
        if (key === 'createdAt' || key === 'expiry_date') {
          const date = new Date(value);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        if( value === ""){
            return "N/A";
        }
        return value;
      }

    useImperativeHandle(ref, () => ({
        generatePDF: () => {
            if (pdfContainerRef.current && imageLoaded) {
                html2canvas(pdfContainerRef.current, {
                    useCORS: true,
                    scale: 1,
                    logging: true, // Set to false in production
                    onclone: (document) => {
                        document.querySelector('header').style.visibility = 'visible';
                    }
                }).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF();
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`${title}.pdf`);
                }).catch(error => {
                    console.error('Failed to generate PDF:', error);
                });
            }
        },
    }));

    return (
        <div ref={pdfContainerRef} style={{ width: '100%', height: 'auto', position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <header className="text-center mb-4">
                {imageLoaded && (
                    <img
                        src={logo}
                        alt="Pharmacy Logo"
                        className="mb-2"
                        style={{ width: "100px" }}
                    />
                )}
                <h1 className="h3 text-deep">{name}</h1>
            </header>
            <div className="container mt-3">
                <h2 className="h4 mb-3 text-deep">{title}</h2>
                <table className="table table-hover">
                    <thead className="text-deep">
                        <tr>
                            {columns.map((key, index) => (
                                <th key={index}>{columnMapping[key]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((item, index) => (
                            <tr key={index}>
                                {columns.map((col, colIndex) => (
                                     <td key={colIndex}>{formatData(col, item[col])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="text-center mt-5 noprint">
                <p>Address: {location}, {address}</p>
                <p>Contact: <a href={`tel:${phone}`}>{phone}</a> | <a href={`mailto:${email}`}>{email}</a></p>
                <div className="pb-4 mt-3 d-flex justify-content-center align-items-center">
                  <span className="small deliverer-name">Powered By:</span>
                  <span>
                    <img
                      src={logoEc}
                      alt=""
                      width={50}
                      className="mb-2 mx-2"
                      style={{ pointerEvents: "none" }}
                    />
                  </span>
                </div>
            </footer>
        </div>
    );
});

export default Pdf;
