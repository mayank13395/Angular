import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  token: string;
  router: Router;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
     private route: ActivatedRoute) { 
    this.user$ =  afAuth.authState;
  }
 signupUser(email: string, password: string){
 firebase.auth().createUserWithEmailAndPassword(email,password)
 .then(response => {
   this.router.navigate(['/'])
 })
 .catch(
   error => console.log(error)
   )
}
 signinUser(email: string, password: string){
 firebase.auth().signInWithEmailAndPassword(email,password)
 .then(
   response => {
     this.router.navigate(['/']);
     firebase.auth().currentUser.getToken()
     .then(
       (token: string) => this.token = token
     )
   }
 )
 .catch(
  error => console.log(error)
  )
}
getToken(){
 return firebase.auth().currentUser.getIdToken()
 .then(
  (token: string) => this.token = token
);

}

  login() {
   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl)
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$() : Observable<AppUser> {
    return this.user$
    .switchMap(user => {
        if (user) return this.userService.get(user.uid);

          return Observable.of(null);  
    }); 
  }
}
