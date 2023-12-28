export function filterByLabel (items: Array<any>, byLabel: string) {
  return items.filter((item: any) => item.labels.some((label: any) => label.name === byLabel));
}

export function filterByUser (items: Array<any>, byUser: string) {
  return items.filter((item: any) => item.user.login === byUser);
}

export function filterByReviewUser (items: Array<any>, byUser: string) {
  return items.filter((item: any) => item.requested_reviewers.some((user: any) => user.login === byUser));
}

export function filterForAdmin (items: Array<any>) {
  return items;
}
