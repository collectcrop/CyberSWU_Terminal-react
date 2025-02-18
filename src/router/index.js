import Login from "@page/Login"
import Games from "@page/Games"
import Training from "@page/Training"
import Layout from "@page/Layout"
import Knowledge from "@page/Knowledge"
import Bulletin from "@page/Bulletin"
import NotFound from "@page/NotFound"
import Home from "@page/Home"

import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/games",
                element: <Games />
            },
            {
                path: "/training",
                element: <Training />
            },
            {
                path: "/knowledge",
                element: <Knowledge />
            },
            {
                path: "/bulletin",
                element: <Bulletin />
            }
        ]
    },
    
    {
        path: "*",
        element: <NotFound />
    }
])

export default router