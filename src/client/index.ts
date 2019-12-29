import { writable } from "svelte/store";

interface Media {
  classNames: string,
  [key: string]: string | boolean
}
type MediaQueryLists = Record<string, MediaQueryList>

function calculateMedia(mqls: MediaQueryLists) {
  let media: Media = { classNames: '' };
  let mediaClasses = [];
  for (let name in mqls) {
    media[name] = mqls[name].matches;
    if (media[name]) {
      mediaClasses.push(`media-${name}`);
    }
  }
  media.classNames = mediaClasses.join(" ");
  return media;
}

export default function(breakpoints: Record<string, string>) {
  return writable({}, set => {
    if (typeof window === "undefined") return;
    let mqls: MediaQueryLists = {};
    let updateMedia = () => set(calculateMedia(mqls));
    for (let key in breakpoints) {
      let foo = window.matchMedia(breakpoints[key]);
      mqls[key] = foo;
      mqls[key].addEventListener("change", updateMedia);
    }
    updateMedia();
    return () => {
      for (let key in mqls) {
        mqls[key].removeEventListener("change", updateMedia);
      }
    };
  });
}