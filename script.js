const players = ["Kinnon", "Richie", "xxxxxx", "Kenzee", "Breena", "Mariah", "Dirb", "Sean"];

const rankings = [
  "Eagles", "Chiefs", "Bills", "Ravens", "Lions", "Commanders", "Rams", "Texans",
  "Buccaneers", "Broncos", "Packers", "Vikings", "49ers", "Bengals", "Chargers", "Steelers",
  "Bears", "Seahawks", "Cowboys", "Cardinals", "Patriots", "Jets", "Falcons", "Colts",
  "Panthers", "Titans", "Raiders", "Jaguars", "Dolphins", "Giants", "Saints", "Browns"
];

const teamLogos = {};
rankings.forEach(team => {
  const teamName = team.toLowerCase()
    .replace(" ", "")
    .replace("49ers", "sf")
    .replace("commanders", "wsh")
    .replace("patriots", "ne")
    .replace("jets", "nyj")
    .replace("giants", "nyg")
    .replace("saints", "no")
    .replace("browns", "cle")
    .replace("titans", "ten")
    .replace("chargers", "lac")
    .replace("raiders", "lv")
    .replace("colts", "ind")
    .replace("bears", "chi")
    .replace("packers", "gb")
    .replace("dolphins", "mia")
    .replace("falcons", "atl")
    .replace("steelers", "pit")
    .replace("ravens", "bal")
    .replace("bengals", "cin")
    .replace("bills", "buf")
    .replace("chiefs", "kc")
    .replace("broncos", "den")
    .replace("texans", "hou")
    .replace("lions", "det")
    .replace("jaguars", "jax")
    .replace("panthers", "car")
    .replace("buccaneers", "tb")
    .replace("cowboys", "dal")
    .replace("seahawks", "sea")
    .replace("rams", "lar")
    .replace("vikings", "min")
    .replace("eagles", "phi")
    .replace("49ers", "sf");

  teamLogos[team] = `https://a.espncdn.com/i/teamlogos/nfl/500/${teamName}.png`;
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
