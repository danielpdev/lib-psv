import NormalPxFactorOperation from "./normal-px-factor-operation";
import PxCalculator from "./px-calculator";

var assert = require('assert');

describe("NormalPxFactorCalculator", () => {
  let normalPxFactorOperation: NormalPxFactorOperation;
  let pxCalculator: PxCalculator;
  beforeEach(() => {
    normalPxFactorOperation = new NormalPxFactorOperation();
    pxCalculator = new PxCalculator(normalPxFactorOperation);
  });
  
  it("#score should be 0 by default", () => {
    expect(pxCalculator.score).toBe(0);
  });
  
  it("#score should be 1 by when password strength is increased", () => {
    pxCalculator.calculate('asd1');
    expect(pxCalculator.score).toBe(1);
  });
  
  it("#score should be 2 by when password strength is increased", () => {
    pxCalculator.calculate('asd1!123');
    expect(pxCalculator.score).toBe(2);
  });
  
  it("#score should be 3 by when password strength is increased", () => {
    pxCalculator.calculate('asd1!123a');
    expect(pxCalculator.score).toBe(3);
  });
  
  it("#score should be 4 by when password strength is increased", () => {
    pxCalculator.calculate('asd1!123a@4124');
    expect(pxCalculator.score).toBe(4);
  });
});
