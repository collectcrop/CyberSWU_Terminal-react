import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import axios from "axios";
import Article from "@page/Article"
import Login from "@page/Login"
import Games from "@page/Games"
import Training from "@page/Training"
import TrainingCategory from "@page/Training/TrainingCategory"
import Layout from "@page/Layout"
import Knowledge from "@page/Knowledge"
import Bulletin from "@page/Bulletin"
import NotFound from "@page/NotFound"
import Home from "@page/Home"
import Register from "@page/Register"
import Forget from "@page/Forget"
import ResetPassword from "@page/ResetPassword"
import UserSettings from "@page/UserSettings";
import Dashboard from "@page/Dashboard";
import BulletinManage from "@page/Dashboard/BulletinManage";
import ChallengeManage from "@page/Dashboard/ChallengeManage";
import App from "../App";

const AppRouter = () => {
    const [routerConfig, setRouterConfig] = useState([]);
  
    useEffect(() => {
      const fetchRoutes = async () => {
        try {
          // // 从后端获取目录树数据的请求
          // const response = await axios.get("http://127.0.0.1:5000/api/knowledge");
          // const data = response.data;
  
          // // 处理数据，将目录树转换为路由配置
          // const knowledgeRoutes = processTreeData(data);
          
          // 组装最终路由配置
          setRouterConfig([
            {
              path: "/",
              element: (
                  <Layout />
              ),
              children: [
                { index: true, element: <Home /> },
                {
                  path: "/knowledge",
                  element: <Knowledge />,
                  children: [{
                    path: "/knowledge/:articleId",
                    element: <Article />,  // 动态加载文章页面
                  }],  // 动态加载的子路由
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                  path: "/register",
                  element: <Register />
                },
                {
                  path: "/forget",
                  element: <Forget />
                },
                {
                  path: "/reset-password/:token",
                  element: <ResetPassword />
                },
                {
                  path: "/UserSettings",
                  element: <UserSettings />
                },
                {
                    path: "/games",
                    element: <Games />
                },
                {
                    path: "/training",
                    element: <Training />,
                },
                {
                  path: "/training/:categoryId",
                  element: <TrainingCategory />
                },
                {
                  path: "/admin/dashboard",
                  element: <Dashboard />,
                  children:[{
                    path: "/admin/dashboard/challenge-manage",
                    element: <ChallengeManage />
                    },
                    {
                    path: "/admin/dashboard/bulletin-manage",
                    element: <BulletinManage />
                    }
                  ]
                },
                {
                    path: "/bulletin",
                    element: <Bulletin />
                }
              ],
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ]);
        } catch (error) {
          console.error("Failed to fetch route data", error);
        }
      };
  
      fetchRoutes();
    }, []);
  
    return routerConfig.length > 0 ? (
        <RouterProvider router={createBrowserRouter(routerConfig)} />
    ) : (
        <div>{console.log(routerConfig)}</div>  // 等待路由配置加载完成
        
    );
  };
  
  export default AppRouter;