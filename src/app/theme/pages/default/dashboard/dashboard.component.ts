import { Component, OnInit,ViewEncapsulation,AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { RouterResponseService } from '../../../../_services/router-response.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit{
  Bitcoin:any;
  Ethereum:any;
  Accountbalance:any;
  alertsign:any;
  status:any;
  constructor(private _script: ScriptLoaderService, private _router:RouterResponseService,private toaster: ToastrService)  {}

  ngOnInit() {
  }
  
  ngAfterViewInit()  {
    this._router.getBitcoinPrice()
    .subscribe((res) => {
      this.Bitcoin = res["data"]   
    })
    this._router.getEthereumPrice()
    .subscribe((res) => {
      this.Ethereum = res["data"]
    })
    this._router.getAccountBalance()
    .subscribe((res) => {
      this.Accountbalance = res["data"]
    })
    this._router.getBotStatus()
      .subscribe((res) => {
        if(res["data"].botStarted){
          this.alertsign = "alert-success"
          this.status = "Bot Active"
        }
        else{
          this.alertsign = "alert-warning"
          this.status = "Bot Inactive"
        }
      })
    window.setTimeout(() => {
      this._router.getBotStatus()
      .subscribe(
        res => {
          if(res["data"].botStarted){
            this.alertsign = "alert-success"
            this.status = "Bot Active"
          }
          else{
            this.alertsign = "alert-warning"
            this.status = "Bot Inactive"
          }
      })
    },60000)
  }
  BitcoinPrice(){
    this._router.getBitcoinPrice()
    .subscribe((res) => {
      this.Bitcoin = res["data"]
      this.toaster.success("Bitcoin price refreshed.")
    })
  }
  EthereumPrice(){
    this._router.getEthereumPrice()
    .subscribe((res) => {
      this.Ethereum = res["data"]
      this.toaster.success("Ethereum price refreshed.")
    })
  }
  AccountBalance(){
    this._router.getAccountBalance()
    .subscribe((res) => {
      this.AccountBalance = res["data"]
      this.toaster.success("Account Balance refreshed.")
    })
  }
  GetBotStatus(){
    this._router.getBotStatus()
      .subscribe((res) => {
          if(res["data"].botStarted){
            this.alertsign = "alert-success"
            this.status = "Bot Active"
          }
          else{
            this.alertsign = "alert-warning"
            this.status = "Bot Inactive"
          }
        }
      )
  }
}
