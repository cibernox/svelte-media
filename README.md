# svelte-media

> Easy way to observe for media queries as a store for your Svelte apps

`svelte-media` helps you define the media queries you want to observe. By using [stores](https://svelte.dev/docs#svelte_store) to keep track of the matching state of the given media queries it notifies your app in the most efficient way when a change happens.

## Usage

```
import watchMedia from "svelte-media";

const mediaqueries = {
  small: "(max-width: 849px)",
  large: "(min-width: 850px)",
  short: "(max-height: 399px)",
  landscape: "(orientation: landscape) and (max-height: 499px)",
  tiny: "(orientation: portrait) and (max-height: 599px)",
  dark: "(prefers-color-scheme: dark)",
  noanimations: "(prefers-reduced-motion: reduce)"
};

export const media = watchMedia(mediaqueries);
```

