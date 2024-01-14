import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-actual-body',
  templateUrl: './actual-body.component.html',
  styleUrls: ['./actual-body.component.css'],
})
export class ActualBodyComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  constructor() {}

  ngOnInit(): void {
    console.log('this is default screen value getting ', this.screenWidth);

    this.getBodyClass();
  }

  getBodyClass() {
    let styleClass = '';
    if (!this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      !this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }

  closeSidenav() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
