import { Component } from '@angular/core';

@Component({
  selector: 'demo1',
  templateUrl: './demo1.component.html'
})
export class Demo1Component {
  onPsvStrengthChanged(val: number) {
    console.log("Score changed", val);
  }
  onPsvPxFactorChanged(val: number) {
    console.log("PxFactor changed", val);
  }
}
