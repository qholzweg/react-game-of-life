import { Icon } from '@iconify/react';
import { FC } from 'react';
export const Header: FC = () => {
  return (
    <header className="App-header">
      <div className="container">
        <button className="settings-button">
          <Icon icon="fa:cog" />
        </button>
        <h1>Game of Life</h1>
        <button className="help-button">
          <Icon icon="fa:question" />
        </button>
      </div>
    </header>
  );
}