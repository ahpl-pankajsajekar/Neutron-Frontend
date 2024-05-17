import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  candidateForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      providerName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      contactPersonEmail: ['', [Validators.required, Validators.email]],
      contactPersonMobile: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.candidateForm.valid) {
      this.loading = true;
      this.accountService.register(this.candidateForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['../thank-you'], { relativeTo: this.route });
          },
          error => {
            this.loading = false;
          }
        );
    } else {
      alert("Please fill out the Detail correctly.");
    }
  }
}
