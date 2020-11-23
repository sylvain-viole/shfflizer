let optionArray = [];

$(document).ready(function () {
  // BTNS
  const addBtnOwn = $("#add__btn");
  const resetBtn = $('#reset');
  const validateBtn = $('#validate');
  const ownModeBtn = $('#own-mode__btn');
  const yesNoModeBtn = $("#yesno-mode__btn");
  const revertModeBtn = $('#revert-mode__btn');
  const modaleCloseBtn = $('#modale__close')
  const modaleOkBtn = $('#modale__ok')

  const brand = $('#brand')

  const indexDiv = $('#index__content')
  const ownModeDiv = $('#own__content')
  const yesNoModeDiv = $('#yes-no__content')
  const revertModeDiv = $('#revert__content')
  const resultDiv = $('#result__content')

  const input = $("#add__text-input");
  const optionList = $("#add__container");

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
    transition(indexDiv, yesNoModeDiv)
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
      $("#option__container").children().last().detach();
      $("#option__container").children().last().detach();
    }
    optionArray = [];
  });

  validateBtn.on('click', () => {
    if (optionArray.length > 1) {
      transition(ownModeDiv, resultDiv);
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
    outDiv.fadeToggle(200);
    setTimeout(() => {
      inDiv.fadeToggle(200);
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
    let listItemContent = `<div class="flex flex-row">`;
    listItemContent += `<div class="w-11/12 px-2 h-full self-center">`;
    listItemContent += item;
    listItemContent += `</div>`;
    listItemContent += `<div class="w-1/12 place-self-center text-center">`;
    listItemContent += `<button class="delete-trigger text-5xl focus:outline-none">-</button>`;
    listItemContent += `</div>`;
    listItemContent += `</div>`;
    listItemContent += `<hr class="hr-to-delete" />`;
    optionList.after(listItemContent);
  }

  function retrieveItem(item) {
    const deleteOption = item.parent().prev();
    const deleteContent = deleteOption[0].innerText;
    const deleteContentIndex = optionArray.indexOf(deleteContent);
    optionArray.splice(deleteContentIndex, 1);
    retrieveList(item)
  }

  function retrieveList(item) {
    const deleteTarget = item.parentsUntil("#option__container");
    const deleteHr = item.parent().parent().next();
    deleteTarget.detach();
    deleteHr.detach();
  }

});
