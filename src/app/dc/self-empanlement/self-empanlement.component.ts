import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { HttpClient } from '@angular/common/http';
import { DC_TESTS_DATA } from './dc_tests_list';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-self-empanlement',
  templateUrl: './self-empanlement.component.html',
  styleUrls: ['./self-empanlement.component.scss']
})
export class SelfEmpanlementComponent {
    documents: File[] = [];
    DC_TESTS_DATA = DC_TESTS_DATA
    
    ticketId: any = null;
    constructor(
      private _formBuilder: FormBuilder,
      private commonService: CommonService,
      private activatedRoute: ActivatedRoute,
      private fb: FormBuilder, 
      private http: HttpClient,
      private router: Router,
      private toastrService: ToastrService,
    ) {
      this.ticketId = this.activatedRoute.snapshot.queryParamMap.get('id');
    }


    selectedTestsItems:any =[];

    dropdownSettings:IDropdownSettings = {
      singleSelection: false,
      idField: "item_Standard_Code",
      textField: "item_Standard_Description",
      // selectAllText: "Select All",
      // unSelectAllText: "UnSelect All",
      enableCheckAll: false,
      itemsShowLimit: 0,
      allowSearchFilter: true,
      // limitSelection: 2,
      noDataAvailablePlaceholderText: "There is no Test availabale."
    };
  
   

  
    onFileSelect(event: Event, index: number) {
      const inputElement = event.target as HTMLInputElement;
      const fileList: FileList | null = inputElement.files;
      if (fileList && fileList.length > 0) {
        const file = fileList[0]; // Get the selected file
        // Update the 'documents' array with the selected file
        this.documents[index] = file;
      }
    }

