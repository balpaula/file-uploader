import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SmallDropzone } from './SmallDropzone';

const mockHandleUploadFile = vi.fn();

describe('Small dropzone component', () => {
  it('renders the component correctly', () => {
    render(
      <SmallDropzone
        isDisabled={false}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    expect(screen.getByRole('button', { name: /choose files/i })).toBeTruthy();
  });

  it('disables the upload button when isDisabled is true', async () => {
    render(
      <SmallDropzone
        isDisabled={true}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    const button = screen.getByRole('button', {
      name: /choose files/i,
    });
    expect(button).toHaveProperty('disabled');
  });

  it('opens the file input when the button is clicked', async () => {
    render(
      <SmallDropzone
        isDisabled={false}
        handleUploadFile={mockHandleUploadFile}
      />
    );

    const button = screen.getByRole('button', {
      name: /choose files/i,
    });
    const input = screen.getByTestId('file-input');

    const spy = vi.spyOn(input, 'click');
    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls handleUploadFile when a file is selected', async () => {
    render(
      <SmallDropzone
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
      <SmallDropzone
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
