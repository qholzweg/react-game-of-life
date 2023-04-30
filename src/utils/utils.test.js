import {generateEmptyGrid, generateRandomTiles, countCells, getACtiveZone} from './utils';

describe ("Utility function", () => {
  it("shoud generate empty field", () => {
    const grid = generateEmptyGrid({cols:5, rows:5});
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
  });

  it("shoud generate random field", () => {
    const grid = generateRandomTiles({cols:5, rows:5});
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
  });

  const someGrid = [[0,0,1,1], [1,1,1,1], [1,0,0,0], [0,0,0,0]]
  it('should count cells', () => {
    expect(countCells(someGrid)).toEqual(7);
  })
  it('should find a shifted zone of a grid', () => {
    expect(getACtiveZone(someGrid, 1, 3, 1, 3)).toEqual([
      [1,1,1], [0,0,0], [0,0,0]
    ])
  })
})