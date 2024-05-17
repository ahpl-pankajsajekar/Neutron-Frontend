import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  activeItem: number | null = null;

  showAnalytics:any;

  pdfContent: any; // PDF content in base64 format
  pdfUrl: any;

  constructor(private fb: FormBuilder,
    private toastrService: ToastrService,
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
      this.selfemployementData = false  // as per tab change data become hide 
    }
  }


  isPanVerified: boolean = false;
  isAadharVerified: boolean = false;
  isAccreditationVerified: boolean = false;
  isCurrentBankStatementVerified: boolean = false;    // Current_Bank_Statement_image
  isEstablishmentCertificateVerified :boolean =false;
  isAuthorityLetterVerfied :boolean =false;
  isPartnershipAgreementVerfied :boolean =false;
  
  // panVerified: boolean = false;
  // panVerification2: boolean = false;
  // accreditationVerified: boolean = false;
  // tdsVerified: boolean = false;    // Current_Bank_Statement_image
  // ownershipVerified: boolean = false;  // Shop_Establishment_Certificate_image
  // registrationVerified: boolean = false; // Authority_Letter_image

  initForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required], 
      isPanVerified: [this.isPanVerified], 
      isAadharVerified: [this.isAadharVerified,], 
      isAccreditationVerified: [this.isAccreditationVerified], 
      isCurrentBankStatementVerified: [this.isCurrentBankStatementVerified], 
      isEstablishmentCertificateVerified:[this.isEstablishmentCertificateVerified],
      isAuthorityLetterVerfied:[this.isAuthorityLetterVerfied],
      isPartnershipAgreementVerfied:[this.isPartnershipAgreementVerfied],
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
          
          if(this.selfemployementData?.documentVerifiedStatusByLegal){
          this.isPanVerified = this.selfemployementData?.documentVerifiedStatusByLegal.isPanVerified
          this.isAadharVerified = this.selfemployementData?.documentVerifiedStatusByLegal.isAadharVerified
          this.isAccreditationVerified = this.selfemployementData?.documentVerifiedStatusByLegal.isAccreditationVerified
          this.isCurrentBankStatementVerified = this.selfemployementData?.documentVerifiedStatusByLegal.isCurrentBankStatementVerified
          this.isEstablishmentCertificateVerified = this.selfemployementData?.documentVerifiedStatusByLegal.isEstablishmentCertificateVerified
          this.isAuthorityLetterVerfied = this.selfemployementData?.documentVerifiedStatusByLegal.isAuthorityLetterVerfied
          this.isPartnershipAgreementVerfied = this.selfemployementData?.documentVerifiedStatusByLegal.isPartnershipAgreementVerfied
        }
          // add in remark
          this.updateRemark();
        },
        (err: any) => {
          console.warn(err)
        })
  }

  onVerificationChange(verificationType: string, isVerified: any): void {
    console.log(isVerified)
    switch (verificationType) {
      case 'pan':
        this.isPanVerified = isVerified;
        break;
      case 'aadhar':
        this.isAadharVerified = isVerified;
        break;
      case 'accreditation':
        this.isAccreditationVerified = isVerified;
        break;
      case 'tds':
        this.isCurrentBankStatementVerified = isVerified;
        break;
      case 'ownership':
        this.isEstablishmentCertificateVerified = isVerified;
        break;
      case 'registration':
        this.isAuthorityLetterVerfied = isVerified;
        break;
    }
    
    // remark list update everytime
    this.updateRemark();

    // if (!isVerified) {
      // this.updateRemark();
    // } 
    // else {
    //   this.remark = ''; // Reset remark if verification passed
    // }
  }
  
  updateRemark(): void {
    let unverifiedFields: string[] = [];
    if (!this.isPanVerified) {
      unverifiedFields.push('PAN');
    }
    if (!this.isAadharVerified) {
      unverifiedFields.push('Aadhar');
    }
    if (!this.isAccreditationVerified) {
      unverifiedFields.push('Accreditation');
    }
    if (!this.isCurrentBankStatementVerified) {
      unverifiedFields.push('Cancelled Cheque/ Current Bank Statement');
    }
    if (!this.isEstablishmentCertificateVerified) {
      unverifiedFields.push('Shop Establishment Certificate/GST Certificate/Clinical Establishment Certificate');
    }
    if (!this.isAuthorityLetterVerfied) {
      unverifiedFields.push('Signing Authority');
    }
    if (unverifiedFields.length > 0) {
    this.remark = `Verification failed for ${unverifiedFields.join(', ')}.`;
    }
    else if(unverifiedFields.length == 0){
      this.remark = ''
    }
  }


  areAllCheckboxesVerified(): boolean {
    return (
      this.isPanVerified &&
      this.isAadharVerified &&
      this.isAccreditationVerified &&
      this.isCurrentBankStatementVerified &&
      this.isEstablishmentCertificateVerified &&
      this.isAuthorityLetterVerfied
    );
  }

  unverifiedCheckboxValue: string = 'not-verify'; // Default value



  id : any;
  remark: string = 'not-verify';
  verification(value:string){
    const url = '/selfemp/verification/legal/'
    const getid = this.form.get('id')?.value || this.id
    const body = {"id": getid, "DCVerificationStatusByLegal": value,  "verificationRemarkByLegal": this.remark,
    "documentVerifiedStatusByLegal": {"isPanVerified":  this.isPanVerified, "isAadharVerified": this.isAadharVerified, "isAccreditationVerified": this.isAccreditationVerified,
     "isCurrentBankStatementVerified": this.isCurrentBankStatementVerified ,"isEstablishmentCertificateVerified": this.isEstablishmentCertificateVerified, "isAuthorityLetterVerfied": this.isAuthorityLetterVerfied, 
     "isPartnershipAgreementVerfied": this.isPartnershipAgreementVerfied } }
    console.log(body)
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
        if(value=='verify'){
          // alert("Thank you, Your DC verified successful");
          this.toastrService.success('Thank you, Your DC verified successful', 'Successful', {
            closeButton: true,
          });
        }
        else{
          this.toastrService.info('Issue in Document', 'Successful', {
            closeButton: true,
          });
        }
        // window.location.reload();
        this.loadData();
        this.selfemployementData = false
      },
      (error:any)=>{},
    )
  }

  loadData(){
    const url = '/selfemp/select/legal/';
    this.commonService.getMethod(url).subscribe(
      (res: any) => {
        console.log(res);
        this.providerNames = res.selectDropdown   // not used
        this.showAnalytics = res.networkAnalyticsData
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // check status online in docusign
  checkStatus(id:string){
    const url = '/docusignAgreement/envelope/checkstatus/'
    const params = {'id': id}
    console.log(params)
    this.commonService.getMethodWithParams(url, params).subscribe(
      (res:any)=>{
        console.log(res);
        const temp = "Envelope Status: " + res.data['status'] + "\nEnvelope ID: "+ res.data['envelopeId']
        // alert("Envelope Status: " + res.data['status'])
        this.toastrService.success('Envelope Status: ' + res.data['status'], 'Successful', {
          closeButton: true,
          timeOut: 5000,
        });
        this.loadData()
      },
      (error:any)=>{
        console.log(error);
      },
    )
  }

  // send for docusign
  sendDocuSign(id:string){
    const url = '/docusignAgreement/sent/'
    const body = {'id': id}
    this.toastrService.success('Initializing Documents for DocuSign.', 'Successful', {
      closeButton: true,
    });
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
        // alert("Document has been sent Successfully.");
        this.toastrService.success('Document has been sent Successfully.', 'Successful', {
          closeButton: true,
        });
      },
      (error:any)=>{
        console.log(error);
      },
    )
  }

  // download and save document
  viewDocument(id:string){
    const url = '/docusignAgreement/envelope/document/saveAndview/'
    const params = {'id': id}
    console.log(params)
    this.commonService.getMethodWithParams(url, params).subscribe(
      (res:any)=>{
        console.log(res);
        this.pdfContent = res['pdf_content']
        this.openPDFInNewTab(res['DC_name'])
      },
      (error:any)=>{
        console.log(error);
      },
    )
  }
  

  openPDFInNewTab(dc_name:string) {
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
    a.download = dc_name+'.pdf'; // Optional: Set the filename for download
    document.body.appendChild(a);

    // Trigger click event
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(this.pdfUrl);
  }

}
