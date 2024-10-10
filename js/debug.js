export class Debug {
    constructor() {
        this.pointerCounter = document.querySelector('.pointer-counter');
        this.currentClasses = document.querySelector('.current-classes');
    }
    modifyClassesText(classes) {
        this.currentClasses.textContent = `${classes}`;
    }
    modifyCounter(number) {
        this.pointerCounter.textContent = `Pointer: ${number}`;
    }
}
