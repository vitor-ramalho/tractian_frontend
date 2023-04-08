import React, { useState, useEffect } from "react";
import { Asset } from "../../types/Asset";
import axios from "axios";
import { Box, Flex, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";


const Assets = () => {
	const [assets, setAssets] = useState<Asset[]>([]);

	useEffect(() => {
		axios
			.get<Asset[]>("https://my-json-server.typicode.com/tractian/fake-api/assets")
			.then((response) => setAssets(response.data));
	}, []);
	return (
		<Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
			{assets.map(asset => (
				<Box key={asset.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
					<Image src={asset.image} alt={asset.name} height="120px" objectFit="cover" />
					<Box p="6">
						<Text fontWeight="semibold" fontSize="xl" mb={2}>{asset.name}</Text>
						<Text fontSize="md" mb={2}>{asset.model}</Text>
						<Text fontSize="sm" mb={2}>{asset.status}</Text>
						<Text fontSize="sm" mb={2}>Health Score: {asset.healthscore}</Text>
						<Text fontSize="sm" mb={2}>Max Temperature: {asset.specifications.maxTemp}°C</Text>
					</Box>
				</Box>
			))}
		</Grid>
	);
};

export default Assets;