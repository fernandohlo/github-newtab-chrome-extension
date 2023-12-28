/* eslint-disable no-undef */
export default class UnsplashFactory {
  static setPhoto () {
    const UNSPLASH_IMAGE = localStorage.getItem('GITHUB_UNSPLASH_IMAGE');
    if (UNSPLASH_IMAGE) {
      document.body.style.backgroundImage = `url(${UNSPLASH_IMAGE})`;
    }
  }
}
