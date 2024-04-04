import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dc-details',
  templateUrl: './dc-details.component.html',
  styleUrls: ['./dc-details.component.scss']
})
export class DcDetailsComponent {

  constructor(
    private route : ActivatedRoute
  ){  }

  selectedItem : any;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedItem = history.state.data;
    });
    console.log(this.selectedItem)

  }

}
