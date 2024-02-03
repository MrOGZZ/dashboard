import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "./providers/data";
import {Home, ForgotPassword, Login, Register, WebsiteLinks} from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/auth";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/website/create";
import Edit from "./pages/website/edit";



function App() {
  return (
    <BrowserRouter>
        <GitHubBanner />
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "5byDQt-nJyzEL-bjbyNS",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element ={<Register />} />
                  <Route path="login" element ={<Login />} />
                  <Route path="forgot-password" element ={<ForgotPassword />} />
                  <Route
                element={
                <Authenticated
                  key="authenticated-layout"
                  fallback={<CatchAllNavigate to="/login"/>}
                >
                  <Layout>
                    <Outlet /> 
                  </Layout>
                </Authenticated>
                }>
                  <Route index element ={<Home />} />
                  <Route path="/WebsiteLinks">
                    <Route index element={<WebsiteLinks/>}/>
                    <Route path="new" element={<Create/>}/>
                    <Route path="edit/:id" element={<Edit/>}/>
                    </Route>
                 </Route>
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
    </BrowserRouter>
  );
}

export default App;
