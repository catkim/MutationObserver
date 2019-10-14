//Dom elements with observers
const btnsHolder = document.getElementById('styleBtns'),
removeBtnsHolder = document.getElementById('removeBtns'),
charUpdate = document.getElementById('charUpdates'),

// child elements updated in observed parent elements
btnsStyle = [].slice.call(document.querySelectorAll('.styledBtn')),
btnsRemoveStyle = [].slice.call(document.querySelectorAll('.styledBtnRemoved'));

// observer config objects
//you could reuse one that had all options but I wanted to show the minmium options needed for each record type.
const observerConfigAttribute = {attributes: true, subtree: true},
observerConfigChildList = {childList: true},
observerConfigCharData = {characterData: true, characterDataOldValue: true, subtree: true};

//create an instance of a Mutation obsever which checks for mutation record type and appends text message to dom element
const observer = new MutationObserver(function(mutations) {
  let pTag = document.createElement('P'),
  resultStlElm = document.getElementById('styleMo'),
  resultRemElm = document.getElementById('removeMo'),
  resultcharDataElm = document.getElementById('charDataMo'),
  resultTxt = 'This mutation record is of type ';
  mutations.forEach(function(mutation) {
    switch(mutation.type){
      case 'attributes':
      pTag.innerText = resultTxt + mutation.type +'.';
      resultStlElm.appendChild(pTag);
      break;
      case 'childList':
      pTag.innerText = resultTxt + mutation.type +'.';
      resultRemElm.appendChild(pTag);
      break;
      case 'characterData':
      pTag.innerText = resultTxt + mutation.type +'.';
      resultcharDataElm.appendChild(pTag);
      break;
    }
  });
});

//set up observers with target(dom element) and observer config object
observer.observe(btnsHolder, observerConfigAttribute);
observer.observe(removeBtnsHolder, observerConfigChildList);
observer.observe(charUpdate, observerConfigCharData);

//Timers - used to simulate dynamic updates
// style change timer on first set of buttons
 timer = (elm, time) => {
  time = time * 2000;
  setTimeout(() => {
    elm.classList.add("styledBtnChange");
  }, time);
}

setTimeout(() => {
  btnsStyle.forEach((btn, index) => {
    timer(btn, index);
  });
}, 500);

// timers to add remove button is second set
setTimeout(function(){
  btnsRemoveStyle[1].parentNode.removeChild(btnsRemoveStyle[1]);
}, 5000);

setTimeout(function(){
  btnsRemoveStyle[0].parentNode.insertBefore(btnsRemoveStyle[1], btnsRemoveStyle[0].nextSibling);
}, 7000);
