import reducer, { start, stop, toggleRunning, toggleHelp, toggleSettings, setSettings, TSettingsState, initialState } from './settings-slice';

describe('Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  const startedState = {
    ...initialState,
    running: true
  }
  it('should set game to start', () => {
    expect(reducer(initialState, start)).toEqual(
      startedState
    )
  })
  it('should set game to stop', () => {
    expect(reducer(startedState, stop)).toEqual(
      initialState
    )
  })
  const settingsOpen = {
    ...initialState,
    isSettingsModalOpen: true
  }
  it('should open settings and stop', () => {
    expect(reducer(startedState, toggleSettings)).toEqual(
      settingsOpen
    )
  })
  it('should close settings', () => {
    expect(reducer(settingsOpen, toggleSettings)).toEqual(
      initialState
    )
  })

  const newSettings = {
    cols: "50",
    rows: "50",
    speed: 1000
  }
  it('should set settings', () => {
    expect(reducer(initialState, setSettings(newSettings))).toEqual(
      {
        ...initialState,
        gridSize: { cols: 50, rows: 50 },
        speed: 1000
      }
    )
  })
})


