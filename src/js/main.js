// 测试babel
let isCanUseBabel = false;
let a = 0;

window.onload = function() {
  let windowWidth = document.documentElement.clientWidth;
  document.documentElement.style.fontSize = (windowWidth > 750 ? 750 : windowWidth) + 'px';
}
