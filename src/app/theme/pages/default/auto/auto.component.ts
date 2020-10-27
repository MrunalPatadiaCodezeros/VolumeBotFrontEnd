// import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
// import { Helpers } from '../../../../helpers';
// import { ScriptLoaderService } from '../../../../_services/script-loader.service';


// @Component({
// selector: "app-auto",
// templateUrl: "./auto.component.html",
// encapsulation: ViewEncapsulation.None,
// })
// export class AutoComponent implements OnInit, AfterViewInit {


// constructor(private _script: ScriptLoaderService)  {

// }
// ngOnInit()  {

// }
// ngAfterViewInit()  {
// }

// }
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from "@angular/forms";
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { RouterResponseService } from '../../../../_services/router-response.service';

@Component({
selector: "app-auto",
templateUrl: "./auto.component.html",
encapsulation: ViewEncapsulation.None,
})
export class AutoComponent implements OnInit, AfterViewInit {
  message:any;
  alertclass;
  alertstopclass;
  stopmessage:any;
  displaystyle = {
    'display':"none"
  };
  displayvalidmsg = {
    "display":"none"
  };
  displaystopstyle = {
    "display":"none"
  };
  isETHbuyactive;
  isETHsellactive;
  isBTCbuyactive;
  isBTCsellactive;
  filter:any;
  dataerror:any;
  
  pppethbuy = new FormGroup({
    pppethbuypair: new FormControl("PPP/ETH",Validators.required),
    pppethbuyminquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethbuymaxquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethbuyminRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethbuymaxRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethbuyside: new FormControl("buy",Validators.required),
    pppethbuynoOfTrades: new FormControl("",[Validators.required,Validators.pattern('[0-9]*')])
  });
  get pppethbuyminquantity(){return this.pppethbuy.get("pppethbuyminquantity")};
  get pppethbuymaxquantity(){return this.pppethbuy.get("pppethbuymaxquantity")};
  get pppethbuyminRange(){return this.pppethbuy.get("pppethbuyminRange")};
  get pppethbuymaxRange(){return this.pppethbuy.get("pppethbuymaxRange")};
  get pppethbuynoOfTrades(){return this.pppethbuy.get("pppethbuynoOfTrades")};

  pppethsell = new FormGroup({
    pppethsellpair: new FormControl("PPP/ETH",Validators.required),
    pppethsellminquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethsellmaxquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethsellminRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethsellmaxRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppethsellside: new FormControl("sell",Validators.required),
    pppethsellnoOfTrades: new FormControl("",[Validators.required,Validators.pattern('[0-9]*')])
  });
  get pppethsellminquantity(){return this.pppethsell.get("pppethsellminquantity")};
  get pppethsellmaxquantity(){return this.pppethsell.get("pppethsellmaxquantity")};
  get pppethsellminRange(){return this.pppethsell.get("pppethsellminRange")};
  get pppethsellmaxRange(){return this.pppethsell.get("pppethsellmaxRange")};
  get pppethsellnoOfTrades(){return this.pppethsell.get("pppethsellnoOfTrades")};

  pppbtcbuy = new FormGroup({
    pppbtcbuypair: new FormControl("PPP/BTC",Validators.required),
    pppbtcbuyminquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcbuymaxquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcbuyminRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcbuymaxRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcbuyside: new FormControl("buy",Validators.required),
    pppbtcbuynoOfTrades: new FormControl("",[Validators.required,Validators.pattern('[0-9]*')])
  });
  get pppbtcbuyminquantity(){return this.pppbtcbuy.get("pppbtcbuyminquantity")};
  get pppbtcbuymaxquantity(){return this.pppbtcbuy.get("pppbtcbuymaxquantity")};
  get pppbtcbuyminRange(){return this.pppbtcbuy.get("pppbtcbuyminRange")};
  get pppbtcbuymaxRange(){return this.pppbtcbuy.get("pppbtcbuymaxRange")};
  get pppbtcbuynoOfTrades(){return this.pppbtcbuy.get("pppbtcbuynoOfTrades")};

  pppbtcsell = new FormGroup({
    pppbtcsellpair: new FormControl("PPP/BTC",Validators.required),
    pppbtcsellminquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcsellmaxquantity: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcsellminRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcsellmaxRange: new FormControl("",[Validators.required,Validators.pattern('[0-9.]*')]),
    pppbtcsellside: new FormControl("sell",Validators.required),
    pppbtcsellnoOfTrades: new FormControl("",[Validators.required,Validators.pattern('[0-9]*')])
  });
  get pppbtcsellminquantity(){return this.pppbtcsell.get("pppbtcsellminquantity")};
  get pppbtcsellmaxquantity(){return this.pppbtcsell.get("pppbtcsellmaxquantity")};
  get pppbtcsellminRange(){return this.pppbtcsell.get("pppbtcsellminRange")};
  get pppbtcsellmaxRange(){return this.pppbtcsell.get("pppbtcsellmaxRange")};
  get pppbtcsellnoOfTrades(){return this.pppbtcsell.get("pppbtcsellnoOfTrades")};

