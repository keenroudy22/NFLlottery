// List of NFL teams by conference
const afcTeams = ["Bills", "Dolphins", "Patriots", "Jets", "Ravens", "Bengals", "Browns", "Steelers", 
                  "Texans", "Colts", "Jaguars", "Titans", "Broncos", "Chiefs", "Raiders", "Chargers"];
const nfcTeams = ["Cowboys", "Giants", "Eagles", "Commanders", "Bears", "Lions", "Packers", "Vikings",
                  "Falcons", "Panthers", "Saints", "Buccaneers", "Cardinals", "Rams", "49ers", "Seahawks"];

let players = [
    { name: "Player 1", afcTeams: [], nfcTeams: [], owed: 0 },
    { name: "Player 2", afcTeams: [], nfcTeams: [], owed: 0 },
    // Add more players as needed
];

// Function to randomly assign 2 AFC and 2 NFC teams to each player
function assignTeams() {
    players.forEach(player => {
        player.afcTeams = getRandomTeams(afcTeams, 2);
        player.nfcTeams = getRandomTeams(nfcTeams, 2);
    });
    displayPlayers();
}

// Function to get random teams from a list
function getRandomTeams(teamList, count) {
    const selectedTeams = [];
    const tempTeams = [...teamList];
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * tempTeams.length);
        selectedTeams.push(tempTeams.splice(randomIndex, 1)[0]);
    }
    
    return selectedTeams;
}

// Function to display assigned teams for each player
function displayPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    
    players.forEach(player => {
        const playerInfo = document.createElement('div');
        playerInfo.innerHTML = `<strong>${player.name}</strong>:<br> 
                                AFC Teams: ${player.afcTeams.join(", ")}<br>
                                NFC Teams: ${player.nfcTeams.join(", ")}`;
        playerList.appendChild(playerInfo);
    });
}

// Function to track games and update payouts
function trackGame() {
    const teamName = document.getElementById('teamInput').value;
    const score = parseInt(document.getElementById('scoreInput').value);
    const win = confirm("Did the team win?");
    
    if (score === 27 && win) {
        players.forEach(player => {
            if (player.afcTeams.includes(teamName) || player.nfcTeams.includes(teamName)) {
                player.owed += 10;
                document.getElementById('gameResults').innerText = `${player.name} is owed $10!`;
            }
        });
    }
    
    updateLeaderboard();
}

// Function to update the leaderboard
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';
    
    players.forEach(player => {
        const playerInfo = document.createElement('div');
        playerInfo.innerText = `${player.name}: $${player.owed} owed`;
        leaderboardList.appendChild(playerInfo);
    });
}

// Initial team assignment when the page loads
assignTeams();
