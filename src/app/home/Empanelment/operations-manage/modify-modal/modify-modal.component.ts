import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyDialogData } from '../operations-manage.component';

@Component({
  selector: 'app-modify-modal',
  templateUrl: './modify-modal.component.html',
  styleUrls: ['./modify-modal.component.scss'],
})
export class ModifyModalComponent {
  fixedMofidyData: any;
  TempModifyInsurerData: any;

  constructor(
    public dialogRef: MatDialogRef<ModifyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public ModifyData: ModifyDialogData,
  ) {
    this.fixedMofidyData = JSON.parse(JSON.stringify(ModifyData.insurerList));
    this.TempModifyInsurerData = JSON.parse(JSON.stringify(ModifyData.insurerList));
    console.log(this.TempModifyInsurerData, this.fixedMofidyData)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleActive(insurer: any) {
    this.resetInsurerList();
    this.TempModifyInsurerData.find((i: any) => i.Name === insurer.Name).Active = true;
    this.TempModifyInsurerData.find((i: any) => i.Name === insurer.Name).Deactive = false;
    console.log(this.TempModifyInsurerData);
  }

  toggleDeactive(insurer: any) {
    this.resetInsurerList();
    this.TempModifyInsurerData.find((i: any) => i.Name === insurer.Name).Active = false;
    this.TempModifyInsurerData.find((i: any) => i.Name === insurer.Name).Deactive = true;
    console.log(this.TempModifyInsurerData);
  }

  resetInsurerList() {
    this.TempModifyInsurerData = JSON.parse(JSON.stringify(this.fixedMofidyData));
    console.log("resetInsurerList : ", this.TempModifyInsurerData);
  }
}