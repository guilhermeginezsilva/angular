import { StatesMachineState } from './states-machine-states.enum';

export class State {
    originState: StatesMachineState;
    toState: StatesMachineState;
    function: Function;
}