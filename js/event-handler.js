export class EventHandler {
    constructor(paragraph, renderer) {
        this.paragraph = paragraph;
        this.renderer = renderer;
    }

    addEventListeners() {
        document.body.addEventListener('keydown', event => {
            // Start the timer upon first key hit
            if (this.paragraph.pointer == 0) {
                this.paragraph.timer.startCounter();
                console.log(this.paragraph.countWords());
            }

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
                this.paragraph.timer.stopCounter();
                this.renderer.updateOverlayValues();
                this.renderer.toggleOverlay();
                console.log(this.paragraph.timer.calculateWPM(this.paragraph.countWords()));
            }
            this.renderer.debug.modifyCounter(this.paragraph.getPointer());
            this.renderer.debug.modifyErrorCounter(this.paragraph.getErrorCount());
            this.renderer.debug.modifyClassesText(this.renderer.inputField.children[this.paragraph.getPointer()].classList);
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

        this.paragraph.checkChar(pointer);

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

}
