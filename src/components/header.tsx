import { Icon } from '@iconify/react';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { selectSettings, toggleHelp, toggleSettings } from '../service/reducers/settings-slice';
import HelpModal from './modal/help-modal';
import SettingsModal from './modal/settings-modal';
export const Header: FC = () => {
  const { isHelpOpen, isSettingsModalOpen } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  return (
    <header className="App-header">
      <div className="container">
        <button
          className="settings-button"
          onClick={() => dispatch(toggleSettings())}
        >
          <Icon icon="fa:cog" />
        </button>
        <h1>Game of Life</h1>
        <button
          className="help-button"
          onClick={() => dispatch(toggleHelp())}
        >
          <Icon icon="fa:question" />
        </button>
      </div>
      {isSettingsModalOpen &&
        <SettingsModal />
      }
      {isHelpOpen &&
        <HelpModal />
      }
    </header>
  );
}