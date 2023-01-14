const generateOrderNumber = (id) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let currentDate = `B${day < 9 ? '0' + day.toString() : day}${
    month < 10 ? '0' + month.toString() : month
  }${year.toString().slice(2)}-${hours}${minutes}-${id}`;

  return currentDate;
};

export default generateOrderNumber;
