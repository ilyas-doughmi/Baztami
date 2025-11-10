import { load, save } from "./storage.js";

export function addbenif(name, rib) {
    const user = load();

    if (user && user.session.isLoggedIn) {
        if (!Array.isArray(user.beneficiaries)) {
            user.beneficiaries = []; 
        }

        user.beneficiaries.push({ name, rib });
        save(user);
        console.log(`Beneficiary added: ${name} (${rib})`);
        location.reload();
    } else {
        console.log("You must log in first.");
    }
}
