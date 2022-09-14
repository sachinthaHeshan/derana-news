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
  disabled?: boolean;
  errors: FieldErrors<any>;
}
export const InputField = ({ control, type, name, placeholder, className, errors, disabled }: InputFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <>
        <input
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          className={`${className} disabled:opacity-20`}
          {...field}
        />
        <span className="w-full px-3 text-lava-red">{errors?.[name]?.message && String(errors?.[name]?.message)}</span>
      </>
    )}
  />
);
