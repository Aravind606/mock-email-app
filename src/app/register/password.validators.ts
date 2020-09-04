import { AbstractControl, ValidationErrors } from '@angular/forms';


export class passwordValidators {
  static passwordShouldMatch(control: AbstractControl): ValidationErrors | null {
    var password = control.get('password').value;
    var conformPassword = control.get('conformPassword').value;
    console.log(password);
    console.log(conformPassword)
    if (password != conformPassword) {
      return { passwordShouldMatch: true };
    }
    return null;
  }
}