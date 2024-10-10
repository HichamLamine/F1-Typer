import { Character} from './character.js';

export class Paragraph {
    constructor(typingText, timer) {
        this.paragraph = [];
        this.paragraphText = typingText;
        // this.wordCount = this.countWords();
        this.pointer = 0;
        this.timer = timer;
        this.errors = 0;
        for (const char of typingText) {
            const character = new Character(char);
            this.paragraph.push(character);
        }
    }

    getTypingText() {
        return this.paragraphText;
    }

    getCharObject(index) {
        return this.paragraph[index];
    }

    getChar(index) {
        return this.paragraph[index].getChar();
    }

    getPointer() {
        return this.pointer;
    }

    setPointer(newPointer) {
        this.pointer = newPointer;
    }

    countWords() {
        return this.paragraphText.split(' ').length - 1;
    }

    countChars() {
        return this.paragraphText.length;
    }

    incrementPointer() {
        this.pointer = this.pointer < this.countChars() - 1? this.pointer + 1: this.pointer;
    }

    decrementPointer() {
        this.pointer = this.pointer > 0 ? this.pointer - 1: this.pointer;
    }

    // checkKey(event) {
    //     if (this.pointer == 0) {
    //         this.timer.startCounter();
    //     }
    //     console.log(this.countWords() / this.timer.counter * 60 * 1000);
    //     if (event.key === this.paragraphText[this.pointer] && event.key != 'Shift') {
    //         this.paragraph[this.pointer].classList.add('typed');
    //         this.incrementPointer();
    //         this.advanceActiveKey();
    //         // console.log(this.paragraph[this.pointer]);
    //         this.debug.modifyCounter(this.pointer);
    //
    //         if (this.pointer < this.paragraph.length) {
    //             this.debug.modifyClassesText(this.paragraph[this.pointer].classList);
    //         }
    //     }
    //     else if (event.key === 'Backspace') {
    //         this.decrementPointer();
    //         this.retreatActiveKey();
    //         this.debug.modifyCounter(this.pointer);
    //     } else if (this.pointer === this.paragraph.length - 2) {
    //         this.timer.stopCounter();
    //         console.log(this.timer.calculateWPM(this.wordCount));
    //     }
    //     else {
    //         this.activateFalseKey();
    //         this.incrementPointer();
    //         this.advanceActiveKey();
    //         this.incrementErrorCount();
    //         this.debug.modifyCounter(this.pointer);
    //     }
    // }
    // advanceActiveKey() {
    //     if (this.pointer < this.paragraph.length) {
    //         this.paragraph[this.pointer].classList.add('active');
    //     }
    //     if (this.pointer >= 0) {
    //         this.paragraph[this.pointer - 1].classList.remove('active');
    //     }
    // }
    // retreatActiveKey() {
    //     this.paragraph[this.pointer].classList.remove('false');
    //     this.paragraph[this.pointer].classList.remove('typed');
    //     this.paragraph[this.pointer + 1].classList.remove('active');
    //     this.paragraph[this.pointer].classList.add('active');
    // }
    // activateFalseKey() {
    //     this.paragraph[this.pointer].classList.add('false');
    // }
    // incrementErrorCount() {
    //     this.errors += 1;
    // }
    //
    // countWords() {
    //     return this.paragraphText.slice(0, this.pointer).split(' ').length - 1;
    // }
}

