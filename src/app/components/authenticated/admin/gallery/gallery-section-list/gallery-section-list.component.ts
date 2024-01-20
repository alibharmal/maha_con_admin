import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GalleryService } from "src/app/services/gallery/gallery.service";

@Component({
  selector: "app-gallery-section-list",
  templateUrl: "./gallery-section-list.component.html",
  styleUrls: ["./gallery-section-list.component.css"],
})
export class GallerySectionListComponent {
  galleryList: Array<any> = [];
  constructor(private galleryService: GalleryService, private route: Router) {
    this.getAllGalleryList();
  }

  getAllGalleryList() {
    this.galleryService.getAllGallery().subscribe({
      next: (res) => {
        console.log("this is gallery lsit ", res);
        this.galleryList = res.data;
      },
      error: (error) => {
        console.log("this is error ", error);
      },
    });
  }

  onEditGallery(gallery: any) {
    this.route.navigate(["/admin/gallery/", gallery.id]);
  }

  deleteGallerySection() {
    // delete code here
  }
}
