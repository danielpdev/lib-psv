import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ROUTE_PATHS } from './routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private subscription: Subscription;
  constructor(private router: Router, private elementRef: ElementRef, private renderer2: Renderer2) {
    this.subscription = router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe(this.toggleClass.bind(this));  
  }
  
  toggleClass(event: NavigationEnd) {
    if (event.url === `/${ROUTE_PATHS.DEMO1}`) {
      this.renderer2.removeClass(this.elementRef.nativeElement.parentElement, 'demo-2');
      this.renderer2.addClass(this.elementRef.nativeElement.parentElement, 'demo-1');
    }
    else if (event.url === `/${ROUTE_PATHS.DEMO2}`) {
      this.renderer2.removeClass(this.elementRef.nativeElement.parentElement, 'demo-1');
      this.renderer2.addClass(this.elementRef.nativeElement.parentElement, 'demo-2');
    }
  }
  
  ngDestroy() { 
    this.subscription = null;
  }
}
