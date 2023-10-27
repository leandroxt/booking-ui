import { ReactElement, HTMLInputTypeAttribute } from 'react';
import { OnChange } from '@/utils/shared.hooks';

interface IProps {
  id?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: OnChange;
  placeholder?: string;
}

export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}: IProps): ReactElement<IProps> {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="border py-2 px-4 rounded-xl"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
