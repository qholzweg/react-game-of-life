
import { Icon } from "@iconify/react";
import { useAppDispatch } from "../../hooks/store";
import { toggleHelp } from "../../service/reducers/settings-slice";
import Modal from "./modal";

export default function HelpModal() {
  const dispatch = useAppDispatch();

  const handleDetailsClose = () => {
    dispatch(toggleHelp());
  }

  return (
    <Modal onClose={handleDetailsClose} title="Help">
      <div className="content">
        <h3>Usage</h3>
        <p>&mdash; Place initial cells on the board and hit &nbsp;<Icon icon="fa:play" />&nbsp;Play </p>
        <p>&mdash; You can clear the board with &nbsp;<Icon icon="fa:trash" />&nbsp;Clear button <br />and place random cells with &nbsp;<Icon icon="fa:random" /> Randomize</p>
        <p>&mdash; You can change board size and game speed via &nbsp;<Icon icon="fa:cog" />&nbsp;Settings </p>

        <h3>About the game</h3>
        <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>

        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
      </div>
    </Modal>
  )

}