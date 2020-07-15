import { Component, OnInit } from '@angular/core';
import { shareService } from '../shareService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  searchs: any;
  search = {
    from: null,
    to: null,
  };
  totalPrice: Number = 0;

  constructor(private shareService: shareService, private http: HttpClient) {}

  ngOnInit(): void {}

  showReport() {
    this.http
      .post(this.shareService.serverPath + '/reportAll', this.search)
      .subscribe((res: any) => {
        this.searchs = res;

        for (var i = 0; i < res.length; i++) {
          this.totalPrice += res[i].price;
        }
      });
  }
}
