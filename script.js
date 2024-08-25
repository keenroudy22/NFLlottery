const afcTeams = ["Bills", "Dolphins", "Patriots", "Jets", "Ravens", "Bengals", "Browns", "Steelers", 
                  "Texans", "Colts", "Jaguars", "Titans", "Broncos", "Chiefs", "Raiders", "Chargers"];
const nfcTeams = ["Cowboys", "Giants", "Eagles", "Commanders", "Bears", "Lions", "Packers", "Vikings",
                  "Falcons", "Panthers", "Saints", "Buccaneers", "Cardinals", "Rams", "49ers", "Seahawks"];

const players = ["Kinnon", "KJ", "Koby", "Kenzee", "Breena", "Richie", "Sean", "Hudson"];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createPlayerDiv(player) {
    return `
        <div class="player">
            <div><strong>${player}</strong></div>
            <div>
                <div class="empty-box" id="${player}-afc1"></div>
                <div class="empty-box" id="${player}-afc2"></div>
            </div>
            <div>
                <div class="empty-box" id="${player}-nfc1"></div>
                <div class="empty-box" id="${player}-nfc2"></div>
            </div>
        </div>
    `;
}

function fillTeams() {
    const afcTeamsShuffled = shuffle([...afcTeams]);
    const nfcTeamsShuffled = shuffle([...nfcTeams]);

    players.forEach(player => {
        for (let i = 1; i <= 2; i++) {
            const afcTeam = afcTeamsShuffled.pop();
            const nfcTeam = nfcTeamsShuffled.pop();
            document.getElementById(`${player}-afc${i}`).textContent = afcTeam;
            document.getElementById(`${player}-nfc${i}`).textContent = nfcTeam;
        }
    });
}

document.getElementById('playerContainer').innerHTML = players.map(createPlayerDiv).join('');
document.getElementById('randomButton').addEventListener('click', fillTeams);
