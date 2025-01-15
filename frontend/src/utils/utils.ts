export function getPathName() {
  const pathname = window.location.pathname;
  // Remove trailing slash if it exists (but keep the root '/')
  return pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
}