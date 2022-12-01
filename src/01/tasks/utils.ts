const getGroupedValues = (groups: string[]) => {
  const calorieGroups = groups.map((group) =>
    group
      .split('\n')
      .map((num) => Number.parseInt(num, 10))
      .filter(Boolean)
  );
  return calorieGroups.map((calorieGroup) =>
    calorieGroup.reduce((acc, val) => acc + val, 0)
  );
};

export default getGroupedValues;
