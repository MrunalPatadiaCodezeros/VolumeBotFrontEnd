import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { RouterResponseService } from '../../../../_services/router-response.service';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrderbookComponent implements OnInit {

  totalRecords;
  page:Number = 1

  TradeList:any;
  message:any;
  data:any;
  alertclass
  displaystyle = {
      'display':"none"
  };
  messagefornodata = true;
  constructor(private _script: ScriptLoaderService, private _router:RouterResponseService)  {}
  ngOnInit()  {

  }
  ngAfterViewInit()  {
    this._router.getTradeList()
    .subscribe((res) => {
      if(res["data"].models.length > 0){
        this.messagefornodata = false;
        this.TradeList = res["data"].models;
        this.totalRecords = this.TradeList.length;
      }
    })
  }

  CancelOrder(OrderId){
    this._router.CancelOrder(OrderId)
    .subscribe((res) => {
      this.message = res["message"];
      this.alertclass = "alert-success"
      this.displaystyle = {
        "display":"block"
      }
      window.setTimeout(()=>{
        this.displaystyle = {
          "display":"none"
        }
      },10000)
    },
    err => {
      this.message = err.error["message"]
      this.alertclass = "alert-danger"
      this.displaystyle = {
        "display":"block"
      }
      window.setTimeout(()=>{
        this.displaystyle = {
          "display":"none"
        }
      },10000)
    })
  }
}
