let gameNumber = 1;
let currentSorted = [false, false]; /*First boolean is indicating if a number has been selected, 2nd in indicating if its currently sorted up or down*/
let gameList = JSON.parse(localStorage.getItem('gameList')) || [];
reWriteTable(gameList)



function saveGameData() {
    localStorage.setItem('gameList', JSON.stringify(gameList));
}

function addNewRace() {
    let grandPrix = document.getElementById('grandPrix').value;
    let laps = document.getElementById('laps').value;
    let time = document.getElementById('time').value;
    let date = getPNum('date')
    let winner = getPNum('winner');
    let pTwo= getPNum('2nd');
    let pThree= getPNum('3rd');
    let pFour= getPNum('4th');
    let pFive= getPNum('5th');
    let pSix= getPNum('6th');
    let pSeven= getPNum('7th');
    let pEight= getPNum('8th');
    let pNine= getPNum('9th');
    let pTen= getPNum('10th');
    let pEleven= getPNum('11th');
    let pTwelve= getPNum('12th');
    let pThirteen= getPNum('13th');
    let pFourteen= getPNum('14th');
    let pFivteen= getPNum('15th');
    let pSixteen= getPNum('16th');
    let pSeventeen= getPNum('17th');
    let pEighteen= getPNum('18th');
    let pNineteen= getPNum('19th');
    let pTwenty= getPNum('20th')

    addRow(grandPrix, winner, date, laps, time);
}

function getPNum(str) {
    return document.getElementById(str).value;
}

function setPNum(innerHtml, newRow) { /* Make it so p2-20 doesnt show on the main table with boolean */
    element = document.createElement('td');
    element.innerText = innerHtml;
    newRow.appendChild(newGameValue);
}


function addRow(grandPrix, winner, date, laps, time, pTwo, pThree, pFour, pFive, pSix, pSeven, pEight, pNine, pTen, pEleven, pTwelve, pThirteen, pFourteen, pFivteen, pSixteen, pSeventeen, pEighteen, pNineteen, pTwenty) {
    let tableBody = document.getElementById('statsTableBody');

    let newRow = document.createElement('tr');

    let newGameValue = document.createElement('td'); newGameValue.innerText = gameNumber; newRow.appendChild(newGameValue);
    let newGrandPrixValue = document.createElement('td'); newGrandPrixValue.innerText = grandPrix; newRow.appendChild(newGrandPrixValue);
    let newDateValue = document.createElement('td'); newDateValue.innerText = date; newRow.appendChild(newDateValue);
    let newLapsValue = document.createElement('td'); newLapsValue.innerText = laps; newRow.appendChild(newLapsValue);
    let newTimeValue = document.createElement('td'); newTimeValue.innerText = time.substring(0,2) + ":" + time.substring(2,4) + ":" + time.substring(4,6); newRow.appendChild(newTimeValue);
    
    setPNum(winner, newRow); setPNum(pTwo, newRow); setPNum(pThree, newRow); setPNum(pFour, newRow); setPNum(pFive, newRow); setPNum(pSix, newRow); setPNum(pSeven, newRow); setPNum(pEight, newRow); setPNum(pNine, newRow); setPNum(pTen, newRow)
    setPNum(pEleven, newRow); setPNum(pTwelve, newRow); setPNum(pThirteen, newRow); setPNum(pFourteen, newRow); setPNum(pFivteen, newRow); setPNum(pSixteen, newRow); setPNum(pSeventeen, newRow); setPNum(pEighteen, newRow); setPNum(pNineteen, newRow); setPNum(pTwenty, newRow)

    let gameData = {
        raceNumber: gameNumber,
        grandPrix: grandPrix,
        winner: winner,
        winningConstructor: winningConstructor,
        laps: laps,
        time: time,
        pTwo: pTwo, pThree: pThree, pFour: pFour, pFive: pFive, pSix: pSix, pSeven: pSeven, pEight: pEight, pNine: pNine, pTen: pTen, pEleven: pEleven, pTwelve: pTwelve, pThirteen: pThirteen, pFourteen: pFourteen, pFivteen: pFivteen, pSixteen: pSixteen, pSeventeen: pSeventeen, pEighteen: pEighteen, pNineteen: pNineteen, pTwenty: pTwenty
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
        addRow(data.grandPrix, data.winner, data.winningConstructor, data.laps, data.time, data.p1, data.p2);
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