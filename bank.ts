#! /usr/bin/env node
import inquirer from "inquirer"

// Bank account interface:
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void

}
// Bank account class:
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;
    constructor(accountNumber: number,balance:number){
       this.accountNumber = accountNumber;
       this.balance = balance;
    }

    // Debit money:
    withdraw(amount: number): void {
        if(this.balance >= amount){
           this.balance -= amount ;
           console.log(`Withdrawal of ${amount}$ is successful, your Remaining balance is ${this.balance}$`);
           
        }else {
            console.log("Insufficient Balance");
            
        }
    }
    // Credit money:
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1   //1$ fee charged on more than 100$ deposited
        }this.balance += amount;
        console.log(`${amount}$ deposited in your account, your current balance is ${this.balance} `);
         }
        //  current balance:
        checkBalance(): void {
            console.log(`Your current Balance is ${this.balance}$`);
            
        }
        
}
// customer class:
class customer{
    firstName : string;
    lastName : string;
    gender : string;
    age: number;
    mobileNumber: number;
    account: BankAccount;
    constructor (firstName: string, lastName: string , gender:string, age:number, mobileNumber: number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create bank accounts:
const accounts : BankAccount[] =[
    new BankAccount (1001,500),
    new BankAccount (1002,1500),
    new BankAccount (1003,2500)
];

// create customer:
const customers : customer[] = [
    new customer("Fatima","Mudassir","female", 31,+923042325090, accounts[0]),
    new customer("Mudassir","Nazir","male", 43,+923215698654, accounts[1]),
    new customer("Amna","saqib","female", 20,+92343567890, accounts[2])
    
];
// function to interact with bank account:

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Please Enter your Account Number:"
        
        })
        const Customer = customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
            console.log(`Welcome ${Customer.firstName} ${Customer.lastName}!\n`);
            const answer = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "select from an options",
                choices: ["Deposit", "Check Balance","withdraw", "Exit"]
            });
            switch(answer.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                     Customer.account.deposit(depositAmount.amount)
                     break;
                case "Check Balance":
                    Customer.account.checkBalance()

                     break;
                case "withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        });
                         Customer.account.withdraw(withdrawAmount.amount)
                         break;
            
                case "Exit":
                    console.log("Exiting bank program.....");
                    console.log("\n Thankyou for using our bank services..");
                    return;
                    
                                         
            }
            
        }else{
            console.log("Invalid Account Number! ");
            
        }

    }while(true)
}
service()