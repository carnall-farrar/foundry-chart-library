const d3 = require('d3');
import './styles/arrows.css';
import './styles/sentenceTable.css';

function drawSentences(ulId, inputData) {

  const sentences = d3.select(ulId).selectAll('li')
    .data(inputData);

  sentences.enter()
    .append('li')
    .merge(sentences)
    .html(function(row, index) {
      const middleSentence = index === 1 ? 'margin-left: 30px' : 'margin-left: 30px';
      const sentenceNumberStyle = index !== 1 ? 'topOrBottomSentence' : '';
      const sentenceContentStyle = index !== 1 ? 'topOrBottomSentence' : '';
      const html = `
        <div id=${row.sentenceId} class='sentence' style="display:flex; margin-bottom: 10px; margin-top: 10px; ${middleSentence}">
          <div class="sentence-number ${sentenceNumberStyle}">
            <span class="sentence-text">${row.sentenceNumber}</span>
          </div>
          <div class="sentence-content ${sentenceContentStyle}">
            <span class="sentence-text">${row.sentenceContent}</span>
          </div>
        </div>
      `;
      return html;
    }); 

  d3.selectAll('li')
    .transition()
    .duration(2000)
    .attr('color', 'blue');

  sentences.exit().remove();

}

function addSentenceClickEvents(data) {
  const sentences = document.querySelectorAll('.sentence');
  sentences.forEach((sentence) => {
    sentence.addEventListener('click', function() {
      highlightSentence(data, sentence.id);
    });
  });
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
    arrowUp.className = 'arrow up';
    d3.select('ul').style('padding-top', '0px');
  }

  if (dataLen === secondItem) {
    const arrowDown = document.querySelector('#scroll-down');
    arrowDown.className = 'hidden';
    d3.select('ul').style('padding-bottom', '10px');
  }

  addSentenceClickEvents(data); // tag new sentences with click events
}

function scrollUp(id, data) { 
  const currentSentences = document.querySelectorAll('div.sentence-number.topOrBottomSentence');
  const firstItem = parseInt(currentSentences[0].textContent) - 2;
  const secondItem = parseInt(currentSentences[1].textContent) - 1;

  if (secondItem === data.length - 1) {
    const arrowDown = document.querySelector('#scroll-down');
    arrowDown.className = 'arrow down';
    d3.select('ul').style('padding-bottom', '0px');
  }

  const newData = data.slice(firstItem,secondItem);
  console.log({data, newData, firstItem, secondItem});
  drawSentences(id, newData);

  if (firstItem === 0) {
    const arrowUp = document.querySelector('#scroll-up');
    arrowUp.className = 'hidden';
    d3.select('ul').style('padding-top', '10px');
  }

  addSentenceClickEvents(data); // tag new sentences with click events
}

function highlightSentence(data, sentenceId) {
  const sentence = data.filter((row) => {
    return row.sentenceId === sentenceId;
  });
  drawSentences('#sentence-list', sentence);
  const arrowDown = document.querySelector('#scroll-down');
  const arrowUp = document.querySelector('#scroll-up');
  const goBack = document.querySelector('#go-back');
  goBack.className = 'previous';
  arrowDown.className = 'hidden';
  arrowUp.className = 'hidden';
  d3.select('ul').style('padding-top', '0px');
  d3.select('ul').style('padding-bottom', '10px');
}

function backToSentences(data, sentenceId) {
  const sentenceNum = data.filter((row) => {
    return row.sentenceId === sentenceId;
  })[0].sentenceNumber;

  const top = sentenceNum <= 3 ? 
    0 
    : sentenceNum === data.length ? sentenceNum - 3
      : sentenceNum - 2; 
  const bottom = sentenceNum === data.length ? 
    sentenceNum 
    : sentenceNum <= 3 ? sentenceNum + 2
      : sentenceNum + 1; 
  
  const inputData = data.slice(top, bottom);
  drawSentences('#sentence-list', inputData);
  addSentenceClickEvents(inputData); 

  const arrowDown = document.querySelector('#scroll-down');
  const arrowUp = document.querySelector('#scroll-up');
  if (data.length <= 3) {
    d3.select('ul').style('padding-top', '10px');
    d3.select('ul').style('padding-bottom', '10px');
  } else if (sentenceNum <= 2) {
    // show bottom only
    arrowDown.className = 'arrow down';
    d3.select('ul').style('padding-top', '10px');
    d3.select('ul').style('padding-bottom', '0px');
  } else if (sentenceNum === data.length ) {
    // show top only
    arrowUp.className = 'arrow up';
    d3.select('ul').style('padding-bottom', '10px');
  } else {
    arrowDown.className = 'arrow down';
    arrowUp.className = 'arrow up';
    d3.select('ul').style('padding-bottom', '0px');
    // show both arrows
  }
}


