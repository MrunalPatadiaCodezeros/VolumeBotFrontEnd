import { Response } from '@angular/http';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from "@angular/forms";
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { RouterResponseService } from '../../../../_services/router-response.service';
import { first } from 'rxjs-compat/operator/first';


@Component({
selector: "app-manual",
templateUrl: "./manual.component.html",
encapsulation: ViewEncapsulation.None,
})

/**
 * Main Changes in .ts File
 * <!-- formGroup :- manualOrder : autoVolumeGenratOrder-&-autoPriceGenratOrder----------------------------------------------------------------|complete| -->
 * <!-- (ngSubmit)="StartBotManual() change to StartVolumeBotManual,StartPriceBotManual -->
 * <!-- CHANGES IN textbox minimumVolume and maximunVolume both -->
 * <!-- id="inputQuantity" to minimumVolume || maximunVolume at 7 lable(for) input(id) -->
 * <!-- formControlName="quantity" to minimumVolumeQuantity with *ngIf also -->
 * <!-- id="inputPrice" to inputTime formControlName="price" to Time -->
 * <!-- Change place Order buTTON *ngIf condition-----------------cHECK-isETHbuyactive--------------------------------|pENDING| -->
 * <!-- Change place Order buTTON click (click)="StopBot({pair:'PPP/ETH',side:'buy'})"--------------------------------|pENDING| -->
 * Change in StartVolumeBotManual,StartPriceBotManual functions,
 * *** [check] changeVolumeAndPriceGenrator,StopBot,getorder_id
 */
export class ManualComponent implements OnInit, AfterViewInit {
  message:any;
  alertclass;
  alertstopclass;
  stopmessage:any;
  // Common Variable by ngx-toastr
  // displaystyle = {
  //   'display':"none"
  // };
  // displaystopstyle = {
  //   'display':"none"
  // };
  // displayvalidmsg = {
  //   'display':"none"
  // };
  filter:any;
  orderstatusmsg:any;
  orderstatusclass;
  orderstatus = {
    'display':"none"
  }
  classVolumeForm = ""
  classPriceForm = "notDisplay"
  constructor(private _script: ScriptLoaderService, private _router:RouterResponseService)  {}
  
  // PPPETH Volume Genrat Order
  autoPPPETHVolumeGenratOrder = new FormGroup({
  PPPETHminimumVolumeQuantity: new FormControl("",Validators.required),
  PPPETHmaximumVolumeQuantity: new FormControl("",Validators.required),
  PPPETHtime: new FormControl("",Validators.required)
  });
  get PPPETHminimumVolumeQuantity(){return this.autoPPPETHVolumeGenratOrder.get("PPPETHminimumVolumeQuantity")};
  get PPPETHmaximumVolumeQuantity(){return this.autoPPPETHVolumeGenratOrder.get("PPPETHmaximumVolumeQuantity")};
  get PPPETHtime(){return this.autoPPPETHVolumeGenratOrder.get("PPPETHtime")};

  // PPPBTC Volume Genrat Order
  autoPPPBTCVolumeGenratOrder = new FormGroup({
  PPPBTCminimumVolumeQuantity: new FormControl("",Validators.required),
  PPPBTCmaximumVolumeQuantity: new FormControl("",Validators.required),
  PPPBTCtime: new FormControl("",Validators.required)
  });
  get PPPBTCminimumVolumeQuantity(){return this.autoPPPBTCVolumeGenratOrder.get("PPPBTCminimumVolumeQuantity")};
  get PPPBTCmaximumVolumeQuantity(){return this.autoPPPBTCVolumeGenratOrder.get("PPPBTCmaximumVolumeQuantity")};
  get PPPBTCtime(){return this.autoPPPBTCVolumeGenratOrder.get("PPPBTCtime")};

  // PPPETH Price Genrat Order
  autoPPPETHPriceGenratOrder = new FormGroup({
  PPPETHprice: new FormControl("",Validators.required),
  PPPETHtimeforprice: new FormControl("",Validators.required),
  });
  get PPPETHprice(){return this.autoPPPETHPriceGenratOrder.get("PPPETHprice")};
  get PPPETHtimeforprice(){return this.autoPPPETHPriceGenratOrder.get("PPPETHtimeforprice")};

