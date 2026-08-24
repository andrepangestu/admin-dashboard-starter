/**
 * jsdom does not implement `window.matchMedia`. This controller installs a
 * fake that tests can flip at runtime to simulate OS theme changes.
 */
export interface MatchMediaController {
  setMatches: (value: boolean) => void;
}

export function installMatchMedia(initialMatches = false): MatchMediaController {
  let matches = initialMatches;

  class FakeMediaQueryList extends EventTarget {
    media = '';
    onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null = null;

    get matches(): boolean {
      return matches;
    }

    addListener(): void {}
    removeListener(): void {}
  }

  const instances = new Set<FakeMediaQueryList>();

  window.matchMedia = (query: string): MediaQueryList => {
    const list = new FakeMediaQueryList();
    list.media = query;
    instances.add(list);
    return list;
  };

  return {
    setMatches(value: boolean) {
      matches = value;
      for (const list of instances) {
        list.dispatchEvent(new Event('change'));
      }
    },
  };
}
