import { useReducer } from 'react';
import { OnChange, reducer, useOnChange } from '@/utils/shared.hooks';
import {
  dateToString,
  parseDate,
  validateMurationBooking,
} from '@/utils/helpers';
import useBookingStore from '@/store/useBookingStore';

export enum Operation {
  DELETE,
  EDIT,
  NONE,
}

interface IData {
  selectedBookingID: number;
  selectedBookingOperation: Operation;
  startDate: string;
  finalDate: string;
  errors: string[];
}

interface IState extends IData {
  onSelectBooking: (id: number, op: Operation) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onChange: OnChange;
}

const initialState: IData = {
  selectedBookingID: 0,
  selectedBookingOperation: Operation.NONE,
  startDate: '',
  finalDate: '',
  errors: [],
};

export default function useListBooking(): IState {
  const [state, dispatch] = useReducer(reducer<IData>, initialState);
  const { deleteBooking, updateBooking, bookingDates } = useBookingStore();
  const onChange = useOnChange(dispatch);

  function onSelectBooking(id: number, op: Operation): void {
    const booking = bookingDates.find((b) => b.ID === id);
    let startDate = '';
    let finalDate = '';
    if (booking) {
      startDate = dateToString(booking.startDate);
      finalDate = dateToString(booking.finalDate);
    }

    dispatch({
      selectedBookingID: id,
      selectedBookingOperation: op,
      startDate,
      finalDate,
    });
  }

  function onConfirm(): void {
    if (state.selectedBookingOperation === Operation.DELETE) {
      deleteBooking(state.selectedBookingID);
    } else if (state.selectedBookingOperation === Operation.EDIT) {
      if (!state.startDate || !state.finalDate) {
        return;
      }
      const errors = validateMurationBooking(
        state.selectedBookingID,
        state.startDate,
        state.finalDate,
        bookingDates,
      );
      if (!errors.length) {
        updateBooking(
          state.selectedBookingID,
          parseDate(state.startDate),
          parseDate(state.finalDate),
        );
        onCancel();
      } else {
        dispatch({ errors });
      }
    }
  }

  function onCancel(): void {
    dispatch({
      selectedBookingID: 0,
      selectedBookingOperation: Operation.NONE,
      errors: [],
      startDate: '',
      finalDate: '',
    });
  }

  return {
    ...state,
    onSelectBooking,
    onConfirm,
    onCancel,
    onChange,
  };
}
