import { Debug } from './debug.js';
import { Timer } from './timer.js';
import { Paragraph } from './paragraph.js';
import { Renderer } from './renderer.js';
import { EventHandler } from './event-handler.js';

const typingText = 'hello his type name this how time test fast ready little increase';
const debug = new Debug();
const timer = new Timer();
const paragraph = new Paragraph(typingText, timer);
const renderer = new Renderer(paragraph, debug);

const eventHandler = new EventHandler(paragraph, renderer);
eventHandler.addEventListeners();
