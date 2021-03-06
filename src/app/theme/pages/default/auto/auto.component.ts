import { Response } from '@angular/http';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from "@angular/forms";
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { RouterResponseService } from '../../../../_services/router-response.service';
import { ToastrService } from "ngx-toastr";
 
 
@Component({
selector: "app-auto",
templateUrl: "./auto.component.html",
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
export class AutoComponent implements OnInit, AfterViewInit {
  message:any;
  stopmessage:any;
  botIsNotReady:any;
  checkedOrNot:any;
 
  isETHVolumActive;
  isETHPriceActive;
  isBTCVolumActive;
  isBTCPriceActive;
 
  filter:any;
  checkModel:any
  classVolumeForm = ""
  classPriceForm = "notDisplay"
  constructor(private _script: ScriptLoaderService, private _router:RouterResponseService,private toaster: ToastrService)  {}
  
  // PPPETH Volume Genrat Order
  autoPPPETHVolumeGenratOrder = new FormGroup({
  PPPETHminimumVolumeQuantity: new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern('[.0-9]*')]),
  PPPETHmaximumVolumeQuantity: new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern('[.0-9]*')]),
  PPPETHtime: new FormControl("",[Validators.required,Validators.pattern('^((?:[1-9]|1[0-9]|2[0-3])?)$')])
  });
  get PPPETHminimumVolumeQuantity(){return this.autoPPPETHVolumeGenratOrder.get("PPPETHminimumVolumeQuantity")};
  get PPPETHmaximumVolumeQuantity(){return this.autoPPPETHVolumeGenratOrder.get("PPPETHmaximumVolumeQuantity")};
  get PPPETHtime(){return this.autoPPPETHVolumeGenratOrder.get("PPPETHtime")};
 
  // PPPBTC Volume Genrat Order
  autoPPPBTCVolumeGenratOrder = new FormGroup({
  PPPBTCminimumVolumeQuantity: new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern('[.0-9]*')]),
  PPPBTCmaximumVolumeQuantity: new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern('[.0-9]*')]),
  PPPBTCtime: new FormControl("",[Validators.required,Validators.pattern('^((?:[1-9]|1[0-9]|2[0-3])?)$')])
  });
  get PPPBTCminimumVolumeQuantity(){return this.autoPPPBTCVolumeGenratOrder.get("PPPBTCminimumVolumeQuantity")};
  get PPPBTCmaximumVolumeQuantity(){return this.autoPPPBTCVolumeGenratOrder.get("PPPBTCmaximumVolumeQuantity")};
  get PPPBTCtime(){return this.autoPPPBTCVolumeGenratOrder.get("PPPBTCtime")};
 
  // PPPETH Price Genrat Order
  autoPPPETHPriceGenratOrder = new FormGroup({
  PPPETHprice: new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern('[.0-9]*')]),
  PPPETHtimeforprice: new FormControl("",[Validators.required,Validators.pattern('^((?:[1-9]|1[0-9]|2[0-3])?)$')]),
  });
  get PPPETHprice(){return this.autoPPPETHPriceGenratOrder.get("PPPETHprice")};
  get PPPETHtimeforprice(){return this.autoPPPETHPriceGenratOrder.get("PPPETHtimeforprice")};
 
  // PPPBTC Price Genrat Order
  autoPPPBTCPriceGenratOrder = new FormGroup({
  PPPBTCprice: new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern('[.0-9]*')]),
  PPPBTCtimeforprice: new FormControl("",[Validators.required,Validators.pattern('^((?:[1-9]|1[0-9]|2[0-3])?)$')]),
  });
  get PPPBTCprice(){return this.autoPPPBTCPriceGenratOrder.get("PPPBTCprice")};
  get PPPBTCtimeforprice(){return this.autoPPPBTCPriceGenratOrder.get("PPPBTCtimeforprice")};
 
  OrderStatus = new FormGroup({
    order_id : new FormControl("",[Validators.required,Validators.pattern('[0-9]*')])
  });
  get order_id(){return this.OrderStatus.get("order_id")};
 
  ngOnInit(){
    let stats = this.checkLocalstorage();
    this.botIsNotReady = true;
    // if(stats.volume == null && stats.price == null){
    //   this.botIsNotReady = false;        
    // }
    console.log('---------checkLocalstorage---------',stats);
    // console.log('-Bot>',localStorage.getItem("Bot"));
    // console.log('-Checkbox>',localStorage.getItem("Checkbox"));
    // localStorage.setItem("Bot", "JavaScript");
    // localStorage.setItem("Checkbox", "true");
    // window.setInterval(()=>{
      this._router.getBotStatus()
      .subscribe(res=>{
        console.log(typeof(JSON.parse(res["data"].ethBuyBot)));
        this.isETHVolumActive = JSON.parse(res["data"].ethVolumBot);
        this.isETHPriceActive = JSON.parse(res["data"].ethPriceBot);
        this.isBTCVolumActive = JSON.parse(res["data"].btcVolumBot);
        this.isBTCPriceActive = JSON.parse(res["data"].btcPriceBot);
      });
    //},2000)
  }
 
  ngAfterViewInit()  {
    console.log('----------REFRESH----------');
    // localstorage Value
    let stats = this.checkLocalstorage();
    console.log('---------checkLocalstorage---------',stats);
    // {"volume":getVolume,"price":getPrice}
    if(stats.price === 'true'){
      console.log('stats.price',stats.price);
      this.checkedOrNot = true;
      this.botIsNotReady = false;
      this.classVolumeForm = "notDisplay"
      this.classPriceForm = ""
    }else if(stats.volume === 'true'){
      console.log('stats.volume',stats.volume);
      this.checkedOrNot = false;
      this.botIsNotReady = false;
      this.classVolumeForm = ""
      this.classPriceForm = "notDisplay"
    }else{
      this.botIsNotReady = true;
    }
    this._router.getBotStatus()
    .subscribe(res=>{
      // console.log(typeof(JSON.parse(res["data"].ethBuyBot)));
      this.isETHVolumActive = JSON.parse(res["data"].ethVolumBot);
      this.isETHPriceActive = JSON.parse(res["data"].ethPriceBot);
      this.isBTCVolumActive = JSON.parse(res["data"].btcVolumBot);
      this.isBTCPriceActive = JSON.parse(res["data"].btcPriceBot);
    });
  }
  
  changeVolumeAndPriceGenrator(event){
    console.log(event.target.checked);
    this.checkModel = event.target.checked;
    event.target.unchecked 
    console.log('-----------this.checkModel--------------',this.checkModel);
    if (event.target.checked){
      this.classVolumeForm = "notDisplay"
      this.classPriceForm = ""
    }else {
      this.classVolumeForm = ""
      this.classPriceForm = "notDisplay"
    }
  }
  
  StartPPPETHVolumeBot(ExPair){
    // remove if Checked this.isETHVolumActive
    this.isETHVolumActive = true;
    this.botIsNotReady = false;
    this.setLocalstorage("volume");
    console.log('-this.autoPPPETHVolumeGenratOrder.value>',this.autoPPPETHVolumeGenratOrder.value);
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
        if(responseAccountBalance > minimumRequireBalance){
        //call user/startBotManual    
        let formInputs = this.autoPPPETHVolumeGenratOrder.value;
        let resPassed = {
          pair:formInputs.pair,
          minvolume:parseFloat(formInputs.PPPETHminimumVolumeQuantity),
          maxvolume:parseFloat(formInputs.PPPETHmaximumVolumeQuantity),
          runtime:parseInt(formInputs.PPPETHtime) 
        }  
        this._router.startbotManual(resPassed)
          .subscribe((res) => { 
            this.message = res["message"];
            this.toaster.success(this.message);
          },
          err => {
            this.message = err.error["message"];
            this.toaster.error(this.message);
            
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
    // remove if Checked this.isBTCVolumActive
    this.isBTCVolumActive = true;
    // inputs:- pair,minimumVolumeQuantity,maximumVolumeQuantity,time  
    this.setLocalstorage("volume");
    console.log('-this.autoPPPBTCVolumeGenratOrder.value>',this.autoPPPBTCVolumeGenratOrder.value);
    this.autoPPPBTCVolumeGenratOrder.value.pair = ExPair.pair;
    // Check Account Balance is Grater then Last Traded Price
    var responseAccountBalance;
    var currentPrice;
    var minimumRequireBalance;
    // call exchange/getAccountBalance
    this._router.getAccountBalance().subscribe(res => {
      let responseAccountBalanceObj = res['data'];
      for (const element of responseAccountBalanceObj) {
          if(element.currency == "BTC"){
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
        let formInputs = this.autoPPPBTCVolumeGenratOrder.value;
        let resPassed = {
          pair:formInputs.pair,
          minvolume:parseFloat(formInputs.PPPBTCminimumVolumeQuantity),
          maxvolume:parseFloat(formInputs.PPPBTCmaximumVolumeQuantity),
          runtime:parseInt(formInputs.PPPBTCtime) 
        }  
          this._router.startbotManual(resPassed)
          .subscribe((res) => { 
            this.message = res["message"];
            this.toaster.success(this.message);
          },
          err => {
            this.message = err.error["message"];
            this.toaster.error(this.message);

          });
          this.autoPPPBTCVolumeGenratOrder.reset();
        }else{
          console.log('success');
          // Show Error Message Balance not require
        }
      })
    })
  }
 
 
  StartPPPETHPriceBot(ExPair){
        // remove if Checked this.isETHPriceActive
        this.isETHPriceActive = true;
    this.botIsNotReady = false;
    console.log('pair',ExPair)
    // inputs:- pair,price,time
    this.setLocalstorage("price");
    console.log('-this.autoPPPETHPriceGenratOrder.value>',this.autoPPPETHPriceGenratOrder.value);
    this.autoPPPETHPriceGenratOrder.value.pair = ExPair.pair;
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
        let formInputs = this.autoPPPETHPriceGenratOrder.value;
        let resPassed = {
          pair:formInputs.pair,
          runtime:parseInt(formInputs.PPPETHtimeforprice),
          price:parseFloat(formInputs.PPPETHprice)
        }    
          this._router.startbotManual(resPassed)
          .subscribe((res) => { 
            this.message = res["message"];
            this.toaster.success(this.message);
          },
          err => {
            this.message = err.error["message"];
            this.toaster.error(this.message);

          });
          this.autoPPPETHPriceGenratOrder.reset();
        }else{
          console.log('error');
          this.toaster.error("Insufficient Balance");
          this.autoPPPETHPriceGenratOrder.reset();
        }
      })
    })  
  }
 
  StartPPPBTCPriceBot(ExPair){
    // remove if Checked this.isBTCPriceActive
    this.isBTCPriceActive = true;
    this.botIsNotReady = false;
    console.log('pair',ExPair)
    // inputs:- pair,price,time  
    this.setLocalstorage("price");
    console.log('-this.autoPPPBTCPriceGenratOrder.value>',this.autoPPPBTCPriceGenratOrder.value);
    this.autoPPPBTCPriceGenratOrder.value.pair = ExPair.pair;
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
          let formInputs = this.autoPPPBTCPriceGenratOrder.value;
          let resPassed = {
            pair:formInputs.pair,
            runtime:parseInt(formInputs.PPPETHtimeforprice),
            price:parseFloat(formInputs.PPPETHprice)
          }
          this._router.startbotManual(resPassed)
          .subscribe((res) => { 
            this.message = res["message"];
            this.toaster.success(this.message);
          },
          err => {
            this.message = err.error["message"];
            this.toaster.error(this.message);

          });
          this.autoPPPBTCPriceGenratOrder.reset();
        }else{
          console.log('success');
          // Show Error Message Balance not require
        }
      })
    }) 
  }
 
  StopBot(obj){
    this.checkModel
    let stopBotPair = obj.pair; // PPP/ETH
    // remove as checked
    if(stopBotPair == "PPP/ETH" && obj.side === 'volume'){
      this.isETHVolumActive = false;
    }else if(stopBotPair == "PPP/BTC" && obj.side === 'volume'){
      this.isBTCVolumActive = false;
    }
    else if(stopBotPair == "PPP/ETH" && obj.side === 'price'){
      this.isETHPriceActive = false;
    }
    else if(stopBotPair == "PPP/BTC" && obj.side === 'price'){
      this.isBTCVolumActive = false;
    }
    // check another bot is not running
    if(stopBotPair == "PPP/ETH" && obj.side === 'volume' && (this.isBTCVolumActive === undefined || this.isBTCVolumActive === false)){
      this.botIsNotReady = true;
      this.checkedOrNot = false; 
      // this.setLocalstorage('volume');
      localStorage.removeItem("volume");
      localStorage.removeItem("price");
    }
    else if(stopBotPair == "PPP/BTC" && obj.side === 'volume' && (this.isETHVolumActive === undefined || this.isETHVolumActive === false )){
      this.botIsNotReady = true;
      this.checkedOrNot = false;
      // this.setLocalstorage('volume');
      localStorage.removeItem("volume");
      localStorage.removeItem("price");
    }
    else if(stopBotPair == "PPP/ETH" && obj.side === 'price'&& (this.isBTCPriceActive === undefined || this.isBTCPriceActive === false )){
      this.botIsNotReady = true;
      console.log('this.checkedOrNot',this.checkedOrNot);
      this.checkedOrNot = true;
      console.log('this.checkedOrNot',this.checkedOrNot);
      // this.setLocalstorage('price');
      localStorage.removeItem("volume");
      localStorage.removeItem("price");
    }
    else if(stopBotPair == "PPP/BTC" && obj.side === 'price' && (this.isETHPriceActive === undefined || this.isETHPriceActive === false)){
      this.botIsNotReady = true;
      this.checkedOrNot = true;
      // this.setLocalstorage('price');
      localStorage.removeItem("volume");
      localStorage.removeItem("price");
    }
    let stopBotSide = obj.side; // volum 
    console.log('stopBotSide',stopBotSide);
    // check any volume bot is running
    // check status of both bots 
    let stats = this.checkLocalstorage();
    console.log('stats',stats);
    // stats.volume = false;
    stats = this.checkLocalstorage();
    // if volum then check for also for    this.isETHVolumActive, this.isBTCVolumActive,
    // if price then check for also for    this.isETHPriceActive, this.isBTCPriceActive
    console.log('this.isETHVolumActive',this.isETHVolumActive);
    console.log('this.isBTCVolumActive',this.isBTCVolumActive);
    console.log('this.isETHPriceActive',this.isETHPriceActive);
    console.log('this.isBTCPriceActive',this.isBTCPriceActive);
    if(obj.side === 'volume' ){
      this.isETHVolumActive
    }
    console.log('stats',stats);
    // if(stats.price == 'false' && stats.volume == 'false'){
      // this.botIsNotReady = true;
    //}
    
    console.log('---------checkLocalstorage---------',stats);
    console.log('pair',obj.pair);
    this._router.Stopbot({
      "pair": obj.pair,
    //  "pair" : "PPP/ETH",
      "side" : obj.side
    })
    .subscribe(
      res => {
        this.stopmessage = res["message"];
        this.toaster.success(this.stopmessage);
      },
      err=>{
        this.stopmessage = err["message"] ;
        this.toaster.error(this.stopmessage);
      }
    );
  }

  checkLocalstorage(){
    let getVolume = JSON.parse(localStorage.getItem("volume"));
    let getPrice = JSON.parse(localStorage.getItem("price"));
    let botstatus = {"volume":getVolume,"price":getPrice}
    console.log('-:getBot:-',botstatus);
    return botstatus; 
  }
  setLocalstorage(bot){
    // botStatus = [{runningBot:[isETHVolumActive,isBTCVolumActive]},{checkboxValue:true}]
    // volume:true|false,price:true|false
    if(bot === "volume"){
      localStorage.setItem("volume", JSON.stringify("true"));
      localStorage.setItem("price", JSON.stringify("false"));
    }else if(bot === "price"){
      localStorage.setItem("volume", JSON.stringify("false"));
      localStorage.setItem("price", JSON.stringify("true"));
    }
  }
}
