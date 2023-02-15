import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl="http://localhost:8081/questions";
  constructor(private httpclient:HttpClient) { }


  ViewAllQuestions():Observable<Question[]>{

    return this.httpclient.get<Question[]>(`${this.baseUrl}/getquestions`);
  }

  AddAtempts(question:Question[]):Observable<Object>{

    return this.httpclient.post(`${this.baseUrl}/postattempts`,question);
     }
    
   ViewResult():Observable<number[]>{

    return this.httpclient.get<number[]>(`${this.baseUrl}/getresult`)
   }

   ViewAnswer():Observable<Answer[]>{

    return this.httpclient.get<Answer[]>(`${this.baseUrl}/getanswers`)
   }

   ClearAtempts(question:Question[]):Observable<Object>{

    return this.httpclient.post(`${this.baseUrl}/clearattempt`,question);
     }

}
