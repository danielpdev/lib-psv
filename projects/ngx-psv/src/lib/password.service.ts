import { Injectable,  Renderer2, RendererFactory2 } from "@angular/core";
import RendererController from "./renderer-controller";
import { ICalculator, PxCalculator, PxCalculatorFactory } from './px-calculator';

import { FeedbackModel, Direction, Payload } from "./types";

@Injectable({
  providedIn: 'root'
})
export class PasswordService{
  private pxCalculator: ICalculator;
  private rendererController: RendererController;
  public renderer2: Renderer2;
  public direction: Direction;
  public feedbackModel: FeedbackModel;
  public passwordFeedback: Element;
  private _isReady  = false;
  public get isReady() { return this._isReady; }
  
  constructor(rendererFactory: RendererFactory2){
    this.renderer2 = rendererFactory.createRenderer(null, null);
  }
  
  public init(
    canvasWrapper: any,
    canvas: any,
    poster: any,
    direction: Direction,
    feedbackModel: FeedbackModel,
    passwordFeedback: Element) {

    this.direction = direction;
    this.feedbackModel = feedbackModel;
    this.passwordFeedback = passwordFeedback;
    
    if(canvas && canvasWrapper && poster)
      this._isReady = true;
      
    this.pxCalculator = PxCalculatorFactory.getCalculator(direction);
    this.rendererController = new RendererController(
      canvasWrapper,
      canvas
    );
     
    this.rendererController.init(poster, () => this.rendererController.renderByPxFactor(this.direction === Direction.NORMAL ? 1 : 0));
    
  }
  
  public async processPassword(
    callback: (Payload) => void,
    password: string): Promise<void> {
    if (!this._isReady) {
      return Promise.reject(new Error("no px calculator"));
    }

    const calculator = this.pxCalculator as PxCalculator;
    const pxFactor = calculator.pxFactor;
    await calculator.calculate(password);
    if (calculator.pxFactor !== pxFactor)
    {
      try{
        await this.rendererController.renderByPxFactor(calculator.pxFactor);
        await this.rendererController.renderFeedback(
          this.passwordFeedback,
          this.renderer2,
          calculator.score,
          this.feedbackModel
        );
      }catch(e){
        throw e;
      }
      
      if(callback)
        callback({score: calculator.score, pxFactor: calculator.pxFactor});
    }
  }
}