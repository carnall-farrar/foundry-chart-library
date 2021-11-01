const d3 = require('d3');
import './styles/sentenceTable.css';

function drawSentences(ulId, inputData) {

  const sentences = d3.select(ulId).selectAll('li')
    .data(inputData);

  sentences.enter()
    .append('li')
    .merge(sentences)
    .html(function(row, index) {
      const middleSentence = index === 1 ? 'margin-left: 12px' : '';
      const sentenceNumberStyle = index !== 1 ? 'topOrBottomSentence' : '';
      const sentenceContentStyle = index !== 1 ? 'topOrBottomSentence' : '';
      const id = `sentence_${row.sentenceNumber}`;
      const html = `
        <div id=${id} class='sentence' style="display:flex; margin-bottom: 10px; margin-top: 10px; ${middleSentence}">
          <div class="sentence-number ${sentenceNumberStyle}">${row.sentenceNumber}</div>
          <div class="sentence-content ${sentenceContentStyle}">${row.sentenceContent}</div>
        </div>
      `;
      return html;
    }); 

  sentences.exit().remove();

}

function scrollDown(id, data) { 
  const dataLen = data.length;
  const currentSentences = document.querySelectorAll('div.sentence-number.topOrBottomSentence');
  const firstItem = parseInt(currentSentences[0].textContent);
  const secondItem = parseInt(currentSentences[1].textContent) + 1;

  const newData = data.slice(firstItem,secondItem);
  drawSentences(id, newData);

  if (firstItem > 0) {
    const arrowUp = document.querySelector('#scroll-up');
    arrowUp.className = 'fa scroller scroll-up';
  }

  if (dataLen === secondItem) {
    const arrowDown = document.querySelector('#scroll-down');
    arrowDown.className = 'hidden';
  }
}

function scrollUp(id, data) { 
  const currentSentences = document.querySelectorAll('div.sentence-number.topOrBottomSentence');
  const firstItem = parseInt(currentSentences[0].textContent) - 2;
  const secondItem = parseInt(currentSentences[1].textContent) - 1;

  if (secondItem === data.length - 1) {
    const arrowDown = document.querySelector('#scroll-down');
    arrowDown.className = 'fa scroller';
  }

  const newData = data.slice(firstItem,secondItem);
  console.log({data, newData, firstItem, secondItem});
  drawSentences(id, newData);

  if (firstItem === 0) {
    const arrowUp = document.querySelector('#scroll-up');
    arrowUp.className = 'hidden';
  }
}

export function buildSentenceComponent(root, data) {
  d3.select(root)
    .append('div')
    .attr('class', 'hidden')
    .attr('id', 'scroll-up')
    .style('font-size', '50px')
    .text('\uf106'); 

  d3.select(root)
    .style('background-color', '#EBF1F5')
    .append('ul')
    .attr('id', 'sentence-list');

  const inputData = data.slice(0,3);
  
  window.onload = drawSentences('#sentence-list', inputData);

  const arrows = d3.select(root).append('div')
    .attr('class', 'arrows');

  arrows.append('text')       // Append a text element
    .attr('class', 'fa scroller')  // Give it the font-awesome class
    .attr('id', 'scroll-down')
    .style('font-size', '50px')
    .text('\uf107'); 

  const downArrow = document.querySelector('#scroll-down');
  downArrow.addEventListener('click', function () {
    scrollDown('#sentence-list', data);
  });

  const upArrow = document.querySelector('#scroll-up');
  upArrow.addEventListener('click', function() {
    scrollUp('#sentence-list', data);
  });
}