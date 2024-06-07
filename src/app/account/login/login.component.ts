import { Component, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.InitFrom()
  }

  InitFrom() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.loginForm.value)
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true
    this.accountService.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
        setTimeout(() => {
          this.toastrService.success('Login Successfully ', 'Successful', {
            closeButton: true,
          });
        },
        1000);
      },
      error: (error:any) => {
        this.loading = false;
        // alert(error.error.non_field_errors[0]);
        this.toastrService.info(error.error.non_field_errors[0], 'Incorrect', {
          closeButton: true,
        });
      }
    })
  }
}
