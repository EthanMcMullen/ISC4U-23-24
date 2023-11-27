let gameNumber = 1;
let currentSorted = [false, false]; /*First boolean is indicating if a number has been selected, 2nd in indicating if its currently sorted up or down*/
let gameList = JSON.parse(localStorage.getItem('gameList')) || [];
console.log(gameList);
reWriteTable(gameList)

const driverTeams = {
    'Max Verstappen': 'RedBull',
    'Sergio Perez': 'RedBull',
    'George Russell': 'Mercedes',
    'Lewis Hamilton': 'Mercedes',
    'Carlos Sainz': 'Ferrari',
    'Charles Leclerc': 'Ferrari',
    'Oscar Piastri': 'McLaren',
    'Lando Norris': 'McLaren',
    'Lance Stroll': 'Aston Martin',
    'Fernando Alonso': 'Aston Martin',
    'Pierre Gasly': 'Alpine',
    'Esteban Ocon': 'Alpine',
    'Logan Sargeant': 'Williams',
    'Alexander Albon': 'Williams',
    'Yuki Tsunoda': 'AlphaTauri',
    'Daniel Ricciardo': 'AlphaTauri',
    'Zhou Guanyu': 'Alfa Romeo',
    'Valtteri Bottas': 'Alfa Romeo',
    'Kevin Magnussen': 'Haas',
    'Nico Hulkenberg': 'Haas'
};



function saveGameData() {
    localStorage.setItem('gameList', JSON.stringify(gameList));
}

function addNewRace() {
    let grandPrix = getValue('grandPrix')
    let date = getValue('date')
    let laps = getValue('laps')
    let time = getValue('time')
    let winner = getValue('winner')
    let placements = [
        'Null', // 'Null' are just so placements[2] = p2
        'Null',
        getValue('2nd'),
        getValue('3rd'),
        getValue('4th'),
        getValue('5th'),
        getValue('6th'),
        getValue('7th'),
        getValue('8th'),
        getValue('9th'),
        getValue('10th'),
        getValue('11th'),
        getValue('12th'),
        getValue('13th'),
        getValue('14th'),
        getValue('15th'),
        getValue('16th'),
        getValue('17th'),
        getValue('18th'),
        getValue('19th'),
        getValue('20th')
    ];

    isEqual = checkIfEqual(placements);
    if(!isEqual) {
        addRow(grandPrix, date, laps, time, placements, winner);
    } 
}

function checkIfEqual(placements) {
    let isEqual = false;
    placements.forEach((el, index) => {
        placements.forEach((el2, index2) => {
            if(el !== 'Null' && el2 !== 'Null' && el === el2 && index !== index2) {
                isEqual = true;
            }
        })
    })
    if(isEqual) {window.alert("You have at least one duplicate driver, please check to make sure the information you entered was correct")}

    return isEqual;
}

function getValue(str) {
    return document.getElementById(str).value;
}

function insertToTable(innerHtml, newRow) { /* Make it so p2-20 doesnt show on the main table with boolean */
    element = document.createElement('td');
    element.innerText = innerHtml;
    newRow.appendChild(element);
}

function setGameData(grandPrix, date, laps, time, placements, winner) {
    let gameData = {
        raceNumber: gameNumber,
        grandPrix: grandPrix,
        date: date,
        laps: laps,
        time: time,
        placements: placements,
        winningConstructor: teamCalculate(winner),
        winner: winner
    }

    return gameData;
}


function addRow(grandPrix, date, laps, time, placements, winner) {
    let tableBody = document.getElementById('statsTableBody');

    let newRow = document.createElement('tr');

    insertToTable(gameNumber, newRow); 
    insertToTable(grandPrix, newRow); 
    insertToTable(winner, newRow)
    insertToTable(teamCalculate(winner), newRow)
    insertToTable(date, newRow); 
    insertToTable(laps, newRow);
    insertToTable(time.substring(0,2) + ":" + time.substring(2,4) + ":" + time.substring(4,6), newRow);
    
    
    //placements.forEach((el) => insertToTable(el, newRow));

    let gameData = setGameData(grandPrix, date, laps, time, placements, winner);
    gameNumber++;
    gameList.push(gameData);
    tableBody.appendChild(newRow);
    saveGameData();
}


function sortTable(column) {
    let sortedgameList = gameList;
    console.log(sortedgameList)
    console.log(column)
    if(!currentSorted[0] || !currentSorted[1]) {
        sortedgameList.sort((a,b) => { 
            if(column === 'time' || column === 'laps' || column === 'raceNumber') {
                let numA = parseFloat(a[column]);
                let numB = parseFloat(b[column]);
                return numA > numB ? 1 : -1;
            }
            return a[column] > b[column] ? 1: -1;
        });
        currentSorted[0] = true
        currentSorted[1] = true
    } else {
        sortedgameList.sort((a,b) => { 
            if(column === 'time' || column === 'laps' || column === 'raceNumber') {
                let numA = parseFloat(a[column]);
                let numB = parseFloat(b[column]);
                return numA < numB ? 1 : -1;
            }
            return a[column] < b[column] ? 1: -1
        });
        currentSorted[1] = false
    }
    console.log(sortedgameList);
    reWriteTable(sortedgameList)
}


function reWriteTable(newgameList) {
    let tableBody = document.getElementById('statsTableBody');
    tableBody.innerHTML = '';
    gameList = [];
    gameNumber = 1;

    newgameList.forEach(data => {
        addRow(data.grandPrix, data.date, data.laps, data.time, data.placements, data.winner);
      }); 
    saveGameData();
}

function emptyLocalStorage() {
    if (window.confirm(" !! WARNING !! This action will delete ALL race data. Are you sure you wish to proceed?")) {
        localStorage.removeItem('gameList');
        gameList = [];
        reWriteTable(gameList);
    }
}

function deleteRace(index) { /* work in progress */
    if (window.confirm("Are you sure you want to delete this race?")) {
        gameList.splice(index, 1);
        reWriteTable(gameList);
    }
}

function toggleInputSection() {
    let inputSection = document.getElementById('inputSection');
    inputSection.style.display = (inputSection.style.display === 'none') ? 'block' : 'none';
}

function createDriverArray(driverName) {
    let driverResults = [];

    gameList.forEach((el) => {

        let position = el.placements.indexOf(driverName);
        let result;

        if(el.winner === driverName) {
            result = {
                grandPrix: el.grandPrix,
                position: 1,
                score: 25
            };
        } else if (position !== -1) {
            result = {
                grandPrix: el.grandPrix,
                position: position,
                score: scoreCalculate(position)
            };
            driverResults.push(result);
        }
    });

    return driverResults;
}

function createDriversChampionshipArray() {
    const driversChampionship = [];

    const driverPoints = {};
    gameList.forEach((race) => {
        race.placements.forEach((driver, position) => {
            if (driver !== null) {
                const points = scoreCalculate(position);
                driverPoints[driver] = (driverPoints[driver] || 0) + points;
            }
        });
    });
}

function createConstructorArray() {

}

function teamCalculate(driver) {
    return driverTeams[driver] || 'N/A';
}

function scoreCalculate(position) { 
    points = [25,18,15,12,10,8,6,4,2,1,0,0,0,0,0,0,0,0,0,0]
    return points[position-1]
}