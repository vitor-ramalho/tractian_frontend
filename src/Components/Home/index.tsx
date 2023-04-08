import React, { useEffect, useState } from "react";
import HighchartsComponent from "../HighChartComponent";

const Home = () => {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		fetch("https://my-json-server.typicode.com/tractian/fake-api/assets")
			.then((response) => response.json())
			.then((data) => setData(data));
	}, []);

	return <HighchartsComponent data={data} />;
};

export default Home;