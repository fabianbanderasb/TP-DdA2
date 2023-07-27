import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]'
})
export class StatusHighlightDirective implements OnInit {

  @Input('appStatusHighlight') value!: number;

  constructor(private el: ElementRef) {
    
   }
  ngOnInit(): void {
    switch(true) { 
      case (this.value<10): { 
        this.el.nativeElement.style.color = 'darkgreen';
        break; 
      } 
      case (this.value<30): { 
        this.el.nativeElement.style.color = '#8B8000';
        break; 
      }
      case (this.value<60): { 
        this.el.nativeElement.style.color = 'orange';
        break; 
      }
      default: { 
        this.el.nativeElement.style.color = 'red';
         break; 
      } 
   } 
    
  }

}
