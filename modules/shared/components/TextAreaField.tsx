import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

interface TextAreaFieldProps {
  control?: Control<any>;
  name: string;
  placeholder?: string;
  className?: string;
  errors: FieldErrors<any>;
}
export const TextAreaField = ({ control, name, placeholder, className, errors }: TextAreaFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <>
        <textarea placeholder={placeholder} className={className} {...field} />
        <span className="w-full px-3 text-lava-red">{errors?.[name]?.message && String(errors?.[name]?.message)}</span>
      </>
    )}
  />
);
