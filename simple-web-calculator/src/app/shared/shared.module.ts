import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleCalculatorComponent } from './simple-calculator/simple-calculator.component';

@NgModule({
  declarations: [
    SimpleCalculatorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleCalculatorComponent,
  ],
})
export class SharedModule { }
