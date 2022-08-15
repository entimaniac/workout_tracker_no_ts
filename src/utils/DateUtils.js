
/* Takes date or date-string and converts it into this format:
* YYYY.MM.DD
* Because it looks cool and is practical.
* */
export const getDateString = (date) => {
    if (!date) {
        return "";
    }

    if (typeof date === "string"){
        date = new Date(date)
    }

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = (month>9 ? '' : '0') + month;
    let day = date.getUTCDate();
    day = (day>9 ? '' : '0') + day;
    return [year, month, day ].join('.');
}