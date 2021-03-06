import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '.././user-service.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {
	token: string = "initial";
  isAdmin : boolean = false;
  categories : string[];
  constructor(
  private userService: UserServiceService,
    private router: Router
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.checkUserPermisions();
  
  }

  logoutUser(): void {
    
    this.userService.logoutUser(this.token)
      .then(str => {        
        console.log(str);
      });
      localStorage.removeItem('token');
       console.log(localStorage.getItem('token'));
      this.router.navigate(['/login']);

  }

  checkUserPermisions(){
    this.userService.getUserData(this.token).then(user=>{
      if(user.username == "Admin") this.isAdmin = true;
    });
  }


}
