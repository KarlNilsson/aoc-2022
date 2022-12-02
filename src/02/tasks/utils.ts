export type Round = {
  p1: 'A' | 'B' | 'C';
  p2: 'X' | 'Y' | 'Z';
};

export const scoreMap = {
  X: 1,
  Y: 2,
  Z: 3
};

export const predictionMap = {
  X: 3,
  Y: 0,
  Z: 6
};

export const calculateRoundScore = ({ p1, p2 }: Round) => {
  const initialScore = scoreMap[p2];
  if (p1 === 'A') {
    if (p2 === 'X') return initialScore + 3;
    if (p2 === 'Y') return initialScore + 6;
    if (p2 === 'Z') return initialScore;
  }
  if (p1 === 'B') {
    if (p2 === 'X') return initialScore;
    if (p2 === 'Y') return initialScore + 3;
    if (p2 === 'Z') return initialScore + 6;
  }
  if (p1 === 'C') {
    if (p2 === 'X') return initialScore + 6;
    if (p2 === 'Y') return initialScore;
    if (p2 === 'Z') return initialScore + 3;
  }
  return initialScore;
};

const p2Thing = [1, 2, 3];

export const predictRoundScore = ({ p1, p2 }: Round) => {
  const winner = (p1.charCodeAt(0) - 'A'.charCodeAt(0) + 1) % 3;
  const tie = p1.charCodeAt(0) - 'A'.charCodeAt(0);
  const loss = (p1.charCodeAt(0) - 'A'.charCodeAt(0) + 2) % 3;

  if (p2 === 'X') {
    return p2Thing[loss];
  }
  if (p2 === 'Y') {
    return p2Thing[tie] + 3;
  }
  if (p2 === 'Z') {
    return p2Thing[winner] + 6;
  }
  return 0;
};
