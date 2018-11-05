export interface FeedbackModel {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}

export class PortCanvasRenderingContext2D extends CanvasRenderingContext2D {
  public imageSmoothingEnabled: boolean;
  public webkitImageSmoothingEnabled: boolean;
  public mozImageSmoothingEnabled: boolean;
}

export enum Direction {
  NORMAL = "NORMAL",
  REVERSE = "REVERSE"
}

export interface Payload {
  score: number;
  pxFactor: number;
}