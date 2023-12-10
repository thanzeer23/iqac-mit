import React, { useEffect, useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Content from "./content/Content";
import Login from "./admin/login/Login";
import AdminDashBoard from "./admin/Dashboard/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { ProtectedRouter } from "./Helper/ProtectedRoute";
import { LogoutProtector } from "./Helper/LogoutProtector";
import Create from "./admin/Dashboard/CRUD/CreatePage";
import CreateSection from "./admin/Dashboard/CRUD/CreateSection";
import EditSection from "./admin/Dashboard/CRUD/EditSection";
import EditPage from "./admin/Dashboard/EditPage";
import EditPageId from "./admin/Dashboard/EditPageId";
import NotFound from "./404/NotFound";
import RouteProtect from "./admin/Dashboard/RouteProtect";
import { LoadingProvider } from "./context/context";

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <LoadingProvider>
      <Routes>
        {/* public route */}

        <Route path="/" element={<Home user={user} />}>
          <Route path="/details/:id" element={<Content />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route
          path="admin/login"
          element={
            !isFetching && (
              <LogoutProtector user={user}>
                <Login />
              </LogoutProtector>
            )
          }
        />

        {/* private route */}
        <Route
          element={
            !isFetching && (
              <ProtectedRouter user={user}>
                <AdminDashBoard user={user} />
              </ProtectedRouter>
            )
          }
        >
          <Route path="/admin/create-page" element={<Create />} />
          <Route path="/admin/edit-page" element={<EditPage />} />
          <Route path="/admin/sections-protect" element={<RouteProtect />} />

          <Route path="/admin/edit-page/:id" element={<EditPageId />} />
          <Route path="/admin/sections" element={<CreateSection />} />
          <Route path="/admin/sections-edit" element={<EditSection />} />
        </Route>
      </Routes>
    </LoadingProvider>
  );
};

export default App;
