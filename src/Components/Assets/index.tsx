
import React, { useState, useContext } from "react";
import { Asset } from "../../types/Asset";
import { Card, Image, Spin, Typography } from "antd";
import AssetModal from "../AssetModal";
import { AssetContext } from "../../context/assetsContext";

const Assets = () => {
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
	const [visible, setVisible] = useState(false);
	const { assets, loading } = useContext(AssetContext);
	
	const handleAssetClick = (asset: Asset) => {
		setSelectedAsset(asset);
		setVisible(true);
	};
	
	return (
		<>
			<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center" }}>
				{loading ? (
					<Spin size="large" />
				) : assets.length > 0 ? (
					assets.map((asset) => (
						<Card key={asset.id} style={{ width: 240, margin: "10px", cursor: "pointer" }} onClick={() => handleAssetClick(asset)}>
							<Image src={asset.image} alt={asset.name} height={160} />
							<div style={{ padding: "16px" }}>
								<Typography.Title level={4}>{asset.name}</Typography.Title>
								<div>
									<Typography.Text>{asset.model}</Typography.Text>
								</div>
								<div>
									<Typography.Text>Status: {asset.status}</Typography.Text>
								</div>
								<div>
									<Typography.Text>Health Score: {asset.healthscore}</Typography.Text>
								</div>
								<div>
									<Typography.Text>Max Temperature: {asset.specifications.maxTemp}°C</Typography.Text>
								</div>
							</div>
						</Card>
					))
				) : (
					<Typography.Text>No assets found.</Typography.Text>
				)}
			</div>
			<AssetModal asset={selectedAsset} visible={visible} onCancel={() => setVisible(false)} />
		</>
	);
};

export default Assets;
