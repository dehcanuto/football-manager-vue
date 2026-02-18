import confetti from "canvas-confetti";

import { TEXTS } from "@/constants/dialogs";
import { EventResult, Player, Team } from "@/models/team";

export function goalConfetti() {
  console.log("clicou!");
  const end = Date.now() + 1 * 1000;

  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPlayer(team: Team, pos?: string): Player {
  const pool = pos
    ? team.players.filter((p) => p.position === pos && p.starting)
    : team.players.filter((p) => p.starting);
  return pick(pool.length ? pool : team.players);
}

function avg(team: Team, key: keyof Player["attributes"]) {
  const starters = team.players.filter((p: Player) => p.starting);
  if (!starters.length) return 0;
  return starters.reduce((s, p) => s + p.attributes[key], 0) / starters.length;
}

function applyFatigue(team: Team, intensity = 1.0) {
  team.players.forEach((p) => {
    if (!p.starting) return;

    let baseLoss = 0.01;

    switch (p.position) {
      case "FWD":
      case "MID":
        baseLoss *= 0.6;
        break;
      case "DEF":
      case "GK":
        baseLoss *= 0.5;
        break;
    }

    const totalLoss = baseLoss * intensity;
    p.status.stamina = Math.max(0, p.status.stamina - totalLoss);
  });
}

function headingSkill(p: Player) {
  if (p.attributes.heading != null) return p.attributes.heading;
  if (["FWD", "MID"].includes(p.position))
    return p.attributes.shooting * 0.6 + p.attributes.physical * 0.4;
  return p.attributes.physical * 0.3; // defensores quase não marcam
}

// Escolhe atacante com base em pesos de posição
function pickWeightedAttacker(team: Team): Player {
  const weights = {
    FWD: 0.65,
    MID: 0.25,
    DEF: 0.09,
    GK: 0.01,
  };

  const roll = Math.random();
  let chosenPos = "FWD";

  if (roll < weights.FWD) chosenPos = "FWD";
  else if (roll < weights.FWD + weights.MID) chosenPos = "MID";
  else if (roll < weights.FWD + weights.MID + weights.DEF) chosenPos = "DEF";
  else chosenPos = "GK";

  const pool = team.players.filter(
    (p) => p.position === chosenPos && p.starting,
  );
  if (!pool.length) return randomPlayer(team); // fallback
  return pick(pool);
}

export function simulateMinute(
  minute: number,
  home: Team,
  away: Team,
): EventResult {
  const diff = (avg(home, "shooting") - avg(away, "defense")) / 180;
  const eventChance = Math.random();

  let result: EventResult;

  if (eventChance < 0.12 + diff) {
    result = doAttack(minute, home, away);
    applyFatigue(home, 0.6);
    applyFatigue(away, 0.5);
  } else if (eventChance > 0.88 - diff) {
    result = doAttack(minute, away, home);
    applyFatigue(away, 0.6);
    applyFatigue(home, 0.5);
  } else if (eventChance < 0.15) {
    result = doFoul(minute, home, away);
    applyFatigue(home, 0.55);
    applyFatigue(away, 0.55);
  } else if (eventChance < 0.2) {
    result = doCorner(minute, home, away);
    applyFatigue(home, 0.65);
    applyFatigue(away, 0.6);
  } else {
    result = doNeutral(minute, home, away);
    applyFatigue(home, 0.45);
    applyFatigue(away, 0.45);
  }

  return result;
}

function doAttack(
  minute: number,
  attacking: Team,
  defending: Team,
): EventResult {
  const striker = pickWeightedAttacker(attacking);
  const keeper = randomPlayer(defending, "GK");
  const defender = randomPlayer(defending, "DEF");

  // Impede os goleiros de atacarem
  if (striker.position === "GK") {
    // substitui o goleiro por um atacante aleatório
    const alt = randomPlayer(attacking, "FWD") || randomPlayer(attacking);
    return doAttack(
      minute,
      { ...attacking, players: [alt, ...attacking.players] },
      defending,
    );
  }

  const staminaFactor = (striker.status.stamina / 100) * 0.9 + 0.1;
  const attackPower =
    (striker.attributes.shooting * 0.55 +
      striker.attributes.dribbling * 0.25 +
      striker.attributes.pace * 0.2) *
      staminaFactor +
    Math.random() * 15;

  const keeperFactor = (keeper.status.stamina / 100) * 0.9 + 0.1;
  const defensePower =
    (keeper.attributes.defense * 0.6 +
      keeper.attributes.physical * 0.25 +
      defender.attributes.defense * 0.15) *
      keeperFactor +
    Math.random() * 15;

  // Gol normal
  if (attackPower > defensePower + 18) {
    goalConfetti();
    return {
      minute,
      text: TEXTS.MATCH.GOAL(striker.name, attacking.name),
      team: attacking.name,
      playerName: striker.name,
      kind: "goal",
    };
  }

  // Defesa do goleiro
  if (attackPower > defensePower + 5) {
    return {
      minute,
      text: TEXTS.MATCH.SAVE(keeper.name, striker.name, defending.name),
      team: attacking.name,
      playerName: striker.name,
      kind: "shot",
    };
  }

  // Lance neutro / perda de bola
  if (Math.random() < 0.18) {
    return {
      minute,
      text: TEXTS.MATCH.PRESSURE(attacking.name, defending.name),
      team: attacking.name,
      kind: "none",
    };
  }

  // Chute pra fora
  return {
    minute,
    text: TEXTS.MATCH.OUT(striker.name, attacking.name),
    team: attacking.name,
    kind: "shot",
  };
}

function doFoul(minute: number, home: Team, away: Team): EventResult {
  const team = Math.random() < 0.5 ? home : away;
  const offender = randomPlayer(team);
  const cardChance = Math.random();

  if (cardChance < 0.25) {
    let text: string;

    // Se já tiver cartão amarelo, vira vermelho
    if ((offender.yellowCards ?? 0) >= 1) {
      text = TEXTS.MATCH.RED_CARD(offender.name, team.name);
      // marca como não mais titular
      offender.starting = false;
    } else {
      text = TEXTS.MATCH.YELLOW_CARD(offender.name, team.name);
    }

    return {
      minute,
      text,
      team: team.name,
      playerName: offender.name,
      kind: "card",
    };
  }

  return {
    minute,
    text: TEXTS.MATCH.FOUL(offender.name, team.name),
    team: team.name,
    kind: "foul",
  };
}

function doCorner(minute: number, home: Team, away: Team): EventResult {
  const attacking = Math.random() < 0.5 ? home : away;
  const defending = attacking === home ? away : home;
  const taker = randomPlayer(attacking);

  const attackers = attacking.players.filter(
    (p) => p.starting && ["FWD", "MID"].includes(p.position),
  );

  if (!attackers.length) return doNeutral(minute, home, away);

  const tall = attackers.sort((a, b) => {
    const aPower = a.attributes.height * 0.5 + headingSkill(a);
    const bPower = b.attributes.height * 0.5 + headingSkill(b);
    return bPower - aPower;
  })[0];

  const goalie = randomPlayer(defending, "GK");

  const aerialPower =
    (tall.attributes.height * 0.6 + tall.attributes.physical * 0.4) *
      (tall.status.stamina / 100) +
    Math.random() * 10;

  const defensePower =
    (goalie.attributes.defense * 0.7 + goalie.attributes.height * 0.3) *
      (goalie.status.stamina / 100) +
    Math.random() * 10;

  if (aerialPower > defensePower + 15) {
    goalConfetti();
    return {
      minute,
      text: TEXTS.MATCH.GOAL_OPEN(
        tall.name,
        attacking.name,
        `${attacking.name} marca de cabeça!`,
      ),
      team: attacking.name,
      playerName: tall.name,
      kind: "goal",
    };
  }

  if (aerialPower > defensePower)
    return {
      minute,
      text: TEXTS.MATCH.SAVE(goalie.name, tall.name, defending.name),
      team: attacking.name,
      kind: "shot",
    };

  return {
    minute,
    text: TEXTS.MATCH.CORNER(taker.name, attacking.name),
    team: attacking.name,
    kind: "corner",
  };
}

function doNeutral(minute: number, home: Team, away: Team): EventResult {
  const actingTeam = Math.random() < 0.5 ? home : away;
  const opponent = actingTeam === home ? away : home;
  const neutralRoll = Math.random();

  if (neutralRoll < 0.02)
    return {
      minute,
      text: TEXTS.MATCH.NEUTRAL_PASS(actingTeam.name),
      team: actingTeam.name,
      kind: "none",
    };

  if (neutralRoll < 0.04)
    return {
      minute,
      text: TEXTS.MATCH.PRESSURE(actingTeam.name, opponent.name),
      team: actingTeam.name,
      kind: "none",
    };

  if (neutralRoll < 0.06)
    return {
      minute,
      text: TEXTS.MATCH.PASS_ERROR(actingTeam.name, opponent.name),
      team: opponent.name,
      kind: "none",
    };

  if (neutralRoll < 0.08)
    return {
      minute,
      text: TEXTS.MATCH.COUNTER_ATTACK(actingTeam.name, opponent.name),
      team: actingTeam.name,
      kind: "none",
    };

  if (neutralRoll < 0.1)
    return {
      minute,
      text: TEXTS.MATCH.BALL_ROTATION(actingTeam.name, opponent.name),
      team: actingTeam.name,
      kind: "none",
    };

  return { minute, text: "", kind: "none" };
}
