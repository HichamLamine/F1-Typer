export class Renderer {
    constructor(paragraph, debug) {
        this.inputField = document.querySelector('.typing-field');
        this.paragraph = paragraph;
        this.debug = debug;

        this.populateInputField();
        this.inputField.children[0].classList.add('highlighted');

        this.debug.modifyCounter(this.paragraph.getPointer());
        this.debug.modifyClassesText(this.inputField.children[this.paragraph.getPointer()].classList);
    }

    renderCharacter(char) {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('char');
        return span;
    }
    populateInputField() {
        for (const char of this.paragraph.getTypingText()) {
            const charSpan = this.renderCharacter(char);
            this.inputField.append(charSpan);
        }
    }
    updateCharacterClassList(charObject, pointer) {
        const charSpan = this.inputField.children[pointer];
        charSpan.classList.remove('highlighted', 'typed', 'wrong');
        charObject.getState().split(', ').forEach(state => {
            console.log(state)
            charSpan.classList.add(state);
        });
    }
}
