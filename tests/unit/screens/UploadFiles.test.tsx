import { render, fireEvent, waitFor } from "@testing-library/react";
import UploadFiles from "src/screens/UploadFiles";

test("should render header text on screen", () => {
  const screen = render(<UploadFiles />);
  const header = screen.getByRole("heading", { name: /Upload Files/i });
  expect(header).toBeInTheDocument();
});

test("should display selected file name after selection", () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByTestId } = render(<UploadFiles />);

  const uploader = getByTestId("file-uploader");

  // simulate upload event and wait until finish
  waitFor(() =>
    fireEvent.change(uploader, {
      target: { files: [file] },
    })
  );

  const fileInput: HTMLInputElement = document.getElementById(
    "file-uploader"
  ) as HTMLInputElement;

  expect(fileInput?.files?.length).toBe(1);
  expect(fileInput?.files?.[0].name).toBe("test.txt");
});

test("should not display file name if no file selected", () => {
  const { getByTestId } = render(<UploadFiles />);

  const fileName = getByTestId("file-name");
  expect(fileName.textContent).toEqual("No file chosen");
});

test("should update displayed manifest content on input change", () => {
  const { getByLabelText } = render(<UploadFiles />);

  const manifestInput = getByLabelText(
    "Input the Submission Manifest"
  ) as HTMLInputElement;
  const expectedManifest = '{"key": "value"}';
  fireEvent.change(manifestInput, { target: { value: expectedManifest } });

  expect(manifestInput?.value).toEqual(expectedManifest);
});

test("should clear selected file name and manifest content on reset click", () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByTestId, getByLabelText, getByRole } = render(<UploadFiles />);

  const uploader = getByTestId("file-uploader");

  // simulate upload event and wait until finish
  waitFor(() =>
    fireEvent.change(uploader, {
      target: { files: [file] },
    })
  );

  const fileName = getByTestId("file-name");

  const manifestInput = getByLabelText(
    "Input the Submission Manifest"
  ) as HTMLInputElement;
  const expectedManifest = '{"key": "value"}';
  fireEvent.change(manifestInput, { target: { value: expectedManifest } });

  const resetButton = getByRole("button", { name: "Reset" });
  fireEvent.click(resetButton);

  expect(manifestInput.value).toEqual("");
  expect(fileName.textContent).toEqual("No file chosen");
});

test("should display json parse error with invalid json entered into manifest", () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByLabelText, getByText, getByRole, getByTestId } = render(
    <UploadFiles />
  );

  const uploader = getByTestId("file-uploader");

  // simulate upload event and wait until finish
  waitFor(() =>
    fireEvent.change(uploader, {
      target: { files: [file] },
    })
  );

  const manifestInput = getByLabelText("Input the Submission Manifest");
  fireEvent.change(manifestInput, { target: { value: "{" } });

  const submitButton = getByRole("button", { name: "Submit" });
  fireEvent.click(submitButton);

  expect(getByText("Upload failed: error parsing JSON")).toBe;
});
