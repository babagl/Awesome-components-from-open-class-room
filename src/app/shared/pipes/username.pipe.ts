import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'username',
  standalone: true
})
export class UsernamePipe implements PipeTransform {
    transform(value: {firstName: string, lastName: string}, locale: 'en'|'fr' = 'fr') {
      return locale==='fr'
        ?`${value.lastName.toUpperCase()} ${value.firstName.toUpperCase()}` :
        `${value.firstName} ${value.lastName}`;
    }

}
