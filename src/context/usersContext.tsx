import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";
import api from "../api/api";

interface UserContextType {
  users: User[];
  getUsers: () => void;
  setUser: (values: any) => void;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export const UserProvider: React.FC<Props> = ({ children }: Props) => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);

	function getUsers() {
		setLoading(true);
		try {
			api
				.get<User[]>(
					"/users"
				)
				.then((response) => setUsers(response.data));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		getUsers();
	}, []);

	const setUser = (newUser: User) => {
		setUsers([...users, newUser]);
	};

	return (
		<UserContext.Provider value={{ users, loading, setUser, getUsers }}>
			{children}
		</UserContext.Provider>
	);
};
