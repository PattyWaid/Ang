import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: string, size: number) {
        if(value.length > size) {
            return value.substr(0, size) + '...';
        }
        return value;
    }



}