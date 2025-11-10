import { account, generaterib, generatecard_number } from "./user.js";
import { KEY, load, save } from "./storage.js";

// register function

export function register(email, password, fullname, tel, cin) {
    account.user = { email, password, fullname, tel, cin };
    account.accounts.courant.rib = generaterib();
    account.accounts.epargne.rib = generaterib();
    account.card.number = generatecard_number();
    localStorage.setItem(KEY, JSON.stringify(account));
    console.log("acc created");

    console.log(account);
}

// login function 

export function login(email, password) {
    const user = load();

    if (user && user.user.email === email && user.user.password === password) {
        console.log("login succ");
        user.session.isLoggedIn = true;
        console.log(user);
        save(user);
        location.reload();
    }
    else {
        console.log("Problem");
    }
}

export function disconnect() {
    const user = load();

    user.session.isLoggedIn = false;
    save(user);
    
    location.reload();

}