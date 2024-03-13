import React from "react"
import {Navigate, Outlet} from "react-router-dom"
import {FooterNav} from "./FooterNav.tsx"
import {useAuth} from "../../hooks/useAuth.tsx"
import {Header} from "./Header.tsx"

export const Layout: React.FC = () => {
  const isAuth: boolean = useAuth()

  return isAuth ? (
    <div
      className={
        "flex flex-col h-full w-full max-w-[768px] mx-auto container-app"
      }
    >
      <div className={"z-20 w-full fixed top-[0px] container-app"}>
        <Header></Header>
      </div>
      <div className={"container-page flex-1 flex flex-col h-full"}>
        <Outlet></Outlet>
      </div>
      <div className={"z-20 w-full fixed bottom-[0] container-app"}>
        <FooterNav></FooterNav>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"}></Navigate>
  )
}
