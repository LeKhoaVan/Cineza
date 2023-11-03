const formatDateHandle = (inputDate) => {
  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Get day, month, and year components
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const year = date.getUTCFullYear();
  const hour = String(date.getUTCHours()).padStart(2, "0");

  // Format the date as dd-MM-yyyy
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const formatTimeHandle = (inputDate) => {
  const date = new Date(inputDate);

  const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedResult = new Intl.DateTimeFormat("en-US", options).format(
    date
  );

  const arrInput = formattedResult.split(",");
  const arrRight = arrInput[1].split(":");
  const hour = arrRight[0];
  const minute = arrRight[1];

  // Format the time hh:mm
  const formattedTime = `${hour}:${minute}`;
  return formattedTime;
};

const formatFromObjectToDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

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
  formatTimeHandle,
  // formatFromDatetoObject
};
