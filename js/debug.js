export class Debug {
    constructor() {
        this.pointerCounter = document.querySelector('.pointer-counter');
        this.errorsCounter = document.querySelector('.errors-counter');
        this.currentClasses = document.querySelector('.current-classes');
        this.currentWPM = document.querySelector('.current-wpm');
    }
    logClasses(classes) {
        this.currentClasses.textContent = `${classes}`;
    }
    logCounter(number) {
        this.pointerCounter.textContent = `Pointer: ${number}`;
    }
    logErrors(number) {
        this.errorsCounter.textContent = `Errors: ${number}`;
    }
    logWPM(wpm) {
        this.currentWPM.textContent = `WPM: ${wpm}`;
    }
}
