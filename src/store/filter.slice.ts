import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  selectedFilter: string;
  fromDate: string;
  toDate: string;
}

const initialState: FilterState = {
  selectedFilter: '',
  fromDate: '',
  toDate: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { selectedFilter, fromDate, toDate } = action.payload;
      state.selectedFilter = selectedFilter;
      state.fromDate = fromDate;
      state.toDate = toDate;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
