import { type SelectHTMLAttributes } from 'react';

type FormSelectProps = { id: string; label: string; values: string[] } & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'id' | 'name'
>;

export const FormSelect = ({ id, label, values, ...props }: FormSelectProps) => (
  <div className="form-item">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={id} {...props}>
      {values.map((value) => (
        <option key={value}>{value}</option>
      ))}
    </select>
  </div>
);
