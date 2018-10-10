import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ClientServiceService) { }
  model: any = {};

  ngOnInit() {
  }

  onSubmit(){
    this.service.login(this.model)
      .subscribe(res => {
        console.log('res',res);
          // let id = res['_id'];
          // this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
