export function getHeaders () {
  const headers = new Headers();
  const GITHUB_TOKEN = localStorage.getItem('GITHUB_TOKEN');

  headers.append('Accept', 'application/vnd.github+json');
  headers.append('X-GitHub-Api-Version', '2022-11-28');
  headers.append('Authorization', `Bearer ${GITHUB_TOKEN}`);

  return headers;
}
