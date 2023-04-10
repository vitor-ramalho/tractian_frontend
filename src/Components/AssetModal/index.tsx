import React, { useContext, useState } from "react";
import { Asset } from "../../types/Asset";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	UnorderedList,
	ListItem,
	Flex,
	Box,
	Grid,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/formatDate";
import { WorkOrderContext } from "../../context/workordersContext";
import { UserContext } from "../../context/usersContext";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	asset: Asset | null;
};

const AssetModal: React.FC<Props> = ({ isOpen, onClose, asset }) => {
	const [tabIndex, setTabIndex] = useState(0);

	const { workOrders } = useContext(WorkOrderContext);
	const { users } = useContext(UserContext);

	const filteredWorkOrders = asset?.id ? workOrders.filter((order) => order.assetId === asset?.id) : workOrders;
	const filteredUsers = users.filter((user) =>
		asset?.assignedUserIds.includes(user.id)
	);
	

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"full"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{asset?.name}</ModalHeader>
				<ModalCloseButton />

				{asset && (
					<ModalBody>
						<Box>
							<Tabs index={tabIndex} onChange={index => setTabIndex(index)}>
								<TabList>
									<Tab>Overview</Tab>
									<Tab>Health History</Tab>
									<Tab>Assigned Users</Tab>
									<Tab>Metrics</Tab>
									<Tab>Sensors</Tab>
									<Tab>WorkOrders</Tab>
								</TabList>

								<TabPanels>
									<TabPanel>
										<Flex justifyContent={"space-around"} alignItems={"center"} p={3}>
											<Box>
												<Text><strong>Model:</strong> {asset.model}</Text>
												<Flex alignItems="center" mt={2}>
													<Text mr={2}><strong>Status:</strong>  </Text>
													<Box h={4} w={4} borderRadius="full" bg={asset.status === "inOperation" ? "#00CC00" : asset.status === "inDowntime" ? "#FFC300" : "#FF0000"} mr={2}></Box>
													<Text>{asset.status}</Text>
												</Flex>
											</Box>

											<Box>
												<Text><strong>Health Score:</strong> {asset.healthscore}%</Text>
												<Text mt={2}><strong>Max Temperature:</strong> {asset.specifications.maxTemp}°C</Text>
											</Box>
										</Flex>
									</TabPanel>

									<TabPanel>
										<Box p={3}>
											<Text fontWeight="bold">Health History:</Text>
											{asset.healthHistory.length > 0 ? (
												<Table variant={"striped"}>
													<Thead>
														<Tr>
															<Th>Data</Th>
															<Th>Status</Th>
														</Tr>
													</Thead>
													<Tbody>
														{asset.healthHistory.map((data) => (
															<Tr key={data.timestamp}>
																<Td>{formatDate(data.timestamp)}</Td>

																<Td>
																	<Flex>
																		<Box h={4} w={4} borderRadius="full" bg={data.status === "inOperation" ? "#00CC00" : data.status === "inDowntime" ? "#FFC300" : "#FF0000"} mr={2}></Box>
																		<Text>{data.status}</Text>
																	</Flex>

																</Td>
															</Tr>
														))}
													</Tbody>
												</Table>
											) : (
												<Text>No health data available.</Text>
											)}
										</Box>
									</TabPanel>

									<TabPanel>
										<Box p={3}>
											<Table>
												<Thead>
													<Tr>
														<Th>Id</Th>
														<Th>Name</Th>
														<Th>Email</Th>
													</Tr>
												</Thead>
												<Tbody>
													{
														filteredUsers.map((user) => (
															<Tr key={user.id}>
																<Td>{user.id}</Td>
																<Td>{user.name}</Td>
																<Td>{user.email}</Td>
															</Tr>
														))
													}
												</Tbody>
											</Table>
										</Box>
									</TabPanel>

									<TabPanel>
										<Box p={3}>
											<Text fontWeight={"bold"}>Metrics: </Text>
											<Text>Last Uptime At: {formatDate(asset.metrics.lastUptimeAt)}</Text>
											<Text>Total Collects Uptime: {asset.metrics.totalCollectsUptime}</Text>
											<Text>Total Uptime: {asset.metrics.totalUptime}</Text>
										</Box>
									</TabPanel>
									<TabPanel>
										<Box p={3}>
											<Text fontWeight={"bold"}>Sensors</Text>
											{asset.sensors.map((sensor) => (
												<Text key={sensor}>{sensor}</Text>
											))}
										</Box>
									</TabPanel>

									<TabPanel>
										<Box p={3}>
											{filteredWorkOrders.length != 0 ? (
												<Table variant="simple">
													<Thead>
														<Tr>
															<Th>ID</Th>
															<Th>Title</Th>
															<Th>Description</Th>
															<Th>Status</Th>
															<Th>Assigned Users</Th>
															<Th>Checklist</Th>
														</Tr>
													</Thead>
													<Tbody>
														{filteredWorkOrders.map((order) => (
															<Tr key={order.id}>
																<Td>{order.id}</Td>
																<Td>{order.title}</Td>
																<Td>{order.description}</Td>
																<Td>{order.status}</Td>
																<Td>{order.assignedUserIds.join(", ")}</Td>
																<Td>
																	<ul>
																		{order.checklist.map((item, index) => (
																			<li key={index}>
																				{item.completed ? "✅" : "❌"} {item.task}
																			</li>
																		))}
																	</ul>
																</Td>
															</Tr>
														))}
													</Tbody>
												</Table>
											) : (
												<Text>No Workorder for this Asset</Text>
											)}
										</Box>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</Box>
					</ModalBody>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AssetModal;



