export function filterByLabel(items, byLabel) {
  const GITHUB_USER = localStorage.getItem('GITHUB_USER');
  return items.filter(item => item.labels.some(label => label.name === byLabel) && item.user.login !== GITHUB_USER);
}

export function filterByUser(items, byUser) {
  return items.filter(item => item.user.login === byUser);
}
