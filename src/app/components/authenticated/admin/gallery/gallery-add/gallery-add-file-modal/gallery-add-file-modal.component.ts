import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-gallery-add-file-modal",
  templateUrl: "./gallery-add-file-modal.component.html",
  styleUrls: ["./gallery-add-file-modal.component.css"],
})
export class GalleryAddFileModalComponent {
  modalForm!: FormGroup;
  isTypePhoto: boolean = false;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.modalForm = this.fb.group({
      type: ["PHOTO"],
      url: [""],
      thumbnail_url: null,
    });
  }

  onTypeChange() {}

  returnCommonPhotoGroup() {
    return this.fb.group({
      url: [""],
      type: ["PHOTO"],
      thumbnail_url: null,
    });
  }

  returnCommonVideoGroup() {
    return this.fb.group({
      url: [""],
      type: ["PHOTO"],
      thumbnail_url: null,
    });
  }
}
