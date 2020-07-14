import { Component, OnInit } from '@angular/core';
import { shareService } from '../shareService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent implements OnInit {
  constructor(private shareService: shareService, private http: HttpClient) {}

  customers: any;
  customer = {
    name: null,
    code: null,
    _id: null,
  };

  pet = {
    customer_id: null,
    name: null,
    remark: null,
    _id: null,
  };

  pets: any;

  ngOnInit(): void {
    this.laodCustomer();
    this.loadPets();
  }

  laodCustomer() {
    this.http
      .get(this.shareService.serverPath + '/customerAll')
      .subscribe((res: any) => {
        this.customers = res;
      });
  }

  chooseCustomer(customer) {
    this.customer = customer;
  }

  save() {
    this.pet.customer_id = this.customer._id;
    this.http
      .post(this.shareService.serverPath + '/petSave', this.pet)
      .subscribe((res: any) => {
        this.loadPets();
      });
  }

  loadPets() {
    this.http
      .get(this.shareService.serverPath + '/petAll')
      .subscribe((res: any) => {
        this.pets = res;
        this.customer.name = '';
        this.pet.name = '';
        this.pet.remark = '';
      });
  }

  deletePets(item) {
    var params = {
      _id: item._id,
    };

    if (confirm('ยืนยันการลบ ?')) {
      this.http
        .post(this.shareService.serverPath + '/petDelete', params)
        .subscribe((res: any) => {
          alert('ลบรายการแล้ว');
          this.loadPets();
        });
    }
  }

  editPet(item) {
    this.pet = item;
    this.customer = item.customer[0];
  }
}
