import React from "react"
import {Navigate, Outlet} from "react-router-dom"
import {GiPlasticDuck} from "react-icons/gi"
import {useAuth} from "../../hooks/useAuth.tsx"

export const AuthLayout: React.FC = () => {
  const isAuth: boolean = useAuth()

  return !isAuth ? (
    <div className="h-full flex flex-col item-center justify-center">
      <div>
        <div className="text-[50px] text-center py-[15px] my-auto mx-auto w-full font-black text-[#535bf2] flex flex-row items-center justify-center gap-[5px] rounded-b-sm overflow-hidden">
          <p>TinDuck</p>
          <div>
            <GiPlasticDuck className="mt-[-20px]" size={"40px"} />
          </div>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
      <p className="my-[20px] text-slate-400 italic text-sm text-center">
        все права... кря-кря <br />
        prod by ducat.
      </p>
    </div>
  ) : (
    <Navigate to={"/"} replace></Navigate>
  )
}
