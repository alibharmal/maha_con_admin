import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GalleryAddFileModalComponent } from "./gallery-add-file-modal/gallery-add-file-modal.component";
import { GalleryService } from "src/app/services/gallery/gallery.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent {
  galleryForm!: FormGroup;
  fileList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private modalService: NgbModal,
    private galleryService: GalleryService
  ) {}
  ngOnInit() {
    this.createGalleryForm();
  }
  createGalleryForm() {
    this.galleryForm = this.fb.group({
      title: ["", Validators.required],
      media: this.fb.array([]),
    });
  }

  get control() {
    return this.galleryForm.controls;
  }

  get mediaArr() {
    return this.galleryForm.get("media") as FormArray;
  }

  returnCommonGroup(data: any) {
    return this.fb.group({
      type: [data.type],
      url: [data.url],
      thumbnail_url: [data.thumbnail_url],
    });
  }

  openAddFileModal() {
    const modalRef = this.modalService.open(GalleryAddFileModalComponent, {
      size: "xl",
      scrollable: true,
      backdrop: "static",
      keyboard: false,
      centered: true,
    });

    // modalRef.componentInstance.rfqId = rfqId;
    // modalRef.componentInstance.quoteId = quoteId;

    modalRef.result.then((res: any) => {
      console.log("this is res ", res);
      if (res != "cancel") {
        this.mediaArr.push(this.returnCommonGroup(res));
      }
    });
  }

  createGallery() {
    this.galleryService.createGallery(this.galleryForm.value).subscribe({
      next: (res) => {
        console.log("thsi is res ", res);
      },
      error: (error) => {
        console.log("this is error ", error);
      },
    });
  }
}
