showDate();
setInterval(showDate, 1000);



function showDate() {

    let today = new Date();

    let timeVar = today.toLocaleTimeString({ timeZone: 'UTC' });
    time.innerText= timeVar;

    let jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    
    var aujourdhui = new Date();
    var result = jours[aujourdhui.getDay()];
    day.innerText=result;
    
    const datejs = new Date(); 
    let dateVar = datejs.toLocaleDateString('fr-BE') ;
    date.innerText= dateVar;

}

    