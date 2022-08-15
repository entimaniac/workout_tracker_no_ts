import {getDateString} from "./DateUtils";

test('getDateString can handle null inputs', () => {
    let result = getDateString(null);
    expect(result).toEqual("");
});

test('getDateString can handle empty inputs', () => {
    let result = getDateString("");
    expect(result).toEqual("");
});

test('getDateString can handle string inputs', () => {
    let result = getDateString("2022-08-15");
    expect(result).toEqual("2022.08.15");
});

test('getDateString can handle date inputs', () => {
    let date = new Date("2022-08-15");
    let result = getDateString(date);
    expect(result).toEqual("2022.08.15");
});