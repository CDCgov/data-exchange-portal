import getSubmissionDetails from "src/utils/api/submissionDetails";
import mockSubmissionDetails from "src/mocks/data/submissionDetails.json";

describe("submissionDetails", () => {
  it("should fetch submission details", async () => {
    const payload = mockSubmissionDetails;
    const res = await getSubmissionDetails("mock_auth_token", "mock_upload_id");
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should return 400 without upload_id", async () => {
    const res = await getSubmissionDetails("mock_auth_token", "");
    expect(res.status).toStrictEqual(400);
  });
});
