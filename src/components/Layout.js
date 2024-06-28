"use client";

import React from "react";
import { ThemeProvider } from "../components/MaterialTailwind";

function Layout({ children }) {
  return React.createElement(ThemeProvider, null, children);
}

export default Layout;
