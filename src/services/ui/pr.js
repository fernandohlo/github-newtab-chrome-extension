import { user } from './review.js'

export function pr (item) {
  let html = '';

  html += `<span class="icon">`;
  html += user(item.user);
  html += `</span>`;
  html += `<a href="${item.html_url}">${item.title}<br/><span class="login">${item.user.login} #${item.number} > ${item.prInfo.head.ref} </span></a>`;
  html += `<span class="branch ${(item.prInfo.base.ref === 'release' || item.prInfo.base.ref === 'main' ) ? 'important' : ''}"><b>${item.prInfo.base.ref}</b></span>`;
  html += `<span class="info">`;
  for (const review of item.reviewsInfo) {
    if (review.state === 'APPROVED') {
      html += user(review.user, review);
    }
    if (review.state === 'CHANGES_REQUESTED') {
      html += user(review.user, review);
    }
  };
  html += `<span class="status ${item.prInfo.mergeable ? 'merge' : ''} ${item.prInfo.mergeable_state === 'clean' ? 'ok' : ''}">✓</span>`;
  html += `</span>`;

  return html;
}

export function prs (items) {
  let html = '';

  for (const item of items) {
    html += `<li class="${_prClass(item).join(',')}">${pr(item)}</li>`;
  };

  return html;
}

function _prClass (item) {
  const cssClass = [];
  const GITHUB_USER = localStorage.getItem('GITHUB_USER');

  if (item.reviewsInfo.some(review => review.user.login === GITHUB_USER && (review.state === 'APPROVED' || review.state === 'CHANGES_REQUESTED'))) {
    cssClass.push('me');
  }

  if (item.labels.some(label => label.name === 'status/work-in-progress')) {
    cssClass.push('disabled');
  }

  return cssClass;
}