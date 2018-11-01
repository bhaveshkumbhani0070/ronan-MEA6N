import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../client-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ClientServiceService,
    private router: Router) { }
  model: any = {};

  ngOnInit() {
  }

  onSubmit(){
    this.service.login(this.model)
      .subscribe(res => {
        console.log('res',res);
        if(res.status=='Success'){

        }
        else{
          console.log('Error',res.message);
        }
          // let id = res['_id'];
          // this.router.navigate(['/book-details', id]);
      }, (err) => {
          console.log(err);
      });
  }

  forgotpassword(){
    this.router.navigateByUrl('/forgot');
  }
}
