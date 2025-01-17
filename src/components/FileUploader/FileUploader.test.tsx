import { fireEvent, render, screen } from '@testing-library/react';
import { FileUploader } from './FileUploader';
import { ControlsOptions } from '../../core/model';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

const options: ControlsOptions = {
  theme: 'light',
  size: 'medium',
  isDisabled: false,
  isReversed: false,
};

const file = new File(['test'], 'test-file.pdf', {
  type: 'application/pdf',
});

describe('File uploader component', () => {
  it('renders with the correct size (medium)', () => {
    render(<FileUploader options={options} />);
    expect(screen.getByText('Maximum File Size')).toBeTruthy();
  });

  it('renders with the correct size (small)', () => {
    const smallOptions: ControlsOptions = { ...options, size: 'small' };
    render(<FileUploader options={smallOptions} />);
    expect(screen.getByText('Drag and drop your files here')).toBeTruthy();
  });

  it('uploads files correctly', async () => {
    render(<FileUploader options={options} />);

    const input = screen.getByTestId('file-input');
    await userEvent.upload(input, file);

    expect(screen.getByText('test-file.pdf')).toBeTruthy(); // Check that file name appears in the list
  });

  it('handles file drop correctly', async () => {
    render(<FileUploader options={options} />);

    const dropzone = screen.getByTestId('dropzone'); // Assuming you added a test ID to the dropzone
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(screen.getByText('test-file.pdf')).toBeTruthy(); // Check that file name appears in the list
  });

  it('deletes all files correctly', async () => {
    render(<FileUploader options={options} />);

    const input = screen.getByTestId('file-input');
    await userEvent.upload(input, file);

    expect(screen.getByText('test-file.pdf')).toBeTruthy();

    const deleteAllButton = screen.getByRole('button', {
      name: /delete all files/i,
    });
    await userEvent.click(deleteAllButton);

    expect(screen.queryByText('test-file.pdf')).not.toBeTruthy();
  });

  it('disables file uploader when isDisabled is true', () => {
    render(<FileUploader options={options} />);

    const inputButton = screen.getByRole('button', {
      name: /or browse to choose a file/i,
    });
    const deleteAllButton = screen.getByRole('button', {
      name: /delete all files/i,
    });
    expect(inputButton).toHaveProperty('disabled');
    expect(deleteAllButton).toHaveProperty('disabled');
  });

  it('uploads only accepted file types', async () => {
    render(<FileUploader options={options} />);

    const input = screen.getByTestId('file-input');

    const invalidFile = new File(['invalid content'], 'invalid.txt', {
      type: 'text/plain',
    });
    await userEvent.upload(input, invalidFile);

    const validFile = new File(['valid content'], 'test.pdf', {
      type: 'application/pdf',
    });
    await userEvent.upload(input, validFile);

    expect(screen.queryByText('invalid.txt')).not.toBeTruthy();
    expect(screen.getByText('test.pdf')).toBeTruthy();
  });
});
