
    export const KEY = "ycd_bank";

    export function load() {

        const data = localStorage.getItem(KEY);

        try {
            const user = JSON.parse(data);
            console.log(user.session.isLoggedIn);
            return user;
        } catch (error) {
            console.log("No Users");
            return null;
        }

    }

    export function save(user) {
        console.log("it's saved from storage.js");
        localStorage.setItem(KEY, JSON.stringify(user))
    }