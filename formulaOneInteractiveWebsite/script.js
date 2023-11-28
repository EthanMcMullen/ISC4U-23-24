let gameNumber = JSON.parse(localStorage.getItem('gameNumber')) || 1;
let currentSorted = [false, false]; /*First boolean is indicating if a number has been selected, 2nd in indicating if its currently sorted up or down*/
let gameList = JSON.parse(localStorage.getItem('gameList')) || [];
console.log(gameList);
let localGameList = gameList

let driverTeams = {
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

let teams = [
    'RedBull',
    'Mercedes',
    'Ferrari',
    'McLaren',
    'Aston Martin',
    'Alpine',
    'Williams',
    'AlphaTauri',
    'Alfa Romeo',
    'Haas'
];

let drivers = [
    'Max Verstappen',
    'Sergio Perez',
    'George Russell',
    'Lewis Hamilton',
    'Carlos Sainz',
    'Charles Leclerc',
    'Oscar Piastri',
    'Lando Norris',
    'Lance Stroll',
    'Fernando Alonso',
    'Pierre Gasly',
    'Esteban Ocon',
    'Logan Sargeant',
    'Alexander Albon',
    'Yuki Tsunoda',
    'Daniel Ricciardo',
    'Zhou Guanyu',
    'Valtteri Bottas',
    'Kevin Magnussen',
    'Nico Hulkenberg'
];

let numValuedVariables = ['time', 'laps', 'raceNumber', 'date'];

function saveGameData() {
    localStorage.setItem('gameList', JSON.stringify(gameList));
    localStorage.setItem('gameNumber', JSON.stringify(gameNumber))
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

function insertToTable(innerHtml, newRow, type) { /* Make it so p2-20 doesnt show on the main table with boolean */
    element = document.createElement('td');
    if(type === 'driver') {
        let link = document.createElement('a');
        link.href = 'genericDriver.html?driver=' + innerHtml;
        link.innerText = innerHtml
        element.appendChild(link)
    } else if (type === 'constructor') {
        let link = document.createElement('a')
        link.href = 'genericConstructor.html?constructor=' + innerHtml;
        link.innerText = innerHtml;
        element.appendChild(link)
    } else {
        element.innerText = innerHtml
    }

    newRow.appendChild(element);
}

function setGameData(grandPrix, date, laps, time, placements, winner) {
    let gameData = {
        gameNumber: gameNumber,
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
    let gameData = setGameData(grandPrix, date, laps, time, placements, winner);
    gameNumber++;
    gameList.push(gameData)
    updateBoard(localGameList, "Race")
}

function updateBoard(array, type) {
    let tableBody = document.getElementById('statsTableBody');
    tableBody.innerHTML = '';
    if(type === 'Race') {
        array.forEach((race) => {
            let newRow = document.createElement('tr');
            insertToTable(race.gameNumber, newRow); 
            insertToTable(race.grandPrix, newRow); 
            insertToTable(race.winner, newRow, 'driver')
            insertToTable(teamCalculate(race.winner), newRow, 'constructor')
            insertToTable(race.date.substring(0,4) + "/" + race.date.substring(4,6) + "/" + race.date.substring(6,8), newRow); 
            insertToTable(race.laps, newRow);
            insertToTable(race.time.substring(0,2) + ":" + race.time.substring(2,4) + ":" + race.time.substring(4,6), newRow);
            tableBody.appendChild(newRow)
        })
    } else if(type === 'Constructor') {
        let constructorChampionshipArray = createConstructorChampionshipArray();
        console.log('made it')
        constructorChampionshipArray.forEach((team) => {
            let newRow = document.createElement('tr');
            insertToTable(team.position, newRow);
            insertToTable(team.team, newRow, 'constructor');
            insertToTable(team.driver1, newRow, 'driver');
            insertToTable(team.driver2, newRow, 'driver');
            insertToTable(team.points, newRow);
            tableBody.appendChild(newRow);
        });
    } else if(type === 'Driver') {
        let driverChampionshipArray = createDriversChampionshipArray();
        console.log('made it')
        driverChampionshipArray.forEach((driver) => {
            let newRow = document.createElement('tr');
            insertToTable(driver.position, newRow);
            insertToTable(driver.driver, newRow, 'driver');
            insertToTable(driver.team, newRow, 'constructor');
            insertToTable(driver.points, newRow);
            tableBody.appendChild(newRow);
        });
    } else if(type === 'GenericConstructor') {
        let url = window.location.search;
        let searchParams = new URLSearchParams(url);
        let constructor = searchParams.get("constructor")
        document.getElementById('teamTitle').innerText = constructor
        teamDrivers = getDriversFromTeam(constructor)
        document.getElementById('driver1').innerHTML = teamDrivers.driver1 + " Position:";
        document.getElementById('driver2').innerHTML = teamDrivers.driver2 + " Position:";
        let genericConstructorArray = createConstructorArray(constructor);
        genericConstructorArray.forEach((race) => {
            let newRow = document.createElement('tr');
            insertToTable(race.grandPrix, newRow);
            insertToTable(race.driverPosition1, newRow);
            insertToTable(race.driverPosition2, newRow);
            insertToTable(race.date.substring(0,4) + "/" + race.date.substring(4,6) + "/" + race.date.substring(6,8), newRow)
            insertToTable(race.points, newRow);
            tableBody.appendChild(newRow);
        });    
    } else if(type === 'GenericDriver') {
        let url = window.location.search;
        let searchParams = new URLSearchParams(url);
        let driver = searchParams.get("driver")
        document.getElementById('driverTitle').innerText = driver
        document.getElementById('driverTeam').innerText = "Constructor: " + teamCalculate(driver)
        let driverArray = createDriverArray(driver)
        driverArray.forEach((race) => {
            let newRow = document.createElement('tr');
            insertToTable(race.grandPrix, newRow)
            insertToTable(race.date, newRow)
            insertToTable(race.position, newRow)
            insertToTable(race.score, newRow)
            tableBody.appendChild(newRow)
        })
    }

    saveGameData();
}


function sortTable(column) {
    console.log(localGameList)
    console.log(column)
    if(!currentSorted[0] || !currentSorted[1]) {
        localGameList.sort((a,b) => { 
            if(numValuedVariables.includes(column)) {
                let numA = parseFloat(a[column]);
                let numB = parseFloat(b[column]);
                return numA > numB ? 1 : -1;
            }
            return a[column] > b[column] ? 1: -1;
        });
        currentSorted[0] = true
        currentSorted[1] = true
    } else {
        localGameList.sort((a,b) => { 
            if(numValuedVariables.includes(column)) {
                let numA = parseFloat(a[column]);
                let numB = parseFloat(b[column]);
                return numA < numB ? 1 : -1;
            }
            return a[column] < b[column] ? 1: -1
        });
        currentSorted[1] = false
    }
    console.log(localGameList);
    updateBoard(localGameList, 'Race')
}

function emptyLocalStorage() {
    if (window.confirm(" !! WARNING !! This action will delete ALL race data. Are you sure you wish to proceed?")) {
        localStorage.removeItem('gameList');
        localStorage.removeItem('gameNumber')
        gameNumber = 1;
        gameList = [];
        localGameList = gameList;
        updateBoard(gameList, "Race");
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
        let result = {driver: 'Driver Not Found!', grandPrix: 'Driver Not Found!', position: -1, score: 0};

        if(el.winner === driverName) {
            result = {
                driver: driverName,
                grandPrix: el.grandPrix,
                date: el.date,
                position: 1,
                score: 25
            };
        } else if (position !== -1) {
            result = {
                driver: driverName,
                grandPrix: el.grandPrix,
                date: el.date,
                position: position,
                score: scoreCalculate(position)
            };
        }

        driverResults.push(result);
    });
    return driverResults;
}



function createDriversChampionshipArray() { // Definitly wierd hollup
    const driversChampionship = [];

    drivers.forEach((driver) => {
        let points = 0;
        let team = teamCalculate(driver)
        gameList.forEach((race) => {
            race.placements.forEach((driverChecking, position) => {
                if (driver === driverChecking) {
                        points += scoreCalculate(position)
                } else if (driver === race.winner && position === 1) {
                        points += 25
                }
            });
        });
        result = {
            driver: driver,
            team: team,
            points: points,
            position: -1
        }
        driversChampionship.push(result)
    });

    let sortedDriverChampionshipArray = driversChampionship.sort((el, el2) => {
        let points1 = parseFloat(el.points);
        let points2 = parseFloat(el2.points);

        if(points1 <= points2) return 1
        else return -1
    })

    position = 1;
    sortedDriverChampionshipArray.forEach((el) => {el.position = position; position++});

    return driversChampionship;
}



function createConstructorArray(constructorName) { // Return an array that has the points, 
    console.log(gameList)
    let driversInTeam = getDriversFromTeam(constructorName);
    let constructorArray = [];

    let driver1 = createDriverArray(driversInTeam.driver1);
    let driver2 = createDriverArray(driversInTeam.driver2);


    driver1.forEach((el, index) => {
        let result;
        result = {
            points: el.score + driver2[index].score,
            driverPosition1: el.position,
            driver1: driver1.driver,
            driverPosition2: driver2[index].score,
            driver2: driver2.driver,
            grandPrix: el.grandPrix,
            date: el.date
        }
        constructorArray.push(result)
    });
    return constructorArray
}



function getDriversFromTeam(team) {
    let driversInTeam = {driver1: "Null", driver2: "Null"};
    

    drivers.forEach((el2) => {
        if (teamCalculate(el2) === team && driversInTeam.driver1 === "Null") {
          driversInTeam.driver1 = el2;
        } else if (teamCalculate(el2) === team && driversInTeam.driver1 !== "Null") {
          driversInTeam.driver2 = el2;
        }
    });

    return driversInTeam;
}



function createConstructorChampionshipArray() {
    let constructorChampionshipArray = [];

    teams.forEach((team) => {
        let driversInTeam = getDriversFromTeam(team);
        let driver1 = driversInTeam.driver1;
        let driver2 = driversInTeam.driver2;
        let points = calculateTeamPoints(driver1, driver2);

        let constructorResult = {
            team: team,
            driver1: driver1,
            driver2: driver2,
            points: points,
            position: -1
        }
        constructorChampionshipArray.push(constructorResult);
    })
    let sortedConstructorArray = constructorChampionshipArray.sort((el, el2) => {
        let points1 = parseFloat(el.points);
        let points2 = parseFloat(el2.points);

        if(points1 <= points2) return 1
        else return -1
    }); 
    position = 1;
    sortedConstructorArray.forEach((el) => {el.position = position; position++});

    return sortedConstructorArray;
}



function calculateTeamPoints(driver1, driver2) {
    let totalPoints = 0;
    let driver1Points = 0;
    let driver2Points = 0;

    gameList.forEach((race) => {
        race.placements.forEach((position, index) => {
            if (driver1 !== null && driver1 === position) {
                driver1Points = scoreCalculate(index)
            } else if (driver2 !== null && driver2 === position) {
                driver2Points = scoreCalculate(index)
            }
        });
        if (driver1 !== null && driver1 === race.winner) {
            driver1Points = 25;
        } else if (driver2 !== null && driver2 === race.winner) {
            driver2Points = 25;
        }

        totalPoints = totalPoints + driver1Points + driver2Points;
    });
    
    return totalPoints;
}



function teamCalculate(driver) {
    return driverTeams[driver] || 'N/A';
}



function scoreCalculate(position) { 
    points = [25,18,15,12,10,8,6,4,2,1,0,0,0,0,0,0,0,0,0,0]
    return points[position-1]
}

function debugSave() {
    if(window.confirm("Do you wish to backup Game list")) {
        let backupGameList = gameList;
        console.log(backupGameList)
        localStorage.setItem('backupGameList', JSON.stringify(backupGameList));
    }
}

function debugLoad() {
    if(window.confirm("Do you wish to load Game list")) {
        gameList = JSON.parse(localStorage.getItem('backupGameList')) || [];
    }
}
