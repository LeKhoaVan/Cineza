const formatDate = (inputDate) => {
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

export default formatDate;
// const dateStr = "2000-12-12T00:00:00.000Z";
// const formattedDate = formatDate(dateStr);
// console.log(formattedDate); // Output: "12-12-2000"