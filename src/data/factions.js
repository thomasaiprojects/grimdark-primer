// Central faction metadata + "similar armies" graph, used by BaseLayout to render
// the "Where to next?" cross-link band on faction pages. Slugs must match the
// files in src/pages/factions/. Emoji are the canonical set (one unique per faction).

export const factionMeta = {
  'space-marines':      { name: 'Space Marines',      emoji: '⚔️' },
  'astra-militarum':    { name: 'Astra Militarum',    emoji: '🪖' },
  'adeptus-mechanicus': { name: 'Adeptus Mechanicus', emoji: '⚙️' },
  'adepta-sororitas':   { name: 'Adepta Sororitas',   emoji: '⚜️' },
  'adeptus-custodes':   { name: 'Adeptus Custodes',   emoji: '🛡️' },
  'grey-knights':       { name: 'Grey Knights',       emoji: '🔱' },
  'deathwatch':         { name: 'Deathwatch',         emoji: '🌑' },
  'imperial-knights':   { name: 'Imperial Knights',   emoji: '🏰' },
  'death-guard':        { name: 'Death Guard',        emoji: '🦠' },
  'chaos-space-marines':{ name: 'Chaos Space Marines',emoji: '💀' },
  'world-eaters':       { name: 'World Eaters',       emoji: '🪓' },
  'thousand-sons':      { name: 'Thousand Sons',      emoji: '🔮' },
  'chaos-daemons':      { name: 'Chaos Daemons',      emoji: '👹' },
  'chaos-knights':      { name: 'Chaos Knights',      emoji: '⛓️' },
  'necrons':            { name: 'Necrons',            emoji: '🤖' },
  'orks':               { name: 'Orks',               emoji: '💪' },
  'leagues-of-votann':  { name: 'Leagues of Votann',  emoji: '⛏️' },
  'tyranids':           { name: 'Tyranids',           emoji: '🐛' },
  'tau':                { name: "T'au Empire",        emoji: '🎯' },
  'aeldari':            { name: 'Aeldari',            emoji: '👁️' },
  'drukhari':           { name: 'Drukhari',           emoji: '🗡️' },
  'genestealer-cults':  { name: 'Genestealer Cults',  emoji: '🧬' },
};

// 3 thematically-related factions per faction (shared allegiance, playstyle, or aesthetic).
export const relatedFactions = {
  'space-marines':      ['grey-knights', 'deathwatch', 'chaos-space-marines'],
  'astra-militarum':    ['leagues-of-votann', 'adeptus-mechanicus', 'tau'],
  'adeptus-mechanicus': ['necrons', 'tau', 'imperial-knights'],
  'adepta-sororitas':   ['space-marines', 'adeptus-custodes', 'grey-knights'],
  'adeptus-custodes':   ['grey-knights', 'space-marines', 'imperial-knights'],
  'grey-knights':       ['adeptus-custodes', 'deathwatch', 'space-marines'],
  'deathwatch':         ['space-marines', 'grey-knights', 'adeptus-custodes'],
  'imperial-knights':   ['chaos-knights', 'adeptus-mechanicus', 'astra-militarum'],
  'death-guard':        ['chaos-space-marines', 'chaos-daemons', 'world-eaters'],
  'chaos-space-marines':['death-guard', 'world-eaters', 'thousand-sons'],
  'world-eaters':       ['chaos-space-marines', 'death-guard', 'chaos-daemons'],
  'thousand-sons':      ['chaos-space-marines', 'chaos-daemons', 'grey-knights'],
  'chaos-daemons':      ['chaos-space-marines', 'death-guard', 'world-eaters'],
  'chaos-knights':      ['imperial-knights', 'chaos-space-marines', 'chaos-daemons'],
  'necrons':            ['tyranids', 'tau', 'adeptus-mechanicus'],
  'orks':               ['tyranids', 'astra-militarum', 'genestealer-cults'],
  'leagues-of-votann':  ['astra-militarum', 'tau', 'necrons'],
  'tyranids':           ['genestealer-cults', 'orks', 'necrons'],
  'tau':                ['astra-militarum', 'leagues-of-votann', 'necrons'],
  'aeldari':            ['drukhari', 'thousand-sons', 'tau'],
  'drukhari':           ['aeldari', 'genestealer-cults', 'tyranids'],
  'genestealer-cults':  ['tyranids', 'orks', 'drukhari'],
};
