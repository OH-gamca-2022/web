export const dateToString = (dateToF: Date, showTime = true) => {
  let month = dateToF.getMonth();
  let date = dateToF.getDate();
  let hours = ("0" + dateToF.getHours()).slice(-2);
  let minutes = ("0" + dateToF.getMinutes()).slice(-2);
  let monthString =
    month == 0
      ? "januára"
      : month == 1
      ? "februára"
      : month == 2
      ? "marca"
      : month == 3
      ? "apríla"
      : month == 4
      ? "mája"
      : month == 5
      ? "júna"
      : month == 6
      ? "júla"
      : month == 7
      ? "augusta"
      : month == 8
      ? "septembra"
      : month == 9
      ? "októbra"
      : month == 10
      ? "novembra"
      : month == 11
      ? "decembra"
      : "zly datum";
  // show the year only when it is different from current year & time if allowed to
  return `${date}. ${monthString}${
    dateToF.getFullYear() == new Date().getFullYear()
      ? ""
      : ` ${dateToF.getFullYear()}`
  }${showTime ? ` o ${hours}:${minutes}` : ""}`;
};
