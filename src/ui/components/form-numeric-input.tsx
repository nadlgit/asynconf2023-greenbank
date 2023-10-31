type FormNumericInputProps = { id: string; label: string };

export const FormNumericInput = ({ id, label }: FormNumericInputProps) => (
  <div className="form-item">
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} type="text" inputMode="numeric" pattern="\d+" required />
  </div>
);
