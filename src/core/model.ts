export type FileUploaderSize = 'medium' | 'small';

export type FileUploaderItemStatus = 'default' | 'positive';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type PredefinedTheme = 'light' | 'dark' | 'light_pink';

export interface ControlsOptions {
  theme: PredefinedTheme;
  size: FileUploaderSize;
  isDisabled: boolean;
  isReversed: boolean;
}
