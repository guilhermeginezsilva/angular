import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.scss']
})
export class CalculatorButtonComponent implements OnInit {

  @Input() character: string;
  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit(this.character);
  }

}
