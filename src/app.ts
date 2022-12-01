const day = process.argv[2];

(async () => {
  const currentDay: () => Promise<void> = (
    await import(`./${day.padStart(2, '0')}`)
  ).default;
  await currentDay();
})();
