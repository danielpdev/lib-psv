import {
  ElementRef,
  Input,
  Directive,
  EventEmitter,
  Output,
  AfterContentInit,
  OnDestroy,
  OnInit,
  HostListener,
  SimpleChanges
} from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PasswordService } from './password.service';
import { FeedbackModel, Direction, Payload } from "./types";


@Directive({
  selector: "[lib-psv]"
})
export class PSVDirective implements AfterContentInit {

  private psvTextChanged = new Subject<string>();
  private subscription: Subscription;
  
  @Output() psvScoreChanged = new EventEmitter<number>();
  @Output() psvPxFactorChanged = new EventEmitter<number>();
  
  @Input("psvDirection") direction: Direction = Direction.NORMAL;
  
  @Input("psvFeedback") passwordFeedback: any;
  @Input("psvFeedbackModel") feedbackModel: FeedbackModel;
 
  @Input("psvCanvasWrapper") canvasWrapper: any;
  @Input("psvCanvas") canvas: any;
  @Input("psvPoster") poster: any;
  
  @Input("psvOptions")
  public set psvOptions(options: any) {
    if(!options)
      return;
    const allowedProps = this.psvOptions;
    Object.keys(options).map( key => {
      if (allowedProps[key]) {
        this[key] = options[key];
      }
    });
  }
  public get psvOptions(): any {
    return {
        psvScoreChanged: this.psvScoreChanged,
        psvPxFactorChanged: this.psvPxFactorChanged,
        psvDirection: this.direction,
        psvDelay: this.psvDelay,
        psvFeedback: this.passwordFeedback,
        psvFeedbackModel: this.feedbackModel,
        psvCanvasWrapper: this.canvasWrapper,
        psvCanvas: this.canvas,
        psvPoster: this.poster,
    };
  }
  
  @Input("psvDelay") _delay = 200;
  public set psvDelay(delay: number) {
    this._delay = delay;
    this.subscription = this.psvTextChanged
      .pipe(debounceTime(this.psvDelay))
      .pipe(distinctUntilChanged())
      .subscribe(this.passwordService.processPassword.bind(this.passwordService, (event: Payload) => this.notify(event)));
  }
  public get psvDelay(): number {
    return this._delay;
  }
  
  @HostListener("input", ["$event.target"])
  onKeyDown(event: any) {
    if(!this.isDirectiveValid()){
      throw new Error("No psvCanvas|psvCanvasWrapper|psvPoster found");
    }else if (!this.passwordService.isReady){
      this.passwordService.init(this.canvasWrapper, this.canvas, this.poster, this.direction, this.feedbackModel, this.passwordFeedback);
    }
    this.psvTextChanged.next(event.value);

  }

  constructor(private passwordService: PasswordService) {
  }
  ngOnInit() {
    
    if (this.isDirectiveValid() && !this.subscription)
      this.subscription = this.psvTextChanged
        .pipe(debounceTime(this.psvDelay))
        .pipe(distinctUntilChanged())
        .subscribe(this.passwordService.processPassword.bind(this.passwordService, (event: Payload) => this.notify(event)));

  }
  ngAfterContentInit() {
    if (this.isDirectiveValid())
      this.passwordService.init(this.canvasWrapper, this.canvas, this.poster, this.direction, this.feedbackModel, this.passwordFeedback);
  }
  
  isDirectiveValid(){
    return this.canvas && this.canvasWrapper && this.poster;
  }
  
  notify(event: Payload) {
    this.psvScoreChanged.emit(event.score);
    this.psvPxFactorChanged.emit(event.pxFactor);
  }
  
  public reset(): void {
    this.passwordService.init(this.canvasWrapper, this.canvas, this.poster, this.direction, this.feedbackModel, this.passwordFeedback);
  }

  public ngOnDestroy(): void {
    if (this.subscription)
      this.subscription = null;
  }
}
