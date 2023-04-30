import { FC } from 'react';
import { TModal } from '../modal';

const ModalOverlay: FC<TModal> = ({ onClose, ...props }) => {
  return (
    <div className="overlay" onClick={onClose}>
      {props.children}
    </div>
  )
}
export default ModalOverlay;