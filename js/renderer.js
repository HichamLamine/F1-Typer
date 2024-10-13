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

        this.currentWpmElement = document.querySelector('.current-wpm-text');
        this.wordsTypedElement = document.querySelector('.words-typed-text');

        this.selectMenus = [
            {
                selectValue: document.querySelector('.select-menu.frequency-select .select-value'),
                optionsList: document.querySelector('.select-menu.frequency-select .options-list'),
                listItems: document.querySelectorAll('.select-menu.frequency-select .options-list .option')
            },
            {
                selectValue: document.querySelector('.select-menu.test-type-select .select-value'),
                optionsList: document.querySelector('.select-menu.test-type-select .options-list'),
                listItems: document.querySelectorAll('.select-menu.test-type-select .options-list .option')
            },
            {
                selectValue: document.querySelector('.select-menu.word-count-select .select-value'),
                optionsList: document.querySelector('.select-menu.word-count-select .options-list'),
                listItems: document.querySelectorAll('.select-menu.word-count-select .options-list .option')
            },
        ];

        this.toggleAppearance(this.overlay, 'block');
        this.toggleAppearance(this.resultOverlay, 'grid');

        this.populateInputField();
        this.inputField.children[0].classList.add('highlighted');

        this.debug.logCounter(this.paragraph.getPointer());
        this.debug.logErrors(this.paragraph.getErrorCount());
        this.debug.logClasses(this.inputField.children[this.paragraph.getPointer()].classList);
    }

    updateParagraph(paragraph) {
        this.paragraph = paragraph;
        this.inputField.innerHTML = '';
        this.populateInputField();
    }

    updateCurrentWpm() {
        this.currentWpmElement.innerHTML = `<span>WPM: </span>${this.paragraph.calculateWpm().toFixed(0)}`;
    }

    updateWordsTyped() {
        this.wordsTypedElement.innerHTML = `${this.paragraph.countWords(this.paragraph.getPointer())}<span>/</span>${this.paragraph.countWords(this.paragraph.countChars() - 1)}`;
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
        this.wpmOverlay.textContent = `${this.paragraph.calculateWpm().toFixed(0)}WPM`;
        this.durationOverlay.textContent = this.paragraph.timer.getReadableDuration();
        this.accuracyOverlay.textContent = `${this.paragraph.calculateAccuracy()}%`;
        this.errorsOverlay.textContent = this.paragraph.getErrorCount();
    }
    toggleOverlay() {
        this.toggleAppearance(this.overlay, 'block');
        this.toggleAppearance(this.resultOverlay, 'grid');
    }

    toggleSelectMenu(selectMenu) {
        selectMenu.selectValue.classList.toggle('active');
        selectMenu.optionsList.classList.toggle('active');
    }

    updateSelectValue(selectMenu, newSelectValue) {
        selectMenu.selectValue.querySelector('span').textContent = newSelectValue;
    }
}
