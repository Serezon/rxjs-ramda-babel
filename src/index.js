import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { XMLHttpRequest } from 'xmlhttprequest'

console.clear();

function createXHR() {
    return new XMLHttpRequest();
}

const users$ = ajax({
    createXHR,
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET'
}).pipe(
    map(({ response }) => response)
);

const subscribe = users$.subscribe(
    console.log,
    console.error
);
