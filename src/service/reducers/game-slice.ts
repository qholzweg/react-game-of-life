import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TGrid, TGridSize } from "../../utils/types";
import { generateEmptyGrid, generateRandomTiles } from "../../utils/utils";
import { RootState } from "../store";
import { INIT_GRID_SIZE } from "../../utils/constants";

type TGameState = {
  grid: TGrid;
  // offset: [number, number]
  step: number;
  cellsAlive: number;
}

export const initialState: TGameState = {
  grid: generateEmptyGrid(INIT_GRID_SIZE),  
  step:0,
  cellsAlive:0
}
export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    createEmptyGrid: (state, action:PayloadAction<TGridSize>) => {
      state.grid = generateEmptyGrid(action.payload)
    },
    createRandomGrid: (state, action:PayloadAction<TGridSize>) => {
      state.grid = generateRandomTiles(action.payload)
    },
    setGrid: (state, action:PayloadAction<TGrid>) =>{
      state.grid = action.payload;
    },
    toggleCell: (state, action:PayloadAction<{i:number, k:number}>) => {
      const {i, k} = action.payload;
      let newGrid = JSON.parse(JSON.stringify(state.grid));
    newGrid[i][k] = state.grid[i][k] ? 0 : 1;
      state.grid = newGrid;
    },
    incrementStep: (state) => {
      state.step++;
    },
    resetStep: (state) => {
      state.step = 0;
    }
  }
});

export const { createEmptyGrid, createRandomGrid, setGrid, toggleCell, incrementStep, resetStep } = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;


export default gameSlice.reducer;