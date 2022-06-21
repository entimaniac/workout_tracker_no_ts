import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Divider} from "@mui/material";

export const SideMenu = () => {
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <Button onClick={() => toggleOpen()}>menu</Button>
            <Drawer
                open={open}
                onClose={toggleOpen}
            >
                <List>
                    <ListItem >
                        <ListItemText primary={"Hii"}/>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={"previous workouts\n"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={"previous workouts\n"}/>
                        </ListItemButton>
                    </ListItem>
                </List>


            </Drawer>
        </>
    );
}
