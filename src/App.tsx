/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import WikiList from "./pages/WikiList";
import WikiNode from "./pages/WikiNode";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Offerings from "./pages/Offerings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="wiki" element={<WikiList />} />
          <Route path="wiki/:id" element={<WikiNode />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="offerings" element={<Offerings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