  constructor(private _script: ScriptLoaderService, private _router:RouterResponseService)  {}
  ngOnInit()  {
    window.setInterval(()=>{
      this._router.getBotStatus()
      .subscribe(res=>{
        console.log(typeof(JSON.parse(res["data"].ethBuyBot)));
        this.isETHbuyactive = JSON.parse(res["data"].ethBuyBot);
        this.isETHsellactive = JSON.parse(res["data"].ethSellBot);
        this.isBTCbuyactive = JSON.parse(res["data"].btcBuyBot);
        this.isBTCsellactive = JSON.parse(res["data"].btcSellBot);
      });
    },2000)
  };
  ngAfterViewInit()  {
    this._router.getBotStatus()
    .subscribe(res=>{
      console.log(typeof(JSON.parse(res["data"].ethBuyBot)));
      this.isETHbuyactive = JSON.parse(res["data"].ethBuyBot);
      this.isETHsellactive = JSON.parse(res["data"].ethSellBot);
      this.isBTCbuyactive = JSON.parse(res["data"].btcBuyBot);
      this.isBTCsellactive = JSON.parse(res["data"].btcSellBot);
    });
  };
  // Automatic steps
  // 1) get All  Values From Form
  // 2) call method
  //    startbotAuto(orderDetails){ return this.http.post(this.api_url + "user/startBotAutomatic",orderDetails); }
  //    res get message and set class and style

  startPPPETHbuy(){
    // get All  Values From Form
    var autoObjETHbuy = {
      pair: this.pppethbuy.value.pppethbuypair,
      minQuantity: this.pppethbuy.value.pppethbuyminquantity,
      maxQuantity: this.pppethbuy.value.pppethbuymaxquantity,
      minRange: this.pppethbuy.value.pppethbuyminRange,
      maxRange: this.pppethbuy.value.pppethbuymaxRange,
      side: this.pppethbuy.value.pppethbuyside,
      noOfTrades: this.pppethbuy.value.pppethbuynoOfTrades,
    }
    // call method
    // startbotAuto(orderDetails){ return this.http.post(this.api_url + "user/startBotAutomatic",orderDetails); }
    // res get message and set class and style
    this._router.startbotAuto(autoObjETHbuy)
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
      this.pppethbuy.reset();
  }

  startPPPETHsell(){
    var autoObjETHsell = {
      pair: this.pppethsell.value.pppethsellpair,
      minQuantity: this.pppethsell.value.pppethsellminquantity,
      maxQuantity: this.pppethsell.value.pppethsellmaxquantity,
      minRange: this.pppethsell.value.pppethsellminRange,
      maxRange: this.pppethsell.value.pppethsellmaxRange,
      side: this.pppethsell.value.pppethsellside,
      noOfTrades: this.pppethsell.value.pppethsellnoOfTrades,
    }
    this._router.startbotAuto(autoObjETHsell)
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
      this.pppethsell.reset();
    }

  startPPPBTCbuy(){
    var autoObjBTCbuy = {
      pair: this.pppbtcbuy.value.pppbtcbuypair,
      minQuantity: this.pppbtcbuy.value.pppbtcbuyminquantity,
      maxQuantity: this.pppbtcbuy.value.pppbtcbuymaxquantity,
      minRange: this.pppbtcbuy.value.pppbtcbuyminRange,
      maxRange: this.pppbtcbuy.value.pppbtcbuymaxRange,
      side: this.pppbtcbuy.value.pppbtcbuyside,
      noOfTrades: this.pppbtcbuy.value.pppbtcbuynoOfTrades,
    }
   this._router.startbotAuto(autoObjBTCbuy)
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
      this.pppbtcbuy.reset();
    }

  startPPPBTCsell(){
    var autoObjBTCsell = {
      pair: this.pppbtcsell.value.pppbtcsellpair,
      minQuantity: this.pppbtcsell.value.pppbtcsellminquantity,
      maxQuantity: this.pppbtcsell.value.pppbtcsellmaxquantity,
      minRange: this.pppbtcsell.value.pppbtcsellminRange,
      maxRange: this.pppbtcsell.value.pppbtcsellmaxRange,
      side: this.pppbtcsell.value.pppbtcsellside,
      noOfTrades: this.pppbtcsell.value.pppbtcsellnoOfTrades,
    }
    this._router.startbotAuto(autoObjBTCsell)
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
      this.pppbtcsell.reset();
    }

  StopBot(current_pair){
    this._router.Stopbot(current_pair)
    .subscribe((res) => {
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
    });
  };
};