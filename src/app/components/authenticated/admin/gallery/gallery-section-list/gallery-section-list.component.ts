import { Component } from "@angular/core";
import { GalleryService } from "src/app/services/gallery/gallery.service";

@Component({
  selector: "app-gallery-section-list",
  templateUrl: "./gallery-section-list.component.html",
  styleUrls: ["./gallery-section-list.component.css"],
})
export class GallerySectionListComponent {
  galleryList: Array<any> = [];
  constructor(private galleryService: GalleryService) {
    this.getAllGalleryList()  
  }

  getAllGalleryList() {
    this.galleryService.getAllGallery().subscribe({
      next: (res) => {
        console.log("this is gallery lsit ", res);
      },
      error: (error) => {
        console.log("this is error ", error);
      },
    });
  }

  deleteGallerySection(){
    // delete code here
  }
}
