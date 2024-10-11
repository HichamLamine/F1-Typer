export class Timer {
    constructor() {
        this.interval = null;
        this.startTime = 0;
        this.endTime = 0;
        this.elapsedTime = 0;
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
        const readableDuration = this.elapsedTime < 60 ? `${this.elapsedTime.toFixed(2)}s`: `${Math.floor(this.elapsedTime / 60)}:${(this.elapsedTime % 60).toFixed(0)}`;
        return readableDuration;
    }
    calculateWPM(wordCount) {
        this.getElapsedTime();
        this.wpm = wordCount / (this.elapsedTime / 60);
        return this.wpm;
    }
}
