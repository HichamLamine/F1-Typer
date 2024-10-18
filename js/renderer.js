export class Renderer {
    constructor(paragraph, debug, options) {
        this.inputField = document.querySelector('.typing-field');
        this.paragraph = paragraph;
        this.debug = debug;
        this.options = options;

        this.typingIndicator = document.querySelector('.typing-indicator');

        this.overlay = document.querySelector('.overlay');
        this.resultOverlay = document.querySelector('.result-overlay');
        this.wpmOverlay = document.querySelector('.wpm-overlay-value');
        this.durationOverlay = document.querySelector('.duration-overlay-value');
        this.accuracyOverlay = document.querySelector('.accuracy-overlay-value');
        this.errorsOverlay = document.querySelector('.errors-overlay-value');

        this.currentWpmElementText = document.querySelector('.current-wpm-text');
        this.wordsTypedElementText = document.querySelector('.words-typed-text');
        this.timerElementText = document.querySelector('.timer-text');

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
            {
                selectValue: document.querySelector('.select-menu.test-duration-select .select-value'),
                optionsList: document.querySelector('.select-menu.test-duration-select .options-list'),
                listItems: document.querySelectorAll('.select-menu.test-duration-select .options-list .option')
            },
        ];

        this.toggleAppearance(this.overlay, 'block');
        this.toggleAppearance(this.resultOverlay, 'grid');

        this.populateInputField();
        this.inputField.children[0].classList.add('highlighted');
        this.updateIndicatorPosition();

    }

    updateParagraph(paragraph) {
        this.paragraph = paragraph;
        this.inputField.innerHTML = '';
        this.populateInputField();
        this.inputField.children[0].classList.add('highlighted');
    }

    updateIndicatorPosition() {
        if (this.paragraph.getPointer() == 0) {
            this.typingIndicator.classList.add('animated');
        } else {
            this.typingIndicator.classList.remove('animated');
        }
        const currentChar = this.inputField.children[this.paragraph.getPointer()];
        this.typingIndicator.style.top = `${currentChar.offsetTop - 5}px`;
        this.typingIndicator.style.left = `${currentChar.offsetLeft - 4}px`;
    }

    updateCurrentWpm() {
        if (this.paragraph.getPointer() === 0) {
            this.currentWpmElementText.innerHTML = `<span>WPM: </span>0`;
        } else {
            this.currentWpmElementText.innerHTML = `<span>WPM: </span>${this.paragraph.calculateWpm().toFixed(0)}`;
        }
    }

    updateWordsTyped() {
        if (this.paragraph.getPointer() === 0) {
            this.wordsTypedElementText.innerHTML = `0<span>/</span>${this.options.getWordCount({string: false})}`;
        }
        else {
            this.wordsTypedElementText.innerHTML = `${this.paragraph.countWords(this.paragraph.getPointer())}<span>/</span>${this.options.getWordCount({string: false})}`;
        }
    }

    updateCountdown(countdown) {
        if (this.paragraph.getPointer() === 0) {
            this.timerElementText.innerHTML = `${this.options.getTestDuration({ string: false })}<span>s</span>`;
        } else {
            this.timerElementText.innerHTML = `${countdown}<span>s</span>`;
        }
    }

    updatePageComponents() {
        this.updateCurrentWpm();
        this.updateWordsTyped();
        this.updateCountdown();
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
    toggleSelectMenus() {
        const wordCountSelect = this.selectMenus[2].selectValue.parentElement;
        const testDurationSelect = this.selectMenus[3].selectValue.parentElement;
        const timerElement = this.timerElementText.parentElement;
        const wordsTypedElement = this.wordsTypedElementText.parentElement;
        if (this.options.getTestType() == 'Timer') {
            wordCountSelect.classList.add('inactive');
            wordsTypedElement.classList.add('inactive');
            testDurationSelect.classList.remove('inactive');
            timerElement.classList.remove('inactive');
        } else {
            testDurationSelect.classList.add('inactive');
            timerElement.classList.add('inactive');
            wordCountSelect.classList.remove('inactive');
            wordsTypedElement.classList.remove('inactive');
        }
    }
}
