import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PopupService } from "src/app/services/popup/popup.service";

@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"],
})
export class PopUpComponent {
  popUpForm!: FormGroup;
  isEditMode: boolean = false;
  imageUrl: string = "";
  existingPopUpData: any;
  constructor(private fb: FormBuilder, private popupService: PopupService) {}
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
          this.imageUrl = this.existingPopUpData.image_url;
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
          },
          error: (error) => {
            console.log("this is error", error);
          },
        });
    }
  }
}