    fetchBankDetails(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const ifscCode = inputElement.value;
      console.log('IFSC Code:', ifscCode); 
      this.http.get<any>('https://bank-apis.justinclicks.com/API/V1/IFSC/' + ifscCode)
        .subscribe(data => {
          console.log('API Response:', data)
          const bankNameInput = document.getElementById('bankNameInput') as HTMLInputElement;
          bankNameInput.value = data.BANK;
  
          const branchNameInput = document.getElementById('branchNameInput') as HTMLInputElement;
          branchNameInput.value = data.BRANCH;
        }, error => {
          console.error('Error:', error);
          // alert("Please enter valid IFSC Code.")
          this.toastrService.info('Please enter valid IFSC Code.', '', {
            closeButton: true,
            timeOut: 5000,
          });
        });
    }
  
  
    addDocument() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'documents';
      fileInput.addEventListener('change', (event) =>
        this.onFileSelect(event, this.documents.length)
      );
      fileInput.click();
    }
  
    providerType = [
      { value: 'Dignostics Center', viewValue: 'Dignostics Center' },
      { value: 'Dental Empanelment', viewValue: 'Dental Empanelment' },
      { value: 'Hospital', viewValue: 'Hospital' },
      { value: 'Optics Empanelment', viewValue: 'Optics Empanelment' },
      { value: 'Wellness', viewValue: 'Wellness' },
    ];
  
    DCchainType = [
      { value: 'Standalone', viewValue: 'Standalone' },
      { value: 'Chain', viewValue: 'Chain' },
    ];
  
    ACCREDITATIONType = [
      { value: 'None', viewValue: 'None' },
      { value: 'ISO', viewValue: 'ISO' },
      { value: 'NABH', viewValue: 'NABH' },
      { value: 'NABL', viewValue: 'NABL' },
      { value: 'Other', viewValue: 'Other' },
    ];
  
    ACType = [
      { value: 'Saving', viewValue: 'Saving' },
      { value: 'Current ', viewValue: 'Current ' },
    ];
  
    TyreType = [
      { value: 'Tyre1', viewValue: 'Tyre1' },
      { value: 'Tyre2', viewValue: 'Tyre2' },
      { value: 'Tyre3', viewValue: 'Tyre3' },
      { value: 'Tyre4', viewValue: 'Tyre4' },
    ];
  
    states = [
      { value: 'Assam', viewValue: 'Assam' },
      { value: 'Bihar', viewValue: 'Bihar' },
      { value: 'Punjab', viewValue: 'Punjab' },
      { value: 'Maharashtra', viewValue: 'Maharashtra' },
      { value: 'Delhi', viewValue: 'Delhi' },
      { value: 'Gujrat', viewValue: 'Gujrat' },
      { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
      { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
      { value: 'Hariyana', viewValue: 'Hariyana' },
      { value: 'Chhattisgarh', viewValue: 'Chhattisgarh' },
      { value: 'Mizoram', viewValue: 'Mizoram' },
      { value: 'Karnataka', viewValue: 'Karnataka' },
      { value: 'Arunachal Pradesh', viewValue: 'Arunachal Pradesh' },
      { value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh' },
      { value: 'Kerala', viewValue: 'Kerala' },
    ];

    stateCitiesMap: { [key: string]: string[] } = {
      'Assam': ["Abhayapuri", "Amguri", "Badarpur", "Baksa", "Barpathār", "Barpeta", "Barpeta Road", "Bāsugaon", "Bihpuriāgaon", "Bijni", "Bilāsipāra", "Bokajān", "Bokākhāt", "Bongaigaon", "Cāchār", "Chābua", "Chāpar", "Chirang", "Darrang", "Dergaon", "Dhekiajuli", "Dhemaji", "Dhemāji", "Dhing", "Dhubri", "Dhuburi", "Dibrugarh", "Digboi", "Dima Hasao District", "Diphu", "Dispur", "Duliāgaon", "Dum Duma", "Gauripur", "Goālpāra", "Gohpur", "Golaghat", "Golāghāt", "Golakganj", "Goshaingaon", "Guwahati", "Hāflong", "Hailakandi", "Hailākāndi", "Hājo", "Hojāi", "Howli", "Jogīghopa", "Jorhat", "Jorhāt", "Kāmrūp", "Kamrup Metropolitan", "Kārbi Ānglong", "Karimganj", "Karīmganj", "Khārupatia", "Kokrajhar", "Lakhimpur", "Lakhipur", "Lāla", "Lumding Railway Colony", "Mahur", "Maibong", "Mākum", "Mangaldai", "Mariāni", "Morānha", "Morigaon", "Nagaon", "Nahorkatiya", "Nalbari", "Nāmrup", "Nāzirā", "North Guwāhāti", "North Lakhimpur", "Numāligarh", "Palāsbāri", "Rahā", "Rangāpāra", "Rangia", "Sapatgrām", "Sarupathar", "Sibsāgar", "Silapathar", "Silchar", "Soalkuchi", "Sonāri", "Sonitpur", "Sorbhog", "Tezpur", "Tinsukia", "Titābar", "Udalguri"],
      'Bihar': ["Amarpur", "Araria", "Arāria", "Arrah", "Arwal", "Asarganj", "Aurangābād", "Bagaha", "Bahādurganj", "Bairāgnia", "Baisi", "Bakhtiyārpur", "Bangaon", "Bānka", "Banka", "Banmankhi", "Bar Bigha", "Barauli", "Bārh", "Barhiya", "Bariārpur", "Bāruni", "Begusarai", "Begusarāi", "Belsand", "Bettiah", "Bhabhua", "Bhāgalpur", "Bhagirathpur", "Bhawanipur", "Bhojpur", "Bihār Sharīf", "Bihārīganj", "Bikramganj", "Bīrpur", "Buddh Gaya", "Buxar", "Chākia", "Chāpra", "Chhātāpur", "Colgong", "Dalsingh Sarai", "Darbhanga", "Daudnagar", "Dehri", "Dhāka", "Dighwāra", "Dinapore", "Dumra", "Dumraon", "Fatwa", "Forbesganj", "Gaya", "Gayā", "Ghoga", "Gopālganj", "Hājīpur", "Hilsa", "Hisuā", "Islāmpur", "Jagdīspur", "Jahānābād", "Jamālpur", "Jamui", "Jamūī", "Jaynagar", "Jehanabad", "Jhā-Jhā", "Jhanjhārpur", "Jogbani", "Kaimur District", "Kasba", "Katihar", "Khagaria", "Khagaul", "Kharagpur", "Khusropur", "Kishanganj", "Koāth", "Koelwār", "Lakhisarai", "Lālganj", "Luckeesarai", "Madhepura", "Madhipura", "Madhubani", "Mahārājgani", "Mairwa", "Maner", "Manihāri", "Marhaura", "Masaurhi Buzurg", "Mohiuddinnagar", "Mokameh", "Monghyr", "Mothīhāri", "Munger", "Murlīganj", "Muzaffarpur", "Nabīnagar", "Nālanda", "Nāsriganj", "Naugachhia", "Nawāda", "Nirmāli", "Pashchim Champāran", "Patna", "Piro", "Pupri", "Pūrba Champāran", "Purnia", "Rafiganj", "Raghunāthpur", "Rājgīr", "Rāmnagar", "Raxaul", "Revelganj", "Rohtās", "Rusera", "Sagauli", "Saharsa", "Samastīpur", "Samāstipur", "Sāran", "Shahbazpur", "Shāhpur", "Sheikhpura", "Sheohar", "Sherghāti", "Silao", "Sītāmarhi", "Siwān", "Supaul", "Teghra", "Tekāri", "Thākurganj", "Vaishāli", "Waris Aliganj"],
      'Punjab': ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga"],
      'Maharashtra': ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Bhiwandi", "Amravati", "Nanded", "Kolhapur", "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Ichalkaranji", "Chandrapur", "Parbhani"],
      'Delhi': ["Alipur", "Bawana", "Central Delhi", "Delhi", "Deoli", "East Delhi", "Karol Bāgh", "Najafgarh", "Nāngloi Jāt", "Narela", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Pitampura", "Rohini", "South Delhi", "South West Delhi", "West Delhi"],
      'Gujrat': ["Aahwa", "Adalaj", "Adityana", "Advana", "Ahmedabad", "Ahmedabad Cantonment", "Alang", "Ambaji", "Ambaliyasan", "Amreli", "Anand", "Andada", "Anjar", "Anklav", "Anklesvar", "Antaliya", "Arambhada", "Asarma", "Atul", "Babra", "Bagasara", "Bagdana", "Bajva", "Balasinor", "Banaskantha", "Bansda", "Bardoli", "Barwala", "Bayad", "Bechar", "Bedi", "Bhachau", "Bhanvad", "Bharuch", "Bhavnagar", "Bhayavadar", "Bhestan", "Bhuj", "Bopal", "Boria", "Boriavi", "Borsad", "Botad", "Buhari", "Chaklasi", "Chala", "Chalala", "Chalthan", "Chanasma", "Chandkheda", "Chandlodiya", "Chhala", "Chhapra", "Chhota Udaipur", "Chikhli", "Chiloda", "Chorvad", "Chotila", "Dabhoi", "Dahod", "Dakor", "Damnagar", "Dasada", "Datavav", "Dediapada", "Deesa", "Delvada", "Devgadh Baria", "Devsar", "Dhandhuka", "Dhanera", "Dhangadhra", "Dharampur", "Dhari", "Dholka", "Dhrangadhra", "Dhrol", "Digvijaygram", "Dohad", "Dumiyani", "Dwarka", "Fatepura", "Fertilizer Township", "Freelandgunj", "Gadhada", "Gandevi", "Gandhidham", "Gandhinagar", "Gariadhar", "Ghogha", "Godhra", "Gondal", "Gota", "Govardhan", "Gujarat Refinery", "Halol", "Halvad", "Hansot", "Harij", "Himatnagar", "Ichchhapor", "Idar", "Jafrabad", "Jalalpore", "Jam Jodhpur", "Jamnagar", "Jasdan", "Jawaharnagar", "Jetalsar", "Jetpur", "Jhalod", "Jhulasan", "Jodia", "Junagadh", "Kadi", "Kadodara", "Kalavad", "Kali", "Kalol", "Kandla", "Kanjari", "Kanjari Boriawali", "Kapadvanj", "Karachiya", "Karamsad", "Karchelia", "Keshod", "Khambhaliya", "Khambhat", "Kharaghoda", "Khed Brahma", "Kheda", "Khodiyar", "Khokhra", "Koteshwar", "Kukarwada", "Kundla", "Kutch", "Kutchmandvi", "Kuvarshad", "Lakhtar", "Lalpur", "Lathi", "Limbdi", "Limla", "Lunavada", "Madhapar", "Mahesana", "Mahuva", "Mahuvar", "Makarba", "Makarpura", "Maktampur", "Maliya", "Maliya Miyana", "Malpur", "Manavadar", "Mandal", "Mandvi", "Mangrol", "Mansa", "Meghraj", "Mehmedabad", "Mehsana", "Mendarda", "Mithapur", "Modasa", "Morvi", "Mundra", "Nadiad", "Nagda", "Nagod", "Nakhatrana", "Nandej", "Nandesari", "Nandesari INA", "Nanodara", "Nanpura", "Nargol", "Nasvadi", "Navagam Ghed", "Navsari", "Ode", "Okha", "Padra", "Palanpur", "Palej", "Palitana", "Panch Mahals", "Panchmahal", "Pardi", "Parnera", "Parvat", "Patan", "Patdi", "Petlad", "Petrochemical Complex", "Porbandar", "Prantij", "Radhanpur", "Raiya", "Rajkot", "Rajpipla", "Rajula", "Ranavav", "Ranoli", "Rapar", "Sachin", "Sahij", "Salaya", "Sanand", "Sankheda", "Santrampur", "Saribujrang", "Sarigam INA", "Sayan", "Seriya", "Shahpur", "Shapar", "Shivrajpur", "Siddhapur", "Sidhpur", "Sihor", "Sikka", "Sindhnur", "Sinor", "Sojitra", "Songadh", "Surat", "Surendranagar", "Talaja", "Talod", "Tankara", "Tarsali", "Thaltej", "Thangadh", "Tharad", "Thasra", "Tirora", "Tragad", "Ukai", "Umbergaon", "Umreth", "Un", "Una", "Unjha", "Upleta", "V.U. Nagar", "Vadgam", "Vadla", "Vadnagar", "Vadodara", "Vaghodia INA", "Vagra", "Vallabh Vidyanagar", "Valsad", "Vanthali", "Vapi", "Vartej", "Vastral", "Vataman", "Vejalpur", "Veraval", "Vijalpor", "Vijapur", "Viramgam", "Visavadar", "Visnagar", "Vithal Udyognagar", "Vyara", "Wadhwan", "Waghai", "Wankaner", "Zalod"],
      'Madhya Pradesh': ["Agar", "Ajaigarh", "Akodia", "Alampur", "Alirajpur", "Alot", "Amānganj", "Amarkantak", "Amarpātan", "Amarwāra", "Ambāh", "Amla", "Anjad", "Antri", "Anuppur", "Anūppur", "Āron", "Ashoknagar", "Ashta", "Bābai", "Badarwās", "Badnāwar", "Bāg", "Bāgli", "Baihar", "Baikunthpur", "Bakshwāho", "Bālāghāt", "Baldeogarh", "Bamna", "Bāmor Kalān", "Bamora", "Banda", "Barela", "Barghāt", "Bargi", "Barhi", "Barwani", "Barwāni", "Bāsoda", "Begamganj", "Beohāri", "Berasia", "Betma", "Betūl", "Betūl Bazār", "Bhābhra", "Bhainsdehi", "Bhānder", "Bhānpura", "Bhawāniganj", "Bhikangaon", "Bhind", "Bhitarwār", "Bhopal", "Bhopāl", "Biaora", "Bijāwar", "Bijrauni", "Bodri", "Burhanpur", "Burhānpur", "Burhar", "Chanderi", "Chandia", "Chandla", "Chhatarpur", "Chhindwāra", "Chichli", "Chorhat", "Daboh", "Dabra", "Damoh", "Datia", "Deori Khās", "Depālpur", "Dewas", "Dhāmnod", "Dhāna", "Dhār", "Dharampuri", "Dindori", "Etāwa", "Gādarwāra", "Garha Brahman", "Garhākota", "Gautampura", "Ghansor", "Gogāpur", "Gohadi", "Govindgarh", "Guna", "Gurh", "Gwalior", "Harda", "Harda Khās", "Harpālpur", "Harrai", "Harsūd", "Hātod", "Hatta", "Hindoria", "Hoshangābād", "Iāwar", "Ichhāwar", "Iklehra", "Indore", "Isāgarh", "Itārsi", "Jabalpur", "Jaisinghnagar", "Jaithāri", "Jāmai", "Jaorā", "Jatāra", "Jāwad", "Jhābua", "Jīran", "Jobat", "Jora", "Kailāras", "Kaimori", "Kannod", "Kareli", "Karera", "Karrāpur", "Kasrāwad", "Katangi", "Katni", "Khāchrod", "Khailār", "Khajuraho Group of Monuments", "Khamaria", "Khandwa", "Khandwa district", "Khargāpur", "Khargone", "Khātegaon", "Khilchipur", "Khirkiyān", "Khujner", "Khurai", "Kolāras", "Korwai", "Kotār", "Kothi", "Kotma", "Kotwa", "Kukshi", "Kumbhrāj", "Lahār", "Lakhnādon", "Leteri", "Lodhīkheda", "Māchalpur", "Madhogarh", "Maheshwar", "Mahgawān", "Maihar", "Majholi", "Maksi", "Malhārgarh", "Manāsa", "Manāwar", "Mandideep", "Mandla", "Mandlā", "Māndleshwar", "Mandsaur", "Mangawān", "Mānpur", "Mau", "Mauganj", "Mihona", "Mohgaon", "Morār", "Morena", "Multai", "Mundi", "Mungaoli", "Murwāra", "Nagda", "Nāgod", "Naīgarhi", "Nainpur", "Namli", "Naraini", "Nārāyangarh", "Narsimhapur", "Narsinghgarh", "Narwar", "Nasrullāhganj", "Neemuch", "Nepānagar", "Orchha", "Pachmarhi", "Palera", "Pāli", "Panāgar", "Panara", "Pandhāna", "Pāndhurnā", "Panna", "Pānsemāl", "Parāsia", "Pātan", "Patharia", "Pawai", "Petlāwad", "Piploda", "Pithampur", "Porsa", "Punāsa", "Rāghogarh", "Rāhatgarh", "Raisen", "Rājgarh", "Rājnagar", "Rajpur", "Rāmpura", "Rānāpur", "Ratangarh", "Ratlām", "Rehli", "Rehti", "Rewa", "Sabalgarh", "Sāgar", "Sailāna", "Sanāwad", "Sānchi", "Sānwer", "Sārangpur", "Satna", "Satwās", "Saugor", "Sausar", "Sehore", "Sendhwa", "Seondha", "Seoni", "Seonī", "Seoni Mālwa", "Shahdol", "Shāhgarh", "Shāhpur", "Shāhpura", "Shājāpur", "Shāmgarh", "Sheopur", "Shivpuri", "Shivpurī", "Shujālpur", "Sidhi", "Sihorā", "Simaria", "Singoli", "Singrauli", "Sirmaur", "Sironj", "Sītāmau", "Sohāgi", "Sohāgpur", "Sultānpur", "Susner", "Tāl", "Talen", "Tarāna", "Tekanpur", "Tendūkheda", "Teonthar", "Thandla", "Tīkamgarh", "Tirodi", "Udaipura", "Ujjain", "Ukwā", "Umaria", "Umaria District", "Umri", "Unhel", "Vidisha", "Wārāseonī"],
      'Uttar Pradesh': ["Achhnera", "Afzalgarh", "Agra", "Āgra", "Ahraura", "Ajodhya", "Akbarpur", "Alīganj", "Alīgarh", "Allahābād", "Allāhganj", "Amānpur", "Ambahta", "Ambedkar Nagar", "Amethi", "Amethī", "Amroha", "Anandnagar", "Antu", "Anūpshahr", "Aonla", "Atarra", "Atraulī", "Atraulia", "Auraiya", "Aurās", "Āzamgarh", "Azamgarh", "Baberu", "Babīna", "Babrāla", "Babugarh", "Bachhraon", "Bachhrāwān", "Baghpat", "Bāghpat", "Bāh", "Baheri", "Bahjoi", "Bahraich", "Bahraigh", "Bahsūma", "Bahua", "Bājna", "Bakewar", "Baldev", "Ballia", "Balrampur", "Balrāmpur", "Banat", "Banbasa", "Bānda", "Bāngarmau", "Bānsdīh", "Bānsgāon", "Bānsi", "Bāra Banki", "Barāgaon", "Baraut", "Bareilly", "Barkhera Kalān", "Barsāna", "Basti", "Bastī", "Behat", "Bela", "Benīganj", "Beswān", "Bewar", "Bhadohi", "Bhagwantnagar", "Bharthana", "Bharwāri", "Bhinga", "Bhongaon", "Bidhūna", "Bīghāpur Khurd", "Bijnor", "Bīkāpur", "Bilāri", "Bilariāganj", "Bīlāspur", "Bilgrām", "Bilhaur", "Bilsanda", "Bilsi", "Bilthra", "Bindki", "Bīsalpur", "Bisauli", "Bisenda Buzurg", "Bishunpur Urf Mahārājganj", "Biswān", "Bithūr", "Budaun", "Budhāna", "Bulandshahr", "Captainganj", "Chail", "Chakia", "Chandauli", "Chandauli District", "Chāndpur", "Chanduasi", "Charkhāri", "Charthāwal", "Chhaprauli", "Chharra", "Chhāta", "Chhibrāmau", "Chhutmalpur", "Chillupār", "Chirgaon", "Chitrakoot", "Chopan", "Chunār", "Colonelganj", "Dādri", "Dalmau", "Dankaur", "Dāsna", "Dātāganj", "Daurāla", "Dayāl Bāgh", "Deoband", "Deoraniān", "Deoria", "Dewā", "Dhāmpur", "Dhanaura", "Dhaurahra", "Dibai", "Dohrighāt", "Dostpur", "Dūdhi", "Etah", "Etāwah", "Faizābād", "Farah", "Farīdnagar", "Farīdpur", "Farrukhābād", "Fatehābād", "Fatehganj West", "Fatehgarh", "Fatehpur", "Fatehpur Chaurāsi", "Fatehpur Sīkri", "Firozabad", "Fīrozābād", "Fyzābād", "Gajraula", "Gangoh", "Ganj Dundwāra", "Ganj Murādābād", "Garautha", "Garhi Pūkhta", "Garhmuktesar", "Gautam Buddha Nagar", "Gawān", "Ghātampur", "Ghāziābād", "Ghazīpur", "Ghāzīpur", "Ghiror", "Ghorāwal", "Ghosī", "Gohānd", "Gokul", "Gola Bāzār", "Gola Gokarannāth", "Gonda", "Gondā City", "Gopāmau", "Gorakhpur", "Goshāinganj", "Goshāīnganj", "Govardhan", "Greater Noida", "Gulāothi", "Gunnaur", "Gursahāiganj", "Gursarāi", "Gyānpur", "Haldaur", "Hamīrpur", "Handiā", "Hāpur", "Haraiya", "Hardoi", "Hardoī", "Harduāganj", "Hasanpur", "Hastināpur", "Hātā", "Hāthras", "Iglās", "Ikauna", "Indergarh", "Islāmnagar", "Itaunja", "Itimādpur", "Jagdīshpur", "Jagnair", "Jahānābād", "Jahāngīrābād", "Jahāngīrpur", "Jainpur", "Jais", "Jalālābad", "Jalālābād", "Jalālī", "Jalālpur", "Jālaun", "Jalesar", "Jānsath", "Jarwal", "Jasrāna", "Jaswantnagar", "Jaunpur", "Jewar", "Jhālu", "Jhānsi", "Jhīnjhak", "Jhinjhāna", "Jhūsi", "Jyotiba Phule Nagar", "Kabrāi", "Kachhwa", "Kadaura", "Kādīpur", "Kaimganj", "Kairāna", "Kākori", "Kakrāla", "Kālīnagar", "Kālpi", "Kamalganj", "Kampil", "Kāndhla", "Kannauj", "Kanpur", "Kānpur", "Kanpur Dehat", "Kānt", "Kānth", "Karārī", "Karhal", "Kāsganj", "Katra", "Kaushambi District", "Kemrī", "Khada", "Khāga", "Khair", "Khairābād", "Khalīlābād", "Khānpur", "Kharela", "Khargupur", "Kharkhauda", "Khatauli", "Khekra", "Kheri", "Khudāganj", "Khurja", "Khūtār", "Kirākat", "Kiraoli", "Kīratpur", "Kishanpur", "Kishni", "Kithor", "Konch", "Kopāganj", "Kosi", "Kota", "Kotra", "Kulpahār", "Kunda", "Kundarkhi", "Kurāra", "Kushinagar", "Lāharpur", "Lakhīmpur", "Lakhnā", "Lālganj", "Lalitpur", "Lar", "Lāwar Khās", "Loni", "Lucknow", "Lucknow District", "Machhlīshahr", "Mādhoganj", "Mādhogarh", "Maghar", "Mahāban", "Mahārāganj", "Maharajganj", "Mahārājganj", "Mahmudābād", "Mahoba", "Mahobā", "Maholi", "Mahroni", "Mailāni", "Mainpuri", "Malīhābād", "Mandāwar", "Maniar", "Mānikpur", "Manjhanpur", "Mankāpur", "Mārahra", "Mariāhu", "Mataundh", "Mathura", "Mau", "Mau Aimma", "Maudaha", "Maurānwān", "Mawāna", "Meerut", "Mehnagar", "Mehndāwal", "Milak", "Mīrānpur", "Mīrānpur Katra", "Mīrganj", "Mirzāpur", "Misrikh", "Mohān", "Mohanpur", "Morādābād", "Moth", "Mubārakpur", "Mughal Sarāi", "Muhammadābād", "Murādnagar", "Mursān", "Musāfir-Khāna", "Muzaffarnagar", "Nadīgaon", "Nagīna", "Nagrām", "Najībābād", "Nakūr", "Nanauta", "Nandgaon", "Nānpāra", "Narauli", "Naraura", "Nautanwa", "Nawābganj", "Nichlaul", "Nihtaur", "Niwāri", "Nizāmābād", "Noida", "Nūrpur", "Obra", "Orai", "Oran", "Pachperwa", "Padrauna", "Pahāsu", "Pāli", "Paliā Kalān", "Pārīchha", "Parīchhatgarh", "Parshādepur", "Patiāli", "Patti", "Pawāyan", "Phalauda", "Phaphūnd", "Pharihā", "Phulpur", "Phūlpur", "Pihānī", "Pīlibhīt", "Pīlībhīt", "Pilkhua", "Pināhat", "Pipraich", "Pratāpgarh", "Pukhrāyān", "Pūranpur", "Purwā", "Rabūpura", "Rādhākund", "Rāe Bareli", "Raebareli", "Rājāpur", "Rāmkola", "Rāmnagar", "Rāmpur", "Rāmpura", "Rānīpur", "Rasrā", "Rasūlābād", "Rāth", "Rāya", "Renukūt", "Reoti", "Richha", "Robertsganj", "Rūdarpur", "Rura", "Sadābād", "Sādāt", "Safīpur", "Sahāranpur", "Sahaspur", "Sahaswān", "Sahāwar", "Saidpur", "Sakīt", "Salon", "Sambhal", "Samthar", "Sāndi", "Sandīla", "Sant Kabir Nagar", "Sant Ravi Das Nagar", "Sarāi Ākil", "Sarai Ekdil", "Sarāi Mīr", "Sarauli", "Sardhana", "Sarīla", "Sāsni", "Satrikh", "Saurikh", "Sector", "Seohāra", "Shāhābād", "Shāhganj", "Shāhi", "Shāhjahānpur", "Shāhjānpur", "Shāhpur", "Shāmli", "Shamsābād", "Shankargarh", "Shergarh", "Sherkot", "Shikārpūr", "Shikohābād", "Shīshgarh", "Shrawasti", "Siddharthnagar", "Sidhaulī", "Sidhpura", "Sikandarābād", "Sikandarpur", "Sikandra", "Sikandra Rao", "Sirāthu", "Sirsā", "Sirsāganj", "Sirsi", "Sisauli", "Siswā Bāzār", "Sītāpur", "Sonbhadra", "Soron", "Suār", "Sultānpur", "Suriānwān", "Tājpur", "Tālbahat", "Tālgrām", "Tānda", "Tāndā", "Thakurdwara", "Thāna Bhawan", "Tikaitnagar", "Tīkri", "Tilhar", "Tindwāri", "Titron", "Tori-Fatehpur", "Tulsīpur", "Tūndla", "Ugu", "Ujhāni", "Ūn", "Unnāo", "Usehat", "Utraula", "Varanasi", "Vārānasi", "Vrindāvan", "Wazīrganj", "Zafarābād", "Zaidpur", "Zamānia"],
      'Hariyana': ["Ambala", "Yamunanagar", "Panchkula", "Karnal", "Panipat", "Sonipat", "Rohtak", "Hisar", "Bhiwani", "Charkhi Dadri", "Rewari", "Palwal", "Jind", "Sirsa", "Fatehabad", "Kaithal", "Kurukshetra", "Jhajjar", "Mahendragarh", "Narnaul", "Ambala Cantonment", "Faridabad", "Gurugram (Gurgaon)", "Bahadurgarh", "Pinjore", "Sohna", "Thanesar", "Tohana", "Kalka", "Ladwa", "Shahbad", "Jagadhri", "Ratia", "Narwana", "Shahabad Markanda", "Samalkha", "Kalanwali", "Rania", "Uchana", "Taraori", "Pehowa", "Hansi", "Gharaunda", "Ismailabad", "Pundri", "Hodal", "Dabwali", "Safidon"],
      'Chhattisgarh': ["Akaltara", "Ambāgarh Chauki", "Ambikāpur", "Arang", "Baikunthpur", "Balod", "Baloda", "Baloda Bāzār", "Basna", "Bastar", "Bemetāra", "Bhānpurī", "Bhātāpāra", "Bhatgaon", "Bhilai", "Bijapur", "Bilāspur", "Chāmpa", "Chhuīkhadān", "Deori", "Dhamtari", "Dongargaon", "Dongargarh", "Durg", "Gandai", "Gariāband", "Gaurela", "Gharghoda", "Gīdam", "Jagdalpur", "Jānjgīr", "Janjgir-Champa", "Jashpur", "Jashpurnagar", "Jūnāgarh", "Kabeerdham", "Kānker", "Katghora", "Kawardha", "Khairāgarh", "Khamharia", "Kharod", "Kharsia", "Kirandul", "Kondagaon", "Korba", "Koriya", "Kotā", "Kotapārh", "Kumhāri", "Kurud", "Lormi", "Mahasamund", "Mahāsamund", "Mungeli", "Narayanpur", "Narharpur", "Pandaria", "Pāndātarai", "Pasān", "Pātan", "Pathalgaon", "Pendra", "Pithora", "Raigarh", "Raipur", "Rāj Nāndgaon", "Rāj-Nāndgaon", "Rāmānuj Ganj", "Ratanpur", "Saktī", "Saraipali", "Sārangarh", "Seorīnārāyan", "Simga", "Surguja", "Takhatpur", "Umarkot", "Uttar Bastar Kanker"],
      'Mizoram': ["Aizawl", "Champhai", "Darlawn", "Khawhai", "Kolasib", "Kolasib district", "Lawngtlai", "Lunglei", "Mamit", "North Vanlaiphai", "Saiha", "Sairang", "Sāitlaw", "Serchhip", "Serchhīp", "Thenzawl"],
      'Karnataka': ["Afzalpur", "Ajjampur", "Aland", "Alnāvar", "Alūr", "Anekal", "Ankola", "Annigeri", "Arkalgūd", "Arsikere", "Athni", "Aurād", "Bādāmi", "Bagalkot", "Bāgepalli", "Bail-Hongal", "Ballari", "Bānāvar", "Bangalore Rural", "Bangalore Urban", "Bangarapet", "Bannūr", "Bantvāl", "Basavakalyān", "Basavana Bāgevādi", "Belgaum", "Bellary", "Bellūru", "Beltangadi", "Belūr", "Bengaluru", "Bhadrāvati", "Bhālki", "Bhatkal", "Bīdar", "Bijapur", "Bijāpur", "Bilgi", "Birūr", "Byādgi", "Byndoor", "Canacona", "Challakere", "Chamrajnagar", "Channagiri", "Channapatna", "Channarāyapatna", "Chik Ballāpur", "Chikkaballapur", "Chikmagalur", "Chikmagalūr", "Chiknāyakanhalli", "Chikodi", "Chincholi", "Chintāmani", "Chītāpur", "Chitradurga", "Closepet", "Coondapoor", "Dakshina Kannada", "Dandeli", "Davanagere", "Davangere", "Devanhalli", "Dharwad", "Dod Ballāpur", "French Rocks", "Gadag", "Gadag-Betageri", "Gajendragarh", "Gangāwati", "Gangolli", "Gokak", "Gokarna", "Goribidnūr", "Gorūr", "Gubbi", "Gudibanda", "Gulbarga", "Guledagudda", "Gundlupēt", "Gurmatkāl", "Hadagalli", "Haliyal", "Hampi", "Hāngal", "Harihar", "Harpanahalli", "Hassan", "Hāveri", "Haveri", "Heggadadevankote", "Hirekerūr", "Hiriyūr", "Holalkere", "Hole Narsipur", "Homnābād", "Honāvar", "Honnāli", "Hosakote", "Hosanagara", "Hosangadi", "Hosdurga", "Hoskote", "Hospet", "Hubli", "Hukeri", "Hungund", "Hunsūr", "Ilkal", "Indi", "Jagalūr", "Jamkhandi", "Jevargi", "Kadūr", "Kalghatgi", "Kampli", "Kānkānhalli", "Kārkala", "Karwar", "Kavalūr", "Kerūr", "Khānāpur", "Kodagu", "Kodigenahalli", "Kodlipet", "Kolar", "Kolār", "Kollegāl", "Konanūr", "Konnūr", "Koppa", "Koppal", "Koratagere", "Kottūru", "Krishnarājpet", "Kudachi", "Kūdligi", "Kumsi", "Kumta", "Kundgol", "Kunigal", "Kurgunta", "Kushālnagar", "Kushtagi", "Lakshmeshwar", "Lingsugūr", "Londa", "Maddagiri", "Maddūr", "Madikeri", "Māgadi", "Mahālingpur", "Malavalli", "Malpe", "Mālūr", "Mandya", "Mangalore", "Manipal", "Mānvi", "Māyakonda", "Melukote", "Mūdbidri", "Muddebihāl", "Mudgal", "Mudgere", "Mudhol", "Mulbāgal", "Mulgund", "Mūlki", "Mundargi", "Mundgod", "Munirābād", "Murudeshwara", "Mysore", "Nāgamangala", "Nanjangūd", "Narasimharājapura", "Naregal", "Nargund", "Navalgund", "Nelamangala", "Nyāmti", "Pāngāla", "Pāvugada", "Piriyāpatna", "Ponnampet", "Puttūr", "Rabkavi", "Rāichūr", "Raichur", "Ramanagara", "Rānībennur", "Rāybāg", "Robertsonpet", "Ron", "Sadalgi", "Sāgar", "Sakleshpur", "Sandūr", "Sanivārsante", "Sankeshwar", "Sargūr", "Saundatti", "Savanūr", "Seram", "Shāhābād", "Shāhpur", "Shiggaon", "Shikārpur", "Shimoga", "Shirhatti", "Shorāpur", "Shrīrangapattana", "Siddāpur", "Sidlaghatta", "Sindgi", "Sindhnūr", "Sīra", "Sirsi", "Siruguppa", "Someshwar", "Somvārpet", "Sorab", "Srāvana Belgola", "Sringeri", "Srīnivāspur", "Sulya", "Suntikoppa", "Tālīkota", "Tarikere", "Tekkalakote", "Terdāl", "Tiptūr", "Tīrthahalli", "Tirumakūdal Narsipur", "Tumkur", "Tumkūr", "Turuvekere", "Udupi", "Ullal", "Uttar Kannada", "Vadigenhalli", "Vīrarājendrapet", "Wādi", "Yadgir", "Yādgīr", "Yelahanka", "Yelandūr", "Yelbarga", "Yellāpur"],
      'Arunachal Pradesh': ["Along", "Anjaw", "Bāsār", "Bomdila", "Changlang", "Dibāng Valley", "East Kameng", "East Siang", "Hayuliang", "Itānagar", "Khonsa", "Kurung Kumey", "Lohit District", "Lower Dibang Valley", "Lower Subansiri", "Margherita", "Naharlagun", "Pāsighāt", "Tawang", "Tezu", "Tirāp", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Ziro"],
      'Andhra Pradesh': ["Addanki", "Ādoni", "Akasahebpet", "Akivīdu", "Akkarampalle", "Amalāpuram", "Amudālavalasa", "Anakāpalle", "Anantapur", "Atmakūr", "Attili", "Avanigadda", "Badvel", "Banganapalle", "Bāpatla", "Betamcherla", "Bhattiprolu", "Bhīmavaram", "Bhīmunipatnam", "Bobbili", "Challapalle", "Chemmumiahpet", "Chilakalūrupet", "Chinnachowk", "Chīpurupalle", "Chīrāla", "Chittoor", "Chodavaram", "Cuddapah", "Cumbum", "Darsi", "Dharmavaram", "Dhone", "Diguvametta", "East Godāvari", "Elamanchili", "Ellore", "Emmiganūr", "Erraguntla", "Etikoppāka", "Gajuwaka", "Ganguvāda", "Gannavaram", "Giddalūr", "Gokavaram", "Gorantla", "Govindapuram,Chilakaluripet,Guntur", "Gudivāda", "Gudlavalleru", "Gūdūr", "Guntakal Junction", "Guntūr", "Hindupur", "Ichchāpuram", "Jaggayyapeta", "Jammalamadugu", "Kadiri", "Kaikalūr", "Kākināda", "Kalyandurg", "Kāmalāpuram", "Kandukūr", "Kanigiri", "Kankipādu", "Kanuru", "Kāvali", "Kolanukonda", "Kondapalle", "Korukollu", "Kosigi", "Kovūr", "Kovvūr", "Krishna", "Kuppam", "Kurnool", "Mācherla", "Machilīpatnam", "Madanapalle", "Mādugula", "Mandapeta", "Mandasa", "Mangalagiri", "Mārkāpur", "Nagari", "Nāgireddipalli", "Nandigāma", "Nandikotkūr", "Nandyāl", "Narasannapeta", "Narasapur", "Narasaraopet", "Narasingāpuram", "Nārāyanavanam", "Narsīpatnam", "Nāyudupet", "Nellore", "Nidadavole", "Nūzvīd", "Ongole", "Pākāla", "Pālakollu", "Palāsa", "Pālkonda", "Pallevāda", "Palmaner", "Parlākimidi", "Pārvatipuram", "Pavuluru", "Pedana", "pedda nakkalapalem", "Peddāpuram", "Penugonda", "Penukonda", "Phirangipuram", "Pippara", "Pithāpuram", "Polavaram", "Ponnur", "Ponnūru", "Prakasam", "Proddatūr", "Pulivendla", "Punganūru", "Puttaparthi", "Puttūr", "Rājahmundry", "Rāmachandrapuram", "Ramanayyapeta", "Rāmāpuram", "Rampachodavaram", "Rāyachoti", "Rāyadrug", "Rāzām", "Rāzampeta", "Rāzole", "Renigunta", "Repalle", "Sālūr", "Sāmalkot", "Sattenapalle", "Singarāyakonda", "Sompeta", "Srikakulam", "Srīkākulam", "Srīsailain", "Sūlūru", "Tādepalle", "Tādepallegūdem", "Tādpatri", "Tanuku", "Tekkali", "Tirumala", "Tirupati", "Tuni", "Uravakonda", "vadlamuru", "Vadlapūdi", "Venkatagiri", "Vepagunta", "Vetapālem", "Vijayawada", "Vinukonda", "Visakhapatnam", "Vishākhapatnam", "Vizianagaram", "Vizianagaram District", "Vuyyūru", "West Godāvari", "Yanam", "Yanamalakuduru", "Yārāda"],
      'Kerala': ["Ambalapuzha", "Attingal", "Chalakudy", "Changanassery", "Cherthala", "Chittur-Thathamangalam", "Guruvayoor", "Kanhangad", "Kannur", "Kasaragod", "Kayamkulam", "Kochi", "Kodungallur", "Kollam", "Kottayam", "Kozhikode", "Kunnamkulam", "Malappuram", "Mattannur", "Mavelikkara", "Mavoor", "Muvattupuzha", "Nedumangad", "Neyyattinkara", "Nilambur", "Ottappalam", "Palai", "Palakkad", "Panamattom", "Pandalam", "Panniyannur", "Pappinisseri", "Paravoor", "Pathanamthitta", "Peringathur", "Perinthalmanna", "Perumbavoor", "Ponnani", "Punalur", "Quilandy", "Shoranur", "Taliparamba", "Thalassery", "Thiruvananthapuram", "Thodupuzha", "Thrissur", "Tirur", "Vaikom", "Varkala", "Vatakara"], 
    };
  
  
    ZoneType = [
      { value: 'East', viewValue: 'East' },
      { value: 'West', viewValue: 'West' },
      { value: 'North', viewValue: 'North' },
      { value: 'South', viewValue: 'South' },
    ];
  
    DCFirmType = [  
      { value: 'Sole Proprietorship Firm', viewValue: 'Sole Proprietorship Firm' },
      { value: 'LLP/Partnership Firm', viewValue: 'LLP/Partnership Firm' },
      { value: 'Private Limited Company', viewValue: 'Private Limited Company' },
    ];
  
    isLinear = false;
  
    ngOnInit() {
      this.initForm();
    }

    ngOnChange(){
      console.log(this.DC_TESTS_DATA)
    }
  
    initForm() {
      this.formgroup = this._formBuilder.group({
        isConfirmCheckbox: [Boolean, Validators.required],
        providerName: ['', Validators.required],
        providerType: ['', Validators.required],
        DC_Chain: ['', Validators.required],
        Regi_number: ['', Validators.required],
        Inception: ['', ],
        Owner_name: ['', Validators.required],
        PanCard_number: ['', Validators.required],
        nameOnPanCard: ['', Validators.required],
        Adhar_number: ['', [Validators.required, Validators.max, Validators.min] ],
        Adhar_name: ['', Validators.required],
        Owner_name_asper_document: ['', ],
        Center_name: ['', ],
        Accredation: ['',],
        address1: ['',],
        address2: ['', ],
        state: ['', ],
        city: ['',],
        pincode: ['',],
        emailId: ['', [Validators.required, Validators.email ] ],
        confirmEmailId: ['', [Validators.required, Validators.email]],
        emailId2: ['', [ Validators.email ]],
        contact_person1: ['',],
        contact_person2: ['',],
        contact_number1: ['',],
        contact_number2: ['',],
        fax: ['',],

        accountNumber: ['',],
        accountName: ['',],
        bankName: ['',],
        ifscCode: ['',],
        branchName: ['',],
        accountType: ['',],

        Opthlmologya: ['',],
        MBBS_PHYSICIAN: ['',],
        GYNECOLOGY: ['',],
        OPHTHALMOLOGY: ['',],
        MD_PHYSICIAN: ['',],
        MD_PATHOLOGIST: ['',],
        MD_RADIOLOGIST: ['',],
        DMLT: ['',],
        MD_CARDIOLOGY: ['',],
        XRAY_TECHNICIAN: ['',],
        ECG_TECHNICIAN: ['',],
        BAMS_BHMS: ['',],
        ENT: ['',],
        DENTAL: ['',],
        DIET: ['',],

        availableTests: ['',],

        ECG_FACILITY: ['',],
        USG: ['',],
        TREAD_MILL_TEST: ['',],
        TMT_WT_CAPACITY: ['',],
        ECHOCARDIOGRAPHY: ['',],
        FUNDOSCOPY_TEST: ['',],
        DMLT_LABORATORY_TECHNICIAN: ['',],
        BASIC_EYE_TEST: ['',],
        X_RAY: ['',],
        ELISA_HIV: ['',],
        PSA: ['',],
        PAP_SMEAR: ['',],
        MAMMOGRAM: ['',],
        WESTERN_BLOT: ['',],
        PULMONARY_FUNCTION_TEST: ['',],
        URINE_NICOTINE_QUALITITATIVE: ['',],
        HBA1C: ['',],
        HBEAG: ['',],
        AUDIOMETRY: ['',],
        GYNAECOLOGIST: ['',],
        MER: ['',],
        PATHOLOGY: ['',],
        FMR: ['',],
        STOOL_ROUTINE: ['',],

        CARDIOLOGY_OUTSOURCED_CENTRE: ['',],
        PATHOLOGY_OUTSOURCED_CENTR: ['',],
        GYNAECOLOGY_OUTSOURCED_CENTRE: ['',],
        DENTAL_OUTSOURCED_CENTRE: ['',],
        PULMONOLOGY_OUTSOURCED_CENTRE: ['',],
        RADIOLOGY_OUTSOURCED_CENTRE: ['',],

        FirmType: ['', Validators.required],
        pan_image: ['',],
        aadhar: [''],
        Accreditation: [''],
        Registration_Number: [''],
        Ownership: [''],
        TDS: [''],
        dateOnStampPaper: ['', [Validators.required]],
      },
      {
        validator : this.emailMatchValidator
      }
    );
    }
    
    get f() { return this.formgroup.controls; }

    emailMatchValidator(control: AbstractControl) {
      const email = control.get('emailId')?.value;
      const confirmEmail = control.get('confirmEmailId')?.value;
      if (email !== confirmEmail ) {
        control.get('confirmEmailId')?.setErrors({ match: true });
        return { match: true }; 
      } else {
        return null;
      }
    }

  
    formData: FormData = new FormData();
  
    onPanImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('pan_image', file);
      }
    }
    onAadharImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('aadhar_image', file);
      }
    }
    AccreditationImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Accreditation_image', file);
      }
    }
    onCurrent_Bank_StatementImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Current_Bank_Statement_image', file);
      }
    }
    onShopEstablishmentCertificateImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Shop_Establishment_Certificate_image', file);
      }
    }
    onSigningAuthorityLetterImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Authority_Letter_image', file);
      }
    }
    onLLPPartnershipAgreementImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('LLP_Partnership_Agreement_image', file);
      }
    }
    onStampPaperImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('stamp_paper_image', file);
      }
    }

    
    selectedCompanyFirmType: string | undefined;
  
    formgroup: any;
    onSubmit() {
      // if (this.formgroup.invalid) {
      //   alert('All required values should be provided!')
      //   return;
      // }
      this.formData.append('TicketID', this.ticketId);
      this.formData.append('DCID', this.ticketId);
      this.formData.append('providerName', this.formgroup.value.providerName);
      this.formData.append('providerType', this.formgroup.value.providerType);
      this.formData.append('DC_Chain', this.formgroup.value.DC_Chain);
      this.formData.append('Regi_number', this.formgroup.value.Regi_number);
      this.formData.append('Inception', this.formgroup.value.Inception);
      this.formData.append('Owner_name', this.formgroup.value.Owner_name);
      this.formData.append('PanCard_number', this.formgroup.value.PanCard_number);
      this.formData.append('nameOnPanCard', this.formgroup.value.nameOnPanCard);
      this.formData.append('Adhar_number', this.formgroup.value.Adhar_number);
      this.formData.append('Adhar_name', this.formgroup.value.Adhar_name);
      this.formData.append('Owner_name_asper_document', this.formgroup.value.Owner_name_asper_document);
      this.formData.append('Center_name', this.formgroup.value.Center_name);
      // this.formData.append('Grade', this.formgroup.value.Grade);
      // this.formData.append('Tier', this.formgroup.value.Tier);
      this.formData.append('Accredation', this.formgroup.value.Accredation);
      // this.formData.append('Station', this.formgroup.value.Station);
      this.formData.append('address1', this.formgroup.value.address1);
      this.formData.append('address2', this.formgroup.value.address2);
      // this.formData.append('ahplLocation', this.formgroup.value.ahplLocation);
      // this.formData.append('lcLocation', this.formgroup.value.lcLocation);
      this.formData.append('state', this.formgroup.value.state);
      this.formData.append('city', this.formgroup.value.city);
      this.formData.append('pincode', this.formgroup.value.pincode);
      // this.formData.append('zone', this.formgroup.value.zone);
      this.formData.append('emailId', this.formgroup.value.emailId);
      this.formData.append('emailId2', this.formgroup.value.emailId2);
      this.formData.append('contact_person1',this.formgroup.value.contact_person1);
      this.formData.append('contact_person2',this.formgroup.value.contact_person2);
      this.formData.append('contact_number1',this.formgroup.value.contact_number1);
      this.formData.append('contact_number2',this.formgroup.value.contact_number2);
      this.formData.append('fax', this.formgroup.value.fax);
      this.formData.append('accountNumber', this.formgroup.value.accountNumber);
      this.formData.append('accountName', this.formgroup.value.accountName);
      this.formData.append('bankName', this.formgroup.value.bankName);
      this.formData.append('ifscCode', this.formgroup.value.ifscCode);
      this.formData.append('branchName', this.formgroup.value.branchName);
      this.formData.append('accountType', this.formgroup.value.accountType);
      this.formData.append('paymentToBeMadeInFavorOf',this.formgroup.value.paymentToBeMadeInFavorOf);

      this.formData.append('Opthlmologya', this.formgroup.value.Opthlmologya);
      this.formData.append('MBBS_PHYSICIAN', this.formgroup.value.MBBS_PHYSICIAN);
      this.formData.append('GYNECOLOGY', this.formgroup.value.GYNECOLOGY);
      this.formData.append('MD_PHYSICIAN', this.formgroup.value.MD_PHYSICIAN);
      this.formData.append('MD_PATHOLOGIST', this.formgroup.value.MD_PATHOLOGIST);
      this.formData.append('MD_RADIOLOGIST', this.formgroup.value.MD_RADIOLOGIST);
      this.formData.append('MBBS_PHYSICIAN', this.formgroup.value.MBBS_PHYSICIAN);
      this.formData.append('DMLT', this.formgroup.value.DMLT);
      this.formData.append('MD_CARDIOLOGY', this.formgroup.value.MD_CARDIOLOGY);
      this.formData.append('XRAY_TECHNICIAN',this.formgroup.value.XRAY_TECHNICIAN);
      this.formData.append('ECG_TECHNICIAN', this.formgroup.value.ECG_TECHNICIAN);
      this.formData.append('BAMS_BHMS', this.formgroup.value.BAMS_BHMS);
      this.formData.append('ENT', this.formgroup.value.ENT);
      this.formData.append('DENTAL', this.formgroup.value.DENTAL);
      this.formData.append('DIET', this.formgroup.value.DIET);

      this.formData.append('availableTests', this.selectedTestsItems);

      this.formData.append('ECG_FACILITY', this.formgroup.value.ECG_FACILITY);
      this.formData.append('USG', this.formgroup.value.USG);
      this.formData.append('TREAD_MILL_TEST',this.formgroup.value.TREAD_MILL_TEST);
      this.formData.append('TMT_WT_CAPACITY',this.formgroup.value.TMT_WT_CAPACITY);
      this.formData.append('ECHOCARDIOGRAPHY',this.formgroup.value.ECHOCARDIOGRAPHY);
      this.formData.append('MD_RADIOLOGIST', this.formgroup.value.MD_RADIOLOGIST);
      this.formData.append('FUNDOSCOPY_TEST',this.formgroup.value.FUNDOSCOPY_TEST);
      this.formData.append('DMLT_LABORATORY_TECHNICIAN',this.formgroup.value.DMLT_LABORATORY_TECHNICIAN);
      this.formData.append('BASIC_EYE_TEST', this.formgroup.value.BASIC_EYE_TEST);
      this.formData.append('X_RAY', this.formgroup.value.X_RAY);
      this.formData.append('ELISA_HIV', this.formgroup.value.ELISA_HIV);
      this.formData.append('PSA', this.formgroup.value.PSA);
      this.formData.append('ENT', this.formgroup.value.ENT);
      this.formData.append('PAP_SMEAR', this.formgroup.value.PAP_SMEAR);
      this.formData.append('MAMMOGRAM', this.formgroup.value.MAMMOGRAM);
      this.formData.append('WESTERN_BLOT', this.formgroup.value.WESTERN_BLOT);
      this.formData.append('PULMONARY_FUNCTION_TEST',this.formgroup.value.PULMONARY_FUNCTION_TEST);
      this.formData.append('URINE_NICOTINE_QUALITITATIVE',this.formgroup.value.URINE_NICOTINE_QUALITITATIVE);
      this.formData.append('HBA1C', this.formgroup.value.HBA1C);
      this.formData.append('HBEAG', this.formgroup.value.HBEAG);
      this.formData.append('AUDIOMETRY', this.formgroup.value.AUDIOMETRY);
      this.formData.append('GYNAECOLOGIST', this.formgroup.value.GYNAECOLOGIST);
      this.formData.append('MER', this.formgroup.value.MER);
      this.formData.append('DENTAL', this.formgroup.value.DENTAL);
      this.formData.append('PATHOLOGY', this.formgroup.value.PATHOLOGY);
      this.formData.append('FMR', this.formgroup.value.FMR);
      this.formData.append('STOOL_ROUTINE', this.formgroup.value.STOOL_ROUTINE);

      this.formData.append('CARDIOLOGY_OUTSOURCED_CENTRE',this.formgroup.value.CARDIOLOGY_OUTSOURCED_CENTRE);
      this.formData.append('PATHOLOGY_OUTSOURCED_CENTR',this.formgroup.value.PATHOLOGY_OUTSOURCED_CENTR);
      this.formData.append('GYNAECOLOGY_OUTSOURCED_CENTRE',this.formgroup.value.GYNAECOLOGY_OUTSOURCED_CENTRE);
      this.formData.append('ENTAL_OUTSOURCED_CENTRE',this.formgroup.value.DENTAL_OUTSOURCED_CENTRE);
      this.formData.append('PULMONOLOGY_OUTSOURCED_CENTRE',this.formgroup.value.PULMONOLOGY_OUTSOURCED_CENTRE);
      this.formData.append('RADIOLOGY_OUTSOURCED_CENTRE',this.formgroup.value.RADIOLOGY_OUTSOURCED_CENTRE);
      this.formData.append('FirmType', this.formgroup.value.FirmType);

      console.log('Form submitted!', this.formgroup.value);
      
      // else {
      const url = '/selfempanelment/add/' + this.ticketId + '/';
      this.commonService.postMethod(url, this.formData).subscribe(
        (res: any) => {
          console.log('res', res);
          // alert("Form Submitted Successfully");
          this.toastrService.success('Form Submitted Successfully', 'Successful', {
            closeButton: true,
            timeOut: 5000,
          });
          this.router.navigateByUrl("/selfempanelment/thankyou")
        },
        (err: any) => {
          const error = err['error'] 
          console.log(error);
          this.toastrService.error(error, 'Error', {
            closeButton: true,
            timeOut: 5000,
          });
          // alert('All required values should be provided!')
        }
      );
      // }
    }

    cities: string[] = [];

    onStateChange(event: Event) {
      const selectedState = (event.target as HTMLSelectElement).value;
      this.cities = this.stateCitiesMap[selectedState] || [];
    }
  }
