let toggle = false;
export function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = _checkTime(m);
  s = _checkTime(s);
  document.getElementById('clock').innerHTML =  h + `<span class="${toggle ? 'hide' : ''}">:</span>` + m;
  toggle = !toggle;
  setTimeout(startTime, 500);
}

function _checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}