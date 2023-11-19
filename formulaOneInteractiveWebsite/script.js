let gameNumber = 1;
let currentSorted = [false, false]; /*First boolean is indicating if a number has been selected, 2nd in indicating if its currently sorted up or down*/
let gameList = JSON.parse(localStorage.getItem('gameList')) || [];
reWriteTable(gameList)



function saveGameData() {
    localStorage.setItem('gameList', JSON.stringify(gameList));
}

function addNewRace() {
    let grandPrix = document.getElementById('grandPrix').value;
    let winner = document.getElementById('winner').value;
    let winningConstructor = document.getElementById('winningConstructor').value;
    let laps = document.getElementById('laps').value;
    let time = document.getElementById('time').value;

    addRow(grandPrix, winner, winningConstructor, laps, time);
}


function addRow(grandPrix, winner, winningConstructor, laps, time) {
    let tableBody = document.getElementById('statsTableBody');

    let newRow = document.createElement('tr');

    let newGameValue = document.createElement('td'); newGameValue.innerText = gameNumber; newRow.appendChild(newGameValue);
    let newGrandPrixValue = document.createElement('td'); newGrandPrixValue.innerText = grandPrix; newRow.appendChild(newGrandPrixValue);
    let newWinnerValue = document.createElement('td'); newWinnerValue.innerText = winner; newRow.appendChild(newWinnerValue);
    let newWinningConstructorValue = document.createElement('td'); newWinningConstructorValue.innerText = winningConstructor; newRow.appendChild(newWinningConstructorValue);
    let newLapsValue = document.createElement('td'); newLapsValue.innerText = laps; newRow.appendChild(newLapsValue);
    let newTimeValue = document.createElement('td'); newTimeValue.innerText = time.substring(0,2) + ":" + time.substring(2,4) + ":" + time.substring(4,6); newRow.appendChild(newTimeValue);
    
    let gameData = {
        raceNumber: gameNumber,
        grandPrix: grandPrix,
        winner: winner,
        winningConstructor: winningConstructor,
        laps: laps,
        time: time
    }
    gameNumber++;

    gameList.push(gameData);
    tableBody.appendChild(newRow);
    saveGameData();
    document.getElementById('grandPrix').value = ''; document.getElementById('winner').value = ''; document.getElementById('laps').value = ''; document.getElementById('time').value = ''; document.getElementById('winningConstructor').value = '';
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
        addRow(data.grandPrix, data.winner, data.winningConstructor, data.laps, data.time);
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