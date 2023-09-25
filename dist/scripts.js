const app = document.querySelector(".letters");
const message = document.querySelector(".message");
const dying = Array.from(document.querySelectorAll(".dying"));

const hidden = document.querySelectorAll(".hide");
const restart = document.querySelector(".restart");
const newWord = document.querySelector(".word");
const hint = document.querySelector(".hint");

let atempts = 7;
let counter = 0;
let letterItems;

const words = ["clock",
    "locate",
    "stride",
    "gene",
    "forest",
    "area",
    "lung",
    "hiccup",
    "harsh",
    "false"
];

let win = [];

let selectedWord = words.sort(() => 0.5 - Math.random()).splice(0, 1).join("").split("");

const copyWord = Array.from(selectedWord).fill(null);

displayHint();

selectedWord.forEach(() => {
    generate();
})

restart.addEventListener("click", () => {
    letterItems.forEach((item) => { item.innerText = ""; })
    restartGame();
    displayHint();
})

newWord.addEventListener("click", () => {
    selectedWord = words.sort(() => 0.5 - Math.random()).splice(0, 1).join("").split("");
    displayHint();
    restartGame();
    selectedWord.forEach(() => {
        generate();
    })
    letterItems.forEach((item) => {
        item.remove();
    })
    letterItems = Array.from(document.querySelectorAll(".letter-container"));
    console.log(letterItems);
})

document.addEventListener("keyup", keyingEvent);

function generate() {
    const letter = document.createElement("div");

    letter.classList.add("letter-container");
    app.appendChild(letter);
    return letter;
}

function keyingEvent(e) {
    letterItems = Array.from(document.querySelectorAll(".letter-container"));
    if (selectedWord.includes(e.key.toLowerCase())) {
        if (copyWord.includes(e.key.toLowerCase())) {
            message.innerText = "You have written that letter yet!";
            setTimeout(() => {
                message.innerText = "";
            }, 2000)
        }
        selectedWord.forEach((letter, i) => {
            if (letter === e.key.toLowerCase()) {
                copyWord[i] = e.key.toLowerCase();
                letterItems[i].textContent = e.key.toLowerCase();
            }
            // letterItems[pos].textContent = e.key;
        })
    } else {
        atempts--;
        if (atempts === 0) {
            message.innerText = "You have lost :(";
            document.removeEventListener("keyup", keyingEvent);
            hidden.forEach((hide) => hide.classList.remove("hide"));
            restart.style.display = "inline";
        } else {
            message.innerText = "You have failed, keep trying";
            setTimeout(() => {
                message.innerText = "";
            }, 2000)
        }
        dying[counter].style.opacity = "1";
        counter++;
    }

    win = selectedWord.map((letter, i) => {
        if (letter === copyWord[i]) {
            return true;
        }
    }).filter(letter => letter === true);

    if (selectedWord.length === win.length) {
        message.innerText = "You won :)";
        document.removeEventListener("keyup", keyingEvent);
        newWord.style.display = "inline";
    }
}

function restartGame() {
    restart.style.display = "none";
    newWord.style.display = "none";
    document.addEventListener("keyup", keyingEvent);
    dying.forEach((die) => { die.style.opacity = "0" });
    hidden.forEach((hide) => hide.classList.add("hide"));
    copyWord.splice(0, copyWord.length);
    win.splice(0, win.length);
    atempts = 7;
    counter = 0;
    message.innerText = "";
}

function generateHint(word) {
    switch (word) {
        case "clock": return "Something you use to know what time is it";
            break;
        case "locate": return "Discover the place where somebody or something is";
            break;
        case "stride": return "A word used when you take looooong steps";
            break;
        case "gene": return "Is the basic physical and functional unit of heredity";
            break;
        case "forest": return "A place where there are a lot of trees";
            break;
        case "area": return "A part of a place, piece of land, country, etc";
            break;
        case "lung": return "The organ that allows you to breathe";
            break;
        case "hiccup": return "Noises that you make in the throat whitout wanting to, that usually happens repeatedly";
            break;
        case "harsh": return "A synonym of cruel, severe, rough, unkind, etc";
            break;
        case "false": return "Something that isn't real but made to seem like";
            break;
        default:
            break;
    }
}

function displayHint() {
    hint.innerText = `Hint: ${generateHint(selectedWord.join(""))}`;

    setTimeout(() => {
        hint.innerText = "";
    }, 5000);
}