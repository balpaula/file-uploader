import { FC, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  useColorScheme,
} from '@mui/material';
import {
  PredefinedTheme,
  ControlsOptions,
  FileUploaderSize,
} from '../../core/model';
import {
  ACTIONS,
  ControlsAction,
} from '../../helpers/reducers/controlsReducer';
import './Controls.scss';

interface ControlsProps {
  options: ControlsOptions;
  handleControlChange: (action: ControlsAction) => void;
}

export const Controls: FC<ControlsProps> = ({
  options,
  handleControlChange,
}) => {
  const { setMode, setColorScheme } = useColorScheme();

  useEffect(() => {
    setMode('light');
    setColorScheme('light');
  }, []);

  const handleThemeChange = (selectedTheme: PredefinedTheme) => {
    if (selectedTheme === 'light_pink') {
      setMode('light');
      setColorScheme('light_pink');
    } else {
      setMode(selectedTheme);
      setColorScheme(selectedTheme);
    }
  };

  return (
    <div className="controls">
      <div className="flexRow controlsSection">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="theme-select-label">Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            label="Theme"
            value={options.theme}
            onChange={ev => {
              handleControlChange({
                type: ACTIONS.THEME,
                payload: ev.target.value as PredefinedTheme,
              });
              handleThemeChange(
                ev.target.value as 'light' | 'dark' | 'light_pink'
              );
            }}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="light_pink">Light pink</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="size-select-label">Size</InputLabel>
          <Select
            labelId="size-select-label"
            label="Size"
            value={options.size}
            onChange={ev =>
              handleControlChange({
                type: ACTIONS.SIZE,
                payload: ev.target.value as FileUploaderSize,
              })
            }
          >
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="small">Small</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flexRow controlsSection">
        <div className="control">
          <FormControlLabel
            control={
              <Switch
                checked={options.isDisabled}
                onChange={ev =>
                  handleControlChange({
                    type: ACTIONS.DISABLED,
                    payload: ev.target.checked,
                  })
                }
              />
            }
            label="Disable file uploader"
            labelPlacement="end"
          />
        </div>
        <div className="control">
          <FormControlLabel
            control={
              <Switch
                checked={options.isReversed}
                onChange={ev =>
                  handleControlChange({
                    type: ACTIONS.REVERSED,
                    payload: ev.target.checked,
                  })
                }
              />
            }
            label="Newest first"
            labelPlacement="end"
          />
        </div>
      </div>
    </div>
  );
};
