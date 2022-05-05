import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
  isFirstRender: true,
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    initKanbanState(state, action) {
      return initialState;
    },
    setIsFirstRender(state, action) {
      state.isFirstRender = action.payload;
    },
  },
});

export const { initKanbanState, setIsFirstRender } = kanbanSlice.actions;

export const selectIsFirstRender = (state: RootState) =>
  state.kanban.isFirstRender;

export default kanbanSlice.reducer;
