import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private service:ClientServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log('register',this.model);
    this.service.register(this.model)
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
