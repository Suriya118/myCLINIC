import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
})
export class LeftMenuComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  dashboard() {
    this.router.navigate(['']);
  }
  clinic() {
    this.router.navigate(['clinic']);
  }
  customer() {
    this.router.navigate(['customer']);
  }
  pet() {
    this.router.navigate(['pet']);
  }
  repair() {
    this.router.navigate(['repair']);
  }
  mediseen() {
    this.router.navigate(['mediseen']);
  }
  report() {
    this.router.navigate(['report']);
  }
}
