import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GalleryAddFileModalComponent } from "./gallery-add-file-modal/gallery-add-file-modal.component";
import { GalleryService } from "src/app/services/gallery/gallery.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent {
  galleryForm!: FormGroup;
  fileList: Array<any> = [];
  isEdit: boolean = false;
  galleryId: any;
  galleryData: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private galleryService: GalleryService
  ) {}
  ngOnInit() {
    this.createGalleryForm();

    this.galleryId = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("thsi is galleyr id ", this.galleryId);

    if (this.galleryId) {
      this.isEdit = true;
      this.getGalleryDetailsById();
    }
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
        this.mediaArr.push(this.returnCommonGroup(res.formValue));
        for (let index = 0; index < res?.uploadedImageArray.length; index++) {
          const fileName = res.uploadedImageArray[index];
          console.log("thsi is file name ", fileName);

          this.fileList.push(fileName);
        }
      }
    });
  }

  submit() {
    this.isEdit ? this.updateGallery() : this.createGallery();
  }

  createGallery() {
    if (this.galleryForm.valid) {
      this.galleryService.createGallery(this.galleryForm.value).subscribe({
        next: (res) => {
          console.log("thsi is res ", res);
          if (res) {
            Swal.fire({
              icon: "success",
              title: `Success`,
              timer: 5000,
              text: res.message,
            });
            this.route.navigate(["/admin/gallery-list"]);
          }
        },
        error: (error) => {
          console.log("this is error ", error);
          Swal.fire({
            icon: "error",
            title: `Something Went Wrong`,
            timer: 5000,
            text: error.message,
          });
        },
      });
    } else {
      Swal.fire({
        icon: "info",
        title: `Invalid Form`,
        timer: 5000,
        text: "Please fill all the mandatory fields",
      });
    }
  }

  updateGallery() {
    if (this.galleryForm.valid) {
      this.galleryService
        .updateGallery(this.galleryForm.value, this.galleryId)
        .subscribe({
          next: (res) => {
            console.log("thsi is res ", res);
            if (res) {
              Swal.fire({
                icon: "success",
                title: `Success`,
                timer: 5000,
                text: res.message,
              });
              this.route.navigate(["/admin/gallery-list"]);
            }
          },
          error: (error) => {
            console.log("thsi is error ", error);
            Swal.fire({
              icon: "error",
              title: `Something Went Wrong`,
              timer: 5000,
              text: error.message,
            });
          },
        });
    } else {
      Swal.fire({
        icon: "info",
        title: `Invalid Form`,
        timer: 5000,
        text: "Please fill all the mandatory fields",
      });
    }
  }

  removeImage(index: number) {
    this.mediaArr.removeAt(index);
    this.fileList.splice(index, 1);
  }

  getGalleryDetailsById() {
    this.galleryService.getGalleryById(this.galleryId).subscribe({
      next: (res) => {
        console.log("thsi is get by id res ", res.data);
        if (res.data) {
          this.galleryData = res.data;
          this.control["title"].patchValue(this.galleryData.title);

          if (this.galleryData.media.length > 0) {
            for (
              let index = 0;
              index < this.galleryData.media.length;
              index++
            ) {
              let media = this.galleryData.media[index];
              const [url, fileName] = media.url.split("com/");
              this.fileList.push(fileName);
              this.mediaArr.push(this.returnCommonGroup(media));
            }
          }
        }
      },
      error: (error) => {
        console.log("this is error ", error);
      },
    });
  }
}
