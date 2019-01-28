import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleCalculatorComponent } from './simple-calculator/simple-calculator.component';
import { CalculatorButtonComponent } from './calculator-button/calculator-button.component';
import { CalculatorKeyboardComponent } from './calculator-keyboard/calculator-keyboard.component';

@NgModule({
  declarations: [
    SimpleCalculatorComponent,
    CalculatorButtonComponent,
    CalculatorKeyboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleCalculatorComponent,
    CalculatorButtonComponent,
    CalculatorKeyboardComponent
  ],
})
export class SharedModule { }
