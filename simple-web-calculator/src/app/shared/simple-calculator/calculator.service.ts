import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  public sum(num1: number, num2: number): number {
    return num1 + num2;
  }

  public sub(num1: number, num2: number): number {
    return num1 - num2;
  }

  public mult(num1: number, num2: number): number {
    return num1 * num2;
  }

  public div(num1: number, num2: number): number {
    return num1 / num2;
  }
}
