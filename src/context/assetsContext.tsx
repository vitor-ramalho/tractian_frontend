
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Asset } from "../types/Asset";
import api from "../api/api";

interface AssetContextType {
  assets: Asset[];
  getAssets: () => void;
  setAssets: (values: any) => void;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

export const AssetContext = createContext({} as AssetContextType);

export const AssetProvider: React.FC<Props> = ({ children }: Props) => {
	const [assets, setAssets] = useState<Asset[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	function getAssets() {
		setLoading(true);
		try {
			api
				.get<Asset[]>(
					"/assets"
				)
				.then((response) => setAssets(response.data));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		getAssets();
	}, []);

	return (
		<AssetContext.Provider
			value={{ assets, loading, setAssets, getAssets }}
		>
			{children}
		</AssetContext.Provider>
	);
};
