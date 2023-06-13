import { getPrs } from './pr/factory.js';
import { startTime } from './ui/clock.js';

export async function start () {
  startTime();
  getPrs();

  const manifestData = _getManifest();
  const version = manifestData.version;
  document.getElementById('version').innerHTML = version;

  const UNSPLASH_IMAGE = localStorage.getItem('GITHUB_UNSPLASH_IMAGE');
  if (UNSPLASH_IMAGE) {
    document.body.style.backgroundImage = `url(${UNSPLASH_IMAGE})`;
  }

  setInterval(() => {
    getPrs();
  }, 180000); // 3min

  document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
      getPrs();
    }
  });
}

function _getManifest () {
  if (chrome && chrome.runtime) {
    return chrome.runtime.getManifest();
  }
  return {
    version: 'foo-1.0'
  }
}
