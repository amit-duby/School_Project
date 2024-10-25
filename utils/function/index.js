const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function __generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function __formatDate(date) {
  let inputDate = new Date(date);
  if (!(inputDate instanceof Date)) {
    throw new Error("Input must be a valid Date object");
  }

  const day = inputDate.getDate().toString().padStart(2, "0");

  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours() % 12 || 12;
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const ampm = inputDate.getHours() >= 12 ? "PM" : "AM";

  const formattedDate = `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}
export function formatDateToISO(dateInput) {
  // Create a Date object from the input
  const inputDate = new Date(dateInput);
  if (isNaN(inputDate.getTime())) {
    throw new Error("Input must be a valid date string or Date object");
  }

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const day = inputDate.getDate().toString().padStart(2, "0");

  // Format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
// Example usage:
// const formatted = formatDateToISO("2024-07-20");
// console.log(formatted); // Output: "2024-07-20"

export function convertDateFormat(dateString) {
  // Validate and split the input date string
  const parts = dateString.split("/");

  // Check if the input has exactly 3 parts (mm, dd, yyyy)
  if (parts.length !== 3) {
    throw new Error("Input must be in MM/DD/YYYY format");
  }

  // Extract month, day, and year from the parts
  const month = parts[0].padStart(2, "0"); // MM
  const day = parts[1].padStart(2, "0"); // DD
  const year = parts[2]; // YYYY

  // Return the formatted date
  return `${year}-${month}-${day}`;
}

// Example usage:
const inputDate = "7/20/2024";
const formattedDate = convertDateFormat(inputDate);
console.log(formattedDate); // Output: "2024-07-20"

export function __convertDateFormat(dateString) {
  // Split the date string by '/'
  var parts = dateString.split("/");

  // Rearrange the parts to form the desired date format
  var formattedDate =
    parts[2] +
    "-" +
    (parts[1].length === 1 ? "0" + parts[1] : parts[1]) +
    "-" +
    (parts[0].length === 1 ? "0" + parts[0] : parts[0]);

  return formattedDate;
}
