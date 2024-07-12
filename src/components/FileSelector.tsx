import { ChangeEvent } from "react";
import { Button } from "../../src/components/Button";

export interface FileSelectorProps {
  filename: string;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileSelector({ filename, handleFileChange }: FileSelectorProps) {
  const handleFileSelection = () => {
    document?.getElementById("file-uploader")?.click();
  };

  return (
    <div className="display-flex flex-row flex-justify-start flex-align-center margin-right-2">
      <Button
        className="usa-button usa-button--outline margin-y-1"
        id="choose-file"
        type="button"
        onClick={handleFileSelection}>
        Choose file
      </Button>
      <input
        data-testid="file-uploader"
        type="file"
        id="file-uploader"
        name="file-uploader"
        multiple
        onChange={(e) => handleFileChange(e)}
      />
      <p
        id="file-name"
        data-testid="file-name"
        className="text-italic text-normal">
        {filename != "" ? filename : "No file chosen"}
      </p>
    </div>
  );
}

export default FileSelector;
