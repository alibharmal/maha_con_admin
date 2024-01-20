import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "src/app/services/event/event.service";
import { PopupService } from "src/app/services/popup/popup.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"],
})
export class PopUpComponent {
  popUpForm!: FormGroup;
  isEditMode: boolean = false;
  selectedPopUpImage: string = "";
  existingPopUpData: any;
  constructor(
    private fb: FormBuilder,
    private popupService: PopupService,
    private eventService: EventService
  ) {}
  ngOnInit() {
    this.createForm();
    this.getPopUp();
  }
  get control() {
    return this.popUpForm.controls;
  }
  createForm() {
    this.popUpForm = this.fb.group({
      status: [false, Validators.required],
      link: ["", Validators.required],
      image_url: ["", Validators.required],
    });
  }

  getPopUp() {
    this.popupService.getPopUp().subscribe({
      next: (res) => {
        console.log("this is res ", res);
        if (res.data.id) {
          this.isEditMode = true;
          this.existingPopUpData = res.data;
          this.control["status"].patchValue(this.existingPopUpData.status);
          this.control["link"].patchValue(this.existingPopUpData.link);
          this.control["image_url"].patchValue(
            this.existingPopUpData.image_url
          );
          this.selectedPopUpImage = this.existingPopUpData.image_url;
        } else {
          this.isEditMode = false;
        }
      },
      error: (error) => {
        console.log("this is error ", error);
      },
    });
  }

  // submit() {
  // this.isEditMode ? this.updatePopUp() : this.createPopUp();
  // }

  // createPopUp() {
  //   if (this.popUpForm.valid) {
  //     this.popupService.createPopUp(this.popUpForm.value).subscribe({
  //       next: (res) => {
  //         console.log("thsi is res pop up");
  //       },
  //       error: (error) => {
  //         console.log("thsi iserror ", error);
  //       },
  //     });
  //   }
  // }

  updatePopUp() {
    if (this.popUpForm.valid) {
      this.popupService
        .updatePopUp(this.popUpForm.value, this.existingPopUpData.id)
        .subscribe({
          next: (res) => {
            console.log("thsi is res pop up", res);
            if (res) {
              Swal.fire({
                icon: "success",
                title: `Success`,
                timer: 5000,
                text: res.message,
              });
            }
          },
          error: (error) => {
            console.log("this is error", error);
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

  onPopUpSelect(event: any) {
    let files: FileList = event.target.files;
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      console.log("thsi is file ", file);

      // to get aws url for file
      let getUrlData = {
        content_type: file.type,
        file_name: file.name,
      };

      // to read selected file and show preview
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPopUpImage = reader.result as string;
      };
      reader.readAsDataURL(file);
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
                this.control["image_url"].patchValue(filePath);
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

  clearForm(){
    this.selectedPopUpImage = ''
    this.popUpForm.reset();
  }
}
