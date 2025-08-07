const afcTeams = [
    { name: "Eagles", rank: 1 },
    { name: "Ravens", rank: 2 },
    { name: "Bills", rank: 3 },
    { name: "Chiefs", rank: 4 },
    { name: "Dolphins", rank: 5 },
    { name: "Bengals", rank: 6 },
    { name: "Jaguars", rank: 7 },
    { name: "Jets", rank: 8 },
    { name: "Texans", rank: 9 },
    { name: "Steelers", rank: 10 },
    { name: "Chargers", rank: 11 },
    { name: "Colts", rank: 12 },
    { name: "Patriots", rank: 13 },
    { name: "Titans", rank: 14 },
    { name: "Raiders", rank: 15 },
    { name: "Broncos", rank: 16 },
];

const nfcTeams = [
    { name: "Lions", rank: 1 },
    { name: "Cowboys", rank: 2 },
    { name: "49ers", rank: 3 },
    { name: "Rams", rank: 4 },
    { name: "Packers", rank: 5 },
    { name: "Vikings", rank: 6 },
    { name: "Commanders", rank: 7 },
    { name: "Buccaneers", rank: 8 },
    { name: "Seahawks", rank: 9 },
    { name: "Falcons", rank: 10 },
    { name: "Bears", rank: 11 },
    { name: "Saints", rank: 12 },
    { name: "Giants", rank: 13 },
    { name: "Panthers", rank: 14 },
    { name: "Cardinals", rank: 15 },
    { name: "Packers B", rank: 16 }, // Just a filler to make 16 teams
];

const players = ["Kinnon", "KJ", "xxxxxx", "Kenzee", "Breena", "Richie", "Sean", "Mariah"];

function weightedRandomPick(pool) {
    const weightedPool = pool.map(team => ({
        ...team,
        weight: 33 - team.rank // Weaker teams = higher weight
    }));
    const totalWeight = weightedPool.reduce((sum, t) => sum + t.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;
    for (let team of weightedPool) {
        cumulative += team.weight;
        if (rand < cumulative) return team;
    }
}

function createPlayerDiv(player) {
    return `
        <div class="player">
            <div><strong>${player}</strong></div>
            <div>
                <div class="conference-label">AFC Teams</div>
                <div class="empty-box" id="${player}-afc1"></div>
                <div class="empty-box" id="${player}-afc2"></div>
            </div>
            <div>
                <div class="conference-label">NFC Teams</div>
                <div class="empty-box" id="${player}-nfc1"></div>
                <div class="empty-box" id="${player}-nfc2"></div>
            </div>
        </div>
    `;
}

function fillTeams() {
    let availableAFC = [...afcTeams];
    let availableNFC = [...nfcTeams];

    players.forEach(player => {
        for (let i = 1; i <= 2; i++) {
            const afcTeam = weightedRandomPick(availableAFC);
            const nfcTeam = weightedRandomPick(availableNFC);

            // Remove picked teams so no duplicates
            availableAFC = availableAFC.filter(t => t.name !== afcTeam.name);
            availableNFC = availableNFC.filter(t => t.name !== nfcTeam.name);

            document.getElementById(`${player}-afc${i}`).textContent = afcTeam.name;
            document.getElementById(`${player}-nfc${i}`).textContent = nfcTeam.name;
        }
    });
}

// Initial HTML generation
document.getElementById('playerContainer').innerHTML = players.map(createPlayerDiv).join('');
document.getElementById('randomButton').addEventListener('click', fillTeams);
