import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
	Box,
	Text,
	Heading,
	VStack,
	Grid,
	GridItem,
	Spinner,
	Table,
	Tr,
	Th,
	Td,
} from "@chakra-ui/react";
import { UserContext } from "../../context/usersContext";

type User = {
	companyId: number;
	email: string;
	id: number;
	name: string;
	unitId: number;
};

const Users = () => {

	const { users, loading } = useContext(UserContext);

	return (
		<Box>
			{loading ? (
				<Spinner size="xl" />
			) : (
				<VStack spacing={4}>
					<Table variant="striped">
						<Tr>
							<Th>Name</Th>
							<Th>Email</Th>
							<Th>Company ID</Th>
						</Tr>
						{users.map((user, index) => (
							<Tr key={user.id} bg={index % 2 === 0 ? "gray.100" : "white"}>
								<Td>{user.name}</Td>
								<Td>{user.email}</Td>
								<Td>{user.companyId}</Td>
							</Tr>
						))}
					</Table>
				</VStack>
			)}
		</Box>
	);
};

export default Users;
