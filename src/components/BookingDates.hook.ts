import { MouseEvent, useReducer } from 'react';
import { reducer, useOnChange, OnChange } from '@/utils/shared.hooks';
import useBookingStore from '@/store/useBookingStore';
import { parseDate, validateMurationBooking } from '@/utils/helpers';

interface IData {
  startDate: string;
  finalDate: string;
  errors: string[];
}

interface IState extends IData {
  onChange: OnChange;
  onCreateBooking: (e: MouseEvent<HTMLButtonElement>) => void;
}

const initialState: IData = {
  startDate: '',
  finalDate: '',
  errors: [],
};

export default function useBookingDates(): IState {
  const [state, dispatch] = useReducer(reducer<IData>, initialState);
  const onChange = useOnChange(dispatch);
  const { bookingDates, createBooking } = useBookingStore();

  function onCreateBooking() {
    if (!state.startDate || !state.finalDate) {
      return;
    }
    const errors = validateMurationBooking(
      0,
      state.startDate,
      state.finalDate,
      bookingDates,
    );

    if (!errors.length) {
      const startDate = parseDate(state.startDate);
      const finalDate = parseDate(state.finalDate);
      createBooking({ ID: Math.random(), startDate, finalDate });
      dispatch({ startDate: '', finalDate: '', errors });
    } else {
      dispatch({ errors });
    }
  }

  return {
    ...state,
    onChange,
    onCreateBooking,
  };
}
