import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import {
    HomePage,
    NiveisPage,
    SobrePage,
    Nivel1,
    Nivel2,
    Nivel3
} from "@/pages";

const Routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/niveis" element={<NiveisPage />} />
            <Route path="/niveis/1" element={<Nivel1 />} />
            <Route path="/niveis/2" element={<Nivel2 />} />
            <Route path="/niveis/3" element={<Nivel3 />} />
        </>
    )
);

export default Routes;
