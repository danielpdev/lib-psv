import { Direction } from './../types';
import PxCalculator from './px-calculator';
import NormalPxFactorOperation from './normal-px-factor-operation';
import ReversePxFactorOperation from './reverse-px-factor-operation';

export default class PxCalculatorFactory{
  public static getCalculator(direction: Direction = Direction.NORMAL): PxCalculator {
    if(!direction)
      return;
    return direction === Direction.NORMAL ? new PxCalculator(new NormalPxFactorOperation()) : new PxCalculator(new ReversePxFactorOperation());
  }
}
