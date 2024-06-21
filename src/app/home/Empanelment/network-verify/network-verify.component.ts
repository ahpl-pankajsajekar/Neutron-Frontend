import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-network-verify',
  templateUrl: './network-verify.component.html',
  styleUrls: ['./network-verify.component.scss']
})
export class NetworkVerifyComponent {
  form: FormGroup = new FormGroup({}); // Declare form as FormGroup
  providerNames: any[] = []; // Initialize providerNames as an empty array
  providerIDs: any[] = []; // Initialize providerIDs as an empty array
  isLinear = true; // Initialize isLinear property
  showAnalytics:any
  zoomScales: { [key: string]: number } = {};

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  isPanVerified: boolean = false;
  isAadharVerified: boolean = false;
  isAccreditationVerified: boolean = false;
  isCurrentBankStatementVerified: boolean = false;    // Current_Bank_Statement_image
  isEstablishmentCertificateVerified :boolean =false;
  isAuthorityLetterVerfied :boolean =false;
  isPartnershipAgreementVerfied :boolean =false;

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
    const url = "/empanelment/" 
    this.id = id
    this.commonService.postMethod(url, {"id": id}).subscribe(
        (res: any) => {
          console.log("res", res)
          this.selfemployementData = res.data
          if(this.selfemployementData?.documentVerifiedStatusByNetwork){
          this.isPanVerified = this.selfemployementData?.documentVerifiedStatusByNetwork.isPanVerified
          this.isAadharVerified = this.selfemployementData?.documentVerifiedStatusByNetwork.isAadharVerified
          this.isAccreditationVerified = this.selfemployementData?.documentVerifiedStatusByNetwork.isAccreditationVerified
          this.isCurrentBankStatementVerified = this.selfemployementData?.documentVerifiedStatusByNetwork.isCurrentBankStatementVerified
          this.isEstablishmentCertificateVerified = this.selfemployementData?.documentVerifiedStatusByNetwork.isEstablishmentCertificateVerified
          this.isAuthorityLetterVerfied = this.selfemployementData?.documentVerifiedStatusByNetwork.isAuthorityLetterVerfied
          this.isPartnershipAgreementVerfied = this.selfemployementData?.documentVerifiedStatusByNetwork.isPartnershipAgreementVerfied
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
  

  // Apply logic here as per firmType
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

  remark: string = 'not-verify';
  id: any;
  verificationSubmit(value:string){
    console.log("Form submitted!");
    const url = '/selfemp/verification/'
    const getid = this.form.get('id')?.value || this.id
    const body = {"id": getid, "DCVerificationStatus": value,  "verificationRemarkByNetwork": this.remark,
    "documentVerifiedStatusByNetwork": {"isPanVerified":  this.isPanVerified, "isAadharVerified": this.isAadharVerified, "isAccreditationVerified": this.isAccreditationVerified,
     "isCurrentBankStatementVerified": this.isCurrentBankStatementVerified ,"isEstablishmentCertificateVerified": this.isEstablishmentCertificateVerified, "isAuthorityLetterVerfied": this.isAuthorityLetterVerfied, 
     "isPartnershipAgreementVerfied": this.isPartnershipAgreementVerfied } }
    console.log(body)
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
        if(value=='verify'){
          this.toastrService.success('Thank you, Document verified by Network Team', 'Successful', {
            closeButton: true,
          });
        }
        else{
          this.toastrService.info('Issue in Document', 'Alert', {
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
    const url = '/selfemp/select/';
    this.commonService.getMethod(url).subscribe(
      (res: any) => {
        console.log(res);
        this.showAnalytics = res.networkAnalyticsData
        this.providerNames = res.selectDropdown
        console.log(this.providerNames);
      },
      (error: any) => {
        console.error(error);
      }
    );
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

  zoomIn(imageType: string) {
    this.zoomScales[imageType] = (this.zoomScales[imageType] || 1) + 0.1;
    this.updateZoom(imageType);
  }

  zoomOut(imageType: string) {
    this.zoomScales[imageType] = (this.zoomScales[imageType] || 1) - 0.1;
    this.updateZoom(imageType);
  }

  updateZoom(imageType: string) {
    const image = document.querySelector(`.doc-image-${imageType}`) as HTMLElement;
    const scale = this.zoomScales[imageType] || 1;
    image.style.transform = `scale(${scale})`;
  }


}

