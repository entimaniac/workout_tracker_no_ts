import React, { createContext, useContext, useState } from "react";

const UiContext = createContext(null);

export const UiProvider = ({ children }) => {
  const [openExerciseManagementModal, setOpenExerciseManagementModal] =
    useState(false);
  const [openAppDataManagementModal, setOpenAppDataManagementModal] =
    useState(false);
  const [openAccessoryExerciseModal, setOpenAccessoryExerciseModal] =
    useState(false);

  return (
    <UiContext.Provider
      value={{
        openExerciseManagementModal,
        setOpenExerciseManagementModal,
        openAppDataManagementModal,
        setOpenAppDataManagementModal,
        openAccessoryExerciseModal,
        setOpenAccessoryExerciseModal,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiState = () => {
  const contextValue = useContext(UiContext);

  if (!contextValue) {
    throw new Error("useUiState must be used within a UiProvider.");
  }

  return contextValue;
};
