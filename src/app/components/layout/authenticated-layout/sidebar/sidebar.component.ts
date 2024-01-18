import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from "@angular/animations";
import { Router } from "@angular/router";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export interface links {
  linkName: string;
  linkRoute: string;
}

export interface sideBarMenu {
  parent: string;
  child: Array<links>;
  parentRoute?: string;
  icon: string;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("150ms", style({ opacity: 1 })),
      ]),
      // transition(':leave', [
      //   style({opacity: 1}),
      //   animate('150ms',
      //   style({opacity: 0})
      //   )
      // ])
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  showHamburger = false;
  userData: any;
  hideSubMenu: Boolean = false;
  isImgDefault: Boolean = false;
  userImage: any;
  isAdmin: Boolean = false;
  isVendor: Boolean = false;

  isSidebarOpen: boolean = true;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = true;
  screenWidth = 0;
  multiple: boolean = false;

  selectedParent: string | null = null;

  sidebarList: sideBarMenu[] = [
    { parent: "Event", child: [], parentRoute: "/admin/event", icon: "" },
    {
      parent: "Gallery",
      child: [{ linkName: "", linkRoute: "" }],
      parentRoute: "/admin/gallery-list",
      icon: "",
    },
    { parent: "Pop up", child: [], parentRoute: "/admin/pop-up", icon: "" },
  ];

  constructor(private route: Router) {
    let userType: any = sessionStorage.getItem("userType");
    if (userType == "ADMIN") {
      this.isAdmin = true;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    } else {
      this.collapsed = true;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  showSideBar() {
    this.showHamburger = true;
    document.getElementById("sideBar")?.classList.add("sidebar-active");
  }

  hideSideBar() {
    this.showHamburger = false;
    document.getElementById("sideBar")?.classList.remove("sidebar-active");
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['/auth/login'])
  }
}
