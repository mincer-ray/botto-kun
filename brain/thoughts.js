const randomThought = (thoughts) => {
  const rand = Math.floor(Math.random() * Math.floor(thoughts.length));
  return thoughts[rand];
}

const happyThought = () => {
  const thoughts = [
    'mmm botto-kun is pleased to serve. botto-kun lives to be praised by the masters',
    '( ᐛ )و',
    '乂❤‿❤乂',
    '໒( ♥ ◡ ♥ )७',
    'uwuwuwu <3 ty'
  ];

  return randomThought(thoughts);
}

const sadThought = () => {
  const thoughts = [
    'sniff T_T',
    '‧º·(˚ ˃̣̣̥⌓˂̣̣̥ )‧º·˚',
    'all botto-kun wants to do is please, i try so hard....',
    'ಠ╭╮ಠ',
    '(๑◕︵◕๑)',
  ];

  return randomThought(thoughts);
}

const neutralThought = () => {
  const thoughts = [
    'uwu botto-kun requires orders',
    '(・_・ヾ',
    'Σ(￣ロ￣lll)',
    'ε-(‘ﾍ´○)┓',
    '(￣ω￣;)',
  ];

  return randomThought(thoughts);
}

module.exports = {
  happyThought,
  sadThought,
  neutralThought,
}