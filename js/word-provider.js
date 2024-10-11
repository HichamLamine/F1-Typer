import { wordList } from "../resources/word-list.js";

export class WordProvider{
    constructor() {
        this.wordList = wordList;
        this.state = 'short';
    }
    getWords(wordCount, maxFrequency) {
        const wordsArray = [];
        for (let i = 0; i < wordCount; i++) {
            wordsArray.push(this.wordList[this.getRandomInt(0, maxFrequency)]);
        }
        return wordsArray;
    }
    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}