export function buildSentenceComponent(root, data) {  //  TODO add new arg representing light documentation
  
  sentences = d3.select(root)
                .append('div')
                .style('background-color', '#EBF1F5') // styling root div
                .style('border', 'thin solid #5C7080')
                .style('border-radius', '3px')
                .style('box-shadow', '0 0 2px #738694')


  // add the 'go back' element which will appear when you have selected a sentence
  sentences.append('a')
           .attr('class', 'hidden')
           .attr('id', 'go-back')
           .html('&laquo; Back to sentences');

  // Add the up arrow
  sentences.append('span')
           .attr('class', 'hidden')
           .attr('id', 'scroll-up');
  
  // append ul element
  sentences  
    .append('ul')
    .attr('id', 'sentence-list');

  const inputData = data.slice(0,3);
  
  window.onload = drawSentences('#sentence-list', inputData);
  addSentenceClickEvents(data); // tag new sentences with click events

  // Add the down arrow if number of sentences > 3
  const arrowDownClass = data.length > 3 ? 'arrow down' : 'hidden';
  const ulPaddingBottom = data.length > 3 ? '0px' : '10px';
  sentences.append('span')
           .attr('class', arrowDownClass)
           .attr('id', 'scroll-down');
  
  d3.select('ul').style('padding-bottom', ulPaddingBottom);
  
  const downArrow = document.querySelector('#scroll-down');
  downArrow.addEventListener('click', function () {
    scrollDown('#sentence-list', data);
  });

  const upArrow = document.querySelector('#scroll-up');
  upArrow.addEventListener('click', function() {
    scrollUp('#sentence-list', data);
  });

  const backArrow = document.querySelector('#go-back');
  backArrow.addEventListener('click', function() {
    const sentence = document.querySelector('.sentence');
    backToSentences(data, sentence.id);
    backArrow.className = 'hidden';
  });

   d3.select('#sentenceTable')
     .append('ul')
     .attr('id', 'my-new-test')
     .style('padding-top', '20px')
     .append('li')
     .text('- First bullet')
     .append('li')
     .text('- Second bullet');
        
  d3.select('#sentenceTable')
     .append('details')
     .attr('id', 'details')
     .text('[Content for read more]')
     .append('summary')
     .text("Read more")


}

function lowerElement(root){
    var docs = d3.select(root)
                .append('div')
                .attr('id', 'light-docs')
                .text('hello world');
    // return docs ?
}


export function lightDocumentation(root){

  var docsParent = d3.select(root)
             .append('div')
             .style('border', 'thin solid #5C7080')

  docsParent.append('div')
        .style('padding-top', '25px')
        .attr('id', 'core-docs')
        .text('Insights are statistically significant.');
  
  // parent.append('button')
  //       .style('padding-top', '25px')
  //       .attr('id', 'read-more')
  //       .text('Read more')
  //       .on("click", function(){
  //         console.log("hello world");
  //         // This works, successfully hides the div. But need to make it visible again if you click a second time!
  //         // Something like, if hidden == false then hide, otherwise show?
  //         d3.select("#readmore-container").classed("hidden", true);
  //       });
  
  var mainText = docsParent.append('ul')
                   .style('border', 'thin solid #5C7080')
                   .attr('id', 'main-text')
                   .append('li')
                   .text('insights statistically significant');
                   

  var readmore = docsParent.append('div')
                   .style('padding-top', '25px')
                   .style('border', 'thin solid #5C7080')
                   .attr('id', 'readmore-container');

  readmore.append('div')
        .style('padding-top', '25px')
        .attr('id', 'readmore-content')
        .text('More Hidden content');

        // command I'm using to run:
        // $ cd /Users/cmonit/cf/nhse_analytics/hiid_actionable/foundry-chart-library
        // $ ../kill_http.sh && yarn build && yarn start
  }
