import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {

	return (
		<>
			<ChakraProvider>
				<Sidebar>
					<Outlet />
				</Sidebar>
			</ChakraProvider>
		</>
	);
}

export default App;
