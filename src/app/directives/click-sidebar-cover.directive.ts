import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickSidebarCover]'
})
export class ClickSidebarCoverDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  toggleFunc() {
    let elm = this.el.nativeElement;
    let siderbar = this.el.nativeElement.parentElement.children[1];

    if (elm.classList.contains("hidden")) {
      elm.classList.remove("hidden")
      siderbar.classList.remove("-translate-x-full")
    } else {
      elm.classList.add("hidden")
      siderbar.classList.add("-translate-x-full")
    }
  }

}
