import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import { useAppData } from "../../../context/AppDataContext";
import { useUiState } from "../../../context/UiContext";
import { calculateEstimatedOneRepMax } from "../../../context/ContextUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const LiftMaxRow = ({ liftProfile, updateLiftMax, formatWeight }) => {
  const [nextMax, setNextMax] = useState(liftProfile.oneRepMax);
  const [estimateWeight, setEstimateWeight] = useState("");
  const [estimateReps, setEstimateReps] = useState("");
  const recentLogEntries = liftProfile.log.slice().reverse().slice(0, 4);

  useEffect(() => {
    setNextMax(liftProfile.oneRepMax);
  }, [liftProfile.oneRepMax]);

  const estimatedMax = calculateEstimatedOneRepMax(estimateWeight, estimateReps);

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h6">{liftProfile.name}</Typography>
            <Typography variant="body2">
              Working Max (90%): {formatWeight(liftProfile.oneRepMax * 0.9)} lb
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
            <TextField
              label="1RM"
              type="number"
              value={nextMax}
              onChange={(event) => setNextMax(event.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => updateLiftMax(liftProfile.id, nextMax)}
            >
              Save
            </Button>
          </Stack>
        </Stack>
        <Box>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
            Estimate 1RM from a completed set
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: { xs: "stretch", md: "flex-end" } }}
          >
            <TextField
              label="Weight"
              type="number"
              value={estimateWeight}
              onChange={(event) => setEstimateWeight(event.target.value)}
            />
            <TextField
              label="Reps"
              type="number"
              value={estimateReps}
              onChange={(event) => setEstimateReps(event.target.value)}
            />
            <TextField
              label="Estimated 1RM"
              value={estimatedMax ? `${formatWeight(estimatedMax)} lb` : ""}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <Button
              variant="outlined"
              disabled={!estimatedMax}
              onClick={() => setNextMax(estimatedMax)}
            >
              Use Estimate
            </Button>
          </Stack>
          <Typography color="text.secondary" variant="caption" sx={{ mt: 1, display: "block" }}>
            Uses the Epley formula. A single rep uses the lifted weight directly.
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography color="text.secondary" variant="body2">
        Recent max log
      </Typography>
      {recentLogEntries.length === 0 ? (
        <Typography color="text.secondary" variant="body2">
          No logged maxes yet.
        </Typography>
      ) : (
        recentLogEntries.map((entry) => (
          <Typography key={entry.id} variant="body2">
            {new Date(entry.dateCreated).toLocaleDateString()} - {formatWeight(entry.oneRepMax)} lb
          </Typography>
        ))
      )}
    </Paper>
  );
};

export const ExerciseManagementModal = () => {
  const { liftProfiles, liftOrder, updateLiftMax, formatWeight } = useAppData();
  const { openExerciseManagementModal, setOpenExerciseManagementModal } =
    useUiState();

  const handleClose = () => setOpenExerciseManagementModal(false);

  return (
    <Dialog
      fullScreen
      open={openExerciseManagementModal}
      onClose={handleClose}
      slots={{ transition: Transition }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Main Lift Maxes
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ p: 2 }}>
        {liftOrder.map((liftId) => (
          <ListItem key={liftId} disablePadding sx={{ mb: 2 }}>
            <LiftMaxRow
              liftProfile={liftProfiles[liftId]}
              updateLiftMax={updateLiftMax}
              formatWeight={formatWeight}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
