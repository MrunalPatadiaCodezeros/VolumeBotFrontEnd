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
  displaystyle = {
    'display':"none"
  };
  displaystopstyle = {
    'display':"none"
  };
  displayvalidmsg = {
    'display':"none"
  };
  filter:any;
  orderstatusmsg:any;
  orderstatusclass;
  orderstatus = {
    'display':"none"
  }
  classVolumeForm = ""
  classPriceForm = "notDisplay"
  constructor(private _script: ScriptLoaderService, private _router:RouterResponseService)  {}
  
 

  // manualOrder = new FormGroup({
  //   pair: new FormControl("PPP/ETH",Validators.required),
  //   quantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
  //   price: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
  //   side: new FormControl("buy",Validators.required),
  // });

  // autoGenrateOrder :- autoVolumeGenratOrder
  autoVolumeGenratOrder = new FormGroup({
    pair: new FormControl("",Validators.required),
    minimumVolumeQuantity: new FormControl("",Validators.required),
    maximumVolumeQuantity: new FormControl("",Validators.required),
    time: new FormControl("",[Validators.required,Validators.pattern('[1-24.]*')]),
    // quantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    // price: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    // side: new FormControl("buy",Validators.required),
  });

  // PPPETH Volume Genrat Order
  autoPPPETHminimumVolumeGenratOrder = new FormGroup({
  PPPETHminimumVolumeQuantity: new FormControl("",Validators.required),
  PPPETHmaximumVolumeQuantity: new FormControl("",Validators.required),
  PPPETHtime: new FormControl("",Validators.required)
  });
  get PPPETHminimumVolumeQuantity(){return this.autoVolumeGenratOrder.get("PPPETHminimumVolumeQuantity")};
  get PPPETHmaximumVolumeQuantity(){return this.autoVolumeGenratOrder.get("PPPETHmaximumVolumeQuantity")};
  get PPPETHtime(){return this.autoVolumeGenratOrder.get("PPPETHtime")};


  autoPriceGenratOrder = new FormGroup({
    pair: new FormControl("",Validators.required),
    price: new FormControl(""),
    time: new FormControl("",[Validators.required,Validators.pattern('[1-24.]*')])
  });

  // get pair(){return this.autoVolumeGenratOrder.get("pair")};
  get minimumVolumeQuantity(){return this.autoVolumeGenratOrder.get("minimumVolumeQuantity")};
  get maximumVolumeQuantity(){return this.autoVolumeGenratOrder.get("maximumVolumeQuantity")};
  get time(){return this.autoVolumeGenratOrder.get("time")};
  get price(){return this.autoVolumeGenratOrder.get("price")};

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
  // startbotManual : function call API our URL: ''  
  // startbotManual(orderDetails){
  //   return this.http.post(this.api_url + "user/startBotManual",orderDetails);
  // }
  
  StartPPPETHVolumeBot(ExPair){
    // inputs:- pair,minimumVolumeQuantity,maximumVolumeQuantity,time  
    this.autoVolumeGenratOrder.value.pair = ExPair.pair;
    console.log('-->',this.autoVolumeGenratOrder.value);
    // Check Account Balance is Grater then Last Traded Price
    var responseAccountBalance;
    var currentPrice;
    this._router.getAccountBalance().subscribe(res => {
       console.log('-----res--from--getAccountBalance-------',res);
      let responseAccountBalanceObj = res['data'];
       console.log('->',responseAccountBalanceObj);
      for (const element of responseAccountBalanceObj) {
          if(element.currency === "ETH"){
            responseAccountBalance = parseFloat(element.balance);
          }
      }
    })



    //   if(this.autoVolumeGenratOrder.value.pair == "PPP/ETH"){
    //     this.filter = res["data"].find(element => element.currency == "ETH");
    //     console.log('-this.filter->',this.filter);
    //   }
    //   else if(this.autoVolumeGenratOrder.value.pair == "PPP/BTC"){
    //     this.filter = res["data"].find(element => element.currency == "BTC");
    //     console.log('->',this.filter);
    //   }
    
    // let accountBalance = res.balance;
    this._router.getBitcoinPrice().subscribe((res) => {
      console.log('getBitcoinPrice',res['average_price']);
      currentPrice = parseFloat(res['average_price']);
    })
    // currentPrice = res.last_traded_price
    console.log('->',responseAccountBalance);
    console.log('->',currentPrice);
    if(responseAccountBalance > currentPrice){
        console.log('-------------------- TRUE ---------------');  
    }else{
      console.log('-------------------- FALSE ---------------')
    }
    // }) 
    // // sample res -> {currency: "ETH", balance: "0.49733834"}
    
        this._router.startbotManual(this.autoVolumeGenratOrder.value)
        .subscribe((res) => { 
          this.message = res["message"];
          this.alertclass = "alert-success";
          this.displaystyle = {
            "display":"block"
          };
          window.setTimeout(()=>{
            this.displaystyle = {
              "display":"none"
            };
          },10000);
        },
        err => {
          this.message = err.error["message"];
          this.alertclass = "alert-danger";
          this.displaystyle = {
            "display":"block"
          };
          window.setTimeout(()=>{
            this.displaystyle = {
              "display":"none"
            };
          },10000);
        });
        this.autoVolumeGenratOrder.reset();
      // }
    // });
  }

  StartPPPBTCVolumeBot(ExPair){
    // inputs:- pair,minimumVolumeQuantity,maximumVolumeQuantity,time  
    this.autoVolumeGenratOrder.value.pair = ExPair.pair;
    console.log('-->',this.autoVolumeGenratOrder.value);
    // Check Account Balance is Grater then Last Traded Price
    // this._router.getAccountBalance().subscribe(res => {
    //   console.log('-----res-----',res);

    //   if(this.autoVolumeGenratOrder.value.pair == "PPP/ETH"){
    //     this.filter = res["data"].find(element => element.currency == "ETH");
    //     console.log('-this.filter->',this.filter);
    //   }
    //   else if(this.autoVolumeGenratOrder.value.pair == "PPP/BTC"){
    //     this.filter = res["data"].find(element => element.currency == "BTC");
    //     console.log('->',this.filter);
    //   }
    // let currentPrice;
    // let accountBalance = res.balance;
    // this._router.startbotManual(this.autoVolumeGenratOrder.value).subscribe((res) => {
    // currentPrice = res.last_traded_price
    //  if(accountBalance > currentPrice){
    //    PUT startbotManual Code  
    //  }
    // }) 
    // // sample res -> {currency: "ETH", balance: "0.49733834"}
    
        this._router.startbotManual(this.autoVolumeGenratOrder.value)
        .subscribe((res) => { 
          this.message = res["message"];
          this.alertclass = "alert-success";
          this.displaystyle = {
            "display":"block"
          };
          window.setTimeout(()=>{
            this.displaystyle = {
              "display":"none"
            };
          },10000);
        },
        err => {
          this.message = err.error["message"];
          this.alertclass = "alert-danger";
          this.displaystyle = {
            "display":"block"
          };
          window.setTimeout(()=>{
            this.displaystyle = {
              "display":"none"
            };
          },10000);
        });
        this.autoVolumeGenratOrder.reset();
      // }
    // });
  }


  StartPPPETHPriceBot(pair){
    console.log('pair',pair)
    // inputs:- pair,price,time  
    // console.log('-->',this.autoPriceGenratOrder.value);
    // this._router.getAccountBalance().subscribe(res => {
    //   if(this.autoVolumeGenratOrder.value.pair == "PPP/ETH"){
    //     this.filter = res["data"].find(element => element.currency == "ETH");
    //   }
    //   else if(this.autoVolumeGenratOrder.value.pair == "PPP/BTC"){
    //     this.filter = res["data"].find(element => element.currency == "BTC");
    //   }
    //     this._router.startbotManual(this.autoVolumeGenratOrder.value)
    //     .subscribe((res) => { 
    //       this.message = res["message"];
    //       this.alertclass = "alert-success";
    //       this.displaystyle = {
    //         "display":"block"
    //       };
    //       window.setTimeout(()=>{
    //         this.displaystyle = {
    //           "display":"none"
    //         };
    //       },10000);
    //     },
    //     err => {
    //       this.message = err.error["message"];
    //       this.alertclass = "alert-danger";
    //       this.displaystyle = {
    //         "display":"block"
    //       };
    //       window.setTimeout(()=>{
    //         this.displaystyle = {
    //           "display":"none"
    //         };
    //       },10000);
    //     });
    //     this.autoVolumeGenratOrder.reset();
    // });
  }

  StartPPPBTCPriceBot(pair){
    console.log('pair',pair)
    // inputs:- pair,price,time  
    // console.log('-->',this.autoPriceGenratOrder.value);
    // this._router.getAccountBalance().subscribe(res => {
    //   if(this.autoVolumeGenratOrder.value.pair == "PPP/ETH"){
    //     this.filter = res["data"].find(element => element.currency == "ETH");
    //   }
    //   else if(this.autoVolumeGenratOrder.value.pair == "PPP/BTC"){
    //     this.filter = res["data"].find(element => element.currency == "BTC");
    //   }
    //     this._router.startbotManual(this.autoVolumeGenratOrder.value)
    //     .subscribe((res) => { 
    //       this.message = res["message"];
    //       this.alertclass = "alert-success";
    //       this.displaystyle = {
    //         "display":"block"
    //       };
    //       window.setTimeout(()=>{
    //         this.displaystyle = {
    //           "display":"none"
    //         };
    //       },10000);
    //     },
    //     err => {
    //       this.message = err.error["message"];
    //       this.alertclass = "alert-danger";
    //       this.displaystyle = {
    //         "display":"block"
    //       };
    //       window.setTimeout(()=>{
    //         this.displaystyle = {
    //           "display":"none"
    //         };
    //       },10000);
    //     });
    //     this.autoVolumeGenratOrder.reset();
    // });
  }

  StopBot(pair){
    console.log('pair',pair);
    this._router.Stopbot({
      "pair": pair
    //  "pair" : "PPP/ETH",
    //  "side" : "sell"
    })
    .subscribe(
      res => {
        this.stopmessage = res["message"];
        this.alertstopclass = "alert-success";
        this.displaystopstyle = {
          "display":"block"
        };
        window.setTimeout(()=>{
          this.displaystopstyle = {
            "display":"none"
          };
        },10000);
      },
      err=>{
        this.stopmessage = err["message"] ;
        this.alertstopclass = "alert-danger";
        this.displaystopstyle = {
          "display":"block"
        };
        window.setTimeout(()=>{
          this.displaystopstyle = {
            "display":"none"
          };
        },10000);
      }
    );
  }
 
  getorder_id(){
    this._router.getOrderStatus(this.OrderStatus.value)
    .subscribe(
    res=>{
      if(res["data"].message){
        this.orderstatusmsg = res["data"].message
      }
      else{
        this.orderstatusmsg = "Order: " + res["data"].id + " is " + res["data"].status;
      }
        this.orderstatusclass = "alert-success";
        this.orderstatus = {
          "display":"block"
        };
        window.setTimeout(()=>{
          this.orderstatus = {
            "display":"none"
          };
        },10000);
    },
    err => {
      console.log(err,"error");
      
      this.orderstatusmsg = err["data"] ;
      this.orderstatusclass = "alert-danger";
      this.orderstatus = {
        "display":"block"
      };
      window.setTimeout(()=>{
        this.orderstatus = {
          "display":"none"
        };
      },10000);
    })
    this.OrderStatus.reset()
  }
}