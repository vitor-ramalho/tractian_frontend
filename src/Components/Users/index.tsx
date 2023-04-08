import { useState, useEffect } from "react";
import axios from "axios";
import {
	Box,
	Text,
	Heading,
	VStack,
	Grid,
	GridItem,
	Spinner,
} from "@chakra-ui/react";

type User = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
};

const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		axios.get<User[]>("https://my-json-server.typicode.com/tractian/fake-api/users")
			.then(response => {
				setUsers(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<Box p={8}>
			<Heading as="h1" textAlign="center" mb={8}>User List</Heading>
			{loading ? (
				<Spinner size="xl" />
			) : (
				<VStack spacing={4}>
					<Grid templateColumns="repeat(3, 1fr)" gap={4}>
						<GridItem colSpan={1}><Text fontWeight="bold">Name</Text></GridItem>
						<GridItem colSpan={1}><Text fontWeight="bold">Email</Text></GridItem>
						<GridItem colSpan={1}><Text fontWeight="bold">Company ID</Text></GridItem>
					</Grid>
					{users.map(user => (
						<Grid templateColumns="repeat(3, 1fr)" gap={4} key={user.id}>
							<GridItem colSpan={1}><Text>{user.name}</Text></GridItem>
							<GridItem colSpan={1}><Text>{user.email}</Text></GridItem>
							<GridItem colSpan={1}><Text>{user.companyId}</Text></GridItem>
						</Grid>
					))}
				</VStack>
			)}
		</Box>
	);
};

export default Users;
