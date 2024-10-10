export class EventHandler {
    constructor(paragraph, renderer) {
        this.paragraph = paragraph;
        this.renderer = renderer;
    }

    addEventListeners() {
        document.body.addEventListener('keydown', event => {
            if (event.key === 'Backspace') {
                this.handleBackspaceKey();
            }
            else if (event.key === this.paragraph.getChar(this.paragraph.getPointer())) {
                this.handleTrueKey();
            }
            this.renderer.debug.modifyCounter(this.paragraph.getPointer());
            this.renderer.debug.modifyClassesText(this.renderer.inputField.children[this.paragraph.getPointer()].classList);
        });
    }

    handleTrueKey() {
        const pointer = this.paragraph.getPointer();
        const nextPointer = pointer + 1;
        console.log(this.paragraph.getCharObject(pointer).getState());
        this.paragraph.getCharObject(pointer).setState({ highlighted: false, typed: true });
        this.paragraph.getCharObject(nextPointer).setState({ highlighted: true });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(nextPointer), nextPointer);

        this.paragraph.pointer++;
    }

    handleBackspaceKey() {
        const pointer = this.paragraph.getPointer();
        const previousPointer = pointer > 0 ? pointer - 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false });
        this.paragraph.getCharObject(previousPointer).setState({ highlighted: true, typed: false });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(previousPointer), previousPointer);

        this.paragraph.pointer-=1;
    }

}
