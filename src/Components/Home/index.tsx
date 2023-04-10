import React, { useContext, useEffect, useState } from "react";
import HighchartsComponent from "../HighChartComponent";
import StatusLegend from "../StatusLegend";
import { AssetContext } from "../../context/assetsContext";

const Home = () => {
	return (
		<>
			<StatusLegend />
			<HighchartsComponent />
		</>
	);
};

export default Home;