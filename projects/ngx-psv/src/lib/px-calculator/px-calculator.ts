import * as zxcvbn_ from "zxcvbn"; // tslint:disable-line
import ICalculator from './icalculator';
import IOperation from './ioperation';
let zxcvbn = zxcvbn_;
export default class PxCalculator implements ICalculator {
  protected _pxFactor = 1;
  public get pxFactor() {
    return this._pxFactor;
  }
  
  constructor(protected operation: IOperation) {}
  
  private calculateStrength(password: string) {
    const result = zxcvbn(password);
    this._score = result.score;
    return result;
  }
  
  public calculate(password: string): Promise<number>{
    return new Promise((resolve, reject) => {
      const result = this.calculateStrength(password);
      if (!this.operation)
        reject(new Error("No operation was provided or maybe is null/undefined?"));
      this._pxFactor = this.operation.operate(result);
      
      resolve(this._pxFactor); 
    });
  }
  
  protected _score = 0;
  public get score() {
    return this._score;
  }
}
