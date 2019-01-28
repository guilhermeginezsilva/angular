import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCalculatorComponent } from './simple-calculator.component';

describe('SimpleCalculatorComponent', () => {
  let component: SimpleCalculatorComponent;
  let fixture: ComponentFixture<SimpleCalculatorComponent>;

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
});
