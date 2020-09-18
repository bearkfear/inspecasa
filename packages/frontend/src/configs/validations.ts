import { extend } from "vee-validate";

extend('min', {
  validate(value, args) {
    console.log(value);
    if (value.length >= args.length) { 
      return true
    } else { 
      return `O mínimo é ${args.length}`
    }
  },
  params: ['length']
});