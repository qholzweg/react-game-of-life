import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TGridSize } from "../../utils/types";
import { RootState } from "../store";
import { INIT_GRID_SIZE } from "../../utils/constants";

type TSettingsState = {
  running: boolean;
  gridSize: TGridSize;
  cellSize: number;
  isOptionsModalOpen: boolean;
  isHelpOpen: boolean;
}

export const initialState: TSettingsState = {
  running: false,
  gridSize: INIT_GRID_SIZE,
  cellSize: 30,
  isOptionsModalOpen: false,
  isHelpOpen: false
}
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    start: (state) => {
      state.running = true
    },
    stop: (state) => {
      state.running = false
    },
    toggleRunning: (state) => {
      state.running = !state.running;
    },
    setGridSize: (state, action:PayloadAction<TGridSize>) => {
      state.gridSize = action.payload
    }
  }
});

export const {start, stop, toggleRunning} = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;