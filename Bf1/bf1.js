// Dom elements to be filled with weapon stats
const weapon_stats_0 = document.getElementById( 'stats0' );
const weapon_stats_1 = document.getElementById( 'stats1' );
const weapon_stats_2 = document.getElementById( 'stats2' );
// weapon Names in footer 
const weapon1 = document.getElementById( 'w-1' );
const weapon2 = document.getElementById( 'w-2' );
const title = document.getElementById("title");
// Weapon selects
const select = document.getElementById("weapon_select");
const select2 = document.getElementById("weapon_select2");
// to insert the images in Dom
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

// Order  stats object in two steps
const first_orderStats = stats.sort(function(a,b) {
    if(a.WeapShowName < b.WeapShowName ) return -1;
    if(a.WeapShowName > b.WeapShowName ) return 1;
    return 0;
});
const orderStats = first_orderStats.sort(function(a,b) {
    if(a.Class < b.Class ) return -1;
    if(a.Class > b.Class ) return 1;
    return 0;
});

// Inserts Images in the appropiate dom elements
function showImg(img,attachments,target){
    if(target == 1){
        img1.innerHTML = "<h3>"+img+"</h3>"; 
        img1.innerHTML += "<img src='./img/"+img+".png' ><br>";
        img1.innerHTML +="<span>VARIANT</span><br>";
        //attachments.forEach(function(att){
        //});
        img1.innerHTML +="<span>·"  + attachments +"</span><br>";
    }else
    if(target == 2){
        img2.innerHTML = "<h3>"+img+"</h3>"; 
        img2.innerHTML += "<img src='img/"+img+".png' ><br>";
        img2.innerHTML +="<span>VARIANT</span><br>";
        //attachments.forEach(function(att){
        //});
        img2.innerHTML +="<span>·"  + attachments +"</span><br>";
    }
}

//stats of each of the weapons, used to compare values and apply styles accordingly
//gets populated / repopulated in the function showWeaponALL
let stats1Array = [];
let stats2Array = [];

// Creates image name based on the stat WeapShowName
function CreateImgName(longName,ending){
    if(longName.length > 1 ){
        switch(ending){
            case "Weight":
            case "Patrol":
                longName = longName.slice(0,-2);
                longName = longName.join().replace(/,/g, " ");
                break;
            case "Extended": 
            case "Hammerless": 
            case "Perosa": 
            case "Shotgun": 
            case "Artillerie": 
            case "Auto": 
            case "Patrol": 
            case "SMG": 
            case "Degtyarev": 
            case "M1918A2": 
            case "Revolver": 
            case "Pistol": 
            case "Automatic": 
            case "MkVI":             
            case "08-15": 
            case "1903": 
            case "1915": 
            case "M1914": 
            case "M1918": 
            case "M1870": 
            case "M1912": 
            case "1889": 
                longName = longName.join().replace(/,/g, " ");               
                break;
            default:
                longName = longName.slice(0,-1);
                longName = longName.join().replace(/,/g, " ");
            }
    }
    return longName;
}

// When the state of the weapon select changes, this function inserts the stats in the appropiate dom elements
//  The calls to the functions to generate the image name and to insert it in the page
//  are also done from within this function
function showWeaponALL(index,target){
    let arma_actual =orderStats[index];
    let nombreArma = Object.entries(arma_actual)[89];
    let nombreImg = Object.entries(arma_actual)[89][1];
    nombreImg = nombreImg.split(" ");
    
    let atts = nombreImg[nombreImg.length -1 ];
    let ending = nombreImg[nombreImg.length -1 ];
        
    nombreImg = CreateImgName(nombreImg,ending);
    showImg(nombreImg,atts,target);
    
    // Clear divs & show weapon name at footer
    title.innerHTML = "" ;
    weapon_stats_0.innerHTML = "";
    if(target == 1){
        weapon_stats_1.innerHTML = "";
        weapon1.innerHTML = "<h2>" + nombreArma[1] + "&nbsp;&nbsp;VS.&nbsp;&nbsp;</h2>" ;
    }else
    if(target == 2){
        weapon_stats_2.innerHTML = ""; 
        weapon2.innerHTML = "<h2>" + nombreArma[1] + "&nbsp;&nbsp;</h2>" ;
    }
    //Populate divs with stats names & values
    Object.entries(arma_actual).slice(0).forEach(function(stat , index) {
        weapon_stats_0.insertAdjacentHTML('beforeend', "<span class='s0'><div class='stat_name'>"+stat[0]+"</div>"+ "</span>");
        if(target == "1"){
            weapon_stats_1.insertAdjacentHTML('beforeend', "<span class='s1'><div class='stat_value'>"+stat[1]+"</div>"+"</span>");
            stats1Array[index] = stat[1];
        }else
        if(target == "2"){
            weapon_stats_2.insertAdjacentHTML('beforeend', "<span class='s2'><div class='stat_value'>"+stat[1]+"</div>"+"</span>");
            stats2Array[index] = stat[1];
        }
    });
    compareStats(target);
}

// Fill the weapon select elements
const weaponNameList =[];
let statList = [];
orderStats.forEach( function(arma){
    let w_Name = arma.WeapShowName;
    weaponNameList.push(w_Name.toUpperCase() + " ");
    }
);

function fill_select(target){
    let counter =0;
    for(index in weaponNameList) {
        switch (counter){
            case 0:
                target.options[0] = new Option("--------||||MEDIC||||----------", );
                target.options[counter].disabled = true;
                break;
            case 28:
                target.options[28] = new Option("-------||||ASAULT||||--------", );
                target.options[counter].disabled = true;
                break;
            case 62:
                target.options[62] = new Option("--------||||SUPPORT||||-------", );
                target.options[counter].disabled = true;
                break;
            case 92:
                target.options[92] = new Option("--------||||RECON||||--------", )
                target.options[counter].disabled = true;
                break;
            case 124:
                target.options[124] = new Option("--------||||OTHER||||--------", )
                target.options[counter].disabled = true;
                break;
            case 136:
                target.options[136] = new Option("--------||||SIDEARMS||||--------", )
                target.options[counter].disabled = true;
                break;
        }
        target.options[target.options.length] = new Option(weaponNameList[index]+" |  nº: "+counter, index);
        counter++;
    }
}
fill_select(select);
fill_select(select2);
// This function its called from show weapon all but it will only operate if both weapons are selected
function compareStats(target){
    if (stats1Array.length !=0  && stats2Array.length != 0){
        let s0s =document.getElementsByClassName("s0");
        let s1s =document.getElementsByClassName("s1");
        let s2s =document.getElementsByClassName("s2");

        stats1Array.forEach((stat1 , index) => {
            const stat2 = stats2Array[index];
            s1s[index].style.color = "white";
            s2s[index].style.color = "white";
            if (typeof stat1 === 'string' || typeof stat1 == 'object'){ 
                return;
            }else
            if (stat1 > stat2){
                s1s[index].style.fontWeight = "bold";
                s1s[index].style.color = "green";
                }else
            if(stat2 > stat1){
                s2s[index].style.fontWeight = "bold";
                s2s[index].style.color = "green";
                }else{
                /*  //HIDING EQUAL STATS
                s0s[index].style.display = "none";
                s1s[index].style.display = "none";
                s2s[index].style.display = "none";
                */
                //console.log("empate");
                }
          });
    }
    else{
        //console.log("only one weapon selected")
    }

}
//statList = Object.keys(stats[0]);
