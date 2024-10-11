class EventHandler {
    constructor(paragraph) {
        this.paragraph = paragraph;
    }

    addEventListener() {
        document.body.addEventListener('keydown', event => {
            if (event.key == 'Backspace') {
                this.handleBackspaceKey();
            }
        });
    }

}

