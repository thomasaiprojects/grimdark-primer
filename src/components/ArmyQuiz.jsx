import { useState } from 'react';

const questions = [
  {
    id: 'aesthetic',
    question: "What draws you to 40k?",
    subtitle: "Pick the vibe that resonates most.",
    options: [
      { id: 'noble', label: 'Heroic space knights', description: 'Armored warriors, noble, imposing — the defenders of humanity', emoji: '⚔️' },
      { id: 'chaos', label: 'Dark and corrupted', description: 'Chaos, mutation, decay — power at any cost', emoji: '💀' },
      { id: 'ancient', label: 'Ancient and alien', description: 'Civilizations older than humanity — unknowable, terrifying', emoji: '👁️' },
      { id: 'swarm', label: 'Overwhelming force', description: 'Swarms, hordes, sheer numbers — quantity has a quality of its own', emoji: '🐛' },
      { id: 'mechanical', label: 'Futuristic and mechanical', description: 'Robots, precision technology, calculated destruction', emoji: '🤖' },
      { id: 'scrappy', label: 'Scrappy underdogs', description: 'Ramshackle, improvised, fighting with what you\'ve got', emoji: '💪' },
    ],
  },
  {
    id: 'playstyle',
    question: "How do you like to play games?",
    subtitle: "Your instinct, even if you haven't played 40k before.",
    options: [
      { id: 'aggressive', label: 'Get in their face', description: 'Close the distance fast and hit hard in melee', emoji: '🔥' },
      { id: 'shooty', label: 'Shoot everything', description: 'Stay back, use range, delete threats before they reach you', emoji: '🎯' },
      { id: 'tactical', label: 'Outmaneuver and outwit', description: 'Positioning, tricks, and using the table to your advantage', emoji: '🧠' },
      { id: 'horde', label: 'Overwhelm with numbers', description: 'Flood the board and make them deal with everything at once', emoji: '🌊' },
      { id: 'beginner', label: "I don't know yet", description: "Show me something forgiving while I learn the game", emoji: '🎮' },
    ],
  },
  {
    id: 'painting',
    question: "How much time do you want to spend painting?",
    subtitle: "Be honest — there's no wrong answer.",
    options: [
      { id: 'fast', label: 'Quick wins', description: 'I want an army that looks great without 10 hours per model', emoji: '⚡' },
      { id: 'invested', label: 'Painting is the appeal', description: "I want to really invest in it — the painting journey is part of why I'm here", emoji: '🖌️' },
      { id: 'middle', label: 'Somewhere in between', description: "I'll put in real time but I don't need every model to be a masterpiece", emoji: '⚖️' },
    ],
  },
  {
    id: 'difficulty',
    question: "How complex do you want the rules?",
    subtitle: "Some armies are beginner-friendly, others have deep systems to master.",
    options: [
      { id: 'simple', label: 'Keep it simple', description: "I want to focus on learning the game basics without faction-specific complexity", emoji: '🟢' },
      { id: 'complex', label: 'Give me depth', description: "I enjoy mastering complex systems — I want an army with a high ceiling", emoji: '🔵' },
      { id: 'any', label: "Doesn't matter", description: "I'll figure it out either way", emoji: '⚪' },
    ],
  },
  {
    id: 'budget',
    question: "What's your rough budget for a starter army?",
    subtitle: "A starter army is typically 500–1000 points. Some factions cost more than others.",
    options: [
      { id: 'low', label: 'Under $150', description: "I want to start small and see if I'm hooked first", emoji: '💚' },
      { id: 'medium', label: '$150–300', description: "Reasonable investment for something I can actually play with", emoji: '💛' },
      { id: 'high', label: '$300–500', description: "I'm committed — I want a proper starter army", emoji: '🟠' },
      { id: 'any', label: "Money isn't the constraint", description: "I'll buy what I want", emoji: '🔴' },
    ],
  },
];

