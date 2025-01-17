export const getCurrentDevice = (size: number) => {
  if (size >= 1280) {
    return 'desktop';
  } else if (size >= 720 && size < 1280) {
    return 'tablet';
  } else {
    return 'mobile';
  }
};

export const getFileName = (
  fileName: string,
  uploadedFiles: (undefined | string)[]
) => {
  if (!uploadedFiles.includes(fileName)) {
    return fileName;
  } else {
    let count = 1;
    const newName = () => `${fileName} (${count})`;
    while (uploadedFiles.includes(newName())) {
      count = count + 1;
    }
    return newName();
  }
};
