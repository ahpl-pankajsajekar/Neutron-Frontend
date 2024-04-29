import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { GeocodingService } from 'src/app/_services/geocoding.service';
 
// import { google } from '@types/googlemaps'
 
declare var google: any;
@Component({
  selector: 'app-dc-details',
  templateUrl: './dc-details.component.html',
  styleUrls: ['./dc-details.component.scss']
})
export class DcDetailsComponent implements OnInit {
 
  constructor(
    private route: ActivatedRoute,
    private geocodingService: GeocodingService,
    private commonService: CommonService,
  ) { }
 
  selectedItem: any;
  geocodingResponse: any;
  map!: google.maps.Map;

  
  DCdetailsData : any;
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedItem = history.state.data;
      console.log(this.selectedItem);
      // Extract address from selectedItem and perform geocoding
      if (this.selectedItem && this.selectedItem.Address) {
        const address = this.selectedItem.Address;
        this.geocodeAddress(address);
      }
    });
    
    this.DCdetailsData = []
    this.loadData()
  }

  loadData(){
    const dcId = history.state.data.DCID
    const url = "/DC/detail/?dc="+dcId
      this.commonService.getMethod(url).subscribe(
        (res: any) => {
          this.DCdetailsData = res.data[0]
        },
        (err: any) => {
          console.warn(err)
        })
  }
 
  // show cordinate purpos only
  locationCoordinates : any;
  geocodeAddress(address: string) {
    this.geocodingService.geocodeAddress(address).subscribe(
      (response: any) => {
        console.log('Geocoding response:', response);
        this.geocodingResponse = response;
        // Process the geocoding response here
        if (response && response.results && response.results[0]) {
          const location = response.results[0].geometry.location;
          console.log("location:", location)
          this.locationCoordinates = location
          // this.initMap(location);
        }
      },
      (error: any) => {
        console.error('Error occurred during geocoding:', error);
      }
    );
  }
 
  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 8,
        center: { lat: 40.731, lng: -73.997 },
      }
    );
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
  }
 
  // initMap(location: any) {
  //   console.log("init call")
  //   this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
  //     center: location,
  //     zoom: 8
  //   });
  //   // Add marker to the map
  //   new google.maps.Marker({
  //     position: location,
  //     map: this.map,
  //     title: this.selectedItem.name // Assuming the name of the location is stored in selectedItem
  //   });
  // }
 
}