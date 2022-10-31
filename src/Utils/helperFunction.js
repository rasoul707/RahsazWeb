// take a route name
// and if route name includes in website current route return a true
import moment from "jalali-moment";

export const activeRoute = routeName => {
  return window.location.href.indexOf(routeName) > -1;
};



export const toToman = str => {
  return str?.toLocaleString("fa-IR");
};

export function filterByStr(str, key, array = []) {
  return array?.filter(banner => banner[key] == str)?.[0];
}

export const counterLetter = (index = 0) => {
  let array = [
    "اول",
    "دوم",
    "سوم",
    "چهارم",
    "پنجم",
    "ششم",
    "هفتم",
    "هشتم",
    "نهم",
    "دهم",
    "یازدهم",
    "دوازدهم",
  ];
  return array[index];
};

export function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n
    ?.toString()
    ?.split("")
    ?.map(x => farsiDigits[x])
    ?.join("");
}


export function dateFA(date = "2022/02/02") {
  let faDate;
  if (moment(date).isValid()) {
    faDate = moment(date, "YYYY/MM/DD").locale("fa");
    return `${toFarsiNumber(faDate.format("DD"))} ${faDate.format(
      "MMMM",
    )} ${toFarsiNumber(faDate.format("YYYY"))}`;
  }
}