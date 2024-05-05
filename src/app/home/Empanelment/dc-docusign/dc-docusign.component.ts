import { Component } from '@angular/core';

@Component({
  selector: 'app-dc-docusign',
  templateUrl: './dc-docusign.component.html',
  styleUrls: ['./dc-docusign.component.scss']
})
export class DcDocusignComponent {


  constructor() { }
  
  selectedFile: File | null = null;
  fileExtension: string = '';

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
    // Implement submit logic here
  }

}
