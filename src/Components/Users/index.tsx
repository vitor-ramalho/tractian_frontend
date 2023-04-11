import React, { useContext } from "react";
import { Table, Spin, Typography } from "antd";
import { UserContext } from "../../context/usersContext";

interface User {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

const Users: React.FC = () => {
	const { users, loading } = useContext(UserContext);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Company ID",
			dataIndex: "companyId",
		},
	];

	return (
		<>
			{loading ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
					<Spin size="large" />
				</div>
			) : (
				<div style={{ padding: 24 }}>
					<Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />
				</div>
			)}
		</>
	);
};

export default Users;
