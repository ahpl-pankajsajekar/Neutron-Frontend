import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {}

  rolelist = [
    {textValue: 1, textName: "Network"},
    {textValue: 2, textName: "legal"},
    {textValue: 3, textName: "IT"},
  ]
  zoneList = [
    {textValue: 'NorthZone', textName: "NorthZone"},
    {textValue: 'SouthZone', textName: "SouthZone"},
    {textValue: "EastZone", textName: "EastZone"},
    {textValue: "WestZone", textName: "WestZone"},
    {textValue: "All", textName: "All"},
  ]

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required], 
      zone: ['', Validators.required], 
      password: ['', Validators.required],
      password2: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.loading = true;
      this.accountService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error => {
            this.loading = false;
          }
        );
    }
    else{
      alert("please fill up valid form");
    }
  }

}
