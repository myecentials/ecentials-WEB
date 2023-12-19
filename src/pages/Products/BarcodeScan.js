import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const BarcodeScan = () => {
  const [result, setResult] = useState('No result');

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <BarcodeReader onError={handleError} onScan={handleScan} />
      <p>{result}</p>
    </div>
  );
};

export default BarcodeScan;




// import React, { Component } from 'react'
// import BarcodeReader from 'react-barcode-reader'
 
// class BarCodeScan extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       result: 'No result',
//     }
 
//     this.handleScan = this.handleScan.bind(this)
//   }
//   handleScan(data){
//     this.setState({
//       result: data,
//     })
//   }
//   handleError(err){
//     console.error(err)
//   }
//   render(){
 
//     return(
//       <div>
//         <BarcodeReader
//           onError={this.handleError}
//           onScan={this.handleScan}
//           />
//         <p>{this.state.result}</p>
//       </div>
//     )
//   }
// }