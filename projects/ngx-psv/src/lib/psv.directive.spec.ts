import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { PSVDirective } from "./psv.directive";

@Component({
  template: `<div style="width:300px; height:300px; min-width: 100px; min-height:100px">
						<input lib-psv 
							[psvFeedbackModel]="{ '0': 'Worst', '1': 'Bad', '2': 'Weak', '3': 'Good', '4': 'Strong' }"
							[psvCanvasWrapper]="canvaswrap" [psvCanvas]="canvas"
							[psvPoster]="poster" [psvFeedback]="feedback" class="form__input" type="password" name="password" id="password">
						<p #feedback class="form__password-strength" id="strength-output"></p>
						<div class="poster" #poster style="background-image:url('https://uploads.codesandbox.io/uploads/user/a21b21ac-e074-4508-9460-6c198ba4455d/tpUL-1.jpg')"></div>
						<div class="canvas-wrap" #canvaswrap style="width:300px; height:300px; min-width: 100px; min-height:100px">
						<canvas #canvas style="width:300px; height:300px; min-width: 100px; min-height:100px"></canvas>
						<input lib-psv 
							[psvFeedbackModel]="{ '0': 'Worst', '1': 'Bad', '2': 'Weak', '3': 'Good', '4': 'Strong' }"
							[psvCanvasWrapper]="canvaswrap" [psvCanvas]="canvas"
							[psvPoster]="poster" [psvFeedback]="feedback" class="form__input" type="password" name="password" id="password"> />
				</div>`
})
class TestComponent {
}

