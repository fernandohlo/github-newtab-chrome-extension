export default class ManifestFactory {
  static getData () {
    if (chrome && chrome.runtime) {
      return chrome.runtime.getManifest();
    }
    return {
      version: 'foo-1.0'
    };
  }
}
