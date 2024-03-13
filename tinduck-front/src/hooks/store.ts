import {AppDispatch, RootState} from "../store/store.ts"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useIsAuth = () => {
  return useAppSelector((state) => state.auth)
}
