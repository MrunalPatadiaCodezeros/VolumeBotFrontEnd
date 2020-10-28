import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RouterResponseService {
 
  api_url = "http://localhost:3000/tradebot/api/v1/"; 
  
  constructor(private http:HttpClient) { }

  getBitcoinPrice(){
    return this.http.get(this.api_url + "exchange/getBitcoinPrice");
  }

  getEthereumPrice(){
    return this.http.get(this.api_url + "exchange/getEthereumPrice");
  }

  getAccountBalance(){
    return this.http.get(this.api_url + "exchange/getAccountBalance");
  }

  startbotManual(orderDetails){
    return this.http.post(this.api_url + "user/startBotAutomatic",orderDetails);
  }

  // startbotAuto(orderDetails){
  //   return this.http.post(this.api_url + "user/startBotAutomatic",orderDetails);
  // }

  Stopbot(botpair){
    return this.http.post(this.api_url + "user/stopBot",botpair);
  }

  getTradeList(){
    return this.http.get(this.api_url + "exchange/orderBook");
  }

  getTradeListfromDB(){
    return this.http.get(this.api_url + "user/tradeList");
  }

  CancelOrder(orderID){
    return this.http.post(this.api_url + "exchange/cancelOrder", {order_id:orderID});
  }

  getBotStatus(){
    return this.http.get(this.api_url + "user/getBotStatus");
  }

  getOrderStatus(orderID){
    return this.http.post(this.api_url + 'exchange/getOrderStatusExchange',orderID);
  }

  getbotrunninghistory(){
    return this.http.get(this.api_url + "user/jobList");
  }
}