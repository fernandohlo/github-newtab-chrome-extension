export function block (id, title, total, list, classCss) {
  let html = `<div id="${id}" class="wrapper-info-data ${classCss}">`;

  html += `<h2><em>${total}</em>${title}</h2>`;
  html += `<ul>${list}</ul>`;
  html += '</div>';

  return html;
}
