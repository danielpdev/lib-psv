import PxCalculatorFactory from "./px-calculator-factory";
import PxCalculator from "./px-calculator";
import NormalPxCalculator from "./px-calculator";
import ReversePxCalculator from "./px-calculator";
import { Direction } from './../types';

var assert = require('assert');

describe("PxCalculatorFactory", () => {
  it("#when direction has value Direction.NORMAL should create a NormalPxCalculator", () => {
    //given, when
    const calculator = PxCalculatorFactory.getCalculator(Direction.NORMAL);
    //then
    expect(calculator instanceof PxCalculator).toBeTruthy();
  });
  it("#when direction has value Direction.REVERSE should create a ReversePxCalculator", () => {
    //given, when
    const calculator = PxCalculatorFactory.getCalculator(Direction.REVERSE);
    //then
    expect(calculator instanceof PxCalculator).toBeTruthy();
  });
  
  it("#when direction no value should return undefined", () => {
    //given, when
    const calculator = PxCalculatorFactory.getCalculator(null);
    //then
    expect(calculator instanceof PxCalculator).toBeFalsy();
  });
});
