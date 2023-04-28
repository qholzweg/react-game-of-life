import { Icon } from '@iconify/react';
import { FC } from 'react';
export const Footer: FC<{running:boolean, setRunning:Function, step:number, alive:number}> = ({running, setRunning, step, alive}) => {
  return (
    <footer>
      <div className="container">
        <div className="controls">
          <button className="play-button" onClick={() => setRunning(!running)}>
            {!running && <Icon icon="fa:play" />}
            {running && <Icon icon="fa:stop" />}
          </button>
        </div>
        <div className="stats">
          <p>Step: {step}</p>
          <p>Cells alive: {alive}</p>
        </div>
      </div>
    </footer>
  );
}