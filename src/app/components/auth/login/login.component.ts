import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log("this is res ", res);
        if (res) {
          localStorage.setItem("mahaconUser", JSON.stringify(res));
          this.route.navigate(["/admin/event"]);
        }
      },
      error: (error) => {
        console.log("this is error", error);
      },
    });
  }
}
