import getStatusDisplayValuesById from "src/utils/helperFunctions/statusDisplayValues";

describe("Status Display Values", () => {
  it("should return a status display value object for valid status id", async () => {
    const validId = "upload_complete";
    const statusDisplay = getStatusDisplayValuesById(validId);
    expect(statusDisplay.label).toStrictEqual("Upload Complete");
    expect(statusDisplay.color).toStrictEqual("#84BC49");
  });
  it("should return default display values object for invalid status id", async () => {
    const invalidId = "uknown_id";
    const statusDisplay = getStatusDisplayValuesById(invalidId);
    expect(statusDisplay.label).toStrictEqual("unknown");
    expect(statusDisplay.color).toStrictEqual("#F5F5F5");
  });
});
