import { type PropsWithChildren } from 'react';

type FormSectionProps = PropsWithChildren<{ label?: string }>;

export const FormSection = ({ label, children }: FormSectionProps) => (
  <fieldset>
    {label && <legend>{label}</legend>}
    {children}
  </fieldset>
);
