import { ChangeEvent, FC, RefObject, useRef } from 'react';
import { Button, Typography } from '@mui/material';

interface SmallDropzoneProps {
  isDisabled: boolean;
  handleUploadFile: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export const SmallDropzone: FC<SmallDropzoneProps> = ({
  isDisabled,
  handleUploadFile,
}) => {
  const fileInputRef = useRef() as RefObject<HTMLInputElement>;

  return (
    <>
      <Button
        variant="outlined"
        disabled={isDisabled}
        onClick={() => fileInputRef.current?.click()}
      >
        Choose files
      </Button>
      <input
        onChange={ev => handleUploadFile(ev)}
        onClick={ev => ((ev.target as HTMLInputElement).value = '')}
        multiple
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.jpeg,.jpg,.png"
        data-testid="file-input"
      />
      <Typography variant="subtitle1" className="dropzoneText">
        Drag and drop your files here
      </Typography>
    </>
  );
};
