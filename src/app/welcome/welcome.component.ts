import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
   questions:Question[];
   name:string;
   email:string;
  constructor(private router:Router,private questionservice:QuestionService) { }

  ngOnInit(): void {
    this.getquestions();
    
  }


  getquestions()
  {
   this.questionservice.ViewAllQuestions().subscribe(data =>{
     this.questions=data;
   });
     
 
  }

  startExam(form:any)
  {
    localStorage.setItem('name',this.name);
    localStorage.setItem('email',this.email);
      this.questionservice.ClearAtempts(this.questions).subscribe(data =>{
        this.test();
      });
    
    

  }

  test()
  {

    this.router.navigate(['test']);
  }


}
