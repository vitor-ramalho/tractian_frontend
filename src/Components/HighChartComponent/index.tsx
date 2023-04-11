/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Options } from "highcharts";
import { AssetContext } from "../../context/assetsContext";

const buildChartData = (data: any[]) => {
	const colors = {
		inOperation: "#00CC00",
		inDowntime: "#FFC300",
		default: "#FF0000"
	};

	return data.map((asset) => ({
		name: asset.name,
		y: asset.healthscore,
		//@ts-ignore
		color: colors[asset.status] || colors.default,
		status: asset.status
	}));
};

const HighchartsComponent: React.FC = () => {
	const { assets } = useContext(AssetContext);

	const chartOptions: Options = {
		chart: {
			type: "column",
			width: 500, 
			height: 300, 
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
			//@ts-ignore
			{
				name: "Healthscore",
				colorByPoint: false,
				data: buildChartData(assets),
			},
		],
	};

	return (
		<div style={{width: "200vh"}}>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};

export default HighchartsComponent;