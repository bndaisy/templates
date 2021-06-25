let tabName;

function toggleContent(content) {
  [...content].forEach((element) => {
    if (element.classList.contains(tabName)) element.classList.add('is-active');
    else element.classList.remove('is-active');
  });
}

function toggleNav(current, tabs, content) {
  [...tabs].forEach((tab) => tab.classList.remove('is-active'));

  current.classList.add('is-active');
  tabName = current.getAttribute('data-tab-name');

  toggleContent(content);
}

function toggleTabs(tabs, content) {
  [...tabs].forEach((tab) => tab.addEventListener('click', () => toggleNav(tab, tabs, content)));
}

export default {
  toggleTabs,
};
