import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { selectSettings } from '../service/reducers/settings-slice';
import { incrementStep, selectGame, setGrid } from '../service/reducers/game-slice';
import { Grid } from './grid';
import useInterval from '../utils/useInterval';
import { operations } from '../utils/constants';
import { TCoords, TSize } from '../utils/types';
import { getACtiveZone } from '../utils/utils';
export const Game: FC = () => {

  const dispatch = useAppDispatch();
  const { gridSize, running, cellSize, speed } = useAppSelector(selectSettings);
  const { grid } = useAppSelector(selectGame);

  const [offset, setOffset] = useState([0, 0]);
  const [windowSize, setWindowSize] = useState<TSize>({width: window.innerWidth, height:window.innerHeight})

  
  //get zone of the grid that is currently visible within a viewport
  const containerSize = {
    width: cellSize * gridSize.cols,
    height: cellSize * gridSize.rows
  }
  const viewPort = {
    width: windowSize.width,
    height: windowSize.height - 100,
  }
  const maxCells: TCoords = {
    x: Math.floor(viewPort.width / cellSize),
    y: Math.floor(viewPort.height / cellSize),
  }
  const visibleGridSize: TCoords = {
    x: maxCells.x < gridSize.cols ? maxCells.x : gridSize.cols,
    y: maxCells.y < gridSize.rows ? maxCells.y : gridSize.rows
  }
  
  const fullCellSize = cellSize + 1;
  const left = visibleGridSize.x * fullCellSize + 1 < viewPort.width ?
  (viewPort.width - visibleGridSize.x * fullCellSize + 1) / 2 :
  0;

  const gridOffset: TCoords = {
    x: Math.floor(offset[0] / cellSize) > 0 ? Math.floor(offset[0] / cellSize) : 0,
    y: Math.floor(offset[1] / cellSize) > 0 ? Math.floor(offset[1] / cellSize) : 0
  }
  const visibleGrid = getACtiveZone(grid, gridOffset.x, visibleGridSize.x, gridOffset.y, visibleGridSize.y);
  
  //create ref to use in interval closure
  const runningRef = useRef(running);
  runningRef.current = running;
  
  const runSimulation = useCallback((grid: number[][]) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < gridSize.rows; i++) {
      for (let j = 0; j < gridSize.cols; j++) {
        let neighbors = 0;

        operations.forEach(([x, y]) => {

          //calculate neighbors 
          const newI = i + x < 0 ?
            gridSize.rows - 1 :
            i + x > gridSize.rows - 1 ?
              0 : i + x;

          const newJ = j + y < 0 ?
            gridSize.cols - 1 :
            j + y > gridSize.cols - 1 ?
              0 : j + y;

          if (newI >= 0 && newI < gridSize.rows && newJ >= 0 && newJ < gridSize.cols) {
            neighbors += grid[newI][newJ];
          }
        });

        //apply rules for next generation
        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    dispatch(incrementStep());
    dispatch(setGrid(gridCopy));
  }, [dispatch, gridSize]);

  useInterval(() => {
    runSimulation(grid);
  }, speed);

  useEffect(() => {
    const onScroll = () => setOffset([window.pageXOffset, window.pageYOffset]);
    const onResize = () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize)
    // clean up
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <section
      style={{
        width: containerSize.width,
        height: containerSize.height
      }}
    >
      <div className={`game${running ? ' running' : ''}`}
        style={{
          width: viewPort.width + cellSize * 2,
          height: viewPort.height + cellSize * 2,
          top: '100px',
          left: left,
          position: 'fixed'
        }}
      >
        <Grid template={`repeat(${Math.floor(visibleGridSize.x)}, ${cellSize}px)`} grid={visibleGrid} gridOffset={gridOffset} />
      </div>
    </section>
  );
}