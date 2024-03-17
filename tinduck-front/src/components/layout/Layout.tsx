import React from "react"
import {Navigate, Outlet} from "react-router-dom"
import {FooterNav} from "./components/FooterNav.tsx"
import {useAuth} from "../../hooks/useAuth.tsx"
import {Header} from "./components/Header.tsx"

export const Layout: React.FC = () => {
  const isAuth: boolean = useAuth()

  return isAuth ? (
    <div className="flex flex-col h-full w-full max-w-[768px] mx-auto container-app">
      <Header></Header>
      <div className="container-page flex-1 flex flex-col h-full">
        <Outlet></Outlet>
      </div>
      <FooterNav></FooterNav>
    </div>
  ) : (
    <Navigate to={"/login"}></Navigate>
  )
}