// Scoring: each answer adds points to faction scores
const scoringMap = {
  aesthetic: {
    noble: { space_marines: 3, adepta_sororitas: 2, death_guard: 0, chaos_marines: 0, aeldari: 1, adeptus_custodes: 3, grey_knights: 2, deathwatch: 2, imperial_knights: 2, chaos_daemons: 0, chaos_knights: 0, drukhari: 0, genestealer_cults: 0, leagues_of_votann: 1 },
    chaos: { chaos_marines: 3, death_guard: 3, world_eaters: 3, thousand_sons: 2, space_marines: 0, aeldari: 0, adeptus_custodes: 0, chaos_daemons: 3, chaos_knights: 2, grey_knights: 0, drukhari: 0, genestealer_cults: 0 },
    ancient: { necrons: 3, aeldari: 3, thousand_sons: 2, tyranids: 1, adeptus_mechanicus: 1, adeptus_custodes: 1, drukhari: 2, leagues_of_votann: 1 },
    swarm: { tyranids: 3, orks: 2, astra_militarum: 2, chaos_marines: 0, genestealer_cults: 2, chaos_daemons: 1 },
    mechanical: { necrons: 3, tau: 3, adeptus_mechanicus: 3, space_marines: 1, imperial_knights: 3, chaos_knights: 2, leagues_of_votann: 1 },
    scrappy: { orks: 3, astra_militarum: 3, chaos_marines: 1, genestealer_cults: 2, drukhari: 1 },
  },
  playstyle: {
    aggressive: { space_marines: 2, chaos_marines: 3, world_eaters: 3, death_guard: 2, orks: 3, tyranids: 2, adeptus_custodes: 2, chaos_daemons: 3, chaos_knights: 3, imperial_knights: 2, drukhari: 1, grey_knights: 1, genestealer_cults: 1 },
    shooty: { tau: 3, astra_militarum: 3, necrons: 2, adepta_sororitas: 2, space_marines: 1, leagues_of_votann: 3, deathwatch: 2, grey_knights: 1 },
    tactical: { aeldari: 3, thousand_sons: 3, tau: 2, adepta_sororitas: 2, space_marines: 2, adeptus_mechanicus: 2, adeptus_custodes: 2, grey_knights: 3, drukhari: 3, genestealer_cults: 3, deathwatch: 2, leagues_of_votann: 1 },
    horde: { orks: 3, tyranids: 3, astra_militarum: 3, genestealer_cults: 2, chaos_daemons: 1 },
    beginner: { space_marines: 3, necrons: 3, orks: 2, leagues_of_votann: 1 },
  },
  painting: {
    fast: { necrons: 3, orks: 3, astra_militarum: 2, space_marines: 1, adeptus_custodes: 0, chaos_daemons: 2, genestealer_cults: 2, leagues_of_votann: 1 },
    invested: { space_marines: 2, aeldari: 3, thousand_sons: 3, adepta_sororitas: 3, chaos_marines: 2, death_guard: 2, adeptus_mechanicus: 3, adeptus_custodes: 3, imperial_knights: 3, chaos_knights: 3, grey_knights: 2, drukhari: 2, deathwatch: 1 },
    middle: { space_marines: 2, necrons: 2, tau: 2, tyranids: 2, chaos_marines: 2, world_eaters: 2, thousand_sons: 2, adepta_sororitas: 2, adeptus_custodes: 1, deathwatch: 2, grey_knights: 2, drukhari: 2, leagues_of_votann: 2, genestealer_cults: 1, chaos_daemons: 1, chaos_knights: 1 },
  },
  difficulty: {
    simple: { space_marines: 3, necrons: 3, orks: 3, death_guard: 2, adeptus_custodes: 0, leagues_of_votann: 2, chaos_daemons: 1, imperial_knights: 1, chaos_knights: 1 },
    complex: { aeldari: 3, adeptus_mechanicus: 3, thousand_sons: 3, tau: 2, adepta_sororitas: 2, chaos_marines: 2, adeptus_custodes: 3, grey_knights: 3, drukhari: 3, genestealer_cults: 3, deathwatch: 2 },
    any: { space_marines: 1, necrons: 1, tau: 1, aeldari: 1, adeptus_custodes: 1, deathwatch: 1, imperial_knights: 1, chaos_knights: 1, leagues_of_votann: 1 },
  },
  budget: {
    low: { orks: 3, necrons: 2, astra_militarum: 2, adeptus_custodes: 0, chaos_daemons: 1 },
    medium: { space_marines: 2, necrons: 2, chaos_marines: 2, death_guard: 2, tau: 2, tyranids: 2, world_eaters: 2, thousand_sons: 2, adepta_sororitas: 2, chaos_daemons: 2, deathwatch: 1, leagues_of_votann: 2, genestealer_cults: 2, drukhari: 1 },
    high: { space_marines: 2, aeldari: 2, adeptus_mechanicus: 2, tyranids: 2, adeptus_custodes: 3, imperial_knights: 3, chaos_knights: 3, grey_knights: 2, drukhari: 1 },
    any: { space_marines: 1, aeldari: 2, adeptus_mechanicus: 2, adeptus_custodes: 2, imperial_knights: 2, chaos_knights: 2, grey_knights: 1, leagues_of_votann: 1 },
  },
};

