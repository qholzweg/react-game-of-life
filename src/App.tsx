import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/store';
import './App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { selectSettings } from './service/reducers/settings-slice';
import { createEmptyGrid } from './service/reducers/game-slice';
import { Game } from './components/game';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { gridSize } = useAppSelector(selectSettings);

  useEffect(() => {
    dispatch(createEmptyGrid(gridSize));
  }, [dispatch, gridSize]);

  return (
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
