import React, { useState, useEffect, useContext } from "react";
import { Asset } from "../../types/Asset";
import axios from "axios";
import { Box, Flex, Grid, GridItem, Image, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react";
import AssetModal from "../AssetModal";
import { AssetContext } from "../../context/assetsContext";


const Assets = () => {
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null); // add a state variable for selected asset
	const { isOpen, onOpen, onClose } = useDisclosure(); // create stateful value and functions for the modal window

	const { assets, loading } = useContext(AssetContext);

	// function to handle clicking on a box and opening the corresponding modal window
	const handleAssetClick = (asset: Asset) => {
		setSelectedAsset(asset);
		onOpen();
	};

	return (
		<>
			<Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
				{
					loading ? (
						<Spinner size="xl" />
					) :
						assets.length > 0 ? (
							assets.map((asset) => (
								<Box
									key={asset.id}
									borderWidth="1px"
									borderRadius="lg"
									overflow="hidden"
									onClick={() => handleAssetClick(asset)} // add onClick handler to call the handleAssetClick function
									cursor="pointer" // change the cursor to pointer to indicate the box is interactive
								>
									<Image src={asset.image} alt={asset.name} height="120px" objectFit="cover" />
									<Box p="6">
										<Text fontWeight="semibold" fontSize="xl" mb={2}>
											{asset.name}
										</Text>
										<Text fontSize="md" mb={2}>
											{asset.model}
										</Text>
										<Text fontSize="sm" mb={2}>
											{asset.status}
										</Text>
										<Text fontSize="sm" mb={2}>
											Health Score: {asset.healthscore}
										</Text>
										<Text fontSize="sm" mb={2}>
											Max Temperature: {asset.specifications.maxTemp}°C
										</Text>
									</Box>
								</Box>
							))
						) : (
							<Text>No assets found.</Text>
						)}
			</Grid>
			<AssetModal
				isOpen={isOpen}
				onClose={onClose}
				asset={selectedAsset} // pass the selected asset as a prop to the AssetModal component
			/>
		</>
	);
};

export default Assets;
