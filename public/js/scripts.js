// ARRAYS DECLARATION

let optionArray = [];

const topResultArray= [
  "And the answer is...",
  "Easy one :",
  "Admit it...",
  "I can't think of nothing else but...",
  "Trust me..."
]
const bottomResultArray= [
  "... And you knew it !",
  "Could have figured it on your own!",
  "... There's no other way.",
  "Let's say that'll do...",
  "I never lie to humans."
]

// DOM elements
$(document).ready(function () {
  // BTNS
  const addBtnOwn = $("#add__btn");
  const resetBtn = $('#reset');
  const validateBtn = $('#validate');
  const ownModeBtn = $('#own-mode__btn');
  const yesNoModeBtn = $("#yesno-mode__btn");
  const revertModeBtn = $('#revert-mode__btn');
  const homeBtn = $(".home__btn");
  const modaleCloseBtn = $('#modale__close')
  const modaleOkBtn = $('#modale__ok')

  // DIVS
  const brand = $('#brand')

  const indexDiv = $('#index')
  const ownModeDiv = $('#own')
  const yesNoModeDiv = $('#yes-no')
  const revertModeDiv = $('#revert')
  const resultDiv = $('#result')
  const resultTopContainer = $('#result__top')
  const resultContainer = $('#result__container')
  const resultBottomContainer = $('#result__bottom')
  const input = $("#add__text-input");
  const optionList = $("#list__container");


  //  EVENTS

  // Brand
  brand.on('click', () => {
    if (!indexDiv.hasClass('active__div')) {
      const divToDisappear = $('.active__div') 
      transition(divToDisappear, indexDiv);
    } else return;
  })

  //  Modes BTN
  ownModeBtn.on('click', () => {
    transition(indexDiv, ownModeDiv)
  })
  yesNoModeBtn.on('click', () => {
    transition(indexDiv, resultDiv)
    const result = shfflizer(['Yes', 'No']);
    displayResult(result);
  })
  revertModeBtn.on('click', () => {
    transition(indexDiv, revertModeDiv)
  })

  // Modale
  modaleCloseBtn.on('click', () => {
    closeModale();
  })
  modaleOkBtn.on('click', () => {
    closeModale();
  })

  // Home Btn
  homeBtn.on('click', () => {
    const outDiv = $('.active__div')
    transition(outDiv, indexDiv);
  })

  // Own mode
  addBtnOwn.on('click', () => {
    addItem(input.val());
  });

  input.on('keypress', (event) => {
    if (event.which == 13) {
      addItem(input.val())
    }
  });
  
  $("body").delegate(".delete-trigger", 'click', (listLine) => {
    retrieveItem($(listLine.currentTarget));
  });

  resetBtn.on('click', () => {
    for (let i = 0; i < optionArray.length; i++) {
      $(".list__item").last().detach();
    }
    optionArray = [];
  });

  validateBtn.on('click', () => {
    if (optionArray.length > 1) {
      const mainResult = shfflizer(optionArray);
      displayResult(mainResult)
      transition(ownModeDiv, resultDiv);
    } else {
      openModale('Not enough options!')
    }
  })


  // FUNCTIONS

  // Display results
  function displayResult(mainResult) {
    const topResult = shfflizer(topResultArray);
    const bottomResult = shfflizer(bottomResultArray);
    resultTopContainer.text(topResult);
    resultBottomContainer.text(bottomResult);
    dynamicFontSize(mainResult);
    resultContainer.text(mainResult)
  }

  // Modale
  function openModale(text) {
    $('#modale__body p').text(text)
    $("#modale").fadeIn(250)
  }
  
  function closeModale() {
    $("#modale").fadeOut(250)
  }
  // Transition
  function transition(outDiv, inDiv) {
    outDiv.fadeOut(200);
    setTimeout(() => {
      inDiv.fadeIn(200).css('display','flex');
      inDiv.addClass('active__div')
      outDiv.removeClass('active__div')
    }, 201);
  }


  function addItem(item) {
    if (!item) {
      openModale("You did'nt write anything !")
    } else if (optionArray.includes(item)) {
      openModale("You already entrered this option");
    } else {
      optionArray.push(item);
      appendList(item);
    }
    input.val("");
  }

  function appendList(item) {
    let listItemContent = `<div class="list__item flex flex-row">`;
    listItemContent += `<div class="w-11/12 px-2 h-full self-center">`;
    listItemContent += item;
    listItemContent += `</div>`;
    listItemContent += `<div class="w-1/12 place-self-center text-center">`;
    listItemContent += `<button class="delete-trigger text-5xl focus:outline-none">-</button>`;
    listItemContent += `</div>`;
    listItemContent += `</div>`;
    optionList.append(listItemContent);
  }

  function retrieveItem(item) {
    const itemToDelete = item.parent().prev().text();
    const itemIndexInOptionArray = optionArray.indexOf(itemToDelete);
    optionArray.splice(itemIndexInOptionArray, 1);
    retrieveList(item)
  }

  function retrieveList(item) {
    const deleteTarget = item.parent().parent();
    deleteTarget.detach();
  }
  
  function dynamicFontSize(result) {
    const resultLength = result.length;
    if (resultLength < 5) {
      resultContainer.css('font-size', '8rem')
    } else if ((resultLength >= 5) && (resultLength < 10)) {
      resultContainer.css('font-size', '5rem')
    } else if ((resultLength >= 10) && (resultLength <= 50)) {
      resultContainer.css('font-size', '2rem')
    } else {
      resultContainer.css('font-size', '1rem')
    }
  }
  
  function shfflizer(array) {
    const resultIndex = Math.floor((Math.random()*array.length)) ;
    const resultValue = array[resultIndex];
    return resultValue
  
  }



});



