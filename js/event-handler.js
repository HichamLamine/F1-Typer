import { Paragraph } from "./paragraph.js";

export class EventHandler {
    constructor(paragraph, renderer, wordProvider, options) {
        this.options = options;
        this.paragraph = paragraph;
        this.renderer = renderer;
        this.wordProvider = wordProvider;
        this.nextBtn = document.querySelector('.next-btn');
        this.restartBtn = document.querySelector('.restart-btn');
    }

    addEventListeners() {
        this.handleSelectMenusEvents();
        this.handleOverlayButtons();
        document.body.addEventListener('keydown', event => {

            // handle ctrl + -> and ctrl + <- shortcuts
            if (event.ctrlKey && event.code === 'ArrowRight') {
                this.resetTest({ repeat: false });
                this.paragraph.timer.stopCountdown();
                this.renderer.updatePageComponents();
            } else if (event.ctrlKey && event.code === 'ArrowLeft') {
                this.resetTest({ repeat: true });
                this.paragraph.timer.stopCountdown();
                this.renderer.updatePageComponents();
            }

            // Ignore certain keypresses such as ctrl, meta..
            if (this.options.testCompleted || event.code == 'ControlLeft' || event.code === 'ArrowRight' || event.code === 'ArrowLeft' || event.code === 'MetaLeft') {
                return;
            }

            // Start the duration counter upon first key hit
            if (this.paragraph.pointer == 0 && this.options.getTestType() === 'Word count') {
                this.paragraph.timer.startCounter();

            } else if (this.paragraph.pointer == 0 && this.options.getTestType() === 'Timer') {
                this.paragraph.timer.startCounter();
                this.paragraph.timer.startCountdown(this.options.getTestDuration({ string: false }), this.renderer);
            }

            // Update the wpm indicator on each word to avoid distraction
            if (this.paragraph.getChar(this.paragraph.getPointer()) == ' ') {
                this.renderer.updateCurrentWpm();
                console.log(this.paragraph.calculateWpm());
            }
            this.renderer.updateWordsTyped();

            // Handle typing key events
            if (event.key === 'Backspace') {
                this.handleBackspaceKey();
            }
            else if (event.key === this.paragraph.getChar(this.paragraph.getPointer())) {
                this.handleTrueKey();
            } else {
                this.handleWrongKey();
            }

            this.renderer.updateIndicatorPosition();
        });
    }

    handleTrueKey() {
        const pointer = this.paragraph.getPointer();
        const charsCount = this.paragraph.countChars();
        const nextPointer = pointer < charsCount - 1 ? pointer + 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false, typed: true });
        this.paragraph.getCharObject(nextPointer).setState({ highlighted: true });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(nextPointer), nextPointer);

        // check if the char got rectified to decrement the error count
        this.paragraph.checkChar(pointer);

        this.handleCompletedWordTest();

        this.paragraph.incrementPointer();
    }

    handleWrongKey() {
        const pointer = this.paragraph.getPointer();
        const charsCount = this.paragraph.countChars();
        const nextPointer = pointer < charsCount - 1 ? pointer + 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false, wrong: true });
        this.paragraph.getCharObject(nextPointer).setState({ highlighted: true });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(nextPointer), nextPointer);

        const wrongChar = this.paragraph.getChar(pointer);
        this.paragraph.pushError(pointer, wrongChar);

        this.handleCompletedWordTest();

        this.paragraph.incrementPointer();
    }

    handleBackspaceKey() {
        const pointer = this.paragraph.getPointer();
        const previousPointer = pointer > 0 ? pointer - 1 : pointer;
        this.paragraph.getCharObject(pointer).setState({ highlighted: false });
        this.paragraph.getCharObject(previousPointer).setState({ highlighted: true, typed: false, wrong: false });
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(pointer), pointer);
        this.renderer.updateCharacterClassList(this.paragraph.getCharObject(previousPointer), previousPointer);

        this.paragraph.decrementPointer();
    }

    handleCompletedWordTest() {
        if (this.paragraph.getPointer() === this.paragraph.countChars() - 1) {
            this.paragraph.timer.stopCounter();
            this.renderer.updateOverlayValues();
            this.renderer.toggleOverlay();
            this.options.testCompleted = true;
        }
    }

    handleSelectMenusEvents() {
        this.renderer.selectMenus.forEach((selectMenu, index) => {
            selectMenu.selectValue.addEventListener('click', event => {
                this.renderer.toggleSelectMenu(selectMenu);
            });
            selectMenu.listItems.forEach(item => {
                item.addEventListener('click', () => {
                    this.renderer.toggleSelectMenu(selectMenu);
                    this.renderer.updateSelectValue(selectMenu, item.textContent);

                    switch (index) {
                        case 0:
                            this.options.setFrequency(item.value);
                            break;

                        case 1:
                            this.options.setTestType(item.textContent.trim());
                            this.renderer.toggleSelectMenus();
                            this.paragraph.timer.stopCountdown();
                            break
                        case 2:
                            this.options.setWordCount(item.value);
                            this.renderer.updateWordsTyped();
                            break
                        case 3:
                            this.options.setTestDuration(item.value);
                            this.paragraph.timer.stopCountdown();
                            this.renderer.updateCountdown();
                            break
                        default:
                            break;
                    }
                    this.resetTest({ repeat: false });
                });
            });
        });
    }

    handleOverlayButtons() {
        this.nextBtn.addEventListener('click', event => {
            this.resetTest({ repeat: false });
            this.renderer.updatePageComponents();
            this.renderer.toggleOverlay();
        });
        this.restartBtn.addEventListener('click', event => {
            this.resetTest({ repeat: true });
            this.renderer.updatePageComponents();
            this.renderer.toggleOverlay();
        });

    }

    resetTest(option) {
        // console.log('called reset test ');
        let wordsArray = [];

        if (option.repeat) {
            wordsArray = this.paragraph.wordsArray;
        } else if (this.options.getTestType() == 'Word count') {
            wordsArray = this.wordProvider.getWords(this.options.getWordCount({ string: false }), this.options.getFrequency({ string: false }));
        } else {
            wordsArray = this.wordProvider.getWords(this.options.getTestDuration({ string: false }) * 2, this.options.getFrequency({ string: false }));
        }
        // const timer = new Timer();
        this.paragraph = new Paragraph(wordsArray, this.paragraph.timer);
        this.options.testCompleted = false;
        // const debug = new Debug();
        this.renderer.updateParagraph(this.paragraph);
        this.renderer.updateIndicatorPosition();
    }

}
