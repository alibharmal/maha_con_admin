import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { EventComponent } from "./event/event.component";
import { GalleryComponent } from "./gallery/gallery-add/gallery.component";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { GalleryService } from "src/app/services/gallery/gallery.service";
import { EventService } from "src/app/services/event/event.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GallerySectionListComponent } from "./gallery/gallery-section-list/gallery-section-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GalleryAddFileModalComponent } from "./gallery/gallery-add/gallery-add-file-modal/gallery-add-file-modal.component";

@NgModule({
  declarations: [
    EventComponent,
    GalleryComponent,
    PopUpComponent,
    GallerySectionListComponent,
    GalleryAddFileModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [AuthenticationService, GalleryService, EventService],
})
export class AdminModule {}
