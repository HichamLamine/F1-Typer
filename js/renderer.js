export class Renderer {
    constructor(paragraph, debug) {
        this.inputField = document.querySelector('.typing-field');
        this.paragraph = paragraph;
        this.debug = debug;

        this.overlay = document.querySelector('.overlay');
        this.resultOverlay = document.querySelector('.result-overlay');
        this.wpmOverlay = document.querySelector('.wpm-overlay-value');
        this.durationOverlay = document.querySelector('.duration-overlay-value');
        this.accuracyOverlay = document.querySelector('.accuracy-overlay-value');
        this.errorsOverlay = document.querySelector('.errors-overlay-value');

        this.toggleAppearance(this.overlay, 'block');
        this.toggleAppearance(this.resultOverlay, 'grid');

        this.populateInputField();
        this.inputField.children[0].classList.add('highlighted');

        this.debug.logCounter(this.paragraph.getPointer());
        this.debug.logErrors(this.paragraph.getErrorCount());
        this.debug.logClasses(this.inputField.children[this.paragraph.getPointer()].classList);
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
            // console.log(state)
            charSpan.classList.add(state);
        });
    }

    toggleAppearance(element, display) {
        element.style.display = element.style.display === 'none' ? display : 'none';
    }

    updateOverlayValues() {
        this.wpmOverlay.textContent = `${this.paragraph.timer.calculateWPM(this.paragraph.countWords()).toFixed(0)}WPM`;
        this.durationOverlay.textContent = this.paragraph.timer.getReadableDuration();
        this.accuracyOverlay.textContent = `${this.paragraph.calculateAccuracy()}%`;
        this.errorsOverlay.textContent = this.paragraph.getErrorCount();
    }
    toggleOverlay() {
        this.toggleAppearance(this.overlay, 'block');
        this.toggleAppearance(this.resultOverlay, 'grid');
    }
}
