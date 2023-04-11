import React, { useContext, useState } from "react";
import { Modal, Tabs, Table } from "antd";
import { formatDate } from "../../utils/formatDate";
import { Asset } from "../../types/Asset";
import { UserContext } from "../../context/usersContext";
import { WorkOrderContext } from "../../context/workordersContext";

interface Props {
  visible: boolean;
  onCancel: () => void;
  asset: Asset | null;
}

const { TabPane } = Tabs;

const AssetModal: React.FC<Props> = ({ visible, onCancel, asset }) => {
	const [tabIndex, setTabIndex] = useState(0);

	const { workOrders } = useContext(WorkOrderContext);
	const { users } = useContext(UserContext);

	const filteredWorkOrders = asset?.id ? workOrders.filter((order) => order.assetId === asset?.id) : workOrders;
	const filteredUsers = users.filter((user) => asset?.assignedUserIds.includes(user.id));

	return (
		<Modal visible={visible} title={asset?.name} onCancel={onCancel} footer={null} width={1000}>
			{asset && (
				<Tabs defaultActiveKey="overview" onChange={(key) => setTabIndex(parseInt(key))}>
					<TabPane tab="Overview" key="overview">
						<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: 24 }}>
							<div>
								<p>
									<strong>Model:</strong> {asset.model}
								</p>
								<div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
									<p style={{ marginRight: 8 }}>
										<strong>Status:</strong>{" "}
									</p>
									<div style={{ height: 16, width: 16, borderRadius: "50%", backgroundColor: asset.status === "inOperation" ? "#00CC00" : asset.status === "inDowntime" ? "#FFC300" : "#FF0000", marginRight: 8 }}></div>
									<p>{asset.status}</p>
								</div>
							</div>

							<div>
								<p>
									<strong>Health Score:</strong> {asset.healthscore}%
								</p>
								<p style={{ marginTop: 8 }}>
									<strong>Max Temperature:</strong> {asset.specifications.maxTemp}&deg;C
								</p>
							</div>
						</div>
					</TabPane>

					<TabPane tab="Health History" key="health-history">
						<div style={{ padding: 24 }}>
							<p style={{ fontWeight: "bold" }}>Health History:</p>
							{asset.healthHistory.length > 0 ? (
								<Table dataSource={asset.healthHistory} pagination={{ pageSize: 5 }}>
									<Table.Column title="Data" dataIndex="timestamp" render={(date) => formatDate(date)} />
									<Table.Column
										title="Status"
										dataIndex="status"
										render={(status) => (
											<div style={{ display: "flex", alignItems: "center" }}>
												<div style={{ height: 16, width: 16, borderRadius: "50%", backgroundColor: status === "inOperation" ? "#00CC00" : status === "inDowntime" ? "#FFC300" : "#FF0000", marginRight: 8 }}></div>
												<p>{status}</p>
											</div>
										)}
									/>
								</Table>
							) : (
								<p>No health data available.</p>
							)}
						</div>
					</TabPane>

					<TabPane tab="Assigned Users" key="assigned-users">
						<div style={{ padding: 24 }}>
							<Table dataSource={filteredUsers} pagination={{ pageSize: 5 }}>
								<Table.Column title="Id" dataIndex="id" />
								<Table.Column title="Name" dataIndex="name" />
								<Table.Column title="Email" dataIndex="email" />
							</Table>
						</div>
					</TabPane>

					<TabPane tab="Metrics" key="metrics">
						<div style={{ padding: 24 }}>
							<p style={{ fontWeight: "bold" }}>Metrics:</p>
							<p>Last Uptime At: {formatDate(asset.metrics.lastUptimeAt)}</p>
							<p>Total Collects Uptime: {asset.metrics.totalCollectsUptime}</p>
							<p>Total Uptime: {asset.metrics.totalUptime}</p>
						</div>
					</TabPane>

					<TabPane tab="Sensors" key="sensors">
						<div style={{ padding: 24 }}>
							<p style={{ fontWeight: "bold" }}>Sensors:</p>
							{asset.sensors.map((sensor) => (
								<p key={sensor}>{sensor}</p>
							))}
						</div>
					</TabPane>

					<TabPane tab="WorkOrders" key="work-orders">
						<div style={{ padding: 24 }}>
							{filteredWorkOrders.length !== 0 ? (
								<Table dataSource={filteredWorkOrders} pagination={{ pageSize: 5 }}>
									<Table.Column title="ID" dataIndex="id" />
									<Table.Column title="Title" dataIndex="title" />
									<Table.Column title="Description" dataIndex="description" />
									<Table.Column title="Status" dataIndex="status" />
									<Table.Column
										title="Assigned Users"
										dataIndex="assignedUserIds"
										render={(userIds) => (
											<p>
												{users
													.filter((user) => userIds.includes(user.id))
													.map((user) => user.name)
													.join(", ")}
											</p>
										)}
									/>
									<Table.Column
										title="Checklist"
										dataIndex="checklist"
										render={(checklist) => (
											<ul>
												{checklist.map((item: any, index: any) => (
													<li key={index}>
														{item.completed ? "✅" : "❌"} {item.task}
													</li>
												))}
											</ul>
										)}
									/>
								</Table>
							) : (
								<p>No work orders for this asset.</p>
							)}
						</div>
					</TabPane>
				</Tabs>
			)}
		</Modal>
	);
};

export default AssetModal;
