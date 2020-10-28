import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
selector: "app-header-nav",
templateUrl: "./header-nav.component.html",
encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
currentuser:any;
first_name:any;
last_name:any;
constructor()  {

}
ngOnInit()  {
    this.currentuser = JSON.parse(localStorage.getItem("currentUserdetails"))
    this.first_name = this.currentuser["user_firstName"]
    this.last_name = this.currentuser["user_lastName"]
}
ngAfterViewInit()  {

mLayout.initHeader();

}

}