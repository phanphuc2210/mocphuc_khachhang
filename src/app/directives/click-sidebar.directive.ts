import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickSidebar]'
})
export class ClickSidebarDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  toggleFunc() {
    let elm = this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
    let cover = this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[2];
    if (elm.classList.contains("-translate-x-full")) {
      elm.classList.remove("-translate-x-full")
      cover.classList.remove("hidden")
    } else {
      elm.classList.add("-translate-x-full")
      cover.classList.add("hidden")
    }
  }
}
