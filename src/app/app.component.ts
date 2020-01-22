import { Component, ComponentFactoryResolver, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

export interface FruitItem{
  id: number,
  quantity: number,
  fruit: string,
  price: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fname:string=""
  lname:string=""
  addr:string=""

  space:string = " "
  at:string = "at "
  for:string = "for "
  status:string

  tax: number
  grandTotal: number
  selectedFruit:string
  selectedAmount:number

  fruits: FruitItem[]=[
    {id: 1, quantity: 0, fruit: "Apples", price:2.34},
    {id: 2, quantity: 0, fruit: "Pears", price:1.15},
    {id: 3, quantity: 0, fruit: "Peaches", price:4.32},
    {id: 4, quantity: 0, fruit: "Plums", price:4.65}
  ]

  //message on bottom for user info
  onInfoSubmit() {
    document.getElementById("errors").style.display= "inline-block"
    let outputString = "Order ";
    
    if(this.addr.match(/[^\s]$/) && !this.lname.match(/[^A-Za-z|\-|'|\s]+/) && !this.fname.match(/[^A-Za-z|\-|'|\s]+/)){
        //if addr defined but first and last name undefined
      if(!this.fname && !this.lname){
        outputString = outputString.concat(this.at).concat(this.addr)
      //if addr defined but last name undefined
      }else if (!this.fname){
        outputString = outputString.concat(this.for,this.lname,this.space,this.at,this.addr)
      //if addr defined but first name undefined
      }else if (!this.lname){
        outputString = outputString.concat(this.for,this.fname,this.space,this.at,this.addr)
      }else{
        outputString = outputString.concat(this.for,this.fname,this.space,this.lname,this.space,this.at,this.addr)
      }
    
      document.getElementById("userOutput").innerHTML= outputString
    }
   
  }

  //add fruit quanity
  onAdd(){
    
    if(!this.selectedFruit || !this.selectedAmount || this.selectedAmount < 0){
      document.getElementById("itemerror").style.display = "inline-block"
    }
    else if(this.selectedFruit && this.selectedAmount){
      document.getElementById("itemerror").style.display = "none"
      this.fruits.forEach(fruit => 
        {
          if(this.selectedFruit == fruit.fruit){
            fruit.quantity = fruit.quantity + this.selectedAmount
          }
        }
      );
    }
  }

  //delete fruit
  deleteFruit(delFruit){
    this.fruits.forEach(fruit => 
      {
        if(delFruit == fruit.fruit){
          fruit.quantity = 0;
        }
      }
    );
  }

  subTotal(): number{
    let subTotalVal = 0;
    this.fruits.forEach(fruit => 
      {
        subTotalVal = subTotalVal + fruit.quantity*fruit.price
      }
    );
    this.tax = subTotalVal*0.07
    this.grandTotal = subTotalVal*1.07
    return subTotalVal
  }
}
