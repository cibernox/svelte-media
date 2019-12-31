# svelte-media

> Easy way to observe for media queries as a store for your Svelte apps

`svelte-media` helps you define the media queries you want to observe. By using [stores](https://svelte.dev/docs#svelte_store) to keep track of the matching state of the given media queries it notifies your app in the most efficient way when a change happens.

It works SSR environments where `window.matchMedia` is not available, so it can be used in Sapper apps safely.

## Instalation

Just run `npm i --save-dev svelte-media` or `yarn add svelte-media`.

## Usage

The package's default export is a function that takes an object with named mediaquery strings and returns a svelte _store_ that you can export to
consume any way you want.

```js
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

Given an object with named media queries, the returned object from that store will have boolean properties named
after the media queries that indicate if they are a match or not, and a property named `classNames`that
contains a name of the matching media queries prefixed by `media-` to use as convenient css classes in any element.

For the example above the object might look like this:

```js
{
  small: false
  large: true
  short: true
  landscape: true
  tiny: false
  dark: true
  noanimations : false,
  classNames: 'media-large media-short media-landscape media-dark'
}
```

As with any other store, you can subscribe to it in templates by prefixing it with `$`.

```html
<script>
  import { media } from '../stores';
</script>

<div class="body l-body {$media.classNames}">
  {if $media.large}
	  <DesktopNav/>
  {:else}
	  <MobileNav/>
  {/if}
</div>
```

You can create more than one store if, for instance, you want to keep media queries about screen size
separated from, say those about pixel density, as the latter very rarely will fire an update.

