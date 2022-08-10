import React, {useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Slide,
    Typography
} from "@mui/material";
import {AppContext} from "../../../context/AppContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from '@mui/icons-material/Close';
import {DownloadData} from "./DownloadData";
import {UploadData} from "./UploadData";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export const AppDataManagementModal = () => {
    const {openAppDataManagementModal, setOpenAppDataManagementModal, appData, setAppData} = React.useContext(AppContext);
    const [uploadData, setUploadData] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleConfirmOpen = () => {
        setOpen(true);
    };

    const handleConfirmClose = () => {
        setOpen(false);
    };


    const handleOpen = () => setOpenAppDataManagementModal(true);
    const handleClose = () => setOpenAppDataManagementModal(false);


    const handleSave = () => {

        if (uploadData === null){
            console.log("data cannot be null");

        } else {
            console.log("confirmed");
            setAppData(uploadData)
            handleConfirmClose();
        }

    }


    return (
        <>
            <Dialog
                fullScreen
                open={openAppDataManagementModal}
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
                            Manage Application Data
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DownloadData/>
                <UploadData setData={setUploadData}/>
                {<div>
                    <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                </div>}

                <Button variant="outlined" onClick={handleConfirmOpen}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>
                        {"Are you sure you want to override the app data?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This deletes everything and unless you
                            backed up first, is irreversible.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmClose}>Nevermind</Button>
                        <Button onClick={handleSave}>
                            I know what I'm about.
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        </>
    );
}

