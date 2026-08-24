import '@testing-library/jest-dom/vitest';

import { installMatchMedia } from './match-media';

if (typeof window.matchMedia !== 'function') {
  installMatchMedia();
}

// jsdom does not implement scrolling; routers and Radix components call these.
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

// jsdom lacks ResizeObserver and pointer-capture APIs; Radix components use them.
if (typeof window.ResizeObserver !== 'function') {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
Element.prototype.hasPointerCapture = () => false;
Element.prototype.setPointerCapture = () => {};
Element.prototype.releasePointerCapture = () => {};
