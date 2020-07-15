import { Component, OnInit } from '@angular/core';
import { shareService } from '../shareService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css'],
})
export class RepairComponent implements OnInit {
  customers: any;
  customer = {
    name: null,
    code: null,
    _id: null,
  };

  pets: any;
  pet = {
    name: null,
    _id: null,
  };

  repairs: any;
  repair = {
    problem: null,
    price: null,
    remark: null,
  };

  mediseens: any;

  repairMediseen = {
    _id: null,
    qty: null,
    remark: null,
    mediseen_id: null,
    repair_id: null,
  };

  historys: any;

  constructor(private shareService: shareService, private http: HttpClient) {}
  ngOnInit(): void {}

  loadCustomer() {
    this.http
      .get(this.shareService.serverPath + '/customerAll')
      .subscribe((res: any) => {
        this.customers = res;
      });
  }
  chooseCustomer(customer) {
    this.customer = customer;
    this.loadPetOfCustomer();
  }

  loadPetOfCustomer() {
    this.http
      .post(this.shareService.serverPath + '/petOfCustomer', this.customer)
      .subscribe((res: any) => {
        this.pets = res;
      });
  }
  choosePet(item) {
    this.pet = item;
    this.loadRepairOfPet();
  }

  saveRepair() {
    var params = {
      repair: this.repair,
      pet: this.pet,
    };
    console.log(params);
    this.http
      .post(this.shareService.serverPath + '/repairSave', params)
      .subscribe((res: any) => {
        alert('บันทึกเสร็จเรียบร้อย');
        this.loadRepairOfPet();
        this.repair = {
          problem: null,
          price:null,
          remark:null,
        };
      });
  }

  loadRepairOfPet() {
    var params = {
      pet_id: this.pet._id,
    };
    this.http
      .post(this.shareService.serverPath + '/repairOfPet', params)
      .subscribe((res: any) => {
        this.repairs = res;
      });
  }
  removeRepair(item) {
    if (confirm('ยืนยันการลบ ?')) {
      this.http
        .post(this.shareService.serverPath + '/repairRemove', item)
        .subscribe((res: any) => {
          alert('ลบเรียบร้อย');
          this.loadRepairOfPet();
        });
    }
  }
  editRepair(item) {
    this.repair = item;
  }


  modalRepairMediseen(item){
    this.repairMediseen.repair_id = item._id;
    this.http
      .get(this.shareService.serverPath + '/mediseenAll', item)
      .subscribe((res: any) => {
        this.mediseens = res;
      });
  }

  saveRepairMediseen(){
    if (confirm('ต้องการบันทึกข้อมูลหรือไม่ ?')) {
      this.http
        .post(this.shareService.serverPath + '/saveRepairMediseen', this.repairMediseen)
        .subscribe((res: any) => {
          alert('บันทึกเรียบร้อย');
        });
    }
  }

  chooseMediseen(item){
      this.repairMediseen.mediseen_id = item._id;
      this.repairMediseen.qty = null;
      this.repairMediseen.remark = null;
  }

  ModalHistory(item){
    this.http
      .post(this.shareService.serverPath + '/historyAll', item)
      .subscribe((res: any) => {
        this.historys = res;
      });
  }
  removeHistory(item){
    if (confirm('ยืนยันการลบ ?')) {
      this.http
        .post(this.shareService.serverPath + '/removeHistory', item)
        .subscribe((res: any) => {
          alert('ลบเรียบร้อย');
          var netItem = {
            _id: item.repair_id,
          };
          //this.modalHistory(netItem);
        });
    }
  }
  editHistory(item){
    this.repairMediseen = item;
  }
}
