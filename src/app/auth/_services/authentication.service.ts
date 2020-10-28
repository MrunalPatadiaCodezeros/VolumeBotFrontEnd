import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
import "rxjs/add/operator/map";

interface tokenResponse{ 
	token:string
  }

@Injectable()
export class AuthenticationService {

	constructor(private http: HttpClient) {
	}	
	login(email: string, password: string): Observable<any> {
		const user = {
			user_email: email,
			user_password: password
		};
		const base = this.http.post('http://localhost:3000/tradebot/api/v1/user/loginUser',user);
		const request = base.pipe( 
			map((data:tokenResponse) => {

				if(data["data"].token){
					localStorage.setItem('currentUser', JSON.stringify(data["data"].token));
					localStorage.setItem('currentUserdetails',JSON.stringify(data["data"].user));
				}
				return data;
			})
		);
		return request;
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		localStorage.removeItem('currentUserdetails');
	}
}