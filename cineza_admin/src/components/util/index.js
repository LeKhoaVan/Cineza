
const formatDateHandle = (inputDate) => {
    // Create a new Date object from the input date string
    const date = new Date(inputDate);

    // Get day, month, and year components
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = date.getUTCFullYear();

    // Format the date as dd-MM-yyyy
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

const formatFromObjectToDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

// const formatFromDatetoObject = (inputStringDate) => {
//     const parsedDate = parse(inputStringDate, 'dd-MM-yyyy', new Date());
//     const formattedDate = format(parsedDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zz)", {
//         timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ của Việt Nam
//     });
//     return formattedDate;
// }

module.exports = {
    formatDateHandle,
    formatFromObjectToDate,
    // formatFromDatetoObject
};
