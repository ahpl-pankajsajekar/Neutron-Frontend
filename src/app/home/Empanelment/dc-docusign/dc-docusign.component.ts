import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-dc-docusign',
  templateUrl: './dc-docusign.component.html',
  styleUrls: ['./dc-docusign.component.scss']
})
export class DcDocusignComponent {

  @ViewChild('mySelect') mySelectElement!: ElementRef;
  
  formData = new FormData()
  selectedFile: File | null = null;
  fileExtension: string = '';

  constructor(private commonService : CommonService,
    private  formBuilder: FormBuilder,
  ) { }
  
  
  ngOnInit(){
    this.loadSelectData()
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  onDrop(event: any) {
    event.preventDefault();
    this.selectedFile = event.dataTransfer.files[0];
    console.log(this.selectedFile)
    this.fileExtension = this.selectedFile?.name.split('.')[1] || '';
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  submit() {
    const selectedIDValue = this.mySelectElement.nativeElement.value;
    console.log(selectedIDValue)
    if(this.selectedFile && selectedIDValue){
      console.log(this.selectedFile)
      this.formData.append("agreement_file", this.selectedFile)
      this.formData.append("id", selectedIDValue)
      const url = '/docusignAgreement/'
      alert("Document Submited.");
      this.commonService.postMethod(url, this.formData).subscribe(
        (res:any) => {
          alert("Document Sent to DC");
          console.log(res)
        },
        (error:any) => {
          alert(error);
          console.log(error)
        }
      )
    }
  }

  VerifiedSelfEmpanelmentList: any;
  loadSelectData(){
    const url = '/selfemp/select/docusign/';
    this.commonService.getMethod(url).subscribe(
      (res: any) => {
        this.VerifiedSelfEmpanelmentList = res.selectDropdown
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
