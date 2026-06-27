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
      <span className="field-label">Expires in</span>
      <div className="preset-grid" role="group" aria-label="Expiration time">
        {EXPIRATION_PRESETS.map((preset) => (
          <button
            key={preset.hours}
            type="button"
            disabled={disabled}
            className={`preset-btn ${value === preset.hours ? 'preset-btn-active' : ''}`}
            onClick={() => onChange(preset.hours)}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
