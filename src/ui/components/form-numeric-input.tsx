import { type InputHTMLAttributes } from 'react';

type FormNumericInputProps = { id: string; label: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'name' | 'type' | 'inputMode' | 'pattern'
>;

export const FormNumericInput = ({ id, label, ...props }: FormNumericInputProps) => (
  <div className="form-item">
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} type="text" inputMode="numeric" pattern="\d+" {...props} />
  </div>
);
