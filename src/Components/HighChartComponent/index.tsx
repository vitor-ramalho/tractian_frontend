import React, { useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Options } from "highcharts";
import { AssetContext } from "../../context/assetsContext";

const buildChartData = (data: any[]) => {
	return data.map((asset) => ({
		name: asset.name,
		y: asset.healthscore,
		color: asset.status === "inOperation" ? "#00CC00" : asset.status === "inDowntime" ? "#FFC300" : "#FF0000"
	}));
};

const HighchartsComponent: React.FC = () => {
	const {assets} = useContext(AssetContext);
	const chartOptions: Options = {
		chart: {
			type: "column",
		},
		title: {
			text: "Asset Healthscore",
		},
		xAxis: {
			type: "category",
		},
		yAxis: {
			title: {
				text: "Healthscore",
			},
			min: 0,
			max: 100,
		},
		legend: {
			enabled: false,
		},
		series: [
			{
				name: "Healthscore",
				colorByPoint: false,
				data: buildChartData(assets),
				status: assets.map((asset) => asset.status),
			},
		],
	};
	return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
export default HighchartsComponent;
