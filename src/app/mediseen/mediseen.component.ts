import { Component, OnInit } from '@angular/core';
import { shareService } from '../shareService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mediseen',
  templateUrl: './mediseen.component.html',
  styleUrls: ['./mediseen.component.css'],
})
export class MediseenComponent implements OnInit {
mediseens : any
mediseen= {
    code: null,
    name: null,
    buy: null,
    sale: null,
    remark: null,
    _id: null,
  };

  constructor(private shareService: shareService, private http: HttpClient) {}

  ngOnInit(): void { this.loadmediseen() }

  save() {
    this.http
      .post(this.shareService.serverPath + '/mediseenSave', this.mediseen)
      .subscribe((res: any) => {
        alert('บันทึกรายการแล้ว');
        this.loadmediseen();
        this.mediseen= {
          code: null,
          name: null,
          buy: null,
          sale: null,
          remark: null,
          _id:null
        };
      });
  }
  loadmediseen() {
    this.http
      .get(this.shareService.serverPath + '/mediseenAll')
      .subscribe((res: any) => {
        this.mediseens = res;
      });
  }

  mediseenDelete(item){
    if (confirm('ยืนยันการลบ ?')) {
      var params = {
        _id: item._id,
      };
      var path = this.shareService.serverPath + '/mediseenDelete';
      this.http.post(path, params).subscribe((res: any) => {
        alert('ลบรายการแล้ว');
        this.loadmediseen();
      });
    }
  }
  mediseenInfo(item){
    this.mediseen = {
      code: item.code,
      name: item.name,
      buy: item.buy,
      sale: item.sale,
      remark: item.remark,
      _id : item._id
    };
  }
}
