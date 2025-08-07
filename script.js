const rankings = [
  "Eagles", "Chiefs", "Bills", "Ravens", "Lions", "Commanders", "Rams", "Texans",
  "Buccaneers", "Broncos", "Packers", "Vikings", "49ers", "Bengals", "Chargers", "Steelers",
  "Bears", "Seahawks", "Cowboys", "Cardinals", "Patriots", "Jets", "Falcons", "Colts",
  "Panthers", "Titans", "Raiders", "Jaguars", "Dolphins", "Giants", "Saints", "Browns"
];

const afcTeams = [
  "Bills", "Ravens", "Chiefs", "Texans", "Broncos", "Chargers", "Steelers",
  "Patriots", "Jets", "Colts", "Titans", "Raiders", "Jaguars", "Dolphins", "Browns"
];

const nfcTeams = rankings.filter(team => !afcTeams.includes(team));

const players = ["Kinnon", "Richie", "xxxxxx", "Kenzee", "Breena", "Mariah", "Dirb", "Sean"];

const teamLogos = {
  "Eagles": "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
  "Chiefs": "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
  "Bills": "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
  "Ravens": "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png",
  "Lions": "https://a.espncdn.com/i/teamlogos/nfl/500/det.png",
  "Commanders": "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png",
  "Rams": "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png",
  "Texans": "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png",
  "Buccaneers": "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png",
  "Broncos": "https://a.espncdn.com/i/teamlogos/nfl/500/den.png",
  "Packers": "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
  "Vikings": "https://a.espncdn.com/i/teamlogos/nfl/500/min.png",
  "49ers": "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
  "Bengals": "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png",
  "Chargers": "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png",
  "Steelers": "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
  "Bears": "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png",
  "Seahawks": "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
  "Cowboys": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
  "Cardinals": "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png",
  "Patriots": "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
  "Jets": "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png",
  "Falcons": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
  "Colts": "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png",
  "Panthers": "https://a.espncdn.com/i/teamlogos/nfl/500/car.png",
  "Titans": "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png",
  "Raiders": "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png",
  "Jaguars": "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png",
  "Dolphins": "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png",
  "Giants": "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png",
  "Saints": "https://a.espncdn.com/i/teamlogos/nfl/500/no.png",
  "Browns": "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png"
};

function weightedRandomPick(pool) {
  const weightedPool = pool.map(team => ({
    name: team,
    weight: 33 - rankings.indexOf(team)
  }));
  const total = weightedPool.reduce((sum, t) => sum + t.weight, 0);
  const r = Math.random() * total;
  let cumulative = 0;
  for (let t of weightedPool) {
    cumulative += t.weight;
    if (r < cumulative) return t.name;
  }
}

function logoOnly(teamName) {
  const logo = teamLogos[teamName];
  return logo ? `<img src="${logo}" alt="${teamName}" class="team-logo-only">` : teamName;
}

function createPlayerDiv(player) {
  return `
    <div class="player-card" id="card-${player}">
      <h2>${player}</h2>
      <div class="team-group">
        <div id="${player}-afc1" class="team-box"></div>
        <div id="${player}-afc2" class="team-box"></div>
        <div id="${player}-nfc1" class="team-box"></div>
        <div id="${player}-nfc2" class="team-box"></div>
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

      availableAFC = availableAFC.filter(t => t !== afcTeam);
      availableNFC = availableNFC.filter(t => t !== nfcTeam);

      document.getElementById(`${player}-afc${i}`).innerHTML = logoOnly(afcTeam);
      document.getElementById(`${player}-nfc${i}`).innerHTML = logoOnly(nfcTeam);
    }
  });

  // Reset tracker
  document.getElementById("winnerResult").innerHTML = "";
  document.querySelectorAll(".player-card").forEach(card => card.classList.remove("winner"));
}

function populateWinnerDropdown() {
  const select = document.getElementById("winnerTeamSelect");
  select.innerHTML = `<option value="">-- Select Winning Team --</option>`;
  Object.keys(teamLogos).forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    select.appendChild(option);
  });
}

function markWinner() {
  const winnerTeam = document.getElementById("winnerTeamSelect").value;
  if (!winnerTeam) return;

  let winnerPlayer = null;

  // Reset previous highlights
  document.querySelectorAll(".player-card").forEach(el => el.classList.remove("winner"));

  // Find the winner
  players.forEach(player => {
    for (let i = 1; i <= 2; i++) {
      const afcEl = document.getElementById(`${player}-afc${i}`);
      const nfcEl = document.getElementById(`${player}-nfc${i}`);

      const teamFound =
        afcEl.innerHTML.includes(teamLogos[winnerTeam]) ||
        nfcEl.innerHTML.includes(teamLogos[winnerTeam]);

      if (teamFound) {
        winnerPlayer = player;
        document.getElementById(`card-${player}`).classList.add("winner");
      }
    }
  });

  if (winnerPlayer) {
    const losers = players.filter(p => p !== winnerPlayer);
    document.getElementById("winnerResult").innerHTML =
      `<span>${winnerPlayer} WINS! 🏆</span><br>Each player owes them $15:<br><strong>${losers.join(", ")}</strong>`;
  } else {
    document.getElementById("winnerResult").innerText = "No player owns that team.";
  }
}

// Init
document.getElementById("playerContainer").innerHTML = players.map(createPlayerDiv).join("");
document.getElementById("randomButton").addEventListener("click", fillTeams);
document.getElementById("markWinnerBtn").addEventListener("click", markWinner);
populateWinnerDropdown();
