import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { WorkOrderProvider } from "./context/workordersContext";
import { AssetProvider } from "./context/assetsContext";
import { UnitProvider } from "./context/unitsContext";
import { CompanyProvider } from "./context/companiesContext";
import { UserProvider } from "./context/usersContext";

function App() {

	return (
		<>
			<ChakraProvider>
				<WorkOrderProvider>
					<AssetProvider>
						<UnitProvider>
							<CompanyProvider>
								<UserProvider>
									<Sidebar>
										<Outlet />
									</Sidebar>
								</UserProvider>
							</CompanyProvider>
						</UnitProvider>
					</AssetProvider>
				</WorkOrderProvider>
			</ChakraProvider>
		</>
	);
}

export default App;
