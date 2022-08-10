import React, {useEffect, useState} from 'react';
import {Dialog, IconButton, ListItem, Slide, TextField, Typography} from "@mui/material";
import {AppContext} from "../../../context/AppContext";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from '@mui/icons-material/Close';
import List from "@mui/material/List";
import {extractExercises, findUniqueExercises} from "./ManagementUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const UniqueInput = ({originalName, update}) => {
    const [updatedName, setUpdatedName] = useState(originalName);

    const handleChange = (e) => {
        setUpdatedName(e.target.value);
    }

    const handleSave = () => {
        update(originalName, updatedName);
    }

    return (
        <>
            <TextField sx={{m: 2}}
                       value={updatedName}
                       variant="standard"
                       onChange={handleChange}
            />
            <Button onClick={handleSave}> save</Button>
        </>
    )
};

export const ExerciseManagementModal = () => {
    const {openExerciseManagementModal, setOpenExerciseManagementModal, appData, updateExercise} = React.useContext(AppContext);
    const [allExercises, setAllExercises] = useState(extractExercises(appData) || []);
    const [uniqueExercises, setUniqueExercises] = useState(findUniqueExercises(allExercises) || []);

    const handleOpen = () => setOpenExerciseManagementModal(true);
    const handleClose = () => setOpenExerciseManagementModal(false);

    useEffect(() => {
        if (openExerciseManagementModal) {
            setAllExercises(extractExercises(appData))
        }
    }, [openExerciseManagementModal]);

    useEffect(() => {
        setUniqueExercises(findUniqueExercises(allExercises))
    }, [allExercises]);

    const handleRefresh = () => {
        setAllExercises(extractExercises(appData));
    };

    const updateName = (originalName, updatedName) => {
        console.log(originalName)
        console.log(updatedName)
        for (let ex of allExercises){
            if(ex.name === originalName){
                console.log(ex)

                updateExercise(ex.id, "name", updatedName,ex.workoutId)
            }
        }
    }

    return (
        <>
            <Dialog
                fullScreen
                open={openExerciseManagementModal}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Manage Exercises
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleRefresh}>
                            refresh
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {Object.values(uniqueExercises)?.map((exercise) => (
                        <ListItem key={exercise}>
                            <UniqueInput originalName={exercise} update={updateName}/>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </>
    );
}

