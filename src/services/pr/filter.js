export function filterByLabel (items, byLabel) {
  return items.filter(item => item.labels.some(label => label.name === byLabel));
}

export function filterByUser (items, byUser) {
  return items.filter(item => item.user.login === byUser);
}
