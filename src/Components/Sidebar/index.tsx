/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiUser } from "react-icons/fi";
import { Layout, Menu } from "antd";
import { IconType } from "react-icons";
import { ReactText } from "react";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: "Dashboard", icon: FiTrendingUp, path: "/" },
	{ name: "Assets", icon: FiSettings, path: "/asset" },
	{ name: "Company", icon: FiCompass, path: "/company" },
	{ name: "Users", icon: FiUser, path: "/users" }
];

export default function Sidebar({ children }: { children: ReactNode }) {
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = (collapsed: boolean) => {
		setCollapsed(collapsed);
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div style={{ height: "32px", margin: "16px", background: "rgba(255, 255, 255, 0.3)" }} />
				<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
					{LinkItems.map((link, index) => (
						<Menu.Item key={index} icon={<link.icon />}>
							<NavLink to={link.path}>{link.name}</NavLink>
						</Menu.Item>
					))}
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Content style={{ margin: "16px" }}>
					<div style={{ padding: 24, minHeight: 360 }}>{children}</div>
				</Content>
			</Layout>
		</Layout>
	);
}

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  children: ReactText;
  path: string;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
	return (
		<SubMenu
			key="sub1"
			//@ts-ignore
			icon={icon}
			title={
				<NavLink to={path}>
					{children}
				</NavLink>
			}
		>
			{/* Submenu items goes here */}
		</SubMenu>
	);
};
