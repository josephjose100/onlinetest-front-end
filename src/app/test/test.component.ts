import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  option:string="";
  name:string;
  email:string;
  questions:Question[];
  i:number;
  nextDisabled:boolean;
  preDisabled:boolean;
  
  constructor(private questionservice:QuestionService,private router:Router) { }

  ngOnInit(): void {
    
    this.getquestions();
    this.i=0;
    this.nextDisabled=false;
    this.preDisabled=true;
    this.name=localStorage.getItem('name');
    this.email=localStorage.getItem('email');
   
   
  }


  getquestions()
   {
    this.questionservice.ViewAllQuestions().subscribe(data =>{
      this.questions=data;
    });
      
  
   }
   
   nextQuestion()
   {
    this.preDisabled=false;
    if(this.i==this.questions.length-1)
    {
    this.nextDisabled=true;
    this.questions[this.i].att=this.option;
    this.option=this.questions[this.i].att;  
   
    }
    else
    {
       this.questions[this.i].att=this.option;
       this.i++;
       this.option=this.questions[this.i].att;   
       
    }
   
    

   }

   previousQuestion()
   {
    this.nextDisabled=false;
    if(this.i==1)
    {
      this.i--;
      this.option=this.questions[this.i].att;
      this.preDisabled=true;
    }
    else
    {
      this.i--;
    this.option=this.questions[this.i].att;
    }
    
   }
   
   clearOption()
   {
  
     this.option="";  
     this.nextDisabled=false;
   }


   saveAttempt(){
    this.questionservice.AddAtempts(this.questions).subscribe(data =>{
      this.getResult();
    });
  }

  getResult()
  {

    this.router.navigate(['result']);

  }

}




