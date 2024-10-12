import { Character } from './character.js';

export class Paragraph {
    constructor(wordsArray, timer) {
        this.paragraph = [];
        this.wordsArray = wordsArray;
        this.paragraphText = this.wordsArray.join(' ');
        // this.wordCount = this.countWords();
        this.currentWPM = 0;
        this.pointer = 0;
        this.timer = timer;
        this.errorCount = 0;
        this.errors = [];
        for (const char of this.paragraphText) {
            const character = new Character(char);
            this.paragraph.push(character);
        }
    }

    // add a character to the errors array
    pushError(index, char) {
        this.errors.push({ index: index, char: char, checked: false });
        this.errorCount++;
    }
    // check if a character is rectified and decrement the error count
    checkChar(index) {
        this.errors.forEach(error => {
            if (error.index === index && error.checked === false && this.errorCount > 0) {
                this.errorCount--;
                error.checked = true;
            }
        });
    }

    calculateAccuracy() {
         return (100 - this.errorCount / this.countChars() * 100).toFixed(2);
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

    countWords(index) {
        return this.paragraphText.slice(0, index).split(' ').length;
    }

    countChars() {
        return this.paragraphText.length;
    }

    getErrorCount() {
        return this.errorCount;
    }

    incrementPointer() {
        this.pointer = this.pointer < this.countChars() - 1 ? this.pointer + 1 : this.pointer;
    }

    decrementPointer() {
        this.pointer = this.pointer > 0 ? this.pointer - 1 : this.pointer;
    }

    calculateWpm() {
        return this.timer.calculateWPM(this.countWords(this.pointer));
    }
}

