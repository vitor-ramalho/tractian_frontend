import React from "react";
import { Card } from "antd";

const StatusLegend: React.FC = () => {
	return (
		<Card style={{ width: 150 }}>
			<div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
				<div
					style={{
						width: "10px",
						height: "10px",
						borderRadius: "50%",
						backgroundColor: "#00CC00",
						marginRight: "8px"
					}}
				></div>
				<span>In operation</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
				<div
					style={{
						width: "10px",
						height: "10px",
						borderRadius: "50%",
						backgroundColor: "#FFC300",
						marginRight: "8px"
					}}
				></div>
				<span>In downtime</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
				<div
					style={{
						width: "10px",
						height: "10px",
						borderRadius: "50%",
						backgroundColor: "#FF0000",
						marginRight: "8px"
					}}
				></div>
				<span>In alert</span>
			</div>
		</Card>
	);
};

export default StatusLegend;
