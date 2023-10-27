import { ReactElement, MouseEvent } from 'react';

interface IProps {
  children: string | ReactElement | ReactElement[];
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'reset' | 'submit';
}

export default function Button({
  children,
  onClick,
  type = 'button',
}: IProps): ReactElement<IProps> {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center border-2 border-solid border-lime-600 text-lime-600 rounded-full font-bold py-2 px-6"
    >
      {children}
    </button>
  );
}
