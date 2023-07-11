import { Pipe,PipeTransform } from "@angular/core";

@Pipe({name: 'unescape'})
export class UnescapeTextPipe implements PipeTransform {
    transform(value: string) {
        var txt = document.createElement("textarea");
        txt.innerHTML = value;
        return txt.value;
    }
}