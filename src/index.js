import _ from 'lodash';

function component(root) {
    console.log(root)
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  root.appendChild(element)
}

global.component = component