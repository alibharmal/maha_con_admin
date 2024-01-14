import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { EventComponent } from "./event/event.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { GalleryService } from "src/app/services/gallery/gallery.service";
import { EventService } from "src/app/services/event/event.service";

@NgModule({
  declarations: [EventComponent, GalleryComponent, PopUpComponent],
  imports: [CommonModule, AdminRoutingModule, HttpClientModule],
  providers: [AuthenticationService, GalleryService, EventService],
})
export class AdminModule {}
