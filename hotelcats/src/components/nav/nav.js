const renderingDynamicNavigationElement = (navigation, elements) => {
  const fragment = document.createDocumentFragment();
  const li = createItem();

  elements.forEach(element => li.append(createLink(element)));

  fragment.append(li);
  navigation.append(fragment);
}

const createLink = ({ value, attributes }) => {
  const link  = document.createElement('a');

  link.classList.add('nav__link');
  link.append(value);

  Object.entries(attributes).forEach(([key, value]) => link.setAttribute(key, value))

  return link;
}

const createItem = () => {
  let li = document.createElement('li');

  li.classList.add('nav__item', 'nav__item--dynamic');

  return li;
}

export {
  renderingDynamicNavigationElement
}
