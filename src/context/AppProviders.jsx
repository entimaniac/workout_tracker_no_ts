import React from "react";
import { AppDataProvider } from "./AppDataContext";
import { UiProvider } from "./UiContext";

export const AppProviders = ({ children }) => {
  return (
    <UiProvider>
      <AppDataProvider>{children}</AppDataProvider>
    </UiProvider>
  );
};
