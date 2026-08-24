// Applies the stored theme before first paint to avoid a light-mode flash.
// Kept as an external file because the production CSP only allows script-src 'self'.
(function () {
  var theme;
  try {
    theme = window.localStorage.getItem('admin-ui-theme');
  } catch {
    theme = null;
  }
  var dark =
    theme === 'dark' ||
    (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
})();