const factions = {
  space_marines: {
    name: 'Space Marines',
    slug: 'space-marines',
    tagline: 'The iconic defenders of humanity',
    description: "The most popular faction in 40k for a reason — huge model range, beginner-friendly rules, and instantly recognizable. Great all-rounder if you're not sure what you want.",
    emoji: '⚔️',
    difficulty: 'Beginner-friendly',
    painting: 'Medium',
  },
  necrons: {
    name: 'Necrons',
    slug: 'necrons',
    tagline: 'Ancient undying machines of war',
    description: "Skeletal robot warriors who have slept for 60 million years and woken up angry. Simple to paint (metallic + contrast paints), forgiving to play, and they look incredible on a table.",
    emoji: '🤖',
    difficulty: 'Beginner-friendly',
    painting: 'Easy',
  },
  orks: {
    name: 'Orks',
    slug: 'orks',
    tagline: 'Born to fight, bred to win',
    description: "Massive green aliens who love nothing more than a good fight. Forgiving army to learn with, cheap to build a horde, and arguably the most fun faction to paint — no two Orks look the same.",
    emoji: '💪',
    difficulty: 'Easy-Medium',
    painting: 'Easy',
  },
  chaos_marines: {
    name: 'Chaos Space Marines',
    slug: 'chaos-space-marines',
    tagline: 'Warriors who sold their souls for power',
    description: "The dark mirror of Space Marines. Heavy hitters with a corrupted aesthetic — spikes, mutations, and malevolence. More aggressive than loyalist Marines.",
    emoji: '💀',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  death_guard: {
    name: 'Death Guard',
    slug: 'death-guard',
    tagline: "Plague marines who cannot be stopped",
    description: "Servants of Nurgle, the god of disease and decay. Slow, tough, and disgusting in the best way. One of the most visually striking armies, and surprisingly beginner-friendly to play.",
    emoji: '☣️',
    difficulty: 'Easy-Medium',
    painting: 'Medium',
  },
  tau: {
    name: "T'au",
    slug: 'tau',
    tagline: 'The Greater Good — advanced firepower',
    description: "A young, optimistic civilization with the best guns in the galaxy. Heavily shooty playstyle with mechs and drones. The anime-mech army of 40k.",
    emoji: '🎯',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  aeldari: {
    name: 'Aeldari',
    slug: 'aeldari',
    tagline: 'Ancient elves in space — fast and deadly',
    description: "A dying civilization of psychic space elves. Fast, maneuvering playstyle with complex rules and fragile but powerful units. High skill ceiling — rewarding to master, punishing to learn.",
    emoji: '👁️',
    difficulty: 'Hard',
    painting: 'Hard',
  },
  tyranids: {
    name: 'Tyranids',
    slug: 'tyranids',
    tagline: 'The Great Devourer — endless alien swarms',
    description: "A hive mind that consumes entire worlds. Swarms of alien creatures in an aggressive, forward-pressing playstyle. Visually spectacular on the table.",
    emoji: '🐛',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  astra_militarum: {
    name: 'Astra Militarum',
    slug: 'astra-militarum',
    tagline: 'Regular humans. Billions of them.',
    description: "The Imperial Guard — ordinary humans fighting impossible enemies through sheer numbers, artillery, and tanks. Cheap to build a large force, great for painting a gritty realistic aesthetic.",
    emoji: '🪖',
    difficulty: 'Medium',
    painting: 'Easy',
  },
  adeptus_mechanicus: {
    name: 'Adeptus Mechanicus',
    slug: 'adeptus-mechanicus',
    tagline: 'Tech-priests who worship the machine god',
    description: "Half-human, half-machine cultists who believe technology is divine. Unique aesthetic, complex rules, and some of the most detailed and interesting models in the range.",
    emoji: '⚙️',
    difficulty: 'Hard',
    painting: 'Hard',
  },
  world_eaters: {
    name: 'World Eaters',
    slug: 'world-eaters',
    tagline: "Khorne's berserkers — pure melee fury",
    description: "The most aggressive army in 40k. No psychic powers, no shooting strategy — just chainaxes and rage. Get into melee, kill everything. Red and brass, blood optional but encouraged.",
    emoji: '🪓',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  adepta_sororitas: {
    name: 'Sisters of Battle',
    slug: 'adepta-sororitas',
    tagline: 'Faith made manifest — divine miracles on the battlefield',
    description: 'Fanatical warrior-nuns in black power armor whose belief literally bends fate. Their Acts of Faith mechanic gives you a pool of Miracle Dice to spend at critical moments. Flexible, visually stunning, and one of the best-value starter boxes in the game.',
    emoji: '⚜️',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  grey_knights: {
    name: 'Grey Knights',
    slug: 'grey-knights',
    tagline: 'Psychic Space Marines — every one a daemon-slaying sorcerer',
    description: "The Imperium's secret weapon against Chaos. Every Grey Knight is a powerful psyker in silver armour. Fewer models than regular Marines, higher stakes per model, deep psychic play. Spectacular silver and blue aesthetic.",
    emoji: '🔱',
    difficulty: 'Hard',
    painting: 'Medium',
  },
  deathwatch: {
    name: 'Deathwatch',
    slug: 'deathwatch',
    tagline: 'Elite xenos hunters drawn from every Space Marine Chapter',
    description: 'One warrior from every Chapter, fighting together in black armour. Small Kill Teams with specialized anti-xenos weapons. Tactically flexible and visually unique — the mix of chapter markings on one arm is the whole aesthetic.',
    emoji: '🌑',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  imperial_knights: {
    name: 'Imperial Knights',
    slug: 'imperial-knights',
    tagline: 'Noble houses piloting 50-foot walking war machines',
    description: 'Your entire army might be 5 giant Knights. Spectacular to paint with heraldry, simple per-model mechanics, devastating presence. Not competitive at beginner level but nothing looks better on a table.',
    emoji: '🏰',
    difficulty: 'Medium',
    painting: 'Hard',
  },
  chaos_daemons: {
    name: 'Chaos Daemons',
    slug: 'chaos-daemons',
    tagline: 'Pure warp entities — pick your god, pick your madness',
    description: 'The starter Combat Patrol is all Khorne — red daemons charging everything. Or go Tzeentch, Nurgle, or Slaanesh for completely different looks and playstyles. Beginner-accessible and deeply varied.',
    emoji: '👹',
    difficulty: 'Medium',
    painting: 'Medium',
  },
  chaos_knights: {
    name: 'Chaos Knights',
    slug: 'chaos-knights',
    tagline: 'Fallen noble houses — corrupted war machines serving the dark gods',
    description: 'Imperial Knights that fell to Chaos, fused with daemonic entities. Same massive-model feel as Imperial Knights but aggressive and melee-focused, with corruption effects covering their hulls.',
    emoji: '⛓️',
    difficulty: 'Medium',
    painting: 'Hard',
  },
  drukhari: {
    name: 'Drukhari',
    slug: 'drukhari',
    tagline: 'Dark Eldar — raiders, torturers, fastest army in 40k',
    description: 'Slave-raiding pirates from Commorragh who win by never being in range when you shoot back. Blindingly fast but fragile. The Combat Patrol is Haemonculus Covens — slower, tankier body-horror sub-faction.',
    emoji: '🗡️',
    difficulty: 'Hard',
    painting: 'Medium',
  },
  genestealer_cults: {
    name: 'Genestealer Cults',
    slug: 'genestealer-cults',
    tagline: 'Alien-infected insurgents rising from within the Imperium',
    description: 'Human-alien hybrids who infiltrate Imperial society for generations then rise up all at once. Cult Ambush lets you deploy anywhere mid-battle. The most surprising army in the game — hard to master, devastating when it clicks.',
    emoji: '🧬',
    difficulty: 'Hard',
    painting: 'Easy-Medium',
  },
  leagues_of_votann: {
    name: 'Leagues of Votann',
    slug: 'leagues-of-votann',
    tagline: 'Space dwarves — tough, shooty, and holding grudges',
    description: 'Ancient human offshoots who mine the deep void. Sturdy, reliable shooting army with a Judgement token mechanic that rewards persistence. One of the more beginner-friendly factions with a very distinct aesthetic.',
    emoji: '⛏️',
    difficulty: 'Easy-Medium',
    painting: 'Medium',
  },
  adeptus_custodes: {
    name: 'Adeptus Custodes',
    slug: 'adeptus-custodes',
    tagline: "The Emperor's own — elite beyond all others",
    description: "Ten warriors worth a hundred Space Marines. The Custodes are the pinnacle of human potential, each one individually crafted. The fewest models of any army, the highest stakes, and some of the most striking gold armor in the hobby.",
    emoji: '🛡️',
    difficulty: 'Hard',
    painting: 'Hard',
  },
  thousand_sons: {
    name: 'Thousand Sons',
    slug: 'thousand-sons',
    tagline: 'Sorcerer Space Marines — all is dust',
    description: "Elite psychic shooters who out-think rather than out-punch. Their Rubric Marines are hollow suits animated by bound souls. Stunning blue and gold scheme, high skill ceiling, deep lore.",
    emoji: '🔮',
    difficulty: 'Hard',
    painting: 'Medium',
  },
};

function computeResults(answers) {
  const scores = {};
  Object.keys(factions).forEach(f => scores[f] = 0);

  Object.entries(answers).forEach(([questionId, answerId]) => {
    const questionScores = scoringMap[questionId]?.[answerId] || {};
    Object.entries(questionScores).forEach(([faction, points]) => {
      scores[faction] = (scores[faction] || 0) + points;
    });
  });

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => factions[id]);
}

export default function ArmyQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const question = questions[step];
  const totalSteps = questions.length;
  const progress = ((step) / totalSteps) * 100;

  function selectOption(optionId) {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setResults(computeResults(newAnswers));
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  if (results) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3 font-display">Your Results</p>
          <h2 className="font-display text-3xl font-bold mb-3">Here's where you belong</h2>
          <p className="text-[#8a8590]">Based on your answers, these factions are your best fit.</p>
        </div>

        <div className="space-y-4">
          {results.map((faction, i) => (
            <a
              key={faction.slug}
              href={`/factions/${faction.slug}`}
              className="block bg-[#1a1a1f] border border-[#2a2a35] hover:border-[#c9a84c] rounded-lg p-6 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{faction.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {i === 0 && (
                      <span className="bg-[#c9a84c] text-[#111113] text-xs font-semibold px-2 py-0.5 rounded font-display">
                        Best Match
                      </span>
                    )}
                    <h3 className="font-display font-semibold text-lg group-hover:text-[#c9a84c] transition-colors">
                      {faction.name}
                    </h3>
                  </div>
                  <p className="text-[#8a8590] text-sm mb-3">{faction.tagline}</p>
                  <p className="text-[#b8b4c0] text-sm leading-relaxed">{faction.description}</p>
                  <div className="flex gap-4 mt-3 text-xs text-[#4a4855]">
                    <span>Play difficulty: {faction.difficulty}</span>
                    <span>Painting: {faction.painting}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={restart}
            className="text-sm text-[#8a8590] hover:text-[#f0ede8] transition-colors underline underline-offset-4"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-[#4a4855] mb-2">
          <span>Question {step + 1} of {totalSteps}</span>
          <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1 bg-[#2a2a35] rounded-full">
          <div
            className="h-1 bg-[#c9a84c] rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold mb-2">{question.question}</h2>
        <p className="text-[#8a8590]">{question.subtitle}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map(option => (
          <button
            key={option.id}
            onClick={() => selectOption(option.id)}
            className={`w-full text-left bg-[#1a1a1f] border rounded-lg p-4 transition-colors group hover:border-[#c9a84c] ${
              answers[question.id] === option.id
                ? 'border-[#c9a84c] bg-[#1f1d14]'
                : 'border-[#2a2a35]'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{option.emoji}</span>
              <div>
                <div className="font-semibold text-sm mb-0.5 group-hover:text-[#c9a84c] transition-colors">
                  {option.label}
                </div>
                <div className="text-[#8a8590] text-xs">{option.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Back button */}
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 text-sm text-[#4a4855] hover:text-[#8a8590] transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