  // PPPBTC Price Genrat Order
  autoPPPBTCPriceGenratOrder = new FormGroup({
  PPPBTCprice: new FormControl("",Validators.required),
  PPPBTCtimeforprice: new FormControl("",Validators.required),
  });
  get PPPBTCprice(){return this.autoPPPBTCPriceGenratOrder.get("PPPBTCprice")};
  get PPPBTCtimeforprice(){return this.autoPPPBTCPriceGenratOrder.get("PPPBTCtimeforprice")};

  OrderStatus = new FormGroup({
    order_id : new FormControl("",[Validators.required,Validators.pattern('[0-9]*')])
  });
  get order_id(){return this.OrderStatus.get("order_id")};

  ngOnInit(){
  }

  ngAfterViewInit()  {
  }

  changeVolumeAndPriceGenrator(event){
    console.log(event.target.checked);
    
    if (event.target.checked){
      this.classVolumeForm = "notDisplay"
      this.classPriceForm = ""
    }else {
      this.classVolumeForm = ""
      this.classPriceForm = "notDisplay"
    }
  }
  
  StartPPPETHVolumeBot(ExPair){
    // inputs:- pair,minimumVolumeQuantity,maximumVolumeQuantity,time  
    this.autoPPPETHVolumeGenratOrder.value.pair = ExPair.pair;
    // Check Account Balance is Grater then Last Traded Price
    var responseAccountBalance;
    var currentPrice;
    var minimumRequireBalance;
    // call exchange/getAccountBalance
    this._router.getAccountBalance().subscribe(res => {
      let responseAccountBalanceObj = res['data'];
      for (const element of responseAccountBalanceObj) {
          if(element.currency === "ETH"){
            responseAccountBalance = parseFloat(element.balance);
          }
      }
      //call "exchange/getEthereumPrice"
      this._router.getEthereumPrice().subscribe((res) => {
        currentPrice = parseFloat(res['data'][0].average_price);
        // 10 orders are place in one batch 
        minimumRequireBalance = currentPrice * 10; 
        console.log('responseAccountBalance',responseAccountBalance);
        console.log('currentPrice',currentPrice);
        console.log('minimumRequireBalance',minimumRequireBalance);
        if(responseAccountBalance > minimumRequireBalance){
          console.log('success');
        //call user/startBotManual    
          this._router.startbotManual(this.autoPPPETHVolumeGenratOrder.value)
          .subscribe((res) => { 
            this.message = res["message"];
            this.alertclass = "alert-success";
            // Show res success message
          },
          err => {
            this.message = err.error["message"];
            this.alertclass = "alert-danger";
            // Show res Error message
          });
          this.autoPPPETHVolumeGenratOrder.reset();
        }else{
          console.log('else');
          // Show Error Message Balance not require
        }
      })
    })
  }

  StartPPPBTCVolumeBot(ExPair){
    // inputs:- pair,minimumVolumeQuantity,maximumVolumeQuantity,time  
    this.autoPPPETHVolumeGenratOrder.value.pair = ExPair.pair;
    // Check Account Balance is Grater then Last Traded Price
    var responseAccountBalance;
    var currentPrice;
    var minimumRequireBalance;
    // call exchange/getAccountBalance
    this._router.getAccountBalance().subscribe(res => {
      let responseAccountBalanceObj = res['data'];
      for (const element of responseAccountBalanceObj) {
          if(element.currency === "BTC"){
            responseAccountBalance = parseFloat(element.balance);
          }
      }
      //call "exchange/getBitcoinPrice"
      this._router.getBitcoinPrice().subscribe((res) => {
        currentPrice = parseFloat(res['data'][0].average_price);
        // 10 orders are place in one batch 
        minimumRequireBalance = currentPrice * 10; 
        console.log('responseAccountBalance',responseAccountBalance);
        console.log('currentPrice',currentPrice);
        console.log('minimumRequireBalance',minimumRequireBalance);
        if(responseAccountBalance > minimumRequireBalance){
          console.log('success');
        //call user/startBotManual    
          this._router.startbotManual(this.autoPPPETHVolumeGenratOrder.value)
          .subscribe((res) => { 
            this.message = res["message"];
            this.alertclass = "alert-success";
            // Show res success message
          },
          err => {
            this.message = err.error["message"];
            this.alertclass = "alert-danger";
            // Show res Error message
          });
          this.autoPPPETHVolumeGenratOrder.reset();
        }else{
          console.log('success');
          // Show Error Message Balance not require
        }
      })
    })
  }


