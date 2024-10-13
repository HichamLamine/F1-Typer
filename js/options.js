export class Options {
    constructor() {
        this.frequency = 200;
        this.testType = 'Word Count';
        this.wordCount = 10;
        this.testDuration = 30;
    }

    getFrequency(option) {
        if (option.string) {
            return `English ${this.frequency}`;
        } else {
            return this.frequency;
        }
    }
    setFrequency(newFrequency) {
        this.frequency = newFrequency;
    }
    getTestType() {
        return this.testType;
    }
    setTestType(newTestType) {
        this.testType = newTestType;
    }
    getWordCount(option) {
        if (option.string) {
            return `${this.wordCount} words`;
        }
        else {
            return this.wordCount;
        }
    }
    setWordCount(newWordCount) {
        this.wordCount = newWordCount;
    }
    getTestDuration(option) {
        if (option.string) {
            return `${this.testDuration}s`;
        } else {
            return this.testDuration;
        }
    }
    setTestDuration(newTestDuration) {
        this.testDuration = newTestDuration;
    }
}
