
export const KEY = "ycd_bank";

export function load(){
    const data = localStorage.getItem(KEY);
    if (!data) {
        console.log("nothing");
    }
    const user = JSON.parse(data);
    console.log(user.session.isLoggedIn);
    return user;
}

export function save(user){
    console.log("it's saved from storage.js");
    localStorage.setItem(KEY,JSON.stringify(user))
}