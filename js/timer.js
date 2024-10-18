export class Timer {
    constructor() {
        this.interval = null;
        this.startTime = 0;
        this.endTime = 0;
        this.elapsedTime = 0;
        this.countdown = 30;
        this.countdownId;
        this.wpm = 0;
    }
    startCounter() {
        // this.interval = setInterval((_) => { this.counter += 100; }, 100);
        this.startTime = Date.now();
    }
    stopCounter() {
        // clearInterval(this.interval);
        this.endTime = Date.now();
    }
    getElapsedTime() {
        this.stopCounter();
        this.elapsedTime = (this.endTime - this.startTime) / 1000;
        return this.elapsedTime;
    }

    getReadableDuration() {
        this.getElapsedTime();
        const readableDuration = this.elapsedTime < 60 ? `${this.elapsedTime.toFixed(2)}s` : `${Math.floor(this.elapsedTime / 60)}:${(this.elapsedTime % 60).toFixed(0)}`;
        return readableDuration;
    }

    startCountdown(countdown, renderer) {
        this.countdown = countdown;
        this.countdownId = setInterval(() => {
            this.countdown--;
            renderer.updateCountdown(this.countdown);
            if (this.countdown === 0) {
                clearInterval(this.countdownId);
                this.stopCounter();
                renderer.updateOverlayValues();
                renderer.toggleOverlay();
                renderer.options.testCompleted = true;
            }
        }, 1000);
    }

    stopCountdown() {
        clearInterval(this.countdownId);
    }

    // getReadableTimer(option) {
    //     this.getElapsedTime();
    //     if (option.min) {
    //         const readableMins = `${Math.floor(this.elapsedTime / 60)}`;
    //         return readableMins;
    //     } else if (option.sec) {
    //         const readableSecs = `${(this.elapsedTime % 60).toFixed(0)}`;
    //         return readableSecs;
    //     }
    // }

    calculateWPM(wordCount) {
        this.getElapsedTime();
        this.wpm = wordCount / (this.elapsedTime / 60);
        return this.wpm;
    }
}
