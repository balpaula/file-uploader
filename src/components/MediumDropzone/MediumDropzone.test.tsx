import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MediumDropzone } from './MediumDropzone';

const mockHandleUploadFile = vi.fn();

describe('Medium dropzone component', () => {
  it('renders the component correctly', () => {
    render(
      <MediumDropzone
        isDisabled={false}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    expect(
      screen.getByRole('button', { name: /or browse to choose a file/i })
    ).toBeTruthy();
  });

  it('disables the upload button when isDisabled is true', async () => {
    render(
      <MediumDropzone
        isDisabled={true}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    const button = screen.getByRole('button', {
      name: /or browse to choose a file/i,
    });
    expect(button).toHaveProperty('disabled');
  });

  it('opens the file input when the button is clicked', async () => {
    render(
      <MediumDropzone
        isDisabled={false}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    const button = screen.getByRole('button', {
      name: /or browse to choose a file/i,
    });
    const input = screen.getByTestId('file-input');

    const spy = vi.spyOn(input, 'click');
    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls handleUploadFile when a file is selected', async () => {
    render(
      <MediumDropzone
        isDisabled={false}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    const input = screen.getByTestId('file-input');
    const file = new File(['test'], 'test-file.pdf', {
      type: 'application/pdf',
    });

    await userEvent.upload(input, file);

    expect(mockHandleUploadFile).toHaveBeenCalledTimes(1);
    expect(mockHandleUploadFile).toHaveBeenCalledWith(expect.any(Object));
  });

  it('resets the file input value on click', async () => {
    render(
      <MediumDropzone
        isDisabled={false}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    const input = screen.getByTestId('file-input') as HTMLInputElement; // Add a test ID for easier selection
    const file = new File(['test'], 'test-file.pdf', {
      type: 'application/pdf',
    });

    await userEvent.upload(input, file);
    expect(input.value).toBeTruthy();

    await userEvent.click(input);
    expect(input.value).toBe('');
  });
});
