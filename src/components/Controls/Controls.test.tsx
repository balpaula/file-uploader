import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controls } from './Controls';
import { ControlsOptions } from '../../core/model';

const mockHandleControlChange = vi.fn();

const defaultOptions: ControlsOptions = {
  theme: 'light',
  size: 'medium',
  isDisabled: false,
  isReversed: false,
};

describe('Controls component', () => {
  it('renders the component with the correct options', async () => {
    render(
      <Controls
        options={defaultOptions}
        handleControlChange={mockHandleControlChange}
      />
    );

    expect(screen.getByRole('combobox', { name: /theme/i })).toBeTruthy();
    expect(screen.getByRole('combobox', { name: /size/i })).toBeTruthy();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('changes theme option on select', async () => {
    render(
      <Controls
        options={defaultOptions}
        handleControlChange={mockHandleControlChange}
      />
    );

    await userEvent.click(screen.getByRole('combobox', { name: 'Theme' }));
    await userEvent.click(
      within(screen.getByRole('listbox')).getByText('Dark')
    );

    expect(mockHandleControlChange).toHaveBeenCalledWith({
      type: 'selectTheme',
      payload: 'dark',
    });
  });

  it('changes size option on select', async () => {
    render(
      <Controls
        options={defaultOptions}
        handleControlChange={mockHandleControlChange}
      />
    );

    await userEvent.click(screen.getByRole('combobox', { name: 'Size' }));
    await userEvent.click(
      within(screen.getByRole('listbox')).getByText('Small')
    );

    expect(mockHandleControlChange).toHaveBeenCalledWith({
      type: 'selectSize',
      payload: 'small',
    });
  });

  it('toggles the disabling switch', async () => {
    render(
      <Controls
        options={defaultOptions}
        handleControlChange={mockHandleControlChange}
      />
    );

    const disableSwitch = screen.getByRole('checkbox', {
      name: /disable file uploader/i,
    });
    await userEvent.click(disableSwitch);

    expect(mockHandleControlChange).toHaveBeenCalledWith({
      type: 'switchDisabled',
      payload: true,
    });
  });

  it('toggles the order switch', async () => {
    render(
      <Controls
        options={defaultOptions}
        handleControlChange={mockHandleControlChange}
      />
    );

    const orderSwitch = screen.getByRole('checkbox', {
      name: /newest first/i,
    });
    await userEvent.click(orderSwitch);

    expect(mockHandleControlChange).toHaveBeenCalledWith({
      type: 'switchReversed',
      payload: true,
    });
  });
});
