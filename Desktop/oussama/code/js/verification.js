let code = JSON.parse(localStorage.getItem('code'));
let input1 = document.getElementById('chiffre1');
let input2 = document.getElementById('chiffre2');
let input3 = document.getElementById('chiffre3');
let input4 = document.getElementById('chiffre4');
let input5 = document.getElementById('chiffre5');
let alertFaild = document.getElementById('alertFaild');
let renvoyerCode = document.getElementById('renvoyerCode');

function generateCode(){
    let chiffre1 = Math.floor(Math.random() * 10);
    let chiffre2 = Math.floor(Math.random() * 10);
    let chiffre3 = Math.floor(Math.random() * 10);
    let chiffre4 = Math.floor(Math.random() * 10);
    let chiffre5 = Math.floor(Math.random() * 10);

    return ''+chiffre1+chiffre2+chiffre3+chiffre4+chiffre5;
}

renvoyerCode.addEventListener('click', ()=>{
  //generation fichier contenant le code:
  localStorage.setItem('code', JSON.stringify(generateCode()));
  code = JSON.parse(localStorage.getItem('code'));
  const blob = new Blob([`Votre nouvel code de confirmation est le suivant: ${JSON.parse(localStorage.getItem('code'))}`], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "code de confirmation.txt"; 
  a.click();
  URL.revokeObjectURL(url);
});

function genererRIB(){
    let prefixe = 123456;
    let suffixe = 78;
    let corps = () => {
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  return prefixe.toString() + corps() + suffixe.toString();
}

document.querySelector('button').addEventListener('click',()=>{
    let data = JSON.parse(sessionStorage.getItem('inscriptionData'));
    let codeEntre = input1.value+input2.value+input3.value+input4.value+input5.value;
    if(code == codeEntre){
      localStorage.removeItem('code');
      let bankData = JSON.parse(localStorage.getItem('YCD_Bank'))||[];
      data.comptes = [{rib: genererRIB(), type: "Principal", credit: 10000}, {rib: genererRIB(), type: "Epargne", credit: 0}];
      data.factures = [];
      data.recharges = [];
      data.virements = [];

      bankData.push(data);
      localStorage.setItem('YCD_Bank', JSON.stringify(bankData));
      sessionStorage.clear();
      //Telecharger les information de connexion:
        const blob = new Blob([`Votre identifiant est le suivant: ${data.comptes[0].rib.substring(6, 22)}`], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const b = document.createElement('a');
        b.href = url;
        b.download = "identifiant.txt"; 
        b.click();
        URL.revokeObjectURL(url);

      let a = document.createElement('a');
      a.href = "../html/connexion.html";
      a.click();
    }
    else{
      alertFaild.innerText = 'Le code que vous avez entre ne correspend pas au celui envoye.';
      alertFaild.classList.remove('hidden');
      setTimeout(()=>{alertFaild.classList.add('hidden')}, 1500);
    }
    
});