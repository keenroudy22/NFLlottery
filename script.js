let players = [
    { name: "Player 1", teams: [], owed: 0 },
    { name: "Player 2", teams: [], owed: 0 },
    // Add more players as needed
];

function assignTeams() {
    // Randomly assign teams to each player
    // Example: players[0].teams = ["Team A", "Team B"];
}

function trackGame() {
    const teamName = document.getElementById('teamInput').value;
    const score = parseInt(document.getElementById('scoreInput').value);

    if (score === 27) {
        players.forEach(player => {
            if (player.teams.includes(teamName)) {
                player.owed += 10;
                document.getElementById('gameResults').innerText = `${player.name} is owed $10!`;
            }
        });
    }

    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';
    
    players.forEach(player => {
        const playerInfo = document.createElement('div');
        playerInfo.innerText = `${player.name}: $${player.owed} owed`;
        leaderboardList.appendChild(playerInfo);
    });
}

assignTeams();
updateLeaderboard();

