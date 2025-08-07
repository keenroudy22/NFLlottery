const players = ["Kinnon", "Richie", "xxxxxx", "Kenzee", "Breena", "Mariah", "Dirb", "Sean"];

const rankings = [
  "Eagles", "Chiefs", "Bills", "Ravens", "Lions", "Commanders", "Rams", "Texans",
  "Buccaneers", "Broncos", "Packers", "Vikings", "49ers", "Bengals", "Chargers", "Steelers",
  "Bears", "Seahawks", "Cowboys", "Cardinals", "Patriots", "Jets", "Falcons", "Colts",
  "Panthers", "Titans", "Raiders", "Jaguars", "Dolphins", "Giants", "Saints", "Browns"
];

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

function assignTeams() {
  const availableTeams = [...rankings];
  const playerTeams = {};

  // Assign 4 teams to each player
  players.forEach(player => {
    playerTeams[player] = [];
    for (let i = 0; i < 4; i++) {
      const randIndex = Math.floor(Math.random() * availableTeams.length);
      const selected = availableTeams.splice(randIndex, 1)[0];
      playerTeams[player].push(selected);
    }
  });

  displayTeams(playerTeams);
}

function displayTeams(data) {
  const container = document.getElementById("playersContainer");
  container.innerHTML = "";

  for (const [player, teams] of Object.entries(data)) {
    const block = document.createElement("div");
    block.className = "player-block";

    const name = document.createElement("div");
    name.className = "player-name";
    name.textContent = player;

    const teamRow = document.createElement("div");
    teamRow.className = "team-container";

    teams.forEach(team => {
      const img = document.createElement("img");
      img.src = teamLogos[team];
      img.alt = team;
      img.className = "team-logo";
      teamRow.appendChild(img);
    });

    block.appendChild(name);
    block.appendChild(teamRow);
    container.appendChild(block);
  }
}

document.getElementById("assignButton").addEventListener("click", assignTeams);
