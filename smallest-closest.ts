export function closest(strng: string): number[][] {
  if (!strng) {
    return [];
  }
  let numsArr: string[] = strng.split(" ");
  let returnedArr: number[][] = [[], []];
  let smallNums: number[][] = [];
  let arr: number[][] = [];
  for (let i = 0; i < numsArr.length; i++) {
    let sum: number = 0;
    for (let p = 0; p < numsArr[i].length; p++) {
      if (i !== 0 && p == 0 && p !== numsArr[i].length - 1) {
        sum = +numsArr[i][p];
      } else if (p === numsArr[i].length - 1) {
        sum += +numsArr[i][p];
        arr.push([sum, i]);
      } else {
        sum += +numsArr[i][p];
      }
    }
  }

  let smallestDiff: number = Infinity;
  let condition: boolean = false;
  let flag: boolean = true;
  let iterator: number = 0;
  let testedNums: string[] = [];

  do {
    condition = false;
    for (let i: number = 0; i < arr.length; i++) {
      for (let p: number = 0; p < arr.length; p++) {
        if (iterator > 0) {
          if (
            i !== p &&
            Math.abs(arr[i][0] - arr[p][0]) === smallestDiff &&
            !testedNums.includes(
              arr[i][0].toString() + " " + arr[p][0].toString()
            )
          ) {
            condition = true;
            testedNums.push(arr[i][0].toString() + " " + arr[p][0].toString());
            smallNums.push([arr[i][0], i, arr[p][0], p]);
          }
        } else {
          if (i !== p && Math.abs(arr[i][0] - arr[p][0]) < smallestDiff) {
            condition = true;
            smallestDiff = Math.abs(arr[i][0] - arr[p][0]);
            smallNums = [];
            testedNums = [];
            testedNums.push(arr[i][0].toString() + " " + arr[p][0].toString());
            smallNums.push([arr[i][0], i, arr[p][0], p]);
          }
        }
      }
    }
    iterator += 1;
    if (!condition) {
      flag = !flag;
    }
  } while (flag);

  arr = smallNums;
  smallNums = [];
  smallestDiff = Infinity;
  testedNums = [];
  iterator = 0;

  do {
    condition = false;
    for (let i: number = 0; i < arr.length; i++) {
      if (iterator > 0) {
        if (
          arr[i][0] + arr[i][2] === smallestDiff &&
          !testedNums.includes(
            arr[i][0].toString() + " " + arr[i][2].toString()
          )
        ) {
          condition = true;
          testedNums.push(arr[i][0].toString() + " " + arr[i][2].toString());
          smallNums.push([arr[i][0], arr[i][1], arr[i][2], arr[i][3]]);
        }
      } else {
        if (arr[i][0] + arr[i][2] < smallestDiff) {
          condition = true;
          smallestDiff = arr[i][0] + arr[i][2];
          smallNums = [];
          testedNums = [];
          testedNums.push(arr[i][0].toString() + " " + arr[i][2].toString());
          smallNums.push([arr[i][0], arr[i][1], arr[i][2], arr[i][3]]);
        }
      }
    }
    iterator += 1;
    if (!condition) {
      flag = !flag;
    }
  } while (flag);

  let numbersArr: number[][] = [];
  let firstValueFirstArr = numsArr[smallNums[0][1]];
  let secondValueFirstArr = numsArr[smallNums[0][3]];
  if (smallNums[0][0] > smallNums[0][2]) {
    numbersArr = [
      [smallNums[0][2], smallNums[0][3], +secondValueFirstArr],
      [smallNums[0][0], smallNums[0][1], +firstValueFirstArr],
    ];
  } else {
    numbersArr = [
      [smallNums[0][0], smallNums[0][1], +firstValueFirstArr],
      [smallNums[0][2], smallNums[0][3], +secondValueFirstArr],
    ];
  }

  returnedArr = numbersArr;

  return returnedArr;
}
