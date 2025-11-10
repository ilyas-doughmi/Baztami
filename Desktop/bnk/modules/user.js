// user default stats

export const account = {
  user: null,  
  session: { isLoggedIn: false },
  accounts: {
    courant: { rib: "", balance: 5000 },
    epargne: { rib: "", balance: 2000 }
  },
  card: { number: "1234-5678-9012-3456", active: true, limit: 5000 },
  beneficiaries: [], 
  favoritesNumbers: [], 
  transactions: [] 
};


// generate rib numbers

export function generaterib(){
 const rand = Math.random().toString().slice(2,17);
 return `007041${rand}22`.slice(0,25);
}

// generate card numbers

export function generatecard_number(){
  const rand = Math.random().toString().slice(2,16);

  return `5412${rand}`.slice(0,16);
}


