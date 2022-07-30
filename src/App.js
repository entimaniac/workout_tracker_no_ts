import React from 'react';
import {Clock} from "./components/clock/Clock";
import {Container, createTheme, CssBaseline, Divider, ThemeProvider} from "@mui/material";
import {MenuBar} from "./components/header/MenuBar";
import {WorkoutLayout} from "./layout/WorkoutLayout";
import {Footer} from "./components/footer/Footer";
import {ExerciseManagementModal} from "./components/management/ExerciseManagementModal";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiButton: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiIconButton: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiListItem: {
                defaultProps: {
                    dense: true,
                },
            },
            MuiTable: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTableRow: {
                hover: true,
                defaultProps: {
                    hover: true
                }
            },
        }
    });
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Container disableGutters={true} maxWidth={"xl"}>
                    <MenuBar/>
                    <Clock/>
                    <Divider/>
                    <ExerciseManagementModal/>
                    <WorkoutLayout/>
                    <Footer/>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
