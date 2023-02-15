import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { Question } from '../question';
import { resourceUsage } from 'process';
import { Answer } from '../answer';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private questionservice:QuestionService,private router:Router) { }
  result:number[];
  solutionStatus:boolean=true;
  questions:Question[];
  answers:Answer[];
  i:number;
  nextDisabled:boolean;
  preDisabled:boolean;
  name:string;
  email:string;

  ngOnInit(): void {
 
     this.i=0;
     this.showResult();
     this.getquestions();
     this.getanswer();
     this.nextDisabled=false;
     this.preDisabled=true;
     this.name=localStorage.getItem('name');
     this.email=localStorage.getItem('email');
  }


  showResult()
  {
  
    this.questionservice.ViewResult().subscribe(data =>{
      this.result=data;
    });
      
    
  }


  viewSolution()
  {

    this.solutionStatus=false;
  }

  

  getquestions()
  {
   this.questionservice.ViewAllQuestions().subscribe(data =>{
     this.questions=data;
   });
     
 
  }

  getanswer()
  {
    this.questionservice.ViewAnswer().subscribe(data =>{
      this.answers=data;
    });

  }
  

  nextQuestion()
  {
   this.preDisabled=false;
   if(this.i==this.questions.length-1)
   {
   this.nextDisabled=true;
  
   }
   else
   {
    
      this.i++;
       
      
   }
  
   

  }

   previousQuestion()
   {
    this.nextDisabled=false;
    if(this.i==1)
    {
      this.i--;
      
      this.preDisabled=true;
    }
    else
    {
      this.i--;
    
    }
    
   }
   back()
   {
    this.solutionStatus=true;
   }

   

  exit()
  {
    this.router.navigate(['welcome']);
  }

}
