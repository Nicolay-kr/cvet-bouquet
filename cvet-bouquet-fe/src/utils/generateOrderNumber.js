const generateOrderNumber = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let currentDate = `B${day}${month}${year}-${hours}${minutes}${seconds}`;

  return currentDate;
};

export default generateOrderNumber;