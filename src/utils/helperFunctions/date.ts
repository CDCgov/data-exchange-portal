export const convertDate = (date: Date) => {
  const convertedDate: string = `${date
    .toISOString()
    .replace(/\-/g, "")
    .replace(/\:/g, "")
    .replace(/\./g, "")
    .slice(0, -4)}Z`;

  return convertedDate;
};
