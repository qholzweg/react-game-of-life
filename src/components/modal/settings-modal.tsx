
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useForm } from "../../hooks/useForm";
import { selectSettings, setSettings, toggleSettings } from "../../service/reducers/settings-slice";
import { Speed, TSettingsForm } from "../../utils/types";
import Modal from "./modal";
import { createEmptyGrid, resetStep } from "../../service/reducers/game-slice";

export default function SettingsModal() {
  const dispatch = useAppDispatch();

  const { gridSize, speed } = useAppSelector(selectSettings);

  //using hook to update the state of the form, initial value from the slice
  const { form, handleChange } = useForm<TSettingsForm>({ cols: gridSize.cols.toString(), rows: gridSize.rows.toString(), speed: speed.toString() });

  //on form submit update settings slice, game's grid & close settings window
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(setSettings(form));
      dispatch(createEmptyGrid({
        cols: parseInt(form.cols),
        rows: parseInt(form.rows)
      }));
      dispatch(resetStep());
      dispatch(toggleSettings());
    }, [form, dispatch]
  )

  return (
    <Modal onClose={() => dispatch(toggleSettings())} title="Settings">
      <div className="content">
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend>Grid size</legend>
            <div className="inputGroup">
              <label htmlFor="cols">Width:</label>
              <input name="cols" type="number" min={3} placeholder="Columns" value={form.cols} onChange={handleChange} />
            </div>
            <div className="inputGroup"><label htmlFor="cols">Height:</label><input name="rows" type="number" min={3} placeholder="Rows" value={form.rows} onChange={handleChange} /></div>
          </fieldset>
          <fieldset className="radio-toolbar">
            <legend>Game speed</legend>
            <input name="speed" id="slow" value={Speed.slow} checked={parseInt(form.speed) === Speed.slow.valueOf()} type="radio" onChange={handleChange} />
            <label htmlFor="slow">Slow</label>

            <input name="speed" id="normal" value={Speed.normal} checked={parseInt(form.speed) === Speed.normal.valueOf()} type="radio" onChange={handleChange} />
            <label htmlFor="normal">Normal</label>

            <input name="speed" id="fast" value={Speed.fast} checked={parseInt(form.speed) === Speed.fast.valueOf()} type="radio" onChange={handleChange} />
            <label htmlFor="fast">Fast</label>

          </fieldset>
          <p><em className="text-gray">* Changing settings will clear the board</em></p>
          <button type="submit">
            Save
          </button>
        </form>

      </div>
    </Modal>
  )

}