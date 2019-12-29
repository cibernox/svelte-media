import mediaFromBreakpoints from '../../src/client';

describe('mediaFromBreakpoints', () => {
  test('it exports a function that takes breakpoints and returns a store', () => {
    let breakpoints = {
      small: "(max-width: 849px)",
      large: "(min-width: 850px)",
      short: "(max-height: 399px)",
      wide: "(min-width: 960px)",
      widest: "(min-width: 1260px)",
      landscape: "(orientation: landscape) and (max-height: 499px)",
      tiny: "(orientation: portrait) and (max-height: 599px)"
    };
    let store = mediaFromBreakpoints(breakpoints);
    expect(typeof store.subscribe).toEqual('function');
  })
})