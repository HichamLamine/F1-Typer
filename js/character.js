export class Character {
    constructor(char) {
        this.char = char;
        this.state = {
            highlighted : false,
            typed : false,
            wrong : false,
        };
    }
    setState(newState) {
        Object.assign(this.state, newState);
    }
    getState() {
        return Object.keys(this.state).filter(key => this.state[key] === true).join(', ') || 'char';
    }
    getChar() {
        return this.char;
    }
}
