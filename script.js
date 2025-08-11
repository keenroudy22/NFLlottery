// ---------- Data with ESPN abbreviations for logos ----------
const TEAMS = [
  // AFC (16)
  { name:"Bills",      conf:"AFC", abbr:"buf" },
  { name:"Dolphins",   conf:"AFC", abbr:"mia" },
  { name:"Patriots",   conf:"AFC", abbr:"ne"  },
  { name:"Jets",       conf:"AFC", abbr:"nyj" },
  { name:"Ravens",     conf:"AFC", abbr:"bal" },
  { name:"Bengals",    conf:"AFC", abbr:"cin" },
  { name:"Browns",     conf:"AFC", abbr:"cle" },
  { name:"Steelers",   conf:"AFC", abbr:"pit" },
  { name:"Texans",     conf:"AFC", abbr:"hou" },
  { name:"Colts",      conf:"AFC", abbr:"ind" },
  { name:"Jaguars",    conf:"AFC", abbr:"jax" },
  { name:"Titans",     conf:"AFC", abbr:"ten" },
  { name:"Chiefs",     conf:"AFC", abbr:"kc"  },
  { name:"Raiders",    conf:"AFC", abbr:"lv"  },
  { name:"Chargers",   conf:"AFC", abbr:"lac" },
  { name:"Broncos",    conf:"AFC", abbr:"den" },

  // NFC (16)
  { name:"Cowboys",    conf:"NFC", abbr:"dal" },
  { name:"Giants",     conf:"NFC", abbr:"nyg" },
  { name:"Eagles",     conf:"NFC", abbr:"phi" },
  { name:"Commanders", conf:"NFC", abbr:"wsh" },
  { name:"Lions",      conf:"NFC", abbr:"det" },
  { name:"Vikings",    conf:"NFC", abbr:"min" },
  { name:"Packers",    conf:"NFC", abbr:"gb"  },
  { name:"Bears",      conf:"NFC", abbr:"chi" },
  { name:"Buccaneers", conf:"NFC", abbr:"tb"  },
  { name:"Falcons",    conf:"NFC", abbr:"atl" },
  { name:"Panthers",   conf:"NFC", abbr:"car" },
  { name:"Saints",     conf:"NFC", abbr:"no"  },
  { name:"49ers",      conf:"NFC", abbr:"sf"  },
  { name:"Seahawks",   conf:"NFC", abbr:"sea" },
  { name:"Rams",       conf:"NFC", abbr:"lar" },
  { name:"Cardinals",  conf:"NFC", abbr:"ari" },
];

const LOGO_URL = (abbr) => `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr}.png`;

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function snakeOrder(baseOrder, roundIndex){
  return (roundIndex % 2 === 0) ? baseOrder.slice() : baseOrder.slice().reverse();
}
function el(tag, attrs={}, ...children){
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k==='class') n.className=v;
    else if(k==='html') n.innerHTML=v;
    else n.setAttribute(k,v);
  });
  children.flat().forEach(c=>{
    if(c==null) return;
    if(typeof c==='string') n.appendChild(document.createTextNode(c));
    else n.appendChild(c);
  });
  return n;
}

// ---------- URL player names ----------
function applyPlayersFromQuery(){
  const params = new URLSearchParams(location.search);
  const raw = params.get("players");
  if(!raw) return;
  // split by comma or pipe, trim, ignore empties
  const names = raw.split(/[|,]/).map(s=>s.trim()).filter(Boolean).slice(0,8);
  if(names.length === 0) return;
  const inputs = $$("#playerList input");
  for(let i=0;i<inputs.length;i++){
    inputs[i].value = names[i] || `Player ${i+1}`;
  }
}

// ---------- State ----------
let players = [];           // [{name, picks:[], afc:0, nfc:0}]
let order = [];             // [0..7]
let roundPattern = ["AFC","NFC","AFC","NFC"];
let afcPool = [];
let nfcPool = [];
let log = [];
let isDrafting = false;
let currentRound = 0;       // 0..3
let pickIndexThisRound = 0; // 0..7
let autoTimer = null;
let speedMs = 900;
let history = []; // stack of {round, orderIndex, playerIndex, team}

