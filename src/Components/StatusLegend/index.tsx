import { Box, Text, Flex } from "@chakra-ui/react";

const StatusLegend: React.FC = () => {
	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
			<Text fontSize="lg" fontWeight="bold" mb={4}>Asset Status</Text>
			<Flex alignItems="center" mt={2}>
				<Box h={4} w={4} borderRadius="full" bg="#00CC00" mr={2}></Box>
				<Text>In operation</Text>
			</Flex>
			<Flex alignItems="center" mt={2}>
				<Box h={4} w={4} borderRadius="full" bg="#FFC300" mr={2}></Box>
				<Text>In downtime</Text>
			</Flex>
			<Flex alignItems="center" mt={2}>
				<Box h={4} w={4} borderRadius="full" bg="#FF0000" mr={2}></Box>
				<Text>In alert</Text>
			</Flex>
		</Box>
	);
};

export default StatusLegend;
