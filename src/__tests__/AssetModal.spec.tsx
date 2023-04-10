import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AssetModal from "../Components/AssetModal";
import { Asset } from "../types/Asset";

describe("AssetModal Component", () => {

	const onCloseMock = jest.fn();
	const asset: Asset = {
		id: 123,
		name: "Test Asset",
		model: "Test Model",
		status: "inOperation",
		companyId: 1,
		unitId: 2,
		image: "https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
		healthscore: 85,
		specifications: {maxTemp: 25},
		healthHistory: [],
		assignedUserIds: [],
		metrics: {lastUptimeAt: "1622026103467", totalCollectsUptime: 15, totalUptime: 20},
		sensors: [],
	};

	beforeEach(() => {
		onCloseMock.mockClear();
		render(
			<AssetModal isOpen={true} onClose={onCloseMock} asset={asset} />
		);
	});

	it("renders the asset name as modal header", () => {
		expect(screen.getByRole("heading")).toHaveTextContent(asset.name);
	});

	it("renders all tabs when there is an asset", () => {
		expect(screen.getByRole("tab", {name: "Overview"})).toBeInTheDocument();
		expect(screen.getByRole("tab", {name: "Health History"})).toBeInTheDocument();
		expect(screen.getByRole("tab", {name: "Assigned Users"})).toBeInTheDocument();
		expect(screen.getByRole("tab", {name: "Metrics"})).toBeInTheDocument();
		expect(screen.getByRole("tab", {name: "Sensors"})).toBeInTheDocument();
		expect(screen.getByRole("tab", {name: "WorkOrders"})).toBeInTheDocument();
	});

	it("shows \"No health data available.\" when there are no health history data", () => {
		expect(screen.getByText("No health data available.")).toBeInTheDocument();
	});

	it("shows \"No assigned users.\" when there are no assigned users for the asset", () => {
		expect(screen.getByText("No assigned users.")).toBeInTheDocument();
	});

	it("shows \"No work order for this Asset\" when there are no work orders for the asset", () => {
		expect(screen.getByText("No Workorder for this Asset")).toBeInTheDocument();
	});

});
