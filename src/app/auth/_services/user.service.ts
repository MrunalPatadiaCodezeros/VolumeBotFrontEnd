import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http"

import {User} from "../_models/index";

@Injectable()
export class UserService {
	constructor(private http: Http, private httpclient : HttpClient) {
	}

	verify() {
		return this.http.get('/api/verify', this.jwt()).map((response: Response) => response.json());
	}

	forgotPassword(email: string) {
		return this.httpclient.post('http://localhost:3000/tradebot/api/v1/user/forgotPassword', ({user_email:email}));
		// return this.httpclient.put('http://localhost:3000/users/forget-password', ({email}), this.jwt()).map((response) => response.json());
	}

	getAll() {
		return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	create(user: User) {
		return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
	}

	update(user: User) {
		return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	// private helper methods

	private jwt() {
		// create authorization header with jwt token
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser && currentUser.token) {
			let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
			return new RequestOptions({headers: headers});
		}
	}
}