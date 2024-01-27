import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "src/app/services/event/event.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent {
  notificationForm!: FormGroup;
  count: number = 0;
  constructor(private fb: FormBuilder, private eventService: EventService) {}
  ngOnInit() {
    this.notificationForm = this.fb.group({
      title: ["", Validators.required],
      message: ["", Validators.required],
    });

    this.control["message"].valueChanges.subscribe((res) => {
      console.log();
      this.count = res.length;
    });
  }

  get control() {
    return this.notificationForm.controls;
  }

  submit() {
    if (this.notificationForm.valid) {
      this.eventService
        .sendNotification(this.notificationForm.value)
        .subscribe({
          next: (res) => {
            console.log("thsi is send notification res ", res);
            Swal.fire({
              icon: "success",
              text: res.message,
              timer: 5000,
              title: "Success",
            });

            this.control["title"].setValue("");
            this.control["message"].setValue("");
          },
          error: (error) => {
            console.log(" this is error", error);
          },
        });
    } else {
      this.notificationForm.markAllAsTouched();
    }
  }
}