  StartPPPETHPriceBot(ExPair){
    console.log('pair',ExPair)
    // inputs:- pair,price,time
    this.autoPPPETHVolumeGenratOrder.value.pair = ExPair.pair;
    // Check Account Balance is Grater then Last Traded Price
    var responseAccountBalance;
    var currentPrice;
    var minimumRequireBalance;
    // call exchange/getAccountBalance
    this._router.getAccountBalance().subscribe(res => {
      let responseAccountBalanceObj = res['data'];
      for (const element of responseAccountBalanceObj) {
          if(element.currency === "BTC"){
            responseAccountBalance = parseFloat(element.balance);
          }
      }
      //call "exchange/getEthereumPrice"
      this._router.getEthereumPrice().subscribe((res) => {
        currentPrice = parseFloat(res['data'][0].average_price);
        // 10 orders are place in one batch 
        minimumRequireBalance = currentPrice * 10; 
        console.log('responseAccountBalance',responseAccountBalance);
        console.log('currentPrice',currentPrice);
        console.log('minimumRequireBalance',minimumRequireBalance);
        if(responseAccountBalance > minimumRequireBalance){
          console.log('success');
        //call user/startBotManual    
          this._router.startbotManual(this.autoPPPETHVolumeGenratOrder.value)
          .subscribe((res) => { 
            this.message = res["message"];
            this.alertclass = "alert-success";
            // Show res success message
          },
          err => {
            this.message = err.error["message"];
            this.alertclass = "alert-danger";
            // Show res Error message
          });
          this.autoPPPETHVolumeGenratOrder.reset();
        }else{
          console.log('success');
          // Show Error Message Balance not require
        }
      })
    })  
  }

  StartPPPBTCPriceBot(ExPair){
    console.log('pair',ExPair)
    // inputs:- pair,price,time  
    this.autoPPPETHVolumeGenratOrder.value.pair = ExPair.pair;
    // Check Account Balance is Grater then Last Traded Price
    var responseAccountBalance;
    var currentPrice;
    var minimumRequireBalance;
    // call exchange/getAccountBalance
    this._router.getAccountBalance().subscribe(res => {
      let responseAccountBalanceObj = res['data'];
      for (const element of responseAccountBalanceObj) {
          if(element.currency === "BTC"){
            responseAccountBalance = parseFloat(element.balance);
          }
      }
      //call "exchange/getBitcoinPrice"
      this._router.getBitcoinPrice().subscribe((res) => {
        currentPrice = parseFloat(res['data'][0].average_price);
        // 10 orders are place in one batch 
        minimumRequireBalance = currentPrice * 10; 
        console.log('responseAccountBalance',responseAccountBalance);
        console.log('currentPrice',currentPrice);
        console.log('minimumRequireBalance',minimumRequireBalance);
        if(responseAccountBalance > minimumRequireBalance){
          console.log('success');
        //call user/startBotManual    
          this._router.startbotManual(this.autoPPPETHVolumeGenratOrder.value)
          .subscribe((res) => { 
            this.message = res["message"];
            this.alertclass = "alert-success";
            // Show res success message
          },
          err => {
            this.message = err.error["message"];
            this.alertclass = "alert-danger";
            // Show res Error message
          });
          this.autoPPPETHVolumeGenratOrder.reset();
        }else{
          console.log('success');
          // Show Error Message Balance not require
        }
      })
    }) 
  }

  StopBot(obj){
    console.log('pair',obj.pair);
    this._router.Stopbot({
      "pair": obj.pair,
    //  "pair" : "PPP/ETH",
      "side" : obj.side
    })
    .subscribe(
      res => {
        this.stopmessage = res["message"];
        this.alertstopclass = "alert-success";
        // this.displaystopstyle = {
        //   "display":"block"
        // };
        // window.setTimeout(()=>{
        //   this.displaystopstyle = {
        //     "display":"none"
        //   };
        // },10000);
      },
      err=>{
        this.stopmessage = err["message"] ;
        this.alertstopclass = "alert-danger";
        // this.displaystopstyle = {
        //   "display":"block"
        // };
        // window.setTimeout(()=>{
        //   this.displaystopstyle = {
        //     "display":"none"
        //   };
        // },10000);
      }
    );
  }
 
}