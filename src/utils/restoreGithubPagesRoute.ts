// Counterpart to public/404.html — restores the real path (encoded there as
// ?redirect=...) before React Router mounts, so a hard refresh on a
// client-side route like /english-vocab-app/b1 works on GitHub Pages'
// static hosting. Must run before the router reads the URL.
export function restoreGithubPagesRoute() {
  const redirect = new URLSearchParams(window.location.search).get('redirect')
  if (!redirect) return
  history.replaceState(null, '', window.location.pathname.replace(/\/$/, '') + '/' + redirect)
}
