import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorKeyboardComponent } from './calculator-keyboard.component';

describe('CalculatorKeyboardComponent', () => {
  let component: CalculatorKeyboardComponent;
  let fixture: ComponentFixture<CalculatorKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
