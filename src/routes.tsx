import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import { HomePage, NiveisPage, SobrePage, Nivel1 } from "@/pages";

const Routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/niveis" element={<NiveisPage />} />
            <Route path="/niveis/1" element={<Nivel1 />} />
        </>
    )
);

export default Routes;
