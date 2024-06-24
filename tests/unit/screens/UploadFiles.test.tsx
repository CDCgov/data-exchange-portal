import { render, fireEvent, waitFor } from "@testing-library/react";
import UploadFiles from "src/screens/UploadFiles";

test("should render header text on screen", () => {
  const screen = render(<UploadFiles />);
  const header = screen.getByRole("heading", { name: /Upload Files/i });
  expect(header).toBeInTheDocument();
});

test("should display selected file name after selection", async () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByTestId } = render(<UploadFiles />);

  let uploader = getByTestId("file-uploader");

  // simulate upload event and wait until finish
  await waitFor(() =>
    fireEvent.change(uploader, {
      target: { files: [file] },
    })
  );

  let fileResult = document.getElementById("file-uploader");

  expect(fileResult?.files.length).toBe(1);
  expect(fileResult?.files[0].name).toBe("test.txt");
});

test("should not display file name if no file selected", () => {
  const { getByTestId } = render(<UploadFiles />);

  const fileName = getByTestId("file-name");
  expect(fileName.textContent).toEqual("No file chosen");
});

test("should update displayed manifest content on input change", () => {
  const { getByLabelText } = render(<UploadFiles />);

  const manifestInput = getByLabelText("Input the Submission Manifest");
  const expectedManifest = '{"key": "value"}';
  fireEvent.change(manifestInput, { target: { value: expectedManifest } });

  expect(manifestInput?.value).toEqual(expectedManifest);
});

test("should clear selected file name and manifest content on reset click", async () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByTestId, getByLabelText, getByRole } = render(<UploadFiles />);

  let uploader = getByTestId("file-uploader");

  // simulate upload event and wait until finish
  await waitFor(() =>
    fireEvent.change(uploader, {
      target: { files: [file] },
    })
  );

  let fileResult = document.getElementById("file-uploader");
  const fileName = getByTestId("file-name");

  const manifestInput = getByLabelText("Input the Submission Manifest");
  const expectedManifest = '{"key": "value"}';
  fireEvent.change(manifestInput, { target: { value: expectedManifest } });

  const resetButton = getByRole("button", { name: "Reset" });
  await fireEvent.click(resetButton);

  expect(manifestInput.value).toEqual("");
  expect(fileName.textContent).toEqual("No file chosen");
});
