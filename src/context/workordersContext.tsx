import React, {
	createContext, ReactNode, useEffect, useState,
} from "react";
import { WorkOrder } from "../types/Workorders";
import axios from "axios";
import api from "../api/api";

interface WorkOrderContextType {
  workOrders: WorkOrder[],
  getWorkOrders: () => void;
  setWorkOrders: (values: any) => void;
  loading: boolean;
}

interface IProps {
  children: ReactNode;
}

export const WorkOrderContext = createContext({} as WorkOrderContextType);

export const WorkOrderProvider: React.FC<IProps> = ({ children }: IProps) => {
	const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
	const [loading, setLoading] = useState(false);

	function getWorkOrders() {
		setLoading(true);
		try {
			api
				.get<WorkOrder[]>("/workorders")
				.then((response) => setWorkOrders(response.data));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		setLoading(true);
		getWorkOrders();
	}, []);
	return (
		<WorkOrderContext.Provider value={{
			workOrders, loading, setWorkOrders, getWorkOrders,
		}}
		>
			{children}
		</WorkOrderContext.Provider>
	);
};
