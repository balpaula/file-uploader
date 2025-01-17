import { ChangeEvent, FC, RefObject, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

interface MediumDropzoneProps {
  isDisabled: boolean;
  handleUploadFile: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export const MediumDropzone: FC<MediumDropzoneProps> = ({
  isDisabled,
  handleUploadFile,
}) => {
  const fileInputRef = useRef() as RefObject<HTMLInputElement>;

  return (
    <>
      <div className="uploadSection">
        <CloudUploadOutlinedIcon
          className={`icon ${isDisabled && 'disabled'}`}
        />
        <Typography variant="h6">Drag and drop your files here</Typography>
      </div>
      <Button
        variant="text"
        disabled={isDisabled}
        onClick={() => fileInputRef.current?.click()}
      >
        Or browse to choose a file
      </Button>
      <input
        onChange={ev => handleUploadFile(ev)}
        onClick={ev => ((ev.target as HTMLInputElement).value = '')}
        multiple
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.jpeg,.jpg,.png"
      />
      <div className="flexRow uploadInfo">
        <div className="flexRow" style={{ gap: '0.5rem' }}>
          <Typography variant="caption">Maximum File Size</Typography>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            50 Mb
          </Typography>
        </div>
        <div className="flexRow" style={{ gap: '0.5rem' }}>
          <Typography variant="caption">Supported Formats</Typography>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            PDF, JPEG, PNG
          </Typography>
        </div>
      </div>
    </>
  );
};
