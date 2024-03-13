import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/styles/index.css"
import {RouterProvider} from "react-router-dom"
import {router} from "./routes/router.tsx"
import {Provider} from "react-redux"
import store from "./store/store.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
