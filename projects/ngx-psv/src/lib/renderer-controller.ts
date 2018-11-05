import { FeedbackModel, PortCanvasRenderingContext2D } from "./types";

export default class RendererController {
  feedbackModel: FeedbackModel = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  };
  ctx: PortCanvasRenderingContext2D;
  imgRatio: number;
  wrapperRatio: number;
  newWidth: number;
  newHeight: number;
  newX: number;
  newY: number;
  img: HTMLImageElement;
  posterImg: string;

  constructor(private canvasWrapper: any, private canvas: HTMLCanvasElement) {}

  public init(poster: any, callback?: () => void): void {
    if(!poster)
      return;
    const matcher = poster.style.backgroundImage
      .match(/\((.*?)\)/);
    this.posterImg = matcher && matcher[1].replace(/('|")/g, "") || undefined;
    if(!this.posterImg)
      throw new Error("psvPoster style backgroundImage is not in format url(...)");
    this.ctx = this.canvas.getContext("2d") as PortCanvasRenderingContext2D;
    this.img = new Image();

    this.img.src = this.posterImg;
    
    this.img.onload = () => {
      const imgWidth = this.img.width;
      const imgHeight = this.img.height;
      this.imgRatio = imgWidth / imgHeight;
      this.setCanvasSize();
      if(callback)
        callback();
    };
  }

  private setCanvasSize(): void {
    this.canvas.width = this.canvasWrapper.offsetWidth;
    this.canvas.height = this.canvasWrapper.offsetHeight;
  }

  public async renderFeedback(
    feedBackElement: Element,
    renderer: any,
    score: number,
    newStrengthModel?: FeedbackModel
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try{
        if (feedBackElement)
          renderer.setProperty(
            feedBackElement,
            "innerHTML",
            `Password strength: ${
              newStrengthModel ? newStrengthModel[score] : this.feedbackModel[score]
            }`
          );
      }catch(e){
        reject(new Error(`Something went wrong when drawing to the canvas ${e}`));
      }
      resolve();
    });
  }
  public async renderByPxFactor(pxFactor: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.img)
        reject(new Error("No img was provided or maybe is null/undefined?"));
      try{
        const w = this.canvasWrapper.offsetWidth;
        const h = this.canvasWrapper.offsetHeight;
        this.newWidth = w;
        this.newHeight = h;
        this.newX = 0;
        this.newY = 0;
        this.wrapperRatio = this.newWidth / this.newHeight;

        if (this.wrapperRatio > this.imgRatio) {
          this.newHeight = Math.round(w / this.imgRatio);
          this.newY = (h - this.newHeight) / 2;
        } else {
          this.newWidth = Math.round(h * this.imgRatio);
          this.newX = (w - this.newWidth) / 2;
        }

        // pxFactor will depend on the current typed password.
        // values will be in the range [1,100].
        const size = pxFactor * 0.01;
        // turn off image smoothing - this will give the pixelated effect
        this.ctx.mozImageSmoothingEnabled = size === 1 ? true : false;
        this.ctx.webkitImageSmoothingEnabled = size === 1 ? true : false;
        this.ctx.imageSmoothingEnabled = size === 1 ? true : false;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw original image to the scaled size

        this.ctx.drawImage(this.img, 0, 0, w * size, h * size);
        // then draw that scaled image thumb back to fill canvas
        // As smoothing is off the result will be pixelated

        this.ctx.drawImage(
          this.canvas,
          0,
          0,
          w * size,
          h * size,
          this.newX,
          this.newY,
          this.newWidth + 0.05 * w,
          this.newHeight + 0.05 * h
        );
        resolve(); 
      }catch(e) {
        reject(new Error(`Something went wrong when drawing to the canvas ${e}`));
      }
      
    });
   
  }
}
