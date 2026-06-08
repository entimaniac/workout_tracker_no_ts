import React from 'react';
import {Clock} from "./components/clock/Clock";
import {Container, createTheme, CssBaseline, Divider, ThemeProvider} from "@mui/material";
import {MenuBar} from "./components/header/MenuBar";
import {WorkoutLayout} from "./layout/WorkoutLayout";
import {Footer} from "./components/footer/Footer";
import {ExerciseManagementModal} from "./components/management/exerciseManagement/ExerciseManagementModal";
import Box from "@mui/material/Box";
import {AppDataManagementModal} from "./components/management/appDataManagement/AppDataManagementModal";

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
                    <Box sx={{mb:10}}>
                        <Clock/>
                        <Divider/>
                        <ExerciseManagementModal/>
                        <AppDataManagementModal />
                        <WorkoutLayout/>
                    </Box>
                    <Footer/>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
