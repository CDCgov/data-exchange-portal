import getSubmissionDetails from "src/utils/api/submissionDetails";
import getMockDetails from "src/mocks/data/submissionDetails";
import mockSubmissions from "src/mocks/data/fileSubmissions";

describe("submissionDetails", () => {
  it("should fetch submission details", async () => {
    const firstSubmission = mockSubmissions.aimsCsv.items[0];
    const upload_id = firstSubmission.upload_id;
    const payload = getMockDetails(upload_id);
    const res = await getSubmissionDetails("mock_auth_token", upload_id);
    const data = await res.json();

    expect(data).toStrictEqual(payload);
  });

  it("should return 400 without upload_id", async () => {
    const res = await getSubmissionDetails("mock_auth_token", "");
    expect(res.status).toStrictEqual(400);
  });
});
