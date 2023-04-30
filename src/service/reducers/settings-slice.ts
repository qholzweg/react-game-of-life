import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Speed, TGridSize, TSettingsForm } from "../../utils/types";
import { RootState } from "../store";
import { INIT_GRID_SIZE } from "../../utils/constants";

type TSettingsState = {
  running: boolean;
  speed: Speed;
  gridSize: TGridSize;
  cellSize: number;
  isSettingsModalOpen: boolean;
  isHelpOpen: boolean;
}

export const initialState: TSettingsState = {
  running: false,
  speed: Speed.normal,
  gridSize: INIT_GRID_SIZE,
  cellSize: 30,
  isSettingsModalOpen: false,
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
    toggleHelp: (state) => {
      state.running = false;
      state.isHelpOpen = !state.isHelpOpen;
    },
    toggleSettings: (state) => {
      state.running = false;
      state.isSettingsModalOpen = !state.isSettingsModalOpen;
    },
    setSettings: (state, action:PayloadAction<TSettingsForm>) => {
      const {cols, rows, speed} = action.payload;
      state.gridSize = {
        cols: parseInt(cols),
        rows: parseInt(rows)
      };
      state.speed = speed;
    },
  }
});

export const {start, stop, toggleRunning, toggleHelp, toggleSettings, setSettings} = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;