type FormSelectProps = { id: string; label: string; values: string[] };

export const FormSelect = ({ id, label, values }: FormSelectProps) => (
  <div className="form-item">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={id} required>
      {values.map((value) => (
        <option key={value}>{value}</option>
      ))}
    </select>
  </div>
);
