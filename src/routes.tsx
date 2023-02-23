import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { HomePage, SobrePage } from "@/pages";

const Routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomePage />}>
            <Route path="sobre" element={<SobrePage />} />
        </Route>
    )
);

export default Routes;
