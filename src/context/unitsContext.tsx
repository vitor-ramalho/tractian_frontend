import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Unit } from "../types/Unit";
import api from "../api/api";

export interface UnitContextType {
  units: Unit[];
  getUnits: () => void;
  setUnit: (values: any) => void;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const UnitContext = createContext({} as UnitContextType);

export const UnitProvider: React.FC<Props> = ({ children }: Props) => {
	const [units, setUnits] = useState<Unit[]>([]);
	const [loading, setLoading] = useState(false);

	function getUnits() {
		setLoading(true);
		try {
			api
				.get<Unit[]>(
					"/units"
				)
				.then((response) => setUnits(response.data));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		getUnits();
	}, []);

	const setUnit = (newUnit: Unit) => {
		setUnits([...units, newUnit]);
	};

	return (
		<UnitContext.Provider value={{ units, loading, setUnit, getUnits }}>
			{children}
		</UnitContext.Provider>
	);
};
