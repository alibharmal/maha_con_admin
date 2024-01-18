import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { GalleryComponent } from "./gallery/gallery-add/gallery.component";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { GallerySectionListComponent } from "./gallery/gallery-section-list/gallery-section-list.component";

const routes: Routes = [
  { path: "", redirectTo: "event", pathMatch: "full" },
  { path: "event", component: EventComponent, pathMatch: "full" },
  {
    path: "gallery-list",
    component: GallerySectionListComponent,
    pathMatch: "full",
  },
  { path: "gallery", component: GalleryComponent, pathMatch: "full" },
  { path: "gallery/:id", component: GalleryComponent, pathMatch: "full" },
  { path: "pop-up", component: PopUpComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
