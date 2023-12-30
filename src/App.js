import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/global.css";
import "./assets/styles/index.css";
import { Progress } from "reactstrap";
import Config from "./config/config";

function App() {
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(10);

	useEffect(() => {
		setInterval(() => {
			setCount(count + 10);
		}, 500);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	//  const act = useEffect(null)
	return loading ? (
		<div className="contain">
			<Progress value={count} className="w-25 rounded" />
		</div>
	) : (
		<Config/>
	);
}

export default App;
