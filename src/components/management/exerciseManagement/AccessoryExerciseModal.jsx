import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppData } from "../../../context/AppDataContext";
import { ACCESSORY_CATEGORY_LABELS } from "../../../context/ContextUtils";
import { useUiState } from "../../../context/UiContext";

const ExerciseListSection = ({ title, description, exercises, onSelect }) => {
  if (exercises.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      {description ? (
        <Typography color="text.secondary" sx={{ mb: 1 }} variant="body2">
          {description}
        </Typography>
      ) : null}
      <List disablePadding>
        {exercises.map((exercise) => (
          <ListItem key={exercise.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => onSelect(exercise.id)}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={exercise.name}
                secondary={ACCESSORY_CATEGORY_LABELS[exercise.category] || "Accessory"}
              />
              {exercise.origin === "custom" ? (
                <Chip label="Custom" size="small" />
              ) : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const AccessoryExerciseModal = () => {
  const {
    accessoryLibraryExercises = [],
    suggestedAccessoryExercises = [],
    addExerciseFromLibrary,
    createCustomAccessoryExercise,
  } = useAppData();
  const { openAccessoryExerciseModal, setOpenAccessoryExerciseModal } =
    useUiState();
  const [searchTerm, setSearchTerm] = useState("");
  const [customExerciseName, setCustomExerciseName] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredSuggestedExercises = useMemo(() => {
    return suggestedAccessoryExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [normalizedSearchTerm, suggestedAccessoryExercises]);

  const filteredLibraryExercises = useMemo(() => {
    return accessoryLibraryExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [accessoryLibraryExercises, normalizedSearchTerm]);

  const handleClose = () => {
    setOpenAccessoryExerciseModal(false);
    setSearchTerm("");
    setCustomExerciseName("");
  };

  const handleSelectExercise = (exerciseId) => {
    addExerciseFromLibrary(exerciseId);
    handleClose();
  };

  const handleCreateExercise = () => {
    createCustomAccessoryExercise(customExerciseName);
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openAccessoryExerciseModal}
      onClose={handleClose}
    >
      <DialogTitle>Add Accessory Exercise</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            label="Search exercises"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <ExerciseListSection
            title="Suggested For This Split"
            description="These are common 5/3/1-style accessories matched to your current split."
            exercises={filteredSuggestedExercises}
            onSelect={handleSelectExercise}
          />

          <Divider />

          <ExerciseListSection
            title="Saved Exercises"
            description="Choose from the core exercise library or any custom exercises you add."
            exercises={filteredLibraryExercises}
            onSelect={handleSelectExercise}
          />

          <Divider />

          <Box>
            <Typography variant="h6">Create New Exercise</Typography>
            <Typography color="text.secondary" sx={{ mb: 1 }} variant="body2">
              Add a custom accessory and save it for future sessions.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Exercise name"
                value={customExerciseName}
                onChange={(event) => setCustomExerciseName(event.target.value)}
              />
              <Button
                variant="contained"
                disabled={!customExerciseName.trim()}
                onClick={handleCreateExercise}
              >
                Create And Add
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
