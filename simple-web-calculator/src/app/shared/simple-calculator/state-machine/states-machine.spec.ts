import { TestBed, async } from '@angular/core/testing';

import { StatesMachine } from './states-machine';

describe('StatesMachine', () => {

  let statesMachine: StatesMachine;

  beforeEach(async(() => {
  }));

  beforeEach(() => {
    statesMachine = new StatesMachine();
  });

  it('should be created', () => {
    statesMachine = new StatesMachine();
    expect(statesMachine).toBeTruthy();
  });

});