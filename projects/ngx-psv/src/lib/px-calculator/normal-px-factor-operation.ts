import IOperation from './ioperation';

export default class NormalPxFactorOperation implements IOperation {
  
  public operate(result: any) {
    let pxFactor = 99/11*Math.min(11,Math.round(result.guesses_log10)) + 1; 

    // so we see most of the time pixels rather than approaching a clear image sooner..
    if (pxFactor != 1 && pxFactor != 100) {
      pxFactor -= (pxFactor / 100) * 50;
    }
    
    return pxFactor;
  }
}
