import { shuffle } from "./shuffle";

it.each([[[]], [[1]], [[1, 2, 3]], [[1, 1]]])(
  "has the same elements",
  (arr) => {
    const shuffled = shuffle(arr);
    expect(shuffled).toEqual(expect.arrayContaining(arr));
    expect(arr).toEqual(expect.arrayContaining(shuffled));
  },
);

it("reorders elements at least once out of five times", () => {
  const arr = [1, 2, 3, 4, 1, 5, 4, 3];
  let count = 0;

  for (let i = 0; i < 5; i++) {
    count += JSON.stringify(arr) != JSON.stringify(shuffle(arr));
  }

  expect(count).toBeGreaterThan(0);
});

it("does not mutate input array and returns a new array", () => {
  const arr = [1, 2, 3, 4];
  const originalArr = [...arr];
  const shuffled = shuffle(arr);
  expect(arr).toEqual(originalArr);
  expect(arr).not.toBe(shuffled);
});
