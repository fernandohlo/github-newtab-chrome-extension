export function setUnsplashPhoto () {
  const UNSPLASH_IMAGE = localStorage.getItem('GITHUB_UNSPLASH_IMAGE');
  if (UNSPLASH_IMAGE) {
    document.body.style.backgroundImage = `url(${UNSPLASH_IMAGE})`;
  }
}