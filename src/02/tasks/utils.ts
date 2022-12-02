export type Round = {
  p1: 'A' | 'B' | 'C';
  p2: 'X' | 'Y' | 'Z';
};

export const calculateRoundScore = ({ p1, p2 }: Round) => {
  const initialScore = p2.charCodeAt(0) - 'X'.charCodeAt(0) + 1;
  return ((p2.charCodeAt(0) - p1.charCodeAt(0) - 1) % 3) * 3 + initialScore;
};

export const predictRoundScore = ({ p1, p2 }: Round) => {
  const diff = p1.charCodeAt(0) - 'A'.charCodeAt(0);
  const tiePoint = diff + 1;
  const winnerPoint = ((diff + 1) % 3) + 1;
  const lossPoint = ((diff + 2) % 3) + 1;

  if (p2 === 'X') {
    return lossPoint;
  }
  if (p2 === 'Y') {
    return tiePoint + 3;
  }
  return winnerPoint + 6;
};
