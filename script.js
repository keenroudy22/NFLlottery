const players = ["Kinnon", "Richie", "xxxxxx", "Kenzee", "Breena", "Mariah", "Dirb", "Sean"];

const rankings = [
  "Eagles", "Chiefs", "Bills", "Ravens", "Lions", "Commanders", "Rams", "Texans",
  "Buccaneers", "Broncos", "Packers", "Vikings", "49ers", "Bengals", "Chargers", "Steelers",
  "Bears", "Seahawks", "Cowboys", "Cardinals", "Patriots", "Jets", "Falcons", "Colts",
  "Panthers", "Titans", "Raiders", "Jaguars", "Dolphins", "Giants", "Saints", "Browns"
];

const teamAbbr = {
  "49ers": "sf",
  "Commanders": "wsh",
  "Patriots": "ne",
  "Jets": "nyj",
  "Giants": "nyg",
  "Saints": "no",
  "Browns": "cle",
  "Titans": "ten",
  "Chargers": "lac",
  "Raiders": "lv",
  "Colts": "ind",
  "Bears": "chi",
  "Packers": "gb",
  "Dolphins": "mia",
  "Falcons": "atl",
  "Steelers": "pit",
  "Ravens": "bal",
  "Bengals": "cin",
  "Bills": "buf",
  "Chiefs": "kc",
  "Broncos": "den",
  "Texans": "hou",
  "Lions": "det",
  "Jaguars": "jax",
  "Panthers": "car",
  "Buccaneers": "tb",
  "Cowboys": "dal",
  "Seahawks": "sea",
  "Rams": "lar",
  "Vikings": "min",
  "Eagles": "phi"
};

const teamLogos = {};
rankings.forEach(team => {
  const abbr = teamAbbr[team] || team.toLowerCase().replace(/\s/g, '');
  teamLogos[team] = `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr}.png`;
});

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

function assignTeams() {
  const usedTeams = new Set();
  const container = document.getElementById("playerContainer");
  container.innerHTML = "";

  players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player";

    const name = document.createElement("div");
    name.className = "player-name";
    name.innerText = player;
    playerDiv.appendChild(name);

    const teamWrapper = document.createElement("div");
    teamWrapper.className = "team-boxes";

    let assigned = 0;
    while (assigned < 4) {
      const pick = weightedRandomPick(rankings);
      if (!usedTeams.has(pick)) {
        usedTeams.add(pick);
        const logoDiv = document.createElement("div");
        logoDiv.className = "team-logo";
        const img = document.createElement("img");
        img.src = teamLogos[pick];
        img.alt = pick;
        logoDiv.appendChild(img);
        teamWrapper.appendChild(logoDiv);
        assigned++;
      }
    }

    playerDiv.appendChild(teamWrapper);
    container.appendChild(playerDiv);
  });
}

document.getElementById("randomButton").addEventListener("click", assignTeams);
