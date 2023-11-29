let gameNumber = JSON.parse(localStorage.getItem('gameNumber')) || 1;
let raceSorted = [false, false]; /*First boolean is indicating if a number has been selected, 2nd in indicating if its currently sorted up or down*/
let constructorSorted = [false, false];
let driverSorted = [false, false];

let gameList = JSON.parse(localStorage.getItem('gameList')) || [];
let filteredGames = gameList;
console.log(gameList);
constructorFirstTime = true;
raceFirstTime = true;
driverFirstTime = true;

let racesPerPage = 5
let currentPage = 1


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

let numValuedVariables = ['time', 'laps', 'raceNumber', 'date', 'driverPosition1', 'driverPosition2'];

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

    isEqual = checkIfEqual(placements, winner);
    if(!isEqual) {
        if (date.length === 8 && time.length === 6 && grandPrix && laps.length === 2) {
            addRow(grandPrix, date, laps, time, placements, winner);
        } else {
            window.alert('Please Enter All Fields Correctly YYYYMMDD for date, HHMMSS for time, 2 Digit number for Laps, the name of the track for grand prix and each position filled')
        }
    } 
}

function checkIfEqual(placements, winner) {
    let isEqual = false;
    placements.forEach((el, index) => {
        placements.forEach((el2, index2) => {
            if(el !== 'Null' && el2 !== 'Null' && el === el2 && index !== index2) {
                isEqual = true;
            } else if (el === winner || el2 === winner) {
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
    updateBoard(gameList, "Race")
}

function updateBoard(array, type) {
    let tableBody = document.getElementById('statsTableBody');
    tableBody.innerHTML = '';
    let minusIcon = document.createElement('i');
    minusIcon.classList.add('fa-solid', 'fa-minus');

    let numGames = array.length;
    let numPages = Math.ceil(numGames / racesPerPage);

    if(type === 'Race') {
        array.forEach((race, index) => {
            if(index >= (currentPage-1)*racesPerPage && index < currentPage*racesPerPage){
                let newRow = document.createElement('tr');
                insertToTable(race.gameNumber, newRow); 
                insertToTable(race.grandPrix, newRow); 
                insertToTable(race.winner, newRow, 'driver')
                insertToTable(teamCalculate(race.winner), newRow, 'constructor')
                insertToTable(race.date.substring(0,4) + "/" + race.date.substring(4,6) + "/" + race.date.substring(6,8), newRow); 
                insertToTable(race.laps, newRow);
                insertToTable(race.time.substring(0,2) + ":" + race.time.substring(2,4) + ":" + race.time.substring(4,6), newRow);
                tableBody.appendChild(newRow)
            }
        });
        createPaginationLinks(numPages, 'Race')
    } else if(type === 'Constructor') {
        let constructorChampionshipArray = createConstructorChampionshipArray(array);
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
        let driverChampionshipArray = createDriversChampionshipArray(array);
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

        if(constructorFirstTime) {
            document.getElementById('driver1').innerHTML = teamDrivers.driver1 + " Position: ";
            document.getElementById('driver2').innerHTML = teamDrivers.driver2 + " Position: ";
            let minusIcon = document.createElement('i');
            minusIcon.classList.add('fa-solid', 'fa-minus'); minusIcon.id = 'driverPosition1'
            let minusIcon2 = document.createElement('i');
            minusIcon2.classList.add('fa-solid', 'fa-minus'); minusIcon2.id = 'driverPosition2'
            document.getElementById('driver1').appendChild(minusIcon)
            document.getElementById('driver2').appendChild(minusIcon2)
            constructorFirstTime = false;
        }
        
        let genericConstructorArray = createConstructorArray(constructor, array);
        genericConstructorArray.forEach((race, index) => {
            if(index >= (currentPage-1)*racesPerPage && index < currentPage*racesPerPage){
                let newRow = document.createElement('tr');
                insertToTable(race.grandPrix, newRow);
                insertToTable(race.driverPosition1, newRow);
                insertToTable(race.driverPosition2, newRow);
                console.log(race.date)
                insertToTable(race.date.substring(0,4) + "/" + race.date.substring(4,6) + "/" + race.date.substring(6,8), newRow)
                insertToTable(race.points, newRow);
                tableBody.appendChild(newRow);
            }
        });    
        createPaginationLinks(numPages, 'GenericConstructor')

    } else if(type === 'GenericDriver') {
        let url = window.location.search;
        let searchParams = new URLSearchParams(url);
        let driver = searchParams.get("driver")
        document.getElementById('driverTitle').innerText = driver
        document.getElementById('driverTeam').innerText = "Constructor: " + teamCalculate(driver)
        let driverArray = createDriverArray(driver, array)
        driverArray.forEach((race, index) => {
            if(index >= (currentPage-1)*racesPerPage && index < currentPage*racesPerPage){
                let newRow = document.createElement('tr');
                insertToTable(race.grandPrix, newRow)
                console.log(race.date)
                insertToTable(race.date.substring(0,4) + "/" + race.date.substring(4,6) + "/" + race.date.substring(6,8), newRow)
                insertToTable(race.position, newRow)
                insertToTable(race.score, newRow)
                tableBody.appendChild(newRow)
            }
        });
        createPaginationLinks(numPages, 'GenericDriver')
    }

    saveGameData();
}

function updatePagination(type, num) {
    currentPage = num
    updateBoard(filteredGames, type)
}

function createPaginationLinks(numPages, type) { // Might not need type
    paginationContainer = document.getElementById("paginationContainer")
    paginationContainer.innerHTML = ''
    startCurrent = parseFloat(currentPage);
    console.log('numpages: ' + numPages)

    if(startCurrent !== 1) {
        const button = document.createElement("button");
        button.classList.add("button", "is-link", "is-rounded", "pagination-button");
        button.textContent = '<';
        createButtonFunctionality(button, (startCurrent-1), type)
        paginationContainer.appendChild(button);
    }
    for(i=1; i<=numPages; i++) {
        const button = document.createElement("button");
        button.classList.add("button", "is-link", "is-rounded", "pagination-button");
        if(numPages <= 5) {
            button.textContent = i.toString();
            createButtonFunctionality(button, i, type)
            paginationContainer.appendChild(button);
        } else if (startCurrent <=2){
            if (i <= 4 || i === numPages) {
                button.textContent = i.toString();
                createButtonFunctionality(button, i, type)
                paginationContainer.appendChild(button);
            }
        } else if (startCurrent >= (numPages-2)) {
            if (i === 1 || (i >= (numPages-3))) {
                button.textContent = i.toString();
                createButtonFunctionality(button, i, type)
                paginationContainer.appendChild(button);
            }
        } else {
            if (i === 1 || ((i >= (startCurrent-1)) && (i <= (startCurrent+1))) || i === numPages) {
                button.textContent = i.toString();
                createButtonFunctionality(button, i, type)
                paginationContainer.appendChild(button);
            }
        }
    }

    if(startCurrent !== numPages && numPages > 1) {
        const button = document.createElement("button");
        button.classList.add("button", "is-link", "is-rounded", "pagination-button");
        button.textContent = '>';
        createButtonFunctionality(button, (startCurrent+1), type)
        paginationContainer.appendChild(button);
    }
}

function createButtonFunctionality (button, pageNumber, type) {
    button.addEventListener("click", function () {
        updatePagination(type, pageNumber);
    });
}

function sortTable(column, type) {
    let tempGames = filteredGames
    gameList = JSON.parse(localStorage.getItem('gameList')) || [];
    
    if(type === 'Race') {
        if(!raceSorted[0] || !raceSorted[1]) {
            updateArrows(column, 'Race', true)
            tempGames.sort((a,b) => { 
                if(numValuedVariables.includes(column)) {
                    let numA = parseFloat(a[column]);
                    let numB = parseFloat(b[column]);
                    return numA < numB ? 1 : -1;
                }
                return a[column] < b[column] ? 1: -1;
            });
            raceSorted[0] = true
            raceSorted[1] = true
        } else {
            updateArrows(column, 'Race', false)
            tempGames.sort((a,b) => { 
                if(numValuedVariables.includes(column)) {
                    let numA = parseFloat(a[column]);
                    let numB = parseFloat(b[column]);
                    return numA > numB ? 1 : -1;
                }
                return a[column] > b[column] ? 1: -1
            });
            raceSorted[1] = false
        }
        updateBoard(tempGames, 'Race')

    } else if (type === 'GenericConstructor') {
        let url = window.location.search;
        let searchParams = new URLSearchParams(url);
        let constructor = searchParams.get("constructor")
        teamDrivers = getDriversFromTeam(constructor)
        let genericConstructorArray = createConstructorArray(constructor, gameList);

        if(!constructorSorted[0] || !constructorSorted[1]) {
            updateArrows(column, 'GenericConstructor', true)
            genericConstructorArray.sort((a,b) => { 
                if(numValuedVariables.includes(column)) {
                    let numA = parseFloat(a[column]);
                    let numB = parseFloat(b[column]);
                    return numA < numB ? 1 : -1;
                }
                return a[column] < b[column] ? 1: -1;
            });
            constructorSorted[0] = true
            constructorSorted[1] = true
        } else {
            updateArrows(column, 'GenericConstructor', false)
            genericConstructorArray.sort((a,b) => { 
                if(numValuedVariables.includes(column)) {
                    let numA = parseFloat(a[column]);
                    let numB = parseFloat(b[column]);
                    return numA > numB ? 1 : -1;
                }
                return a[column] > b[column] ? 1: -1
            });
            constructorSorted[1] = false
        }

        let gameListGenericConstructorArray = [];
        genericConstructorArray.forEach((constructorRace, index) => {
            tempGames.forEach((race) => {
                if(constructorRace.grandPrix === race.grandPrix && constructorRace.date === race.date) {
                    gameListGenericConstructorArray[index] = race;
                }
            });
        });

        updateBoard(gameListGenericConstructorArray, 'GenericConstructor')
    } else if (type === 'GenericDriver') {
        
        let url = window.location.search;
        let searchParams = new URLSearchParams(url);
        let driver = searchParams.get("driver")
        let driverArray = createDriverArray(driver, tempGames)

        if(!constructorSorted[0] || !constructorSorted[1]) {
            updateArrows(column, 'GenericDriver', true)
            driverArray.sort((a,b) => { 
                if(numValuedVariables.includes(column)) {
                    let numA = parseFloat(a[column]);
                    let numB = parseFloat(b[column]);
                    return numA < numB ? 1 : -1;
                }
                return a[column] < b[column] ? 1: -1;
            });
            constructorSorted[0] = true
            constructorSorted[1] = true
        } else {
            updateArrows(column, 'GenericDriver',true)
            driverArray.sort((a,b) => { 
                if(numValuedVariables.includes(column)) {
                    let numA = parseFloat(a[column]);
                    let numB = parseFloat(b[column]);
                    return numA > numB ? 1 : -1;
                }
                return a[column] > b[column] ? 1: -1
            });
            constructorSorted[1] = false
        }

        let gameListGenericDriverArray = [];
        driverArray.forEach((driverRace, index) => {
            tempGames.forEach((race) => {
                if(driverRace.grandPrix === race.grandPrix && driverRace.date === race.date) {
                    gameListGenericDriverArray[index] = race;
                }
            });
        });

        updateBoard(gameListGenericDriverArray, 'GenericDriver')
    }
}

function updateArrows(column, type, isUp) {
    if(type === 'GenericConstructor') {

        document.getElementById('driverPosition1').classList = ['fa-solid fa-minus'];
        document.getElementById('driverPosition2').classList = ['fa-solid fa-minus'];
        document.getElementById('date').classList = ['fa-solid fa-minus'];
        document.getElementById('points').classList = ['fa-solid fa-minus'];

       
        if(isUp) document.getElementById(column).classList = ['fa-solid fa-down-long']

        else document.getElementById(column).classList = ['fa-solid fa-up-long']

    } else if (type === 'GenericDriver') {
        document.getElementById('date').classList = ['fa-solid fa-minus'];
        document.getElementById('position').classList = ['fa-solid fa-minus'];
        document.getElementById('score').classList = ['fa-solid fa-minus'];

        if(isUp) document.getElementById(column).classList = ['fa-solid fa-down-long']

        else document.getElementById(column).classList = ['fa-solid fa-up-long']

    } else if (type === 'Race') {
        document.getElementById('tabledate').classList = ['fa-solid fa-minus'];
        document.getElementById('tablelaps').classList = ['fa-solid fa-minus'];
        document.getElementById('tabletime').classList = ['fa-solid fa-minus'];

        column = 'table' + column
        if(isUp) document.getElementById(column).classList = ['fa-solid fa-down-long']

        else document.getElementById(column).classList = ['fa-solid fa-up-long']
    }
    
}

function emptyLocalStorage() {
    if (window.confirm(" !! WARNING !! This action will delete ALL race data. Are you sure you wish to proceed?")) {
        localStorage.removeItem('gameList');
        localStorage.removeItem('gameNumber')
        gameNumber = 1;
        gameList = [];
        filteredGames = gameList
        updateBoard(gameList, "Race");
    }
}

function toggleInputSection() {
    let inputSection = document.getElementById('inputSection');
    inputSection.style.display = (inputSection.style.display === 'none') ? 'block' : 'none';
}

function filterDateRangeSection() {
    let filterSection = document.getElementById('filterRange');
    filterSection.style.display = (filterSection.style.display === 'none') ? 'block' : 'none';
}

function filterGameList(type) {
    let startDate = document.getElementById('dateStart').value;
    let endDate = document.getElementById('dateEnd').value;
    console.log(startDate + " - " + endDate)

    let startDateNum = parseFloat(startDate.substring(0,4) + startDate.substring(5,7) + startDate.substring(8,10));
    let endDateNum = parseFloat(endDate.substring(0,4) + endDate.substring(5,7) + endDate.substring(8,10));

    console.log(startDateNum + " - " + endDateNum)

    let filteredGameList = gameList.filter((race) => {
        raceDate = parseFloat(race.date);
        return raceDate >= startDateNum && raceDate <= endDateNum;
    })

    console.log(filteredGameList);

    if(startDateNum < endDateNum) {
        if(isNaN(startDate) && isNaN(startDate)) {
            filteredGames = filteredGameList;
            updateBoard(filteredGameList, type);
        } else window.alert("Make sure Each date range is filled in")
    } else {
        window.alert("End date smaller than the start date, Please Re-Enter the dates ensuring that the End Date is greater than the Start Date")
    }
}

function createDriverArray(driverName, games) {
    let driverResults = [];
    
    games.forEach((el) => {
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

function createDriversChampionshipArray(games) { // Definitly wierd hollup
    const driversChampionship = [];

    drivers.forEach((driver) => {
        let points = 0;
        let team = teamCalculate(driver)
        games.forEach((race) => {
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

function createConstructorArray(constructorName, games) { // Return an array that has the points, 
    let driversInTeam = getDriversFromTeam(constructorName);
    let constructorArray = [];

    let driver1 = createDriverArray(driversInTeam.driver1, games);
    let driver2 = createDriverArray(driversInTeam.driver2, games);


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

function createConstructorChampionshipArray(games) {
    let constructorChampionshipArray = [];

    teams.forEach((team) => {
        let driversInTeam = getDriversFromTeam(team);
        let driver1 = driversInTeam.driver1;
        let driver2 = driversInTeam.driver2;
        let points = calculateTeamPoints(driver1, driver2, games);

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

function calculateTeamPoints(driver1, driver2, games) {
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
