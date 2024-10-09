class Character {
    constructor(char) {
        this.char = document.createElement('span');
        this.char.textContent = char;
        this.char.classList.add('char', 'waiting-char');
    }
    getElement() {
        return this.char;
    }
}

// class Word {
//     constructor(word) {
//         this.word = [];
//         for (const char of word) {
//             const charElement = new Character(char);
//             this.word.push(charElement.getElement());
//         }
//     }
//     getElement() {
//         return this.word;
//     }
// }

class Debug {
    constructor() {
        this.pointerCounter = document.querySelector('.pointer-counter');
    }
    modifyCounter(number){
        this.pointerCounter.textContent += ` ${number}`;
    }
}

class Paragraph {
    constructor(paragraph) {
        this.paragraph = [];
        this.paragraphText = paragraph;
        this.pointer = 0;
        this.errors = 0;
        for (const char of paragraph) {
            const charElement = new Character(char);
            this.paragraph.push(charElement.getElement());
        }
    }
    getElement() {
        console.log(this.paragraph);
        return this.paragraph;
    }

    checkKey(event) {
        if (event.key === this.paragraphText[this.pointer] && event.key != 'Shift') {
            this.paragraph[this.pointer].classList.add('typed');
            this.incrementPointer();
            this.advanceActiveKey();
            console.log(this.paragraph[this.pointer]);
        } else if (event.key === 'Backspace'){
            this.decrementPointer();
            this.retreatActiveKey();
        } else {
            this.activateFalseKey();
            this.incrementPointer();
            this.advanceActiveKey();
            this.incrementErrorCount();
        }
    }
    decrementPointer() {
        this.pointer -= 1;
    }
    incrementPointer() {
        this.pointer += 1;
    }
    advanceActiveKey() {
        this.paragraph[this.pointer].classList.toggle('active');
        if (this.pointer >= 0) {
            this.paragraph[this.pointer - 1].classList.toggle('active');
        }
    }
    retreatActiveKey() {
        this.paragraph[this.pointer - 1].classList.remove('false');
    }
    activateFalseKey() {
        this.paragraph[this.pointer].classList.add('false');
    }
    incrementErrorCount() {
        this.errors += 1;
    }
}

class Page {
    constructor() {
        this.typingField = document.querySelector('.typing-field');
        // this.paragraph = new Paragraph(text);
    }
    populateTypingField(paragraph) {
        paragraph.getElement().forEach(charSpan => {
            this.typingField.append(charSpan);
        })
    }
    addEventListeners(paragraph) {
        document.body.addEventListener('keydown', event => {
            paragraph.checkKey(event);
            console.log(event.key);
        });
    }
}

const page = new Page();
const paragraph = new Paragraph('hello his type name this how time test fast ready little increase');
page.populateTypingField(paragraph);
page.addEventListeners(paragraph);
