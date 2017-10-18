import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class InputDirective implements OnInit {
  @Input() _autofocus = false;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this._autofocus || typeof this._autofocus === 'undefined') {
      this.el.nativeElement.focus();
    }
  }
}

