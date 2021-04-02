const renderingIcon = ({ attributes, icon }) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');

  Object.entries(attributes).forEach(([key, value]) => svg.setAttribute(key, value));

  for (let option in icon) {
    const vector = document.createElementNS('http://www.w3.org/2000/svg', option.replace(/\d/g,''));

    Object.entries(icon[option]).forEach(([key, value]) => vector.setAttribute(key, value));

    svg.append(vector)
  }

  return svg;
}

export {
  renderingIcon
};
