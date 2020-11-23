// ARRAYS DECLARATION

let optionArray = [];

const topResultArray = [
  "And the answer is...",
  "Easy one :",
  "Admit it...",
  "I can't think of nothing else but...",
  "Trust me...",
];
const bottomResultArray = [
  "... And you knew it !",
  "Could have figured it on your own!",
  "... There's no other way.",
  "Let's say that'll do...",
  "I never lie to humans.",
];

// DOM elements
$(document).ready(function () {

  //  EVENTS

  // Brand
  $("#brand").on("click", () => {
    if (!$('#index').hasClass("active__div")) {
      transition($(".active__div"), $('#index'), false);
    } else return;
  });

  /*
  INDEX 
  */

  //  ownMode
  $("#own-mode__btn").on("click", () => {
    transition($("#index"), $("#own"), false);
  });

  //  yesNoMode
  $("#yesno-mode__btn").on("click", () => {
    transition($('#index'), $('#result'), true);
    const result = shfflizer(["Yes", "No"]);
    displayResult(result);
  });

  // revertMode
  $("#revert-mode__btn").on("click", () => {
    transition($("#index"), $("#revert"), false);
  });

  /*
  OWN
  */

  // Own mode
  $("#add__btn").on("click", () => {
    addItem($("#add__text-input").val());
  });

  $("#add__text-input").on("keypress", (event) => {
    if (event.which == 13) {
      addItem($("#add__text-input").val());
    }
  });

  $("body").delegate(".delete-trigger", "click", (listLine) => {
    retrieveItem($(listLine.currentTarget));
  });

  $("#reset").on("click", () => {
    for (let i = 0; i < optionArray.length; i++) {
      $(".list__item").last().detach();
    }
    optionArray = [];
  });

  $("#validate").on("click", () => {
    if (optionArray.length > 1) {
      for (let element of optionArray) {
        $("#validation__container").append(
          `<p class="border-gray-600 rounded-md border-2">${element}</p>`
        );
      }
      transition($("#own"), $("#validation"), false);
    } else {
      openModale("Not enough options!");
    }
  });

  /* 
  Modale
  */

  $("#modale__close").on("click", () => {
    closeModale();
  });
  $("#modale__ok").on("click", () => {
    closeModale();
  });

  // Home Btn
  $(".home__btn").on("click", () => {
    const outDiv = $(".active__div");
    transition(outDiv, $('#index'));
  });

  // Validation

  $("#validation-edit__btn").on("click", () => {
    $("#validation__container").children().detach();
    transition($("#validation"), $("#own"), false);
  });

  $("#validation-ok__btn").on("click", () => {
    const result = shfflizer(optionArray);
    $("#validation__container").children().detach();
    displayResult(result);
    transition($("#validation"), $("#result"), true);
  });

  /*
   FUNCTIONS
  */


  // Display results
  function displayResult(mainResult) {
    const topResult = shfflizer(topResultArray);
    const bottomResult = shfflizer(bottomResultArray);
    $("#result__top").text(topResult);
    $("#result__bottom").text(bottomResult);
    dynamicFontSize(mainResult);
    $("#result__container").text(mainResult);
  }

  // Modale
  function openModale(text) {
    $("#modale__body p").text(text);
    $("#modale").fadeIn(250);
  }
  function closeModale() {
    $("#modale").fadeOut(250);
  }

  // Transition
  function transition(outDiv, inDiv, load) {
    outDiv.fadeOut(200);
    outDiv.removeClass("active__div");
    if (load) {
      setTimeout(() => {
        $("#load").fadeIn(200).css("display", "flex");
      }, 201);
      setTimeout(() => {
        transition($("#load"), inDiv, false);
      }, 3000);
      return;
    }
    setTimeout(() => {
      inDiv.fadeIn(200).css("display", "flex");
      inDiv.addClass("active__div");
    }, 201);
  }
  


  // ADD ITEM TO LIST
  function addItem(item) {
    if (!item) {
      openModale("You did'nt write anything !");
    } else if (optionArray.includes(item)) {
      openModale("You already entrered this option");
    } else {
      optionArray.push(item);
      appendList(item);
    }
    $("#add__text-input").val("");
  }

  // DISPLAYS ITEM IN DOM
  function appendList(item) {
    let listItemContent = `<div class="list__item flex flex-row">`;
    listItemContent += `<div class="w-11/12 px-2 h-full self-center">`;
    listItemContent += item;
    listItemContent += `</div>`;
    listItemContent += `<div class="w-1/12 place-self-center text-center">`;
    listItemContent += `<button class="delete-trigger text-5xl focus:outline-none">-</button>`;
    listItemContent += `</div>`;
    listItemContent += `</div>`;
    $("#list__container").append(listItemContent);
  }

  // RETRIEVES ITEM FROM ARRAY
  function retrieveItem(item) {
    const itemToDelete = item.parent().prev().text();
    const itemIndexInOptionArray = optionArray.indexOf(itemToDelete);
    optionArray.splice(itemIndexInOptionArray, 1);
    retrieveList(item);
  }


  // RETRIEVES ITEM FROM DOM
  function retrieveList(item) {
    const deleteTarget = item.parent().parent();
    deleteTarget.detach();
  }


  // ADAPT FONT SIZE
  function dynamicFontSize(result) {
    const resultLength = result.length;
    if (resultLength < 5) {
      $("#result__container").css("font-size", "8rem");
    } else if (resultLength >= 5 && resultLength < 10) {
      $("#result__container").css("font-size", "5rem");
    } else if (resultLength >= 10 && resultLength <= 50) {
      $("#result__container").css("font-size", "2rem");
    } else {
      $("#result__container").css("font-size", "1rem");
    }
  }


  // RANDOM
  function shfflizer(array) {
    const resultIndex = Math.floor(Math.random() * array.length);
    const resultValue = array[resultIndex];
    return resultValue;
  }
});
