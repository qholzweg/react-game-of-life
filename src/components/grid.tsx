import { FC, useMemo } from 'react';
import { TCoords, TgridSize } from '../service/types';

export const Grid: FC<{ template: string, grid: number[][], gridOffset:TCoords, onCellClick: Function }> = ({ template, grid, gridOffset, onCellClick }) => {
  const content = useMemo(
    () => grid.map((rows, i) =>
      rows.map((col, k) => (
        <div className={`game-cell ${grid[i][k] ? 'active' : ''}`} key={`${i}-${k}`} onClick={() => onCellClick(i + gridOffset.y,k + gridOffset.x)} />
      ))
    ), [grid]
  )
  return (
    <div className='game-grid'
      style={{
        gridTemplateColumns: template,
      }}
    >
      {content}
    </div>
  );
}