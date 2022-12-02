export type Round = {
  p1: 'A' | 'B' | 'C';
  p2: 'X' | 'Y' | 'Z';
};

export const materialScoreMap = {
  X: 1,
  Y: 2,
  Z: 3
};

export const calculateRoundScore = ({ p1, p2 }: Round) => {
  const initialScore = p2.charCodeAt(0) - 'X'.charCodeAt(0) + 1;
  return ((p2.charCodeAt(0) - p1.charCodeAt(0) - 1) % 3) * 3 + initialScore;
};

const p2Values = [1, 2, 3];

export const predictRoundScore = ({ p1, p2 }: Round) => {
  const winner = (p1.charCodeAt(0) - 'A'.charCodeAt(0) + 1) % 3;
  const tie = p1.charCodeAt(0) - 'A'.charCodeAt(0);
  const loss = (p1.charCodeAt(0) - 'A'.charCodeAt(0) + 2) % 3;

  if (p2 === 'X') {
    return p2Values[loss];
  }
  if (p2 === 'Y') {
    return p2Values[tie] + 3;
  }
  return p2Values[winner] + 6;
};
