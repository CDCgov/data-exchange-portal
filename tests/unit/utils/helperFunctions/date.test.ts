import convertDate from "src/utils/helperFunctions/date";

describe("Date Conversion", () => {
  it("should return a compatible date string for api calls", async () => {
    const validDate = new Date("Thu Mar 28 2024");
    const validDateString = "20240328T000000Z";

    const convertedDate = convertDate(validDate);
    expect(convertedDate).toStrictEqual(validDateString);
  });
  it("should return another compatible date string for api calls", async () => {
    const validDate = new Date("Thu Mar 20 2024");
    const validDateString = "20240320T000000Z";

    const convertedDate = convertDate(validDate);
    expect(convertedDate).toStrictEqual(validDateString);
  });
});
