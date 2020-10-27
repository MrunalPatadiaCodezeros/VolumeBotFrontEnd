import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RouterResponseService {
 
  // api_url = "http://68.183.94.224:4000/tradebot/api/v1/";
  api_url = "http://127.0.0.1:3000/tradebot/api/v1/"; 

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
    // return this.http.post(this.api_url + "user/startBotManual",orderDetails);
    console.log('orderDetails from router-response.service.ts',orderDetails);
    return this.http.post(this.api_url + "user/startBotAutomatic",orderDetails);
  }

  startbotAuto(orderDetails){
    console.log('orderDetails',orderDetails);
    return this.http.post(this.api_url + "user/startBotAutomatic",orderDetails);
  }

  Stopbot(botpair){
    console.log('botpair',botpair);
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