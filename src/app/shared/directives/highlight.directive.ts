import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements AfterViewInit{

  @Input() color = 'yellow';
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
        this.setBackgroundColor(this.color)
    }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  @HostListener('mouseenter') onMouseenter(){
    this.setBackgroundColor('lightblue')
  }
  @HostListener('mouseleave') onMouseleave(){
    this.setBackgroundColor(this.color)
  }
  @HostListener('click') onClick(){
    this.color = 'lightblue'
  }

}