const playerInputs = $$("#playerList input");
const draftOrderEl = $("#draftOrder");
const afcPoolEl = $("#afcPool");
const nfcPoolEl = $("#nfcPool");
const boardsEl = $("#boards");
const logList = $("#logList");
const onClockEl = $("#onClock");
const roundInfoEl = $("#roundInfo");
const confInfoEl = $("#confInfo");

// ---------- Events ----------
$("#randomizeOrderBtn").addEventListener("click", () => {
  syncPlayersFromInputs();
  order = shuffle(order);
  renderOrder();
});
$("#resetOrderBtn").addEventListener("click", () => {
  playerInputs.forEach((inp,i)=>inp.value = `Player ${i+1}`);
});
$("#patternSelect").addEventListener("change", (e)=>{
  roundPattern = e.target.value.split(",");
  if(isDrafting) updateStatus();
});
$("#speedSelect").addEventListener("change",(e)=>{
  speedMs = parseInt(e.target.value,10);
  if(isDrafting && autoTimer){
    clearInterval(autoTimer);
    autoTimer = (speedMs>0) ? setInterval(stepPick, speedMs) : null;
  }
});
$("#startDraftBtn").addEventListener("click", startDraft);
$("#nextPickBtn").addEventListener("click", ()=> stepPick());
$("#undoBtn").addEventListener("click", undoLast);
$("#resetBtn").addEventListener("click", resetDraft);

// ---------- Renders (w/ logos) ----------
function syncPlayersFromInputs(){
  players = playerInputs.map(inp => ({ name: inp.value.trim() || "Player", picks:[], afc:0, nfc:0 }));
  if(order.length!==players.length) order = players.map((_,i)=>i);
}
function renderOrder(){
  draftOrderEl.innerHTML = "";
  order.forEach(i=>{
    draftOrderEl.appendChild(el("li", {}, players[i].name));
  });
}
function teamPill(t){
  return el("li",{class:"team-pill"},
    el("div",{class:"lhs"},
      el("img",{class:"logo", src:LOGO_URL(t.abbr), alt:`${t.name} logo`, loading:"lazy"}),
      el("span",{}, t.name)
    ),
    el("span",{class:`tag ${t.conf.toLowerCase()}`}, t.conf)
  );
}
function renderPools(){
  afcPoolEl.innerHTML = "";
  nfcPoolEl.innerHTML = "";
  afcPool.forEach(t=> afcPoolEl.appendChild(teamPill(t)));
  nfcPool.forEach(t=> nfcPoolEl.appendChild(teamPill(t)));
}
function renderBoards(){
  boardsEl.innerHTML = "";
  players.forEach((p)=>{
    const board = el("div",{class:"board"});
    board.appendChild(el("header",{}, el("h3",{}, `${p.name}`)));
    const list = el("ol");
    for(let i=0;i<4;i++){
      const pick = p.picks[i];
      if(pick){
        list.appendChild(
          el("li",{},
            el("div",{class:"pick-lhs"},
              el("img",{class:"logo", src:LOGO_URL(pick.abbr), alt:`${pick.name} logo`, loading:"lazy"}),
              el("span",{}, pick.name)
            ),
            el("span",{class:`conf ${pick.conf.toLowerCase()}`}, pick.conf)
          )
        );
      }else{
        list.appendChild(el("li",{class:"empty"}, el("span",{style:"opacity:.6"}, "—")));
      }
    }
    board.appendChild(list);
    boardsEl.appendChild(board);
  });
}
function renderLog(){
  logList.innerHTML = "";
  log.forEach(item=> logList.appendChild(el("li",{}, item)));
}
function updateStatus(){
  const roundHuman = currentRound+1;
  const conf = roundPattern[currentRound] || "?";
  roundInfoEl.textContent = `Round ${roundHuman} / 4`;
  confInfoEl.textContent = `Conference: ${conf}`;
  const ord = snakeOrder(order, currentRound);
  const idx = ord[pickIndexThisRound];
  onClockEl.textContent = players[idx]?.name ?? "—";
}

