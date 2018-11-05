import { NgModule } from '@angular/core';
import { PSVDirective } from "./psv.directive";
import { PasswordService } from './password.service';
@NgModule({
  imports: [
  ],
  declarations: [PSVDirective],
  exports: [PSVDirective],
})
export class LibPSVModule { }
