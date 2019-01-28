import { StateMachineData } from './state-machine/state-machine-data.model';
import { StatesEnum } from './state-machine/states.enum';
import { CalculatorService } from './calculator.service';
import { Component, OnInit } from '@angular/core';
import { StatesMachine } from './state-machine/states-machine';

@Component({
  selector: 'app-simple-calculator',
  templateUrl: './simple-calculator.component.html',
  styleUrls: ['./simple-calculator.component.scss']
})
export class SimpleCalculatorComponent implements OnInit {

  public visorText: string;

  private keyboardButtons: string[][];
  private activeButtons: string[];

  private calculatorStatesMachine: StatesMachine;

  constructor(
    private calculatorService: CalculatorService
    ) {
      this.calculatorStatesMachine = new StatesMachine(this.calculatorService);
      this.keyboardButtons = [
        ['1','2','3','+'],
        ['4','5','6','-'],
        ['7','8','9','*'],
        ['C','0','=','/'],
      ];
  }

  ngOnInit() {
    const calculatorData: StateMachineData = this.calculatorStatesMachine.start();
    this.updateCalculator(calculatorData);
  }

  public onButtonClick(buttonChar: string) {
    this.calculate(buttonChar);
  }

  public onKeyboardPress(pressedChar: string) {

    const keyChar = this.convertKeyboardPressedKeys(pressedChar);
    if(this.activeButtons.includes(keyChar)) {
      this.calculate(keyChar);
    }
  }

  private convertKeyboardPressedKeys(pressedChar: string): string {
    if(pressedChar == 'Enter') {
      return '=';
    } else {
      return pressedChar;
    }
  }

  private calculate(buttonChar: string): void {
    const calculatorData: StateMachineData = this.calculatorStatesMachine.runNextStep(buttonChar);
    this.updateCalculator(calculatorData);
  }

  private updateCalculator(calculatorData: StateMachineData) {
    this.visorText = calculatorData.visorText;
    this.activeButtons = calculatorData.activeButtons;
  }

}
