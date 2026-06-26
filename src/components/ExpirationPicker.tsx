'use client';

import { EXPIRATION_PRESETS } from '@/lib/constants';

interface ExpirationPickerProps {
  value: number;
  onChange: (hours: number) => void;
  disabled?: boolean;
}

export function ExpirationPicker({ value, onChange, disabled }: ExpirationPickerProps) {
  return (
    <div className="stack">
      <label htmlFor="expiration">Link expires after</label>
      <select
        id="expiration"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {EXPIRATION_PRESETS.map((preset) => (
          <option key={preset.hours} value={preset.hours}>
            {preset.label}
          </option>
        ))}
      </select>
    </div>
  );
}
