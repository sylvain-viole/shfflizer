let optionArray = [];

$(document).ready(function () {
  // BTNS
  const addBtnOwn = $("#add__btn");
  const resetBtn = $('#reset');
  const validateBtn = $('#validate');
  const ownModeBtn = $('#own-mode__btn');
  const yesNoModeBtn = $("#yesno-mode__btn");
  const revertModeBtn = $('#revert-mode__btn');
  const resultBackBtn = $("#result-back__btn");
  const modaleCloseBtn = $('#modale__close')
  const modaleOkBtn = $('#modale__ok')

  const brand = $('#brand')

  const indexDiv = $('#index')
  const ownModeDiv = $('#own')
  const yesNoModeDiv = $('#yes-no')
  const revertModeDiv = $('#revert')
  const resultDiv = $('#result')
  const resultContainer = $('#result__container')

  const input = $("#add__text-input");
  const optionList = $("#list__container");

  brand.on('click', () => {
    if (!indexDiv.hasClass('active__div')) {
      const divToDisappear = $('.active__div') 
      transition(divToDisappear, indexDiv);
    } else return;
  })

  ownModeBtn.on('click', () => {
    transition(indexDiv, ownModeDiv)
  })
  yesNoModeBtn.on('click', () => {
    transition(indexDiv, resultDiv)
    const result = shfflizer(['Yes', 'No']);
    resultContainer.text(result);
  })
  revertModeBtn.on('click', () => {
    transition(indexDiv, revertModeDiv)
  })

  modaleCloseBtn.on('click', () => {
    closeModale();
  })

  modaleOkBtn.on('click', () => {
    closeModale();
  })

  resultBackBtn.on('click', () => {
    transition(resultDiv, indexDiv);
  })


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
      transition(ownModeDiv, resultDiv);
      const result = shfflizer(optionArray);
      resultContainer.text(result);
    } else {
      openModale('Not enough options!')
    }
  })

  function openModale(text) {
    $('#modale__body p').text(text)
    $("#modale").fadeIn(250)
  }
  
  function closeModale() {
    $("#modale").fadeOut(250)
  }

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
    if (resultLength < 10) {
      resultContainer.css('font-size', '8rem')
    } else if ((resultLength >= 10) && (resultLength <= 50)) {
      resultContainer.css('font-size', '2rem')
    } else {
      resultContainer.css('font-size', '1rem')
    }
  }
  
  function shfflizer(array) {
    console.log(optionArray);
    const resultIndex = Math.floor((Math.random()*array.length)) ;
    const resultValue = array[resultIndex];
    dynamicFontSize(resultValue);
    return resultValue
  
  }

});



