import React from "react";
import {
  Button,
  Checkbox,
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppData } from "../../context/AppDataContext";
import { formatPercentage } from "../../context/ContextUtils";
import { DeleteConfirm } from "../shared/input/DeleteConfirm";

const MainLiftCard = ({ exercise }) => {
  const { addSet, updateSet, deleteSet, toggleSetComplete, formatWeight } =
    useAppData();

  const handleUpdateSet = (setId, field, value) => {
    updateSet(exercise.id, setId, field, value);
  };

  const handleToggleComplete = (setId) => {
    toggleSetComplete(exercise.id, setId);
  };

  const handleDeleteSet = (setId) => {
    deleteSet(exercise.id, setId);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h5">{exercise.name}</Typography>
          <Typography variant="body2">
            1RM: {formatWeight(exercise.oneRepMaxSnapshot)} lb
          </Typography>
          <Typography variant="body2">
            Working Max (90%): {formatWeight(exercise.workingMaxSnapshot)} lb
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Set weights are rounded to the nearest 5 lb.
        </Typography>
      </Stack>

      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Done</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight (lb)</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(exercise.sets.setList).map((set) => (
              <TableRow
                key={set.id}
                sx={{
                  opacity: set.isComplete ? 0.7 : 1,
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={Boolean(set.isComplete)}
                    onChange={() => handleToggleComplete(set.id)}
                  />
                </TableCell>
                <TableCell>{formatPercentage(set.percentage)}</TableCell>
                <TableCell>{set.prescribedReps || "-"}</TableCell>
                <TableCell>
                  <TextField
                    disabled={set.isComplete}
                    value={set.reps}
                    variant="standard"
                    type="number"
                    onChange={(event) =>
                      handleUpdateSet(set.id, "reps", event.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    disabled={set.isComplete}
                    value={set.weight}
                    variant="standard"
                    type="number"
                    onChange={(event) =>
                      handleUpdateSet(set.id, "weight", event.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  {set.isExtra ? (
                    <DeleteConfirm onClick={() => handleDeleteSet(set.id)} />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Button onClick={() => addSet(exercise.id)} startIcon={<AddIcon />}>
                  Add Set
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export const MainLiftSection = () => {
  const { mainExercises } = useAppData();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Main Lifts</Typography>
      {mainExercises.map((exercise) => (
        <MainLiftCard key={exercise.id} exercise={exercise} />
      ))}
    </Stack>
  );
};
