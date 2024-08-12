import React, { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
    return (
        <div className="">
            <Routes>
                <Route>
                    <Route path="/" element={<Home/>} />
                </Route>
                <Route>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;