describe("PSVDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputsWithPSV: DebugElement[];
  let component;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [PSVDirective, TestComponent]
    }).createComponent(TestComponent);
    fixture.detectChanges();
    inputsWithPSV = fixture.debugElement.queryAll(
      By.directive(PSVDirective)
    );
    component = fixture.componentInstance;
  });
	
	afterEach(() =>{
		fixture = null;
		inputsWithPSV = null;
		component = null;
	});
	
  it("should create element created without properties", () => {
		//given
		TestBed.resetTestingModule();

		@Component({
			template: `
				<div>
					<input lib-psv/>
				</div>`
		})
		class TestComponentEmpty {
		}
			
    TestBed.configureTestingModule({
      declarations: [PSVDirective, TestComponentEmpty]
    });
		//when
    const localFixture = TestBed.createComponent(TestComponentEmpty);
    const componentInstance = localFixture.componentInstance;
		const psvDirectives = localFixture.debugElement.queryAll(
      By.directive(PSVDirective)
    );
		localFixture.detectChanges();
		//then
		expect(componentInstance).toBeDefined();
    expect(psvDirectives.length).toEqual(1);
		
  });
	
	it("should not throw when style backgroundImage is not in format url(...)", () => {
		//given
		TestBed.resetTestingModule();

		@Component({
			template: `
				<div style="width:300px; height:300px; min-width: 100px; min-height:100px">
					<div class="poster" #poster style="background-image:url('https://uploads.codesandbox.io/uploads/user/a21b21ac-e074-4508-9460-6c198ba4455d/tpUL-1.jpg')"></div>
					<div class="canvas-wrap" #canvaswrap style="width:300px; height:300px; min-width: 100px; min-height:100px">
					<canvas #canvas style="width:300px; height:300px; min-width: 100px; min-height:100px"></canvas>
					<input lib-psv [psvCanvasWrapper]="canvaswrap" [psvCanvas]="canvas"
						 [psvPoster]="poster"/>
				</div>`
		})
		class TestComponentEmpty {
		}
			
    TestBed.configureTestingModule({
      declarations: [PSVDirective, TestComponentEmpty]
    });
		//when
    const localFixture = TestBed.createComponent(TestComponentEmpty);
    const componentInstance = localFixture.componentInstance;
		const psvDirectives = localFixture.debugElement.queryAll(
      By.directive(PSVDirective)
    );
		localFixture.detectChanges();
		const psvDirective = psvDirectives[0].injector.get(PSVDirective);
		//then
		expect( function(){ psvDirective.onKeyDown({value: '2131231d2d31'}); } ).not.toThrow();
  });
	
	it("should throw when style backgroundImage is not in correct format url(...)", () => {//xxxx
		//given
		TestBed.resetTestingModule();

		@Component({
			template: `
				<div>
					<input lib-psv/>
				</div>`
		})
		class TestComponentEmpty {
		}
		//when
    TestBed.configureTestingModule({
      declarations: [PSVDirective, TestComponentEmpty]
    });
		
    const localFixture = TestBed.createComponent(TestComponentEmpty);
    const componentInstance = localFixture.componentInstance;
		const psvDirectives = localFixture.debugElement.queryAll(
      By.directive(PSVDirective)
    );
		const psvDirective = psvDirectives[0].injector.get(PSVDirective);
		psvDirective.canvas = document.createElement('canvas');
    psvDirective.canvasWrapper = document.createElement('div');
		psvDirective.poster = document.createElement('div');
		psvDirective.poster.style.backgroundImage = "asdsadas";
		//then
		expect( function(){ psvDirective.onKeyDown({value: '2131231d2d31'}); } ).toThrow(new Error("psvPoster style backgroundImage is not in format url(...)"));
  });
	
	it("should throw when one of psvCanvas|psvCanvasWrapper|psvPoster elements is missing", () => {
		//given
		TestBed.resetTestingModule();

		@Component({
			template: `
				<div>
					<input lib-psv/>
				</div>`
		})
		class TestComponentEmpty {
		}
			
    TestBed.configureTestingModule({
      declarations: [PSVDirective, TestComponentEmpty]
    });
		//when
    const localFixture = TestBed.createComponent(TestComponentEmpty);
    const componentInstance = localFixture.componentInstance;
		const psvDirectives = localFixture.debugElement.queryAll(
      By.directive(PSVDirective)
    );
		const psvDirective = psvDirectives[0].injector.get(PSVDirective);
		//then
		expect( function(){ psvDirective.onKeyDown({value: '2131231d2d31'}); } ).toThrow( new Error("No psvCanvas|psvCanvasWrapper|psvPoster found"));
  });
	
  it("should have 2 elements created", () => {
		//given, when, then
    expect(inputsWithPSV.length).toBe(2);
  });
  
  it("should have call psvScoreChanged callback 1 time", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvScoreChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '2131231d2d31'});
    fixture.detectChanges(); 
    tick(900);
		//then
    expect(callback).toHaveBeenCalled();
		expect(callback.calls.count()).toEqual(1);
  }));
	
	it("should have call psvPxFactorChanged callback 1 time", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvPxFactorChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '2131231d2d31'});
    fixture.detectChanges(); 
    tick(900);
		//then
    expect(callback).toHaveBeenCalled();
		expect(callback.calls.count()).toEqual(1);
  }));
	
	it("should have call psvScoreChanged callback 2 times", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvScoreChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '2131231d2d31'});
    fixture.detectChanges(); 
    tick(2300);
    psvDirective.onKeyDown({value: '6'});
    fixture.detectChanges(); 
    tick(2300);
		 //then
    expect(callback.calls.count()).toEqual(2);
  }));
	
	it("should have call psvPxFactorChanged callback 2 times", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvPxFactorChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '2131231d2d31'});
    fixture.detectChanges(); 
    tick(2300);
    psvDirective.onKeyDown({value: '6'});
    fixture.detectChanges(); 
    tick(2300);
		//then
    expect(callback.calls.count()).toEqual(2);
  }));
	
  it("should have call psvScoreChanged callback with value 0", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvScoreChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '1'});
    fixture.detectChanges(); 
    tick(1000);
		//then
    expect(callback).toHaveBeenCalledWith(0);
	}));
	
  it("should have call psvPxFactorChanged callback with value 0", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvPxFactorChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '1'});
    fixture.detectChanges(); 
    tick(1000);
		//then
    expect(callback).toHaveBeenCalledWith(5);
	}));

	it("should have call psvScoreChanged callback with value 4", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
 		//when
    psvDirective.psvScoreChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '2131231d2d31!123sdaSASd'});
    fixture.detectChanges(); 
    tick(1000);
		//then
    expect(callback).toHaveBeenCalledWith(4);
  }));
	
	it("should have call psvPxFactorChanged callback with value 4", fakeAsync(() => {
		//given
    const psvDirective = inputsWithPSV[1].injector.get(PSVDirective);
    fixture.detectChanges(); 
    
    const callback = jasmine.createSpy('callback');
		//when 
    psvDirective.psvPxFactorChanged.subscribe(callback); 
    psvDirective.onKeyDown({value: '2131231d2d31!123sdaSASd'});
    fixture.detectChanges(); 
    tick(1000);
		//then
    expect(callback).toHaveBeenCalledWith(100);
  }));	
});
