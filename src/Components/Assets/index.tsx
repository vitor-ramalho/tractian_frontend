import React, {useState, useEffect} from 'react'
import { Asset } from '../../types/Asset';
import axios from 'axios';
import { Box, Flex, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";


const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    axios
      .get<Asset[]>("https://my-json-server.typicode.com/tractian/fake-api/assets")
      .then((response) => setAssets(response.data));
  }, []);
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {assets.map((asset) => (
        <GridItem key={asset.id}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={asset.image} alt={asset.name} />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Text fontWeight="semibold" fontSize="xl" mr="2">
                  {asset.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  #{asset.id}
                </Text>
              </Box>

              <Box>
                <Text mt="1" fontWeight="semibold" fontSize="lg">
                  Health Score: {asset.healthscore}
                </Text>
              </Box>

              <Box>
                <Text mt="1" fontWeight="semibold" fontSize="lg">
                  Status: {asset.status}
                </Text>
              </Box>

              <Box>
                <Text mt="1" fontWeight="semibold" fontSize="lg">
                  Assigned User IDs: {asset.assignedUserIds.join(", ")}
                </Text>
              </Box>

              <VStack spacing="4" align="start" mt="4">
                <Text fontWeight="bold">Health History</Text>
                {asset.healthHistory.map((history, index) => (
                  <Flex key={index}>
                    <Text fontWeight="semibold" mr="2">
                      {history.status}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      ({new Date(history.timestamp).toLocaleDateString()})
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  )
}

export default Assets