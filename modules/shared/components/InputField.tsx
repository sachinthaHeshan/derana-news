import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';
import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

interface InputFieldProps {
  control?: Control<any>;
  type?: HTMLInputTypeAttribute | undefined;
  name: string;
  placeholder?: string;
  className?: string;
  errors: FieldErrors<any>;
}
export const InputField = ({ control, type, name, placeholder, className, errors }: InputFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <>
        <input type={type} placeholder={placeholder} className={className} {...field} />
        <span className="w-full px-3 text-lava-red">{errors?.[name]?.message && String(errors?.[name]?.message)}</span>
      </>
    )}
  />
);
