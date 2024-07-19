import { render, fireEvent, waitFor } from "@testing-library/react";
import UploadFiles from "src/screens/UploadFiles";
import { recoilWrapper } from "tests/utility/helpers";

test("should render header text on screen", () => {
  const screen = render(recoilWrapper(<UploadFiles />));
  const header = screen.getByRole("heading", { name: /Upload Files/i });
  expect(header).toBeInTheDocument();
});

test("should clear selected file name on reset click", () => {
  const file = new File([""], "test.txt", { type: "text" });

  const { getByTestId, getByRole } = render(recoilWrapper(<UploadFiles />));

  const uploader = getByTestId("file-uploader");

  // simulate upload event and wait until finish
  waitFor(() =>
    fireEvent.change(uploader, {
      target: { files: [file] },
    })
  );

  const fileName = getByTestId("file-name");

  const resetButton = getByRole("button", { name: "Reset" });
  fireEvent.click(resetButton);

  expect(fileName.textContent).toEqual("No file chosen");
});
