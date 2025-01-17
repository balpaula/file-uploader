import { FC, useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { DeviceType, FileUploaderItemStatus } from '../../core/model';
import { useSize } from '../../helpers/hooks/use-size';
import './FileUploaderItem.scss';

interface FileUploaderItemProps {
  deviceType: DeviceType;
  fileName: string | undefined;
  isDisabled: boolean;
  itemNumber: number;
  handleDeleteItem: (i: number) => void;
}

export const FileUploaderItem: FC<FileUploaderItemProps> = ({
  deviceType,
  fileName,
  isDisabled,
  itemNumber,
  handleDeleteItem,
}) => {
  const [progressValue, setProgressValue] = useState<number>(0);
  const [isTooltipEnabled, setIsTooltipEnabled] = useState<boolean>(false);
  const [status, setStatus] = useState<FileUploaderItemStatus>('default');
  const fileNameRef = useRef<HTMLElement>(null);
  const size = useSize(fileNameRef);

  useEffect(() => {
    const el = fileNameRef.current;
    if (el) {
      setIsTooltipEnabled(
        el.scrollWidth && el.clientWidth
          ? el.scrollWidth > el.clientWidth
          : false
      );
    }
  }, [size]);

  const getProgressText = (value: number, disabled: boolean) => {
    if (disabled) {
      return 'Paused';
    }
    if (value >= 100) {
      return 'Uploaded';
    } else if (value === 0) {
      return 'Waiting to start';
    } else {
      return `${value}%`;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isDisabled) {
      interval = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev + 10;
          return newValue >= 100 ? 100 : newValue;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDisabled]);

  useEffect(() => {
    setStatus(progressValue >= 100 ? 'positive' : 'default');
  }, [progressValue]);

  return (
    <div
      className={`fileUploaderItem ${deviceType} ${status} ${
        isDisabled ? 'disabled' : ''
      }`}
      key={`file-uploader-${itemNumber}`}
    >
      <div className={`prefixContainer ${deviceType} flexRow`}>
        <InsertDriveFileOutlinedIcon />
        <Tooltip title={isTooltipEnabled ? fileName : ''}>
          <Typography ref={fileNameRef} className="prefix">
            {fileName}
          </Typography>
        </Tooltip>
      </div>
      <Box sx={{ width: '100%' }} className={`barContainer ${deviceType}`}>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          className={`linearProgress ${status} ${isDisabled ? 'disabled' : ''}`}
        />
      </Box>
      <div className={`suffixContainer ${deviceType} flexRow`}>
        <Typography className={`suffix ${status}`} data-testid="suffix-text">
          {getProgressText(progressValue, isDisabled)}
        </Typography>
        <IconButton
          aria-label="delete"
          disabled={isDisabled}
          onClick={() => handleDeleteItem(itemNumber)}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};
