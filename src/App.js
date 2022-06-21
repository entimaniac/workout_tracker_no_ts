import React from 'react';
import {ExerciseTable} from "./components/exercises/ExerciseTable";
import {Clock} from "./components/Clock";
import {Container, createTheme, CssBaseline, Divider, ThemeProvider} from "@mui/material";
import {MenuBar} from "./components/header/MenuBar";

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
                    <MenuBar/>
                    <Clock/>
                    <Divider/>
                    <ExerciseTable/>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
