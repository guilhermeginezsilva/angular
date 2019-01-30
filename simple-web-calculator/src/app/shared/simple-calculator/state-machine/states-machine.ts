import { StateMachineData } from './state-machine-data.model';
import { StatesEnum } from './states.enum';
import { State } from './state.model';
import { CalculatorService } from '../calculator.service';

export class StatesMachine {

    private currentState: StatesEnum;
    private data: StateMachineData;

    private typed: string;
    private lastOperator: string;
    private lastResult: number;

    private numberButtons: string[] = ['0','1','2','3','4','5','6','7','8','9','.'];
    private equalsButton: string[] = ['='];
    private clearButton: string[] = ['c','C'];
    private operatorsButton: string[] = ['+','-', '*', '/'];

    public constructor(
        private calculatorService?: CalculatorService
    ) {
        this.data = new StateMachineData();
        this.currentState = StatesEnum.START;
        this.typed = '';
        this.lastOperator = '';
        this.lastResult = 0;
    }

    public start() {
        const machineState: State = this.machineStates.find(state => state.originState == StatesEnum.START);
        if(machineState) {
            this.currentState = StatesEnum.START;
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

        if(this.numberButtons.includes(newCharacter)) {
            state = this.machineStates.find(state => state.originState === this.currentState 
                && (state.toState === StatesEnum.FIRST_NUMBER 
                    || state.toState === StatesEnum.NEW_NUMBER));

        } else if(this.equalsButton.includes(newCharacter)) {
            state = this.machineStates.find(state => state.originState === this.currentState 
                && state.toState === StatesEnum.EQUALS);

        } else if(this.clearButton.includes(newCharacter)) {
            state = this.machineStates.find(state => state.originState === this.currentState 
                && state.toState === StatesEnum.CLEAR);

        } else if(this.operatorsButton.includes(newCharacter)){
            state = this.machineStates.find(state => state.originState === this.currentState 
                && (state.toState === StatesEnum.FIRST_OPERATOR 
                    || state.toState === StatesEnum.CALCULATE_AND_OPERATOR
                    || state.toState === StatesEnum.NEW_OPERATOR));
            
        }
        this.data.currentChar = newCharacter;

        return state;
    }



    private machineStates: State[] = [
        {originState: StatesEnum.START, toState: undefined, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},

        {originState: StatesEnum.START, toState: StatesEnum.FIRST_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toFirstNumberFunction(data);
        }},
    
        {originState: StatesEnum.FIRST_NUMBER, toState: StatesEnum.FIRST_OPERATOR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toFirstOperatorFunction(data);
        }},

        {originState: StatesEnum.FIRST_NUMBER, toState: StatesEnum.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
        {originState: StatesEnum.FIRST_NUMBER, toState: StatesEnum.FIRST_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toFirstNumberFunction(data);
        }},
        
        {originState: StatesEnum.FIRST_OPERATOR, toState: StatesEnum.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        {originState: StatesEnum.FIRST_OPERATOR, toState: StatesEnum.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
        
        {originState: StatesEnum.NEW_NUMBER, toState: StatesEnum.EQUALS, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toEqualsFunction(data);
        }},
        {originState: StatesEnum.NEW_NUMBER, toState: StatesEnum.CALCULATE_AND_OPERATOR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toCalculateAndOperatorFunction(data);
        }},
        {originState: StatesEnum.NEW_NUMBER, toState: StatesEnum.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
        {originState: StatesEnum.NEW_NUMBER, toState: StatesEnum.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        
        {originState: StatesEnum.EQUALS, toState: StatesEnum.NEW_OPERATOR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewOperatorFunction(data);
        }},
        {originState: StatesEnum.EQUALS, toState: StatesEnum.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},

        {originState: StatesEnum.NEW_OPERATOR, toState: StatesEnum.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        
        {originState: StatesEnum.CALCULATE_AND_OPERATOR, toState: StatesEnum.NEW_NUMBER, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toNewNumberFunction(data);
        }},
        {originState: StatesEnum.CALCULATE_AND_OPERATOR, toState: StatesEnum.CLEAR, function: (data: StateMachineData)=>{
            this.statesMachineFunctions.toClearFunction(data);
        }},
    ];

    private statesMachineFunctions = {
        toClearFunction: (data: StateMachineData) => {
            this.currentState = StatesEnum.START;
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