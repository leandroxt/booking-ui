import { MouseEvent, ReactElement } from 'react';
import { OnChange } from '@/utils/shared.hooks';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';

interface IProps {
  label: string;
  startDate: string;
  finalDate: string;
  errors: string[];
  onChange: OnChange;
  onCreate: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function FormDates({
  label,
  startDate,
  finalDate,
  errors,
  onChange,
  onCreate,
}: IProps): ReactElement<IProps> {
  return (
    <>
      {errors.length > 0 && (
        <div className="mx-auto  border-2 border-red-600 rounded-lg py-6 px-4 bg-red-50 mb-10 md:w-3/4 lg:w-1/2">
          <ul>
            {errors.map((err) => (
              <li key={err} className="flex items-center text-red-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>
                <span className="ml-2">{err}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col justify-center mx-auto md:flex-row">
        <div className="flex flex-col">
          <Input
            id="startDate"
            label="Check in"
            type="date"
            value={startDate}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col mt-4 md:mt-0 md:ml-2">
          <Input
            id="finalDate"
            label="Check out"
            type="date"
            value={finalDate}
            onChange={onChange}
          />
        </div>
        <div className="flex items-end mt-4 md:mt-0 md:ml-2">
          <Button onClick={onCreate}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="ml-2">{label}</span>
          </Button>
        </div>
      </div>
    </>
  );
}
