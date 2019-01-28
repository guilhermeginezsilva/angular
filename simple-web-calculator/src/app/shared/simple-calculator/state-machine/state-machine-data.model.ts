export class StateMachineData {
    visorText: string;
    activeButtons: string[];
    currentChar: string;

    constructor() {
        this.visorText = '';
        this.activeButtons = [];
        this.currentChar = '';
    }
}