import FileSelector from "src/components/FileSelector";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

const handleFileChange = vi.fn();

test("should display selected file name after selection", () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByTestId } = render(
    <FileSelector handleFileChange={handleFileChange} />
  );

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
  const { getByTestId } = render(
    <FileSelector handleFileChange={handleFileChange} />
  );

  const fileName = getByTestId("file-name");
  expect(fileName.textContent).toEqual("No file chosen");
});
