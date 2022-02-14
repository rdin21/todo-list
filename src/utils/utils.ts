const date = new Date().toLocaleString().split(",")[0];
export const formatDate = date.split(".").join("_");

const addZero = (n: number) => (String(n).length === 1 ? `0${n}` : String(n));

export const formatFullDate = (day: number, month: number, year: number): string => {
  return `${addZero(day)}_${addZero(month)}_${year}`;
};
