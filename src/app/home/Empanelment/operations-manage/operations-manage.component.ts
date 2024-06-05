import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-operations-manage',
  templateUrl: './operations-manage.component.html',
  styleUrls: ['./operations-manage.component.scss']
})
export class OperationsManageComponent {

  DCSerachForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
     private commonService: CommonService){}
  
  ngOnInit():void{
    this.DCSerachForm = this.formBuilder.group({
      q : ['', [Validators.required]],
    });
  }

  dcSearchDisplayResponseData = []
  isSubmited = false
  onSubmit(){
    const qValue = this.DCSerachForm.get('q')?.value;
    if (!qValue) {
      return 
    }
    this.isSubmited = true
    const url = '/manage/DCsearch/'
    this.commonService.postMethod(url, this.DCSerachForm.value).subscribe({
      next: (res:any) => {
        console.log(res);
        if(!(res['data'] === undefined || res === null || Object.keys(res['data']).length === 0) ){
          this.dcSearchDisplayResponseData = res.data
        }
        else{
          this.dcSearchDisplayResponseData = []
        }
      },
      error: (error:any) => {
        console.warn(error)
      }})
    }

}
