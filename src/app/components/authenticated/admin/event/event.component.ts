import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { EventService } from "src/app/services/event/event.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent {
  eventForm!: FormGroup;
  eventData: any;
  uploadedImageArray: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthenticationService,
    private eventService: EventService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    console.log("thsi is token ", this.authService.userToken());
    this.createEventForm();
  }

  get control() {
    return this.eventForm.controls;
  }

  get bannersArr() {
    return this.eventForm.get("banners") as FormArray;
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      description: ["", Validators.required],
      whyVietnam: ["", Validators.required],
      streamLink: ["", Validators.required],
      streamTitle: ["", Validators.required],
      banners: this.fb.array([]),
    });

    this.getEventDetails();
  }

  getEventDetails() {
    this.eventService.getEvent().subscribe({
      next: (res) => {
        console.log("thsi is res of get event ", res);
        if (res) {
          this.eventData = res.data;
          this.control["description"].patchValue(this.eventData.description);
          this.control["whyVietnam"].patchValue(this.eventData.whyVietnam);
          this.control["streamTitle"].patchValue(this.eventData.streamTitle);
          this.control["streamLink"].patchValue(this.eventData.streamLink);

          if (this.eventData.banners.length > 0) {
            for (
              let index = 0;
              index < this.eventData.banners.length;
              index++
            ) {
              const bannerUrl = this.eventData.banners[index];
              this.bannersArr.push(new FormControl(bannerUrl));
              const [url, fileName] = bannerUrl.split("com/");
              this.uploadedImageArray.push(fileName);
            }
          }
        }
      },
      error: (error) => {
        console.log("thsi is error get event ", error);
      },
    });
  }

  updateEvent() {
    if (this.eventForm.valid) {
      let formData = this.eventForm.getRawValue();

      formData["itineraries"] = this.eventData.itineraries;
      formData["venues"] = this.eventData.venues;

      console.log("this is final res ", formData);

      this.eventService.updateEvent(formData, this.eventData.id).subscribe({
        next: (res) => {
          console.log("this is res event update ", res);
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
      this.eventForm.markAllAsTouched();
      Swal.fire({
        icon: "info",
        title: `Invalid Form`,
        timer: 5000,
        text: "Please fill all the mandatory fields",
      });
    }
  }

  onFileSelect(event: any) {
    let files: FileList = event.target.files;
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
                this.bannersArr.push(new FormControl(filePath));
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

  removeFile(index: number) {
    this.bannersArr.removeAt(index);
    this.uploadedImageArray.splice(index, 1);
  }
}
