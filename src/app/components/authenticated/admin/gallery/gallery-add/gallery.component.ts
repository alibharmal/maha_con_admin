import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GalleryAddFileModalComponent } from "./gallery-add-file-modal/gallery-add-file-modal.component";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent {
  galleryForm!: FormGroup;
  fileList: Array<any> = ['asfd', '13231']
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit() {}
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

  openAddFileModal() {
    const modalRef = this.modalService.open(GalleryAddFileModalComponent, {
      size: "lg",
      scrollable: true,
      backdrop: "static",
      keyboard: false,
      centered: true,
    });

    // modalRef.componentInstance.rfqId = rfqId;
    // modalRef.componentInstance.quoteId = quoteId;

    modalRef.result.then((res: any) => {
      console.log("this is res ", res);
    });
  }
}
