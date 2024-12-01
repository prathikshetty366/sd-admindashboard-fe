"use client";

import { getUserById } from "@/app/services/auth";
import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownLabel,
} from "@/components/dropdown";
import { Navbar, NavbarSection, NavbarSpacer } from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
  SidebarHeading,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  HomeIcon,
  TicketIcon,
  PlusIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  Square2StackIcon,
} from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";

function AccountDropdownMenu({ anchor }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <Cog8ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({ events, children }) {
  let pathname = usePathname();
 const [userInfo,setUserInfo] =useState({})
 const fetchUserInfo=async()=>{
  try {
    
    const user = await getUserById()
    if(user?.data){
      setUserInfo(user?.data)
    }
  } catch (error) {
    console.log(error,">>>>>>")
  }
 }
 useEffect(()=>{
fetchUserInfo()
 },[])
  return (
    <div>
      <SidebarLayout
        navbar={
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <Dropdown>
                <DropdownButton as="div">
                  <Avatar src="/users/erica.jpg" square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <Avatar src="/teams/logo.png" />
                  <SidebarLabel>Spannerdoor</SidebarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu
                  className="min-w-80 lg:min-w-64"
                  anchor="bottom start"
                >
                  <DropdownItem href="/allapps">
                    <Cog8ToothIcon />
                    <DropdownLabel>All Apps</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="#">
                    <PlusIcon />
                    <DropdownLabel>New team&hellip;</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SidebarHeader>

            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/" current={pathname === "/"}>
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/orders"
                  // current={pathname.startsWith("/orders")}
                  current="/orders"
                >
                  <TicketIcon />
                  <SidebarLabel>Orders</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/customer"
                  // current={pathname.startsWith("/customer")}
                  current="/customer"
                >
                  <TicketIcon />
                  <SidebarLabel>Customer</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/vehicles"
                  // current={pathname.startsWith("/vehicles")}
                  current="/vehicles"
                >
                  <TicketIcon />
                  <SidebarLabel>Vehicles</SidebarLabel>
                </SidebarItem>
              </SidebarSection>

              <SidebarSection>
                <SidebarHeading>Other Settings</SidebarHeading>
                <SidebarItem
                  href="/useraccess"
                  // current={pathname.startsWith("/useraccess")}
                  current="/useraccess"
                >
                  <Cog8ToothIcon />
                  <SidebarLabel>Access Management</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/reports"
                  // current={pathname.startsWith("/reports")}
                  current="/reports"
                >
                  <Square2StackIcon />
                  <SidebarLabel>Reports</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/settings"
                  // current={pathname.startsWith("/settings")}
                  current="/settings"
                >
                  <Cog6ToothIcon />
                  <SidebarLabel>Settings</SidebarLabel>
                </SidebarItem>
              </SidebarSection>

              <SidebarSpacer />
            </SidebarBody>

            <SidebarFooter>
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar src="" className="size-10" square />
                    <span>
                      <span className="block text-sm font-medium">{userInfo.firstName}</span>
                      <span className="block text-xs">
                      {userInfo.email}
                      </span>
                    </span>
                  </span>
                  <ChevronUpIcon />
                </DropdownButton>
                <AccountDropdownMenu anchor="top start" />
              </Dropdown>
            </SidebarFooter>
          </Sidebar>
        }
      >
        {children}
      </SidebarLayout>
    </div>
  );
}
