import { Component, OnInit } from '@angular/core';
import { shareService } from '../shareService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  code: string;
  name: string;
  email: string;
  tel: string;
  LineID: string;
  address: string;
  _id: string;
  customers: [];
  constructor(private shareService: shareService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http
      .get(this.shareService.serverPath + '/customerAll')
      .subscribe((res: any) => {
        this.customers = res;
      });
  }

  save() {
    if (confirm('ยืนยันการบันทึก')) {
      var params = {
        code: this.code,
        name: this.name,
        email: this.email,
        tel: this.tel,
        LineID: this.LineID,
        address: this.address,
        _id: null,
      };

      var path = this.shareService.serverPath + '/customerSave';
      this.customerClear();


      if (this._id != null) {
        path = this.shareService.serverPath + '/customerUpdate';
        this.customerClear();
        params._id = this._id;
      }
      this.http.post(path, params).subscribe((res: any) => {
        alert('Save success');
        this.loadData();
        this.customerClear();
        this._id = null;
      });
    }
  }
  customerDelete(item) {
    if (confirm('ยืนยันการลบ ?')) {
      var params = {
        _id: item._id,
      };
      var path = this.shareService.serverPath + '/customerDelete';
      this.http.post(path, params).subscribe((res: any) => {
        alert('ลบรายการแล้ว');
        this.loadData();
      });
    }
  }
  customerInfo(item){
    this.code = item.code,
    this.name = item.name,
    this.email = item.email,
    this.tel = item.tel,
    this.address = item.address,
    this.LineID = item.LineID,
    this._id = item._id
  }

  customerClear(){
    this.code = '',
    this.name = '',
    this.email = '',
    this.tel = '',
    this.address = '',
    this.LineID = ''
  }

}
