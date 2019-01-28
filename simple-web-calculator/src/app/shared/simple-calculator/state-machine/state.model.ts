import { StatesEnum } from './states.enum';

export class State {
    originState: StatesEnum;
    toState: StatesEnum;
    function: Function;
}