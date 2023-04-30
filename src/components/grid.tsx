import { FC, useMemo } from 'react';
import { TCoords } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { toggleCell } from '../service/reducers/game-slice';
import { selectSettings } from '../service/reducers/settings-slice';

export const Grid: FC<{ template: string, grid: number[][], gridOffset: TCoords }> = ({ template, grid, gridOffset }) => {
  const dispatch = useAppDispatch();
  const { running } = useAppSelector(selectSettings);
  const content = useMemo(
    () => grid.map((rows, i) =>
      rows.map((col, k) => (
        <div
          className={`game-cell ${grid[i][k] ? 'active' : ''}`}
          key={`${i}-${k}`}
          onClick={() => {
            if (!running) dispatch(toggleCell({
              i: i + gridOffset.y,
              k: k + gridOffset.x
            }))
          }
          } />
      ))
    ), [grid, dispatch, gridOffset, running]
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