// ---------- Draft Flow ----------
function startDraft(){
  if(isDrafting) return;

  syncPlayersFromInputs();
  if(players.length !== 8){ alert("Must have exactly 8 players."); return; }

  afcPool = TEAMS.filter(t=>t.conf==="AFC");
  nfcPool = TEAMS.filter(t=>t.conf==="NFC");
  log = [];
  history = [];
  players.forEach(p=>{ p.picks=[]; p.afc=0; p.nfc=0; });

  currentRound = 0;
  pickIndexThisRound = 0;
  isDrafting = true;

  $("#startDraftBtn").disabled = true;
  $("#nextPickBtn").disabled = false;
  $("#undoBtn").disabled = true;

  renderOrder(); renderPools(); renderBoards(); renderLog(); updateStatus();

  if(speedMs>0){ autoTimer = setInterval(stepPick, speedMs); } else { autoTimer = null; }
}
function stepPick(){
  if(!isDrafting) return;
  const ord = snakeOrder(order, currentRound);
  const currentPlayerIndex = ord[pickIndexThisRound];
  const p = players[currentPlayerIndex];
  const conf = roundPattern[currentRound];

  const pool = (conf==="AFC") ? afcPool : nfcPool;
  if(pool.length === 0){ alert(`${conf} pool is empty. Pattern/pools mismatch.`); stopAuto(); return; }

  const tIndex = Math.floor(Math.random()*pool.length);
  const team = pool.splice(tIndex,1)[0];

  p.picks.push(team);
  if(team.conf==="AFC") p.afc++; else p.nfc++;

  const roundHuman = currentRound+1;
  log.unshift(`Round ${roundHuman}: ${p.name} -> ${team.name} (${team.conf})`);
  history.push({ round: currentRound, orderIndex: pickIndexThisRound, playerIndex: currentPlayerIndex, team });

  renderPools(); renderBoards(); renderLog();
  $("#undoBtn").disabled = false;

  pickIndexThisRound++;
  if(pickIndexThisRound >= players.length){
    pickIndexThisRound = 0; currentRound++;
    if(currentRound >= 4){ finishDraft(); return; }
  }
  updateStatus();
}
function finishDraft(){
  isDrafting = false; stopAuto();
  $("#nextPickBtn").disabled = true;
  $("#undoBtn").disabled = false;
  $("#startDraftBtn").disabled = false;
  onClockEl.textContent = "Draft complete!";
}
function undoLast(){
  if(history.length===0) return;
  const last = history.pop();
  currentRound = last.round; pickIndexThisRound = last.orderIndex;

  const p = players[last.playerIndex];
  const idx = p.picks.findIndex(x=>x===last.team);
  if(idx !== -1) p.picks.splice(idx,1);
  if(last.team.conf==="AFC") p.afc = Math.max(0,p.afc-1); else p.nfc = Math.max(0,p.nfc-1);

  if(last.team.conf==="AFC") afcPool.push(last.team); else nfcPool.push(last.team);

  const roundHuman = last.round+1;
  const line = `Round ${roundHuman}: ${p.name} -> ${last.team.name} (${last.team.conf})`;
  const logIdx = log.indexOf(line); if(logIdx !== -1) log.splice(logIdx,1);

  isDrafting = true;
  $("#nextPickBtn").disabled = (speedMs>0);
  renderPools(); renderBoards(); renderLog(); updateStatus();
}
function resetDraft(){
  stopAuto(); isDrafting = false;
  afcPool = []; nfcPool = []; log = []; history = [];
  players = []; order = []; currentRound = 0; pickIndexThisRound = 0;

  syncPlayersFromInputs(); renderOrder();
  $("#afcPool").innerHTML = ""; $("#nfcPool").innerHTML = "";
  $("#boards").innerHTML = ""; $("#logList").innerHTML = "";
  $("#onClock").textContent = "—"; $("#roundInfo").textContent = "Round — / 4"; $("#confInfo").textContent = "Conference: —";
  $("#startDraftBtn").disabled = false; $("#nextPickBtn").disabled = true; $("#undoBtn").disabled = true;
}
function stopAuto(){ if(autoTimer){ clearInterval(autoTimer); autoTimer = null; } $("#nextPickBtn").disabled = false; }

// ---------- First load ----------
applyPlayersFromQuery();
resetDraft();
