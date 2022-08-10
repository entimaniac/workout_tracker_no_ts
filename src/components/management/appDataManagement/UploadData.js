export const UploadData = ({setData}) => {
    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            let json = JSON.parse(e.target.result)
            console.log("e.target.result", json);

            setData(json);
        };
    };

    return (
        <>
            <input type="file" onChange={handleChange}/>
        </>
    );
}