import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private router: Router,
    private http: HttpClient
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

    // Subscribe to pincode changes
    this.candidateForm.get('pincode')?.valueChanges.subscribe((value: string) => {
      if (value.length === 6) { // Assuming pincode length is 6
        this.getPincodeDetails(value);
      }
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
      alert("Please fill out the details correctly.");
    }
  }

  // Function to fetch pincode details from API
  getPincodeDetails(pincode: string): void {
    this.http.get(`https://api.postalpincode.in/pincode/${pincode}`).subscribe((response: any) => {
      if (response && response.length > 0 && response[0]?.Status === 'Success') {
        const data = response[0]?.PostOffice[0];
        this.candidateForm.patchValue({
          state: data?.State,
          city: data?.District
        });
      } else {
        console.error('Invalid pincode or API response.');
      }
    }, (error) => {
      console.error('Error fetching pincode details:', error);
    });
  }
}
