import { Paragraph } from "./paragraph.js";

export class EventHandler {
    constructor(paragraph, renderer, wordProvider) {
        this.paragraph = paragraph;
        this.renderer = renderer;
        this.wordProvider = wordProvider;
        this.nextBtn = document.querySelector('.next-btn');
        this.testCompleted = false;
    }

    addEventListeners() {
        this.nextBtn.addEventListener('click', event => {
            this.resetTest();
        });

        document.body.addEventListener('keydown', event => {
            if (this.testCompleted) {
                return;
            }
            // Start the timer upon first key hit
            if (this.paragraph.pointer == 0) {
                this.paragraph.timer.startCounter();
                // console.log(this.paragraph.countWords());
            }
            this.renderer.debug.logWPM(this.paragraph.timer.calculateWPM(this.paragraph.countWords()));
            // console.log(`${this.paragraph.countWords()} / ${this.paragraph.timer.getElapsedTime()}`);

            // Handle typing key events
            if (event.key === 'Backspace') {
                this.handleBackspaceKey();
            }
            else if (event.key === this.paragraph.getChar(this.paragraph.getPointer())) {
                this.handleTrueKey();
            } else {
                this.handleWrongKey();
            }

            // Stop the timer when the last char is hit
            if (this.paragraph.getPointer() + 1 === this.paragraph.countChars()) {
                // this.renderer.toggleOverlay();
                console.log(this.paragraph.timer.calculateWPM(this.paragraph.countWords()));
            }
            this.renderer.debug.logCounter(this.paragraph.getPointer());
            this.renderer.debug.logErrors(this.paragraph.getErrorCount());
            this.renderer.debug.logClasses(this.renderer.inputField.children[this.paragraph.getPointer()].classList);
        });
    }

    handleTrueKey() {
        const pointer = this.paragraph.getPointer();
        const charsCount = this.paragraph.countChars();
        const nextPointer = pointer < charsCount - 1 ? pointer + 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false, typed: true });
        this.paragraph.getCharObject(nextPointer).setState({ highlighted: true });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(nextPointer), nextPointer);

        // check if the char got rectified to decrement the error count
        this.paragraph.checkChar(pointer);

        if (this.paragraph.getPointer() === this.paragraph.countChars() - 1) {
            this.paragraph.timer.stopCounter();
            this.renderer.updateOverlayValues();
            this.renderer.toggleOverlay();
            this.testCompleted = true;
        }

        this.paragraph.incrementPointer();
    }

    handleWrongKey() {
        const pointer = this.paragraph.getPointer();
        const charsCount = this.paragraph.countChars();
        const nextPointer = pointer < charsCount - 1 ? pointer + 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false, wrong: true });
        this.paragraph.getCharObject(nextPointer).setState({ highlighted: true });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(nextPointer), nextPointer);

        const wrongChar = this.paragraph.getChar(pointer);
        this.paragraph.pushError(pointer, wrongChar);
        this.paragraph.incrementPointer();
    }

    handleBackspaceKey() {
        const pointer = this.paragraph.getPointer();
        const previousPointer = pointer > 0 ? pointer - 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false });
        this.paragraph.getCharObject(previousPointer).setState({ highlighted: true, typed: false, wrong: false });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(previousPointer), previousPointer);

        this.paragraph.decrementPointer();
    }

    resetTest() {
        const wordsArray = this.wordProvider.getWords(25, 200);
        // const timer = new Timer();
        this.paragraph = new Paragraph(wordsArray, this.paragraph.timer);
        this.testCompleted = false;
        // const debug = new Debug();
        this.renderer.updateParagraph(this.paragraph);
        this.renderer.toggleOverlay();
    }

}
