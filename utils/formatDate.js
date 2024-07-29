module.exports = (timestamp) => {
  const dateObj = new Date(timestamp);
  return `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
};
