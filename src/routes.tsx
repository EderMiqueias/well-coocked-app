import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { HomePage, NiveisPage, SobrePage } from "@/pages";

const Routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/niveis" element={<NiveisPage />} />
        </>
    )
);

export default Routes;
