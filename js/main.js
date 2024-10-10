import { Character } from './character.js';
import { Debug } from './debug.js';
import { Timer} from './timer.js';
import { Paragraph} from './paragraph.js';
import { Renderer} from './renderer.js';
import { EventHandler} from './event-handler.js';

// class Word {
//     constructor(word) {
//         this.word = [];
//         for (const char of word) {
//             const charElement = new Character(char);
//             this.word.push(charElement.getElement());
//         }
//     }
//     getElement() {
//         return this.word;
//     }
// }


// class Page {
//     constructor() {
//         this.typingField = document.querySelector('.typing-field');
//         // this.paragraph = new Paragraph(text);
//     }
//     populateTypingField(paragraph) {
//         paragraph.getElement().forEach(charSpan => {
//             this.typingField.append(charSpan);
//         })
//     }
//     addEventListeners(paragraph) {
//         document.body.addEventListener('keydown', event => {
//             paragraph.checkKey(event);
//             // console.log(event.key);
//         });
//     }
// }

// const typingText = "hello name type like speed fast rapid game dream life";
const typingText ='hello his type name this how time test fast ready little increase';
const debug = new Debug();
const timer = new Timer();
const paragraph = new Paragraph(typingText, timer);
const renderer = new Renderer(paragraph, debug);

const eventHandler = new EventHandler(paragraph, renderer);
eventHandler.addEventListeners();
