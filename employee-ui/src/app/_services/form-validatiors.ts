export class FormValidatiors {

  static emailValidator(control): {[key: string]: any} {
    let emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
    }
  }

}
