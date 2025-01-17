import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Card, Divider, Typography } from '@mui/material';
import { SmallDropzone } from '../SmallDropzone';
import { MediumDropzone } from '../MediumDropzone';
import { FileUploaderItem } from '../FileUploaderItem';
import { getCurrentDevice, getFileName } from '../../core/utils';
import { ControlsOptions, DeviceType } from '../../core/model';
import { ACCEPTED_FORMATS } from '../../core/consts';
import './FileUploader.scss';

interface FileUploaderProps {
  options: ControlsOptions;
}

export const FileUploader: FC<FileUploaderProps> = ({ options }) => {
  const { width } = useWindowSize();
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<(string | undefined)[]>(
    []
  );

  const { size, isDisabled, isReversed } = options;

  const handleUploadFile = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.target.files && uploadNewFiles(ev.target.files);

    // Details of the uploaded file
    console.log(ev);

    // Other actions
    // Backend, api requests, etc
  };

  const handleDeleteAll = () => {
    setUploadedFiles([]);
  };

  const handleDeleteItem = (itemIdx: number) => {
    const filesCopy = [...uploadedFiles];
    filesCopy.splice(itemIdx, 1);
    setUploadedFiles(filesCopy);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    uploadNewFiles(droppedFiles);
    setIsDragging(false);
  };

  const uploadNewFiles = (newFiles: File[] | FileList) => {
    if (newFiles.length > 0) {
      const fileNames = Array.from(newFiles)
        // Check that the file is in one of the accepted formats
        .filter(file => ACCEPTED_FORMATS.includes(file.type))
        .map(file => getFileName((file as File).name, uploadedFiles));
      setUploadedFiles(
        prevFiles => [...prevFiles, ...fileNames] as (string | undefined)[]
      );
    }
  };

  useEffect(() => {
    setDeviceType(getCurrentDevice(width as number));
  }, [width]);

  return (
    <Card className={`fileUploader ${isDisabled && 'disabled'}`}>
      <div
        className={`dropzone ${size} ${isDisabled && 'disabled'} ${
          isDragging && !isDisabled && 'dragging'
        }`}
        onDrop={ev => !isDisabled && handleDrop(ev)}
        onDragOver={ev => {
          ev.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={ev => {
          ev.preventDefault();
          setIsDragging(false);
        }}
        data-testid="dropzone"
      >
        {size === 'medium' ? (
          <MediumDropzone
            isDisabled={isDisabled}
            handleUploadFile={handleUploadFile}
          />
        ) : (
          <SmallDropzone
            isDisabled={isDisabled}
            handleUploadFile={handleUploadFile}
          />
        )}
      </div>
      <Divider />
      <div className="filesOverview flexColumn">
        <div className="flexRow" style={{ justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">
            {uploadedFiles.length} files
          </Typography>
          <Button
            variant="text"
            disabled={isDisabled}
            onClick={handleDeleteAll}
          >
            Delete all files
          </Button>
        </div>
        {uploadedFiles.length > 0 && (
          <div className={`filesList flexColumn ${isReversed && 'reversed'}`}>
            {uploadedFiles.map((fileName: string | undefined, i: number) => (
              <FileUploaderItem
                key={fileName}
                deviceType={deviceType}
                fileName={fileName}
                isDisabled={isDisabled}
                itemNumber={i}
                handleDeleteItem={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
