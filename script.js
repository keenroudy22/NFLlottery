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

function displayTeamLogo(teamName) {
  const logo = teamLogos[teamName] || "";
  return logo ? `<img src="${logo}" alt="${teamName}" class="team-logo"> ${teamName}` : teamName;
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

      availableAFC = availableAFC.filter(t => t !== afcTeam);
      availableNFC = availableNFC.filter(t => t !== nfcTeam);

      document.getElementById(`${player}-afc${i}`).innerHTML = displayTeamLogo(afcTeam);
      document.getElementById(`${player}-nfc${i}`).innerHTML = displayTeamLogo(nfcTeam);
    }
  });
}

document.getElementById("playerContainer").innerHTML = players.map(createPlayerDiv).join("");
document.getElementById("randomButton").addEventListener("click", fillTeams);
