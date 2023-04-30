import reducer, { setGrid, toggleCell, incrementStep, resetStep, initialState } from './game-slice';

describe('Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  const someGrid = [[0,0,1,1], [1,1,1,1], [1,0,0,0], [0,0,0,0]];
  const stateWithGrid = {
    ...initialState,
    grid: someGrid
  }
  it('should set grid', () => {
    expect(reducer(initialState, setGrid(someGrid))).toEqual(
      stateWithGrid
    )
  })
  it('should toggle cell', () => {
    expect(reducer(stateWithGrid, toggleCell({i:1,k:1}))).toEqual(
      {
        ...stateWithGrid,
        grid: [[0,0,1,1], [1,0,1,1], [1,0,0,0], [0,0,0,0]]
      }
    )
  })
  
  const stateAtStep1 = {
    ...initialState,
    step:1
  }
  it('should increment step', () => {
    expect(reducer(initialState, incrementStep)).toEqual(
      stateAtStep1
    )
  })
  it('should reset step', () => {
    expect(reducer(stateAtStep1, resetStep)).toEqual(
      initialState
    )
  })

 
})


