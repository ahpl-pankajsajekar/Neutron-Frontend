import { Component } from '@angular/core';

@Component({
  selector: 'app-dc-docusign',
  templateUrl: './dc-docusign.component.html',
  styleUrls: ['./dc-docusign.component.scss']
})
export class DcDocusignComponent {

  selectedFileName: string = '';  

  constructor() { }

  onFileSelected(event: any) {
    // Implement file selection logic here
    const file = event.target.files[0];
    console.log('Selected file:', file);
  }

  submit() {
    // Implement submit logic here
  }

}
