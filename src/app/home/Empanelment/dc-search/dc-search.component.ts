import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dc-search',
  templateUrl: './dc-search.component.html',
  styleUrls: ['./dc-search.component.scss'],
})
export class DcSearchComponent {
@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private commonService : CommonService) {
  }

  currentView: 'table' | 'card' = 'card';

  DCSerachForm = this._formBuilder.group({
    q : ['', []],
    t : [[], []],
  });

  dcSearchDisplayResponseData : any[] = [];
  isSubmit = false;
  onSubmit() {
    const qValue = this.DCSerachForm.get('q')?.value;
    const tValue = this.DCSerachForm.get('t')?.value || [];
    if (!qValue && tValue.length == 0) {
      return 
    }

    const url = '/search/'
    const param = this.DCSerachForm.value
    this.commonService.postMethod(url, param).pipe(first()).subscribe({
      next: (res:any) => {
        this.isSubmit = true;
        if(!(res['data'] === undefined || res === null || Object.keys(res['data']).length === 0) ){
          this.tempStoreSearchResult = res.data
          this.dcSearchDisplayResponseData = res.data.slice(0, this.pageSize);
        }
        else{
          this.tempStoreSearchResult = []
          this.dcSearchDisplayResponseData = []
        }
        // count totalItems for pagination and show Total $ result found. 
        this.totalItems = Number(this.tempStoreSearchResult.length)
      },
      error: (error:any) => {
        console.warn(error)
      }
    })
  }

  tempStoreSearchResult : any
  tempFilterData : any
  arrayVisitValue: string[] = [];
  // dyanamic filter
  // visitFilterChanged(event: any) {
  //   const checkedValue = event.target.value;
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     // Push checkedValue into array arrayVisitValue
  //     if (!this.arrayVisitValue.includes(checkedValue)) {
  //       this.arrayVisitValue.push(checkedValue);
  //     }
  //       this.dcSearchDisplayResponseData = this.tempStoreSearchResult.filter((item: any) => {
  //         if (Array.isArray(item['VisitFacility'])) {
  //             return item['VisitFacility'].some((facility: any) => facility === String(checkedValue));
  //         } else {
  //             return false; // or handle accordingly if VisitFacility is not an array
  //         }
  //     });
  //   }
  //   else{
  //     // remove checkedValue into array arrayVisitValue
  //     const index = this.arrayVisitValue.indexOf(checkedValue);
  //     if (index !== -1) {
  //           this.arrayVisitValue.splice(index, 1);
  //     }
  //     this.dcSearchDisplayResponseData =  this.tempStoreSearchResult
  //   }

  //   this.totalItems = Number(this.dcSearchDisplayResponseData.length)

  //   // Store applied dyanamic filter
  //   this.tempFilterData = this.dcSearchDisplayResponseData
  //   console.log(this.arrayVisitValue, this.tempFilterData)
    
  //   this.pageIndex = 0
  //   this.filterData(this.tempFilterData);
  // }
  visitFilterChanged(event: any) {
    const checkedValue = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      // Push checkedValue into arrayVisitValue
      if (!this.arrayVisitValue.includes(checkedValue)) {
        this.arrayVisitValue.push(checkedValue);
      }
    } else {
      // remove checkedValue from arrayVisitValue
      const index = this.arrayVisitValue.indexOf(checkedValue);
      if (index !== -1) {
        this.arrayVisitValue.splice(index, 1);
      }
    }
  
    // Filter data based on arrayVisitValue
    if (this.arrayVisitValue.length > 0) {
      this.tempFilterData = this.tempStoreSearchResult.filter((item: any) => {
        if (Array.isArray(item['VisitFacility'])) {
          return item['VisitFacility'].some((facility: any) => this.arrayVisitValue.includes(String(facility)));
        } else {
          return false; // or handle accordingly if VisitFacility is not an array
        }
      });
    } else {
      // If arrayVisitValue is empty, revert to original data
      this.tempFilterData = this.tempStoreSearchResult;
    }
  
    // Update display data and total items
    this.dcSearchDisplayResponseData = this.tempFilterData;
    this.totalItems = this.dcSearchDisplayResponseData.length;
  
    // Reset pagination to the first page
    this.pageIndex = 0;
  
    // Apply pagination and update displayed data
    this.filterData(this.dcSearchDisplayResponseData);
  
    console.log(this.arrayVisitValue, this.tempFilterData);
  }
  
  

  // Initialize variables for pagination
  totalItems: number = 0;
  pageSize: number = 8; // Initial page size
  pageSizeOptions: number[] = [4, 8, 12, 24]; // Options for page size
  pageIndex: number = 0; // Initial page index

  // function to handle page change event
  onPageChange(event: any) {
    console.log("onPageChange fun call")
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Filter data based on pagination settings
    const data = this.tempFilterData ? this.tempFilterData : this.tempStoreSearchResult
    console.warn(this.pageIndex , data)
    this.filterData(data);
  }

  filterData(paginationData:any) {
    // Perform filtering based on pagination settings
    this.dcSearchDisplayResponseData = paginationData.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  ngOnChange(){
    console.log(this.selectedItems)
  }

  selectedItems:any =[];

  dropdownList:any = [
    {"item_value": "100001", "item_label": "2 D Echocardiography"},
     {"item_value": "100002", "item_label": "2 D Echo With Doppler"}, 
     {"item_value": "100003", "item_label": "2 Urine Dipstick (UD)"}, 
     {"item_value": "100004", "item_label": "MSU"}, 
     {"item_value": "100005", "item_label": "3 BP Reading"}, 
     {"item_value": "100006", "item_label": "Tread Mill Test (TMT)"}, 
     {"item_value": "100007", "item_label": "Alkaline Phosphatase (ALP)"}, 
     {"item_value": "100008", "item_label": "Ultrasound - Abdomen"}, 
     {"item_value": "100009", "item_label": "ABO & Rh (Blood Group & Rh Factor)"}, 
     {"item_value": "100010", "item_label": "Eosinophil Count (AEC)"}, 
     {"item_value": "100011", "item_label": "Alpha Feto Protein"}, 
     {"item_value": "100012", "item_label": "Chest X-ray PA & lateral view"}, 
     {"item_value": "100013", "item_label": "BUN"}, 
     {"item_value": "100014", "item_label": "Anti HCV"}, 
     {"item_value": "100015", "item_label": "Bilirubin (Total)"}, 
     {"item_value": "100016", "item_label": "Bilirubin (Direct/Conjugated)"}, 
     {"item_value": "100017", "item_label": "Bilirubin (Indirect/Unconjugated)"}, 
     {"item_value": "100018", "item_label": "Serum Amylase"}, 
     {"item_value": "100019", "item_label": "Activated Partial Thromplastin Time (APTT)"}, 
     {"item_value": "100020", "item_label": "Partial Thromboplastin Time (PTT)"}, 
     {"item_value": "100021", "item_label": "Serum Albumin"}, 
     {"item_value": "100022", "item_label": "MicroAlbumin (Urine)"},
     {"item_value": "100023", "item_label": "Ultrasound - Thyroid"}, 
     {"item_value": "100024", "item_label": "Albumin Creatinine Ratio"}, 
     {"item_value": "100025", "item_label": "WBC"}, 
     {"item_value": "100026", "item_label": "Angiography"}, 
     {"item_value": "100027", "item_label": "Arthritic Questionnaire - ARQ"}, 
     {"item_value": "100028", "item_label": "Astha Bronchi Questionnaire - ABL"}, 
     {"item_value": "100029", "item_label": "At Client Cost"}, 
     {"item_value": "100030", "item_label": "Attending Physician Statement - APS"}, 
     {"item_value": "100031", "item_label": "Audiometry"}, 
     {"item_value": "100032", "item_label": "Australia Antigen - HbSAg"}, 
     {"item_value": "100033", "item_label": "Barium Meal"}, 
     {"item_value": "100034", "item_label": "Basophil Count "}, 
     {"item_value": "100035", "item_label": "Bleeding Time (BT)"}, {"item_value": "100036", "item_label": "Urine Cotinine"}, {"item_value": "100037", "item_label": "Serum Calcium"}, {"item_value": "100038", "item_label": "Medical Examination Report - MER"}, 
{"item_value": "100039", "item_label": "MER + 2 UD"}, {"item_value": "100040", "item_label": "Carotid Arterial Doppler Study"}, {"item_value": "100041", "item_label": "CBC (Complete Blood Count)"}, {"item_value": "100042", "item_label": "CBC with ESR"}, {"item_value": "100043", "item_label": "ESR"}, {"item_value": "100044", "item_label": "CBC with Peripheral Smear"}, {"item_value": "100045", "item_label": "Blood Sugar (Fasting)"}, {"item_value": "100046", "item_label": "Post Prandial Blood Sugar (PPBS)"}, {"item_value": "100047", "item_label": "Chest Pain Questionnaire (CPQ)"}, {"item_value": "100048", "item_label": "Child MER"}, {"item_value": "100049", "item_label": "Cholesterol/HDL Ratio"}, {"item_value": "100050", "item_label": "Clotting Time (CT)"}, {"item_value": "100051", "item_label": "CNS Questionnaire"}, {"item_value": "100052", "item_label": "Colour Doppler - Lower Limbs"}, {"item_value": "100053", "item_label": "Colour Doppler - Upper Abdomen"}, {"item_value": "100054", "item_label": "Glucose Tolerance Test (GTT)"}, {"item_value": "100055", "item_label": "Oral Glucose Tolerance Test (OGTT)"}, {"item_value": "100056", "item_label": "Coombs Test"}, {"item_value": "100057", "item_label": "Copper"}, {"item_value": "100060", "item_label": "Blood Nicotine"}, {"item_value": "100061", "item_label": "Courier Charges"}, {"item_value": "100062", "item_label": "C-Reactive Protein (CRP)"}, {"item_value": "100063", "item_label": "Creatinine Clearance Test"}, {"item_value": "100064", "item_label": "Creatinine Phosphokinase"}, {"item_value": "100065", "item_label": "CT Scan - Abdomen"}, {"item_value": "100066", "item_label": "CT Scan - Chest"}, {"item_value": "100067", "item_label": "CT Scan - Head"}, {"item_value": "100068", "item_label": "CT Scan - Thorax"}, {"item_value": "100069", "item_label": "Deformity Questionnaire - DEF"}, {"item_value": "100070", "item_label": "Diabetes Questionnaire - DIQ"}, {"item_value": "100071", "item_label": "Diabetic Profile"}, {"item_value": "100072", "item_label": "Differential Leucocyte Count"}, {"item_value": "100073", "item_label": "DME"}, {"item_value": "100074", "item_label": "Dobutamine Stress Echocardiography"}, {"item_value": "100075", "item_label": "e GFR"}, {"item_value": "100076", "item_label": "ECG"}, {"item_value": "100077", "item_label": "HDL"}, {"item_value": "100079", "item_label": "EEG"}, {"item_value": "100080", "item_label": "Epilepsy Questionnaire"}, {"item_value": "100081", "item_label": "Epstein-Barr virus antigen"}, {"item_value": "100082", "item_label": "Erythrocyte Count"}, {"item_value": "100083", "item_label": "Escort charges for VIP customers"}, {"item_value": "100084", "item_label": "Eye examination"}, {"item_value": "100085", "item_label": "Follicle Stimulating Hormone"}, {"item_value": "100086", "item_label": "Thyroid Stimulating Hormone"}, {"item_value": "100087", "item_label": "Prostate Specific Antigen (PSA)"}, {"item_value": "100088", "item_label": "T4"}, {"item_value": "100089", "item_label": "Fundoscopy"}, {"item_value": "100090", "item_label": "G6PD Qualitative"}, {"item_value": "100091", "item_label": 
"G6PD Quantitative"}, {"item_value": "100092", "item_label": "GGPT"}, {"item_value": "100093", "item_label": "Goitre"}, {"item_value": "100094", "item_label": "Gynaecologist Questionnaire"}, {"item_value": "100095", "item_label": "Haemoglobin (Hb)"}, {"item_value": "100096", "item_label": "Haemogram"}, {"item_value": "100097", "item_label": "Glycosylated Hb (HbA1c)"}, {"item_value": "100098", "item_label": "Hbeag"}, {"item_value": "100099", "item_label": "HBV"}
  ];
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    defaultOpen: false,
    idField: "item_value",
    textField: "item_label",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    enableCheckAll: false,
    itemsShowLimit: 0,
    allowSearchFilter: true,
    // limitSelection: 2,
    noDataAvailablePlaceholderText: "There is no Test availabale."
  };


  viewMoreDetails(item: any) {
    console.log("item", item, typeof(item))
    this.router.navigate(['/empanelment/dc-search/view'], { state: { data: item } });
  }

}
