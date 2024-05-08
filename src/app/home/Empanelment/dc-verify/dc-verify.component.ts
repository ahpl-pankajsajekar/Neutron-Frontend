import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-dc-verify',
  templateUrl: './dc-verify.component.html',
  styleUrls: ['./dc-verify.component.scss']
})
export class DcVerifyComponent {
  form: FormGroup = new FormGroup({}); 
  providerNames: any[] = []; // Initialize providerNames as an empty array
  providerIDs: any[] = []; // Initialize providerIDs as an empty array
  isLinear = true; // Initialize isLinear property

  showAnalytics:any;

  pdfContent: any; // PDF content in base64 format
  pdfUrl: any;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { 
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  
  showDetails: number | null = null;
  toggleDetails(boxNumber: number) {
    if (this.showDetails === boxNumber) {
      this.showDetails = null; // Hide details if already open
    } else {
      this.showDetails = boxNumber; // Show details for the clicked box
    }
  }

  isPanVerify: boolean = false;
  isAadharVerify: boolean = false;
  isAccredationVerify: boolean = false;
  isTDSVerify: boolean = false;
  initForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required], 
      isPanVerify: [this.isPanVerify], 
      isAadharVerify: [this.isAadharVerify], 
      isAccredationVerify: [this.isAccredationVerify], 
      isTDSVerify: [this.isTDSVerify], 
    });
  }

  selfemployementData : any;
  onSearch(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      const id = this.form.get('id')?.value
      this.sendRequestForSearch(id)
    } 
    else {
      alert("Please Select DC.");
    }
  }

  sendRequestForSearch(id:string){
    const url = "/empanelment/details/legal/" 
      this.id = id // store for send id at verification
      this.commonService.postMethod(url, {"id": id}).subscribe(
        (res: any) => {
          console.log("res", res)
          this.selfemployementData = res.data
        },
        (err: any) => {
          console.warn(err)
        })
  }

  id : any;
  remark: string = '';
  verification(value:string){
    const url = '/selfemp/verification/legal/'
    const getid = this.form.get('id')?.value || this.id
    const body = {"DCVerificationStatusByLegal": value, "id": getid,  "verificationRemark": this.remark,
     "isPanVerify":  this.isPanVerify, "isAadharVerify": this.isAadharVerify, "isAccredationVerify": this.isAccredationVerify,
     "isTDSVerify": this.isTDSVerify }
    console.log(body)
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
        if(value=='verify'){
          alert("Thank you, Your DC verified successful");
          this.router.navigateByUrl("/empanelment/dc-docusign")
        }
        else{
          alert("Issue in Document")
        }
        window.location.reload();
      },
      (error:any)=>{},
    )
  }

  loadData(){
    const url = '/selfemp/select/legal/';
    this.commonService.getMethod(url).subscribe(
      (res: any) => {
        console.log(res);
        // Iterate over the records
        this.providerNames = res.selectDropdown
        this.showAnalytics = res.networkAnalyticsData
        // this.providerNames = res.map((item: any) => ({
        //   itemValue: item.id,
        //   itemName: `${item.providerName}`,
        // }));
        console.log(this.providerNames);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  checkStatus(id:string){
    const url = '/docusignAgreement/envelope/checkstatus/'
    const params = {'id': id}
    console.log(params)
    this.commonService.getMethodWithParams(url, params).subscribe(
      (res:any)=>{
        console.log(res);
        const temp = "Envelope Status: " + res.data['status'] + "\nEnvelope ID: "+ res.data['envelopeId']
        alert("Envelope Status: " + res.data['status'])
      },
      (error:any)=>{
        console.log(error);
      },
    )
  }

  viewDocument(id:string){
    const url = '/docusignAgreement/envelope/document/view/'
    const params = {'id': id}
    console.log(params)
    this.commonService.getMethodWithParams(url, params).subscribe(
      (res:any)=>{
        console.log(res);
        this.pdfContent = res
        this.openPDFInNewTab()
      },
      (error:any)=>{
        console.log(error);
      },
    )
  }
  

  openPDFInNewTab() {
    const binaryData = atob(this.pdfContent);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const byteArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create Blob URL
    this.pdfUrl = URL.createObjectURL(blob);

    // Create a temporary <a> element
    const a = document.createElement('a');
    a.href = this.pdfUrl;
    a.download = 'document.pdf'; // Optional: Set the filename for download
    document.body.appendChild(a);

    // Trigger click event
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(this.pdfUrl);
  }

}
