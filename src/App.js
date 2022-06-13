import React from 'react';
import {WorkoutTable} from "./components/WorkoutTable";
import {Clock} from "./components/Clock";
import {Container, createTheme, CssBaseline, Divider, ThemeProvider} from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
      <>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Container disableGutters={true} maxWidth={"xl"}>
            <Clock/>
            <Divider/>
            <WorkoutTable/>
          </Container>

        </ThemeProvider>
      </>
  );
}

export default App;
