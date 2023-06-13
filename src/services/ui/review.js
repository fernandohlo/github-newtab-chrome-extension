export function user (user, review) {
  let html = `<span class="user" title="${user.login}" style="background-image: url('${user.avatar_url}');">`;

  if (review) {
    if (review.state === 'APPROVED') {
      html += `<span class="tick ok">✓</span>`;
    }
    if (review.state === 'CHANGES_REQUESTED') {
      html += `<span class="tick ko">X</span>`;
    }
  }

  html += `</span>`;

  return html;
}