export type TGridSize = {
  cols: number,
  rows: number
}
export type TSize = {
  width: number,
  height: number
}
export type TCoords = {
  x: number,
  y: number
}
export enum Speed {
  slow = 1000,
  normal = 500,
  fast = 150,
}
export type TSettingsForm = {
  cols: string,
  rows: string, 
  speed: Speed
}
export type TGrid = number[][];