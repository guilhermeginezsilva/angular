import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCalculatorComponent } from './simple-calculator.component';



describe('SimpleCalculatorComponent', () => {
  let component: SimpleCalculatorComponent;
  let fixture: ComponentFixture<SimpleCalculatorComponent>;
  let calculateSpy: jasmine.Spy;

  const numberButtons: string[] = ['0','1','2','3','4','5','6','7','8','9','.'];
  const equalsButton: string[] = ['='];
  const clearButton: string[] = ['c','C'];
  const operatorsButton: string[] = ['+','-', '*', '/'];
  const allChars: string[] = numberButtons.concat(equalsButton).concat(clearButton).concat(operatorsButton);
  const keyboardKeys: number[] = Array.from(Array(127).keys());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen calculator button click', () => {
    setSpyOnCalculate();
    allChars.forEach(character => {
      component.onButtonClick(character);
    })
    expect(calculateSpy).toHaveBeenCalledTimes(allChars.length);
  })

  it('should listen keyboard keys press', () => {
    setSpyOnCalculate();
    keyboardKeys.forEach(keyCode => {
      component.onKeyboardPress(String.fromCharCode(keyCode));
    })
    expect(calculateSpy).toHaveBeenCalledTimes(numberButtons.concat(clearButton).length);
  })

  it('should convert keyboard keys', () => {
    component.onKeyboardPress('1');
    component.onKeyboardPress('+');
    component.onKeyboardPress('1');

    setSpyOnCalculate();

    component.onKeyboardPress('Enter');
    expect(calculateSpy).toHaveBeenCalledWith('=');
  })

  function setSpyOnCalculate() {
    calculateSpy = spyOn<any>(component, 'calculate');
  }
});


