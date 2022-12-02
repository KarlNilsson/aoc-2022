import Task1 from './tasks/task1';
import Task2 from './tasks/task2';

const main = async () => {
  console.time('Both tasks');
  const [t1Result, t2Result] = await Promise.all([Task1(), Task2()]);
  console.log(`Task 1: ${t1Result}`);
  console.log(`Task 2: ${t2Result}`);
  console.timeEnd('Both tasks');
};

export default main;
