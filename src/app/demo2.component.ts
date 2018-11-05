import { Component } from '@angular/core';

@Component({
  selector: 'demo2',
  templateUrl: './demo2.component.html'
})
export class Demo2Component {
  onPsvStrengthChanged(val: number) {
    console.log("Score changed", val);
  }
}
