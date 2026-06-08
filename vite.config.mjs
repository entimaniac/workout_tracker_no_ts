import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const productionBase = "/workout_tracker_no_ts/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? productionBase : "/",
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
    }),
  ],
  test: {
    environment: "node",
    globals: true,
  },
}));
