import { Debug } from './debug.js';
import { Timer } from './timer.js';
import { Paragraph } from './paragraph.js';
import { Renderer } from './renderer.js';
import { EventHandler } from './event-handler.js';
import { WordProvider } from './word-provider.js';
import { Options } from './options.js';
import { SelectMenu } from './web-components/select-menu.js';

const options = new Options();
const wordProvider = new WordProvider();
const wordsArray = wordProvider.getWords(25, 200);
const debug = new Debug();
const timer = new Timer();
const paragraph = new Paragraph(wordsArray, timer);
const renderer = new Renderer(paragraph, debug, options);

const eventHandler = new EventHandler(paragraph, renderer, wordProvider, options);
eventHandler.addEventListeners();
