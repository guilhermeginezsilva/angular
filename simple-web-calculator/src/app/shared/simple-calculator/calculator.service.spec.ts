import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {

  const FIRST_NUMBER: number = 3;
  const SECOND_NUMBER: number = 1;
  const FIRST_DECIMAL_NUMBER: number = 3.5;
  const SECOND_DECIMAL_NUMBER: number = 2.5;

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    expect(service).toBeTruthy();
  });

  it('should sum', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sum(FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER + SECOND_NUMBER);
  });

  it('should sum positive number and negative number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sum(FIRST_NUMBER, -SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER - SECOND_NUMBER);
  });

  
  it('should sum negative number and positive number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sum(-FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe(-FIRST_NUMBER + SECOND_NUMBER);
  });

  it('should sum zeros', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sum(0, 0);
    expect(result).toBe(0);
  });

  it('should sum decimal numbers', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sum(FIRST_DECIMAL_NUMBER, SECOND_DECIMAL_NUMBER);
    expect(result).toBe(FIRST_DECIMAL_NUMBER + SECOND_DECIMAL_NUMBER);
  });

  it('should subtract', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sub(FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER - SECOND_NUMBER);
  });

  it('should subtract positive number and negative number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sub(FIRST_NUMBER, -SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER + SECOND_NUMBER);
  });

  
  it('should subtract negative number and positive number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sub(-FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe(-FIRST_NUMBER - SECOND_NUMBER);
  });

  it('should subtract zeros', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sub(0, 0);
    expect(result).toBe(0);
  });

  it('should subtract decimal numbers', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.sub(FIRST_DECIMAL_NUMBER, SECOND_DECIMAL_NUMBER);
    expect(result).toBe(FIRST_DECIMAL_NUMBER - SECOND_DECIMAL_NUMBER);
  });

  it('should multiply', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.mult(FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER * SECOND_NUMBER);
  });

  it('should multiply positive number and negative number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.mult(FIRST_NUMBER, -SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER * (-SECOND_NUMBER));
  });

  
  it('should multiply negative number and positive number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.mult(-FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe((-FIRST_NUMBER) * SECOND_NUMBER);
  });

  it('should multiply zeros', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.mult(0, 0);
    expect(result).toBe(0);
  });

  it('should multiply decimal numbers', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.mult(FIRST_DECIMAL_NUMBER, SECOND_DECIMAL_NUMBER);
    expect(result).toBe(FIRST_DECIMAL_NUMBER * SECOND_DECIMAL_NUMBER);
  });

  it('should divide', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.div(FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER / SECOND_NUMBER);
  });

  it('should divide positive number and negative number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.div(FIRST_NUMBER, -SECOND_NUMBER);
    expect(result).toBe(FIRST_NUMBER / (-SECOND_NUMBER));
  });

  
  it('should divide negative number and positive number', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.div(-FIRST_NUMBER, SECOND_NUMBER);
    expect(result).toBe((-FIRST_NUMBER) / SECOND_NUMBER);
  });

  it('should go to infinity when divide by zero', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.div(0, 0);
    expect(result).toBeNaN();
  });

  it('should divide decimal numbers', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    const result: number = service.div(FIRST_DECIMAL_NUMBER, SECOND_DECIMAL_NUMBER);
    expect(result).toBe(FIRST_DECIMAL_NUMBER / SECOND_DECIMAL_NUMBER);
  });

});
