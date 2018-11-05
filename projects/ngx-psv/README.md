
# lib-psv([demo](https://codesandbox.io/s/035l7v1zmn))

> Superb password strength visualization for Angular 7.

![Demo](https://raw.githubusercontent.com/danielpdev/lib-psv/master/lib-psv.gif)

This is a Angular 7 directive used as port of an awesome [Codrops Article](https://tympanus.net/codrops/2018/04/18/password-strength-visualization/) by [Mary Lou](https://tympanus.net/codrops/author/crnacura/) (original [source](https://github.com/codrops/PasswordStrengthVisualization/)).

## Install

```bash
npm i --save lib-psv
```

## Usage

Check out the [Demo](https://codesandbox.io/s/035l7v1zmn) to see it in action.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPSVModule } from "lib-psv";
import { AppRoutes, routes } from './routes';
import { Demo1Component } from './demo1.component';
import { Demo2Component } from './demo2.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, 
    Demo1Component,
    Demo2Component
  ],
  imports: [
    BrowserModule,
    NgxPSVModule,
    AppRoutes.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

```html
<input lib-psv 
  [psvOptions]="obj" 
  [psvFeedbackModel]="{ '0': 'Worst', '1': 'Bad', '2': 'Weak', '3': 'Good', '4': 'Strong' }"
  (psvScoreChanged)="onPsvStrengthChanged($event)"
  [psvCanvasWrapper]="canvaswrap"
  [psvCanvas]="canvas"
  [psvPoster]="poster"
  [psvFeedback]="feedback"
>
	
```

Changing the `psvDirection` string property to `NORMAL` (default is `NORMAL`) will typically result in a cleaner progressive image when a key down event occurred.
If `psvDirection` changes to `REVERSE`,  will typically result in a blurred progressive image when a key up event occurred.


## Props

| Property      | Type               | Default                               | Description                                                                                                                                  |
|:--------------|:-------------------|:--------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `psvDirection`  | string| 'NORMAL'\|'REVERSE' | Whether image should turn progressively clear or blurred when a key down event occurred  |
| `psvFeedbackModel`  | any| { '0': 'Worst', '1': 'Bad', '2': 'Weak', '3': 'Good', '4': 'Strong' }                                 | Feedback model is the object that contains the keys and values that correspond used to display in the element under the input.|
| `(psvScoreChanged)`  | EventEmitter\<number>| EventEmitter| Emitted when the password score changes|
|`(psvPxFactorChanged)`|EventEmitter\<number>|EventEmitter|Emitterd when the pxFactor used to change the image is changed|
| `psvCanvasWrapper`  | HTMLElement| null                        | The parent HTML element of the `psvCanvas` element.  |
| `psvCanvas`  | HTMLCanvasElement| null                             | The canvas in which the image is drawn to |
| `psvPoster`  | HTMLElement           | null| The HTMLElement that needs to have a `style` property defined containing `background-image` with a valid value |
| `psvFeedback`  | HTMLElement| null                                 | The HTMLElement which property `innerHTML` will be changed when if the `psvFeedbackModel` is set|
| `psvOptions`  | object| null                             | Object containing all the properties that are used to initialize lib-psv |


I've tried to keep the properties and behavior exactly the same as in the original codrops version.

## Related

- [zxcvbn](https://www.npmjs.com/package/zxcvbn) - Underlying password evaluation engine.
- [PasswordStrengthVisualization](https://github.com/codrops/PasswordStrengthVisualization/) - Original source this library is based on.
- [Codrops Article](https://tympanus.net/codrops/2018/04/18/password-strength-visualization/) - Original article this library is based on.


## Development
This module was bootstrapped with [angular-cli](https://cli.angular.io) so it's using the common build/test/lint commands from angular-cli.
### Library
- Build: ng build lib-psv
- Test: ng test lib-psv
- Lint: ng lint lib-psv
- 
### Project
- See it in action: ng serve

## Misc

Follow Codrops: [Twitter](http://www.twitter.com/codrops), [Facebook](http://www.facebook.com/codrops), [Google+](https://plus.google.com/101095823814290637419), [GitHub](https://github.com/codrops), [Pinterest](http://www.pinterest.com/codrops/), [Instagram](https://www.instagram.com/codropsss/)
## License
This resource can be used freely if integrated or build upon in personal or commercial projects such as websites, web apps and web templates intended for sale. It is not allowed to take the resource "as-is" and sell it, redistribute, re-publish it, or sell "pluginized" versions of it. Free plugins built using this resource should have a visible mention and link to the original work. Always consider the licenses of all included libraries, scripts and images used.
MIT © [danielpdev](https://github.com/danielpdev)

