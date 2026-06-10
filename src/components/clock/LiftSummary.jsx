import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useAppData } from "../../context/AppDataContext";
import { calculateWorkingMax } from "../../context/ContextUtils";

export const LiftSummary = () => {
  const { liftOrder, liftProfiles, formatWeight } = useAppData();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        px: 2,
        pb: 2,
      }}
    >
      {liftOrder.map((liftId) => {
        const liftProfile = liftProfiles[liftId];
        const workingMax = calculateWorkingMax(liftProfile.oneRepMax);

        return (
          <Paper
            key={liftId}
            sx={{
              flex: "1 1 0",
              minWidth: 0,
              p: 2,
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h6">{liftProfile.name}</Typography>
              <Typography variant="body2">
                1RM: {formatWeight(liftProfile.oneRepMax)} lb
              </Typography>
              <Typography color="text.secondary" variant="body2">
                90% Max: {formatWeight(workingMax)} lb
              </Typography>
            </Stack>
          </Paper>
        );
      })}
    </Box>
  );
};
