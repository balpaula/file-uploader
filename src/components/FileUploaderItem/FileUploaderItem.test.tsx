import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUploaderItem } from './FileUploaderItem';

const mockHandleDeleteItem = vi.fn();

describe('File uploader item component', () => {
  it('renders the component correctly', () => {
    render(
      <FileUploaderItem
        deviceType="desktop"
        fileName="test-file.pdf"
        isDisabled={false}
        itemNumber={1}
        handleDeleteItem={mockHandleDeleteItem}
      />
    );

    expect(screen.getByText('test-file.pdf')).toBeTruthy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('updates the progress bar every second when not disabled', async () => {
    render(
      <FileUploaderItem
        deviceType="desktop"
        fileName="test-file.pdf"
        isDisabled={false}
        itemNumber={1}
        handleDeleteItem={mockHandleDeleteItem}
      />
    );

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement;
    const suffixText = screen.getByTestId('suffix-text');

    expect(progressBar.ariaValueNow).toEqual('0');
    await waitFor(() => expect(progressBar.ariaValueNow).toEqual('10'));
    await waitFor(() => expect(suffixText.innerHTML).toEqual('10%'));
  });

  it('shows "Paused" text and does not update progress when disabled', async () => {
    const mockHandleDeleteItem = vi.fn();

    render(
      <FileUploaderItem
        deviceType="desktop"
        fileName="test-file.pdf"
        isDisabled={true}
        itemNumber={1}
        handleDeleteItem={mockHandleDeleteItem}
      />
    );

    expect(screen.getByText('Paused')).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByRole('progressbar').ariaValueNow).toEqual('0')
    );
  });

  it('calls handleDeleteItem when the delete button is clicked', async () => {
    render(
      <FileUploaderItem
        deviceType="desktop"
        fileName="test-file.pdf"
        isDisabled={false}
        itemNumber={1}
        handleDeleteItem={mockHandleDeleteItem}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);
    expect(mockHandleDeleteItem).toHaveBeenCalledWith(1);
  });

  it('disables the delete button when the component is disabled', async () => {
    const mockHandleDeleteItem = vi.fn();

    render(
      <FileUploaderItem
        deviceType="desktop"
        fileName="test-file.pdf"
        isDisabled={true}
        itemNumber={1}
        handleDeleteItem={mockHandleDeleteItem}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toHaveProperty('disabled');
  });
});
