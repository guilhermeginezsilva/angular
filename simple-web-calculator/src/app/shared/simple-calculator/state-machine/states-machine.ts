import { StateMachineData } from './state-machine-data.model';
import { StatesMachineState } from './states-machine-states.enum';
import { State } from './state.model';
import { CalculatorService } from '../calculator.service';

export class StatesMachine {

    private currentState: StatesMachineState;
    private data: StateMachineData;

    private typed: string;
    private lastOperator: string;
    private lastResult: number;

    public constructor(
        private calculatorService?: CalculatorService
    ) {
        this.data = new StateMachineData();
        this.currentState = StatesMachineState.START;
        this.typed = '';
        this.lastOperator = '';
        this.lastResult = 0;
    }

    public start() {
        const machineState: State = this.machineStates.find(state => state.originState == StatesMachineState.START);
        if(machineState) {
            this.currentState = StatesMachineState.START;
            machineState.function(this.data);
        }

        return this.data;
    }

    public runNextStep(newCharacter: string): StateMachineData {
        const machineState: State = this.parseNewCharacter(newCharacter);

        if(machineState) {
            this.currentState = machineState.toState;
            machineState.function(this.data);
        }

        return this.data;
    }

    public parseNewCharacter(newCharacter: string): State {
        let state: State;

        if(newCharacter.match('^[0-9]*$')) {
            state = this.machineStates.find(state => state.originState === this.currentState 
                && (state.toState === StatesMachineState.FIRST_NUMBER 
                    || state.toState === StatesMachineState.NEW_NUMBER));

        } else if(newCharacter.match('[=]') ) {
            state = this.machineStates.find(state => state.originState === this.currentState 
                && state.toState === StatesMachineState.EQUALS);

        } else if(newCharacter.match('[cC]') ) {
            state = this.machineStates.find(state => state.originState === this.currentState 
                && state.toState === StatesMachineState.CLEAR);

        } else if(newCharacter.match('[\\+\\-\\*\\/]') ){
            state = this.machineStates.find(state => state.originState === this.currentState 
                && (state.toState === StatesMachineState.FIRST_OPERATOR 
                    || state.toState === StatesMachineState.CALCULATE_AND_OPERATOR
                    || state.toState === StatesMachineState.NEW_OPERATOR));
            
        }
        this.data.currentChar = newCharacter;

        return state;
    }



    private machineStates: State[] = [
        {originState: StatesMachineState.START, toState: undefined, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},

        {originState: StatesMachineState.START, toState: StatesMachineState.FIRST_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toFirstNumberFunction(data);
        }},
    
        {originState: StatesMachineState.FIRST_NUMBER, toState: StatesMachineState.FIRST_OPERATOR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toFirstOperatorFunction(data);
        }},

        {originState: StatesMachineState.FIRST_NUMBER, toState: StatesMachineState.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
        {originState: StatesMachineState.FIRST_NUMBER, toState: StatesMachineState.FIRST_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toFirstNumberFunction(data);
        }},
        
        {originState: StatesMachineState.FIRST_OPERATOR, toState: StatesMachineState.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        {originState: StatesMachineState.FIRST_OPERATOR, toState: StatesMachineState.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
        
        {originState: StatesMachineState.NEW_NUMBER, toState: StatesMachineState.EQUALS, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toEqualsFunction(data);
        }},
        {originState: StatesMachineState.NEW_NUMBER, toState: StatesMachineState.CALCULATE_AND_OPERATOR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toCalculateAndOperatorFunction(data);
        }},
        {originState: StatesMachineState.NEW_NUMBER, toState: StatesMachineState.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
        {originState: StatesMachineState.NEW_NUMBER, toState: StatesMachineState.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        
        {originState: StatesMachineState.EQUALS, toState: StatesMachineState.NEW_OPERATOR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewOperatorFunction(data);
        }},
        {originState: StatesMachineState.EQUALS, toState: StatesMachineState.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},

        {originState: StatesMachineState.NEW_OPERATOR, toState: StatesMachineState.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        
        {originState: StatesMachineState.CALCULATE_AND_OPERATOR, toState: StatesMachineState.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        {originState: StatesMachineState.CALCULATE_AND_OPERATOR, toState: StatesMachineState.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
    ];

    private numberButtons: string[] = ['0','1','2','3','4','5','6','7','8','9'];
    private equalsButton: string[] = ['='];
    private clearButton: string[] = ['c','C'];
    private operatorsButton: string[] = ['+','-', '*', '/'];

    private statesMachineFunctions = {
        toClearFunction: (data: StateMachineData) => {
            this.currentState = StatesMachineState.START;
            this.typed = '';
            this.lastOperator = '';
            this.lastResult = 0;
            data.activeButtons = [...this.numberButtons, ...this.clearButton];
            data.visorText = '0';
        },
        toFirstNumberFunction: (data: StateMachineData) => {
            this.typed += data.currentChar;
            data.activeButtons = [...this.numberButtons, ...this.operatorsButton, ...this.clearButton];
            data.visorText = this.typed;
        },
        toFirstOperatorFunction: (data: StateMachineData) => {
            this.lastOperator = data.currentChar;
            this.lastResult = Number(this.typed);
            this.typed = '';
            data.activeButtons = [...this.numberButtons, ...this.clearButton];
            data.visorText = this.lastOperator;
        },
        toNewNumberFunction: (data: StateMachineData) => {
            this.typed += data.currentChar;
            data.activeButtons = [...this.numberButtons, ...this.operatorsButton, ...this.clearButton, ...this.equalsButton];
            data.visorText = this.lastOperator + this.typed;
        },
        toCalculateAndOperatorFunction: (data: StateMachineData) => {
            const newResult: number = this.calculate(this.lastOperator, this.lastResult, Number(this.typed));
            if(newResult) {
                this.lastResult = newResult;
            }
            this.typed = '';
            this.lastOperator = data.currentChar;
            data.activeButtons = [...this.numberButtons, ...this.clearButton];
            data.visorText = this.lastOperator + this.typed;
        },
        toEqualsFunction: (data: StateMachineData) => {
            const newResult: number = this.calculate(this.lastOperator, this.lastResult, Number(this.typed));
            if(newResult) {
                this.lastResult = newResult;
            }
            this.typed = '';
            data.activeButtons = [...this.operatorsButton, ...this.clearButton];
            data.visorText = this.lastResult.toString();
        },
        toNewOperatorFunction: (data: StateMachineData) => {
            this.lastOperator = data.currentChar;
            this.typed = '';
            data.activeButtons = [...this.numberButtons, ...this.clearButton];
            data.visorText = this.lastOperator;
        },
    }

    private calculate(operation: string, leftOperand: number, rightOperand: number): number {

        if(!this.calculatorService) {
            throw new Error('calculatorService instance was not injected');
        }

        switch(operation) {
          case '+':
            return this.calculatorService.sum(leftOperand, rightOperand);
          case '-':
            return this.calculatorService.sub(leftOperand, rightOperand);
          case '*':
            return this.calculatorService.mult(leftOperand, rightOperand);
          case '/':
            return this.calculatorService.div(leftOperand, rightOperand);
          default: 
            return undefined;
        }
    }

}