import { TGrid, TGridSize } from "./types";

//generates a grid of given size with random cells
export const generateRandomTiles = (size: TGridSize): TGrid => {
  const rows = [];
  for (let i = 0; i < size.rows; i++) {
    rows.push(Array.from(Array(size.cols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};

//generates an empty grid of given size
export const generateEmptyGrid = (size: TGridSize): TGrid => {
  const rows = [];
  for (let i = 0; i < size.rows; i++) {
    rows.push(Array.from(Array(size.cols), () => 0));
  }
  return rows;
};

export const countCells = (grid: TGrid) =>
  grid.reduce(
    (acc, row) => acc + row.reduce(
      (acc, col) => acc + col, 0
    ), 0
  )

//get active, i.e. visible right now zone for the grid
export const getACtiveZone = (grid: TGrid, xStart: number, xLength: number, yStart: number, yLength: number) => {
  const zone = [];
  for (let i = yStart; i < yLength + yStart; i++) {
    zone.push(grid[i].slice(xStart, xLength + xStart));
  }
  return zone;
}