import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'subtext'
})
export class SubTextPipe implements PipeTransform {

    transform(value: string) {
        if(value.length) {
            return value.split('@')[0];
        }
    }



}