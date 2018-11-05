import RendererController from "./renderer-controller";
import { fakeAsync, tick } from "@angular/core/testing";

describe("PxFactorCalculator", () => {
  let rendererController: RendererController;
  const canvasWrapperStub = {
    offsetWidth: 400,
    offsetHeight: 400
  };
  let mocks = null;
  let canvas: HTMLCanvasElement = document.createElement("canvas");

  beforeEach(() => {
    mocks = {
        clearRect: jasmine.createSpy("clearRect"),
        drawImage: jasmine.createSpy("drawImage")
    };
    spyOn(canvas, 'getContext').and.callFake(() => { 
      return mocks;
    });
    rendererController = new RendererController(canvasWrapperStub, canvas);
    rendererController.init({
      style: {
        backgroundImage: "url('https://uploads.codesandbox.io/uploads/user/a21b21ac-e074-4508-9460-6c198ba4455d/tpUL-1.jpg')"
      }
    })
  });
  it("#clearRect() should be called with 0, 0, 300, 150", fakeAsync(() => {
    rendererController.renderByPxFactor(0);
    tick(3000);
    expect(mocks.clearRect).toHaveBeenCalledWith(0,0,300,150);
  }));
  
  it("#drawImage() should be called with 0, 0, 0, 0", fakeAsync(() => {
    rendererController.renderByPxFactor(0);
    tick(3000);
    expect(mocks.drawImage.calls.count()).toEqual(2);
  }));
  
  it("#drawImage() should be called with 0, 0, 0, 0", fakeAsync(() => {
    rendererController.renderByPxFactor(0);
    tick(3000);
    expect(mocks.drawImage).toHaveBeenCalledWith(canvas, 0, 0, 0, 0, NaN, 0, NaN, 420);
  }));
});
