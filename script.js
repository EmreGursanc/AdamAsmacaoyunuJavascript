const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const wrongLetters_el = document.getElementById("wrong-letters");
const message_el = document.getElementById("succes-message");
const message = document.getElementById("message");
const selectedWord = getRandomWord();
const correctLetters = [];
const wrongLetters = [];
const items = document.querySelectorAll(".item");
function getRandomWord() {
  const words = ["javascrıpt", "python", "java"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  word_el.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
        </div>
    
    
    
    `
      )
      .join("")}   
    `;
  const w = word_el.innerText.replace(/\n/g, "");
  if (w == selectedWord) {
    popup.style.display = "flex";
    message_el.innerText = "Tebrikler Kazandınız.";
  }

  function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
        
        `;
    items.forEach((item, index) => {
      const errorCount = wrongLetters.length;
      if (index < errorCount) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  function displaymessage() {
    message.classList.add("show");

    setTimeout(function () {
      message.classList.remove("show");
    }, 2000);
  }

  window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          displaymessage();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLetters();
        }
      }
    }
  });
}
displayWord();
