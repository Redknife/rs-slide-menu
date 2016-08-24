function createElementWithClass(className, tag = 'div') {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

function createCloseBtn(prefix) {
  const closeBtn = createElementWithClass(`${prefix}-close`, 'button');
  closeBtn.innerHTML = '&times;';
  return closeBtn;
}

function createContainerBar(prefix) {
  const containerBar = createElementWithClass(`${prefix}-container__bar`);
  containerBar.appendChild(createCloseBtn(prefix));

  return containerBar;
}

function createContainer(prefix) {
  const container = createElementWithClass(`${prefix}-container`);

  const containerBar = createContainerBar(prefix);

  container.appendChild(containerBar);

  return container;
}

export default (prefix) => {
  const wrap = createElementWithClass(`${prefix}-wrap`);
  const backdrop = createElementWithClass(`${prefix}-backdrop`);
  const container = createContainer(prefix);
  const content = createElementWithClass(`${prefix}-content`);

  container.appendChild(content);

  wrap.appendChild(backdrop);
  wrap.appendChild(container);

  return {
    wrap,
    backdrop,
    container,
    content,
  };
};

