import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { FormControl,FormGroup,Validators } from "@angular/forms";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
})

export class ResetpasswordComponent implements OnInit {
  
  showAlertforsamepass = {
    "display":"none"
  }
  showresponse = {
    "display":"none"
  }
  response:any;
  isvalid = false;

  resetpassword = new FormGroup({
    user_email: new FormControl("",[Validators.required,Validators.email]),
    temp_password: new FormControl("",Validators.required),
    new_password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    con_password: new FormControl("",[Validators.required,Validators.minLength(8)]),
  });
  get user_email(){return this.resetpassword.get("user_email")};
  get temp_password(){return this.resetpassword.get("temp_password")};
  get new_password(){return this.resetpassword.get("new_password")};
  get con_password(){return this.resetpassword.get("con_password")};

  constructor( private _router: Router, private _route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit() {
  }
  ResetPassword(){
    if(this.resetpassword.value.new_password !== this.resetpassword.value.con_password){
      this.showAlertforsamepass = {
        "display":"block"
      }
      window.setTimeout(()=>{
        this.showAlertforsamepass = {
          "display":"none"
        }
      },5000)
      this.resetpassword.reset();
    }
    const new_password = {
      user_email : this.resetpassword.value.user_email,
	    current_password : this.resetpassword.value.temp_password,
	    new_password: this.resetpassword.value.new_password
    }
    this.http.post("http://68.183.94.224:4000/tradebot/api/v1/user/resetPassword",new_password)
    .subscribe(res =>{
      this.response = res["message"];
      this.isvalid = true
      this.showresponse = {
        "display":"block"
      }
      window.setTimeout(()=>{
        this.showresponse = {
          "display":"none"
        }
      },5000)
    },
    error => {
      this.response = error["error"].message
      this.showresponse = {
        "display":"block"
      }
      window.setTimeout(()=>{
        this.showresponse = {
          "display":"none"
        }
      },5000)
    });
    this.resetpassword.reset()
  }
  login(){
    this._router.navigateByUrl("/login");
  }
}
