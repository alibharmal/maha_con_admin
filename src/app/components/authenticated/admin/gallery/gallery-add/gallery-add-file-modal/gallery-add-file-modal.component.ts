import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "src/app/services/event/event.service";

@Component({
  selector: "app-gallery-add-file-modal",
  templateUrl: "./gallery-add-file-modal.component.html",
  styleUrls: ["./gallery-add-file-modal.component.css"],
})
export class GalleryAddFileModalComponent {
  modalForm!: FormGroup;
  isTypePhoto: boolean = true;
  uploadedImageArray: Array<any> = [];
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.modalForm = this.fb.group({
      type: ["PHOTO", Validators.required],
      url: ["", Validators.required],
      thumbnail_url: null,
    });
  }

  get control() {
    return this.modalForm.controls;
  }

  onTypeChange() {
    let fileType = this.control["type"].value;
    console.log("thsi is file type value ", fileType);
    if (fileType == "PHOTO") {
      this.isTypePhoto = true;
      this.uploadedImageArray = [];
      this.control["url"].patchValue("");
      this.control["thumbnail_url"].patchValue(null);
    } else {
      this.isTypePhoto = false;
      this.uploadedImageArray = [];
      this.control["url"].patchValue("");
      this.control["thumbnail_url"].patchValue(null);
    }
  }

  onFileSelect(event: any) {
    let files: FileList = event.target.files;
    this.uploadedImageArray = [];
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      console.log("thsi is file ", file);

      let getUrlData = {
        content_type: file.type,
        file_name: file.name,
      };
      console.log("this is get url data ", getUrlData);
      this.eventService.getFileUrl(getUrlData).subscribe({
        next: (res: any) => {
          console.log("this is image url res ", res);
          if (res.data) {
            let file: File = files[index];
            let url: string = res.data.url;
            this.eventService.uploadSelectedFileWithUrl(url, file).subscribe({
              next: (res) => {
                console.log("this is file upload res ", res);
                let [filePath, rest] = url.split("?");
                // this.bannersArr.push(new FormControl(filePath));
                this.control["url"].patchValue(filePath);
                this.uploadedImageArray.push(file.name);
              },
              error: (error) => {
                console.log("this is erorr file upload ", error);
              },
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("thsi is error ", error);
        },
      });
    }
  }

  onThumbnailSelect(event: any) {
    let files: FileList = event.target.files;
    this.uploadedImageArray = [];
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      console.log("thsi is file ", file);

      let getUrlData = {
        content_type: file.type,
        file_name: file.name,
      };
      console.log("this is get url data ", getUrlData);
      this.eventService.getFileUrl(getUrlData).subscribe({
        next: (res: any) => {
          console.log("this is image url res ", res);
          if (res.data) {
            let file: File = files[index];
            let url: string = res.data.url;
            this.eventService.uploadSelectedFileWithUrl(url, file).subscribe({
              next: (res) => {
                console.log("this is file upload res ", res);
                let [filePath, rest] = url.split("?");
                // this.bannersArr.push(new FormControl(filePath));
                this.control["thumbnail_url"].patchValue(filePath);
              },
              error: (error) => {
                console.log("this is erorr file upload ", error);
              },
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("thsi is error ", error);
        },
      });
    }
  }

  removeFile(index: number) {
    // this.bannersArr.removeAt(index);
    this.uploadedImageArray.splice(index, 1);
  }

  onSubmit() {
    if (this.modalForm.valid) {
      let data = {
        formValue: this.modalForm.value,
        uploadedImageArray: this.uploadedImageArray,
      };
      this.activeModal.close(data);
    } else {
      console.log("select at least one file ");
    }
  }
}
