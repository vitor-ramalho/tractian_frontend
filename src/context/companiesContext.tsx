import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Company } from "../types/Company";
import api from "../api/api";

interface CompanyContextType {
  companies: Company[];
  getCompanies: () => void;
  setCompany: (values: any) => void;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const CompanyContext = createContext({} as CompanyContextType);

export const CompanyProvider: React.FC<Props> = ({ children }: Props) => {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [loading, setLoading] = useState(false);

	function getCompanies() {
		setLoading(true);
		try {
			api
				.get<Company[]>(
					"/companies"
				)
				.then((response) => setCompanies(response.data));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		getCompanies();
	}, []);

	const setCompany = (newCompany: Company) => {
		setCompanies([...companies, newCompany]);
	};

	return (
		<CompanyContext.Provider value={{ companies, loading, setCompany, getCompanies }}>
			{children}
		</CompanyContext.Provider>
	);
};
