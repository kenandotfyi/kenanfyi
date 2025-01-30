import dayjs from "dayjs";
export function zeit(d: any) {
  return dayjs(d).format("DD MMM YYYY, HH:mm");
}

export function datum(d: any) {
  return dayjs(d).format("DD MMM YYYY");
}

export function mmYY(d: any) {
  return dayjs(d).format("MMM YYYY");
}
