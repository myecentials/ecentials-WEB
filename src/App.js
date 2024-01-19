import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/global.css";
import "./assets/styles/index.css";
import { Progress } from "reactstrap";
import Config from "./config/config";

function App() {
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
	  // Simulate loading progress
	  const interval = setInterval(() => {
		setProgress((prevProgress) => Math.min(prevProgress + 5, 100));
	  }, 200);
  
	  // Clear interval when progress reaches 100%
	  return () => clearInterval(interval);
	}, []);
	

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	//  const act = useEffect(null)
	return loading ? (
		<div className="contain">
			<Progress value={progress} className="w-25 rounded" />
		</div>
	) : (
		<Config/>
	);
}

export default App;
