/* Le’s Baguette concept — tiny shared script. No dependencies. */
(function () {
  'use strict';
  var html = document.documentElement;
  var theme = 'light';
  try {
    theme = localStorage.getItem('les-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (err) { theme = 'light'; }
  if (theme !== 'dark') theme = 'light';
  html.setAttribute('data-theme', theme);

  // Preserve the current page on reload so menu and visit pages stay useful.

  document.addEventListener('DOMContentLoaded', function () {
    function sync() {
      document.querySelectorAll('.theme-toggle').forEach(function (button) {
        var dark = html.getAttribute('data-theme') === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        var symbol = button.querySelector('.theme-symbol');
        if (symbol) symbol.textContent = dark ? '☀' : '☾';
      });
    }
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        try { localStorage.setItem('les-theme', next); } catch (err) { /* Storage may be disabled. */ }
        sync();
      });
    });
    sync();
  });
}());
