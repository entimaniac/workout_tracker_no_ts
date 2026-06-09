import React from "react";
import {
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
import { useAppData } from "../../context/AppDataContext";

const MainLiftCard = ({ exercise }) => {
  const { updateSet, formatWeight } = useAppData();

  const handleUpdateSet = (setId, field, value) => {
    updateSet(exercise.id, setId, field, value);
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
              <TableCell>%</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight (lb)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(exercise.sets.setList).map((set) => (
              <TableRow key={set.id}>
                <TableCell>{set.percentage}%</TableCell>
                <TableCell>{set.prescribedReps}</TableCell>
                <TableCell>
                  <TextField
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
                    value={set.weight}
                    variant="standard"
                    type="number"
                    onChange={(event) =>
                      handleUpdateSet(set.id, "weight", event.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
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
