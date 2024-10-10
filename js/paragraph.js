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
}

