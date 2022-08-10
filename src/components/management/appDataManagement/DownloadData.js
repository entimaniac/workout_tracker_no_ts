import Button from "@mui/material/Button";
import {AppContext} from "../../../context/AppContext";
import {useContext} from "react";

export const DownloadData = () => {
    const { appData } = useContext(AppContext);

    const downloadFile = () => {

        // create file in browser
        const fileName = "workoutAppData";
        const json = JSON.stringify(appData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTML element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    return (
        <>
            <Button onClick={downloadFile} > "download the data</Button>
        </>
    );
}