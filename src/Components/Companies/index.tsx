import { useState, useEffect } from "react";
import { Box, List, ListItem, ListIcon, Spinner, OrderedList, Skeleton } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";

import React from "react";
import { Company } from "../../types/Company";

const Companies = () => {

	const [companies, setCompanies] = useState<Company[]>([]);
	const [units, setUnits] = useState<Unit[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getCompaniesAndUnits = async () => {
			try {
				const [companiesResponse, unitsResponse] = await Promise.all([
					axios.get<Company[]>("https://my-json-server.typicode.com/tractian/fake-api/companies"),
					axios.get<Unit[]>("https://my-json-server.typicode.com/tractian/fake-api/units")
				]);
				setCompanies(companiesResponse.data);
				setUnits(unitsResponse.data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getCompaniesAndUnits();
	}, []);

	return (
		<OrderedList>
			{isLoading ? (
				<>
					{[1, 2, 3].map((skeletonIndex) => (
						<ListItem key={skeletonIndex}>
							<Skeleton height="20px" />
						</ListItem>
					))}
				</>
			) : (
				<>
					{companies.map((company) => (
						<ListItem key={company.id}>
							{company.name}
							<OrderedList>
								{units
									.filter((unit) => unit.companyId === company.id)
									.map((unit) => (
										<ListItem key={unit.id}>{unit.name}</ListItem>
									))}
							</OrderedList>
						</ListItem>
					))}
				</>
			)}
		</OrderedList>
	);
};

export default Companies;