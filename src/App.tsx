import { FC, useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { TCoords, TgridSize } from './service/types';
import { countCells, generateEmptyGrid, generateRandomTiles, getACtiveZone } from './service/utils';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Grid } from './components/grid';
import useInterval from './service/useInterval';

const App: FC = () => {
  const [gridSize, setGridSize] = useState<TgridSize>({ cols: 1000, rows: 1000 });
  const [grid, setGrid] = useState(() => generateEmptyGrid(gridSize));
  const [offset, setOffset] = useState([0, 0]);
  const [step, setStep] = useState(0);

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const cellSize = 30;
  const containerSize = {
    width: cellSize * gridSize.cols,
    height: cellSize * gridSize.rows
  }
  const viewPort = {
    width: window.innerWidth,
    height: window.innerHeight - 100,
  }
  const maxCells: TCoords = {
    x: Math.floor(viewPort.width / cellSize),
    y: Math.floor(viewPort.height / cellSize),
  }
  const activeGridSize: TCoords = {
    x: maxCells.x < gridSize.cols ? maxCells.x : gridSize.cols,
    y: maxCells.y < gridSize.rows ? maxCells.y : gridSize.rows
  }
  const gridOffset: TCoords = {
    x: Math.floor(offset[0] / cellSize),
    y: Math.floor(offset[1] / cellSize)
  }
  const activeGrid = getACtiveZone(grid, gridOffset.x, activeGridSize.x, gridOffset.y, activeGridSize.y);
  const operations = [
    [0, 1], // right
    [0, -1], // left
    [1, -1], // top left
    [-1, 1], // top right
    [1, 1], // top
    [-1, -1], // bottom
    [1, 0], // bottom right
    [-1, 0], // bottom left
  ];

  const runSimulation = useCallback((grid: number[][]) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < gridSize.rows; i++) {
      for (let j = 0; j < gridSize.cols; j++) {
        let neighbors = 0;

        operations.forEach(([x, y]) => {
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

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    setStep(step + 1);
    setGrid(gridCopy);
  }, [grid, step]);

  useInterval(() => {
    runSimulation(grid);
  }, 150);

  useEffect(() => {
    setGrid(() => generateRandomTiles(gridSize));
    const onScroll = () => setOffset([window.pageXOffset, window.pageYOffset]);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    // clean up
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onCellClick = (i: number, k: number) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[i][k] = grid[i][k] ? 0 : 1;
    setGrid(newGrid);
  }

  return (
    <div className="App">
      <Header />
      <section
        style={{
          width: containerSize.width,
          height: containerSize.height
        }}
      >
        <div className="game"
          style={{
            width: viewPort.width + cellSize * 2,
            height: viewPort.height + cellSize * 2,
            top: '100px',
            left: 0,
            position: 'fixed'
          }}
        >
          <Grid template={`repeat(${Math.floor(activeGridSize.x)}, ${cellSize}px)`} grid={activeGrid} gridOffset={gridOffset} onCellClick={onCellClick} />
        </div>
      </section>
      <Footer running={running} setRunning={setRunning} step={step} alive={countCells(grid)} />
    </div>
  );
}

export default App;
