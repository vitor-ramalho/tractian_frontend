import { useState, useEffect, useContext } from "react";
import { Box, List, ListItem, ListIcon, Spinner, OrderedList, Skeleton } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";

import React from "react";
import { Company } from "../../types/Company";
import { Unit } from "../../types/Unit";
import { CompanyContext } from "../../context/companiesContext";
import { UnitContext } from "../../context/unitsContext";

const Companies = () => {


	const {loading, companies} = useContext(CompanyContext);
	const {units} = useContext(UnitContext);
	return (
		<OrderedList>
			{loading ? (
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