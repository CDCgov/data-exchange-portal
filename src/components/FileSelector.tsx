import { ChangeEvent, useRef } from "react";
import { Button } from "../../src/components/Button";

export interface FileSelectorProps {
  file?: File;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileSelector({ file, handleFileChange }: FileSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = () => {
    fileInputRef.current?.click();
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
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
      />
      <p
        id="file-name"
        data-testid="file-name"
        className="text-italic text-normal">
        {file?.name ? file.name : "No file chosen"}
      </p>
    </div>
  );
}

export default FileSelector;
