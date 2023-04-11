import { useState, useEffect, useContext } from "react";
import { Table, Space, Skeleton } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Unit } from "../../types/Unit";
import { CompanyContext } from "../../context/companiesContext";
import { UnitContext } from "../../context/unitsContext";

const columns = [
	{
		title: "Company",
		dataIndex: "name"
	},
	{
		title: "Units",
		dataIndex: "units",
		render: (units: Unit[]) => (
			<Space direction="vertical">
				{units.map((unit) => (
					<span key={unit.id}>
						{unit.name}
						<CheckCircleOutlined style={{ color: "#00CC00" }} />
					</span>
				))}
			</Space>
		)
	}
];

const Companies = () => {
	const { loading, companies } = useContext(CompanyContext);
	const { units } = useContext(UnitContext);

	const [data, setData] = useState<Record<string, any>[]>([]);

	useEffect(() => {
		if (!loading && companies.length > 0 && units.length > 0) {
			setData(
				companies.map((company) => ({
					key: company.id,
					name: company.name,
					units: units.filter((unit) => unit.companyId === company.id)
				}))
			);
		}
	}, [loading, companies, units]);

	return (
		<Skeleton active loading={loading}>
			<Table columns={columns} dataSource={data} pagination={false} />
		</Skeleton>
	);
};

export default Companies;
