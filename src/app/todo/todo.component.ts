import { Component, OnInit } from '@angular/core';
import {Todo} from '../Todo';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations:[trigger('anim', [

    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
    ]),

    transition(':leave', [
      animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
    ]),

  ])
]
})
export class TodoComponent implements OnInit {
  todoList:Todo[];
  title:string;
  idTodo:number;
  filter:string;
  remainingTodo:boolean;
  date:string;
  bfEdit:string;


  constructor() { }

  ngOnInit() {
    this.remainingTodo=true;
    this.filter="all";
    this.idTodo = 2;
    this.title = ' ';
    this.bfEdit="",
    this.date=' ';
    this.todoList=[
      
     ]

  }
 // Add new todo item
  addTodo():void{
    if(this.title.trim().length===0){
      return;
    }
    

    this.todoList.push({
      id:this.idTodo,
      title:this.title,
      checked:false,
      date:this.date,
      edit:false,

    })

    this.title="";   
    this.idTodo++;
  }

  addDate(date):void{
   if(this.title.trim().length === 0){
      return;
   }
    this.todoList.push(...this.todoList,date)
    console.log(date)
  }
 
  // All completed items delete
  completedDelete():void{
    this.todoList =this.todoList.filter(item => !item.checked);
  }
 
editTodo(i:Todo):void{
  this.bfEdit = i.title;
  i.edit=true;
}

editFns(i:Todo):void{
  if(i.title.trim().length === 0){
    i.title=this.bfEdit;
  }
  i.edit = false;
}

cancelEdit(i:Todo):void{
  i.title = this.bfEdit;
  i.edit=false;
}  
  todoremaining():boolean{
    return this.findremaining() !==0;
  }
  
  // Complete todo mark 
  completedTodo():boolean{
    return this.todoList.filter(item => item.checked).length > 0; 
  }

  // Find the remaining number of todo
  findremaining():number{
    return this.todoList.filter(item => !item.checked).length;
  }
 
  //Delete todo item
  removeTodo(id:number):void{
    this.todoList = this.todoList.filter(todo=>todo.id !== id);
  }

  todoFilter() :Todo[]{
    if(this.filter === 'all'){
      return this.todoList;
    }else if (this.filter === 'active') {
      return this.todoList.filter(todo => !todo.checked);
    } else if (this.filter === 'checked') {
      return this.todoList.filter(todo => todo.checked);
    }
      return this.todoList;

  }

  checkAll():void{
    this.todoList.map(item => item.checked = (<HTMLInputElement>event.target).checked)
    this.remainingTodo=this.todoremaining();
  }

}
