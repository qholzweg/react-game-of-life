import { Icon } from '@iconify/react';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { selectSettings, toggleRunning } from '../service/reducers/settings-slice';
import { createEmptyGrid, createRandomGrid, resetStep, selectGame } from '../service/reducers/game-slice';
import { countCells } from '../utils/utils';
export const Footer: FC = () => {
  const { running, gridSize } = useAppSelector(selectSettings);
  const { grid, step } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  return (
    <footer>
      <div className="container">
        <div className="actions">
          <button
            className='clear'
            disabled={running}
            onClick={() => {
              dispatch(createEmptyGrid(gridSize));
              dispatch(resetStep());
            }} >
              <Icon icon="fa:trash" />
              Clear
          </button>
          <button
            className='random'
            disabled={running}
            onClick={() => {
              dispatch(createRandomGrid(gridSize));
              dispatch(resetStep());
            }} >
              <Icon icon="fa:random" />
              Randomize
          </button>
        </div>
        <div className="controls">
          <button className="play-button" onClick={() => dispatch(toggleRunning())}>
            {!running && <Icon icon="fa:play" />}
            {running && <Icon icon="fa:stop" />}
          </button>
        </div>
        <div className="stats">
          <p>Step: {step}</p>
          <p>Cells alive: {countCells(grid)}</p>
        </div>
      </div>
    </footer>
  );
}