import { ajax } from 'rxjs/ajax';
import { concat, interval } from 'rxjs';
import { map, tap, filter, bufferTime } from 'rxjs/operators';
import * as R from 'ramda';

import { XMLHttpRequest } from 'xmlhttprequest';
function createXHR() {
    return new XMLHttpRequest();
}

console.clear();

const ajax$ = ajax({
    createXHR,
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET'
}).pipe(
    map(R.prop('response'))
);

const checkIfBothPartSumAreEqual = numberStr => {
    const half = parseInt(numberStr.length / 2, 10);
    const parts = [
        numberStr.slice(0, half) || numberStr[0],
        numberStr.slice(half + numberStr.length % 2) || numberStr[0]
    ].map(R.pipe(
        R.split(''),
        R.map(value => +value),
        R.sum
    ));

    return parts[0] === parts[1];

};

const other$ = interval(10).pipe(
    filter(R.pipe(
        R.toString,
        checkIfBothPartSumAreEqual,
    )),
    bufferTime(500)
);

const stream$ = concat(other$);

stream$.subscribe(
    console.log,
    console.error
);
