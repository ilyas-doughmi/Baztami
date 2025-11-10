import {load,KEY} from "./storage.js"


export function transfer(){
    const user = load();
    let money_reduced = 200;
    if(user.session.isLoggedIn == false){
        console.log("you are not connected");
        console.log(user.session.isLoggedIn);
    }
    else{
        
        console.log(`${money_reduced} is reduced from your account`);
        user.account.user.courant.ballance -= 200;
        console.log(`now you have ${   user.account.user.courant.ballance}`)

    }
}