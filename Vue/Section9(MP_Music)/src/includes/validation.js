import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate'; //renaming imports for namespacing purposes. In Vue, components are in PascalCase.
import {
  required, min , max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, confirmed, not_one_of as excluded
} from '@vee-validate/rules'; //importing built-in rules after installing them with npm. ESLint doesnt allow _ in imports, hence the aliases. Rules are in kebab_case.

export default {
  install(app) { //plugins are objects with an install method. 2 args: app,options
  //app: refers to the Vue instance, to access its properties.
  //options: data passed from the Vue instance. We don't need it in this case.
  app.component("VeeForm", VeeForm); //global component declaration
  app.component("VeeField", VeeField);
  app.component("ErrorMessage", ErrorMessage);

  defineRule('required', required); //defineRule registers a rule globally. 1st arg: your name for the rule.
  //2nd arg: rule function definition (rules are functions). In this case, it's a premade function from vee validate rules.
  defineRule('tos', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('alpha_spaces', alphaSpaces);
  defineRule('email', email);
  defineRule('min_value', minVal);
  defineRule('max_value', maxVal);
  defineRule('passwords_mismatch', confirmed); //No need for a copy since it will only be used once.
  defineRule('excluded', excluded);
  defineRule('country_excluded', excluded); //a duplicate of the rule for special error message generation.

  configure({ //global configuration function provided by Vee Validate. Takes an object that defines the config.
    generateMessage: (ctx) => { //gets called whenever a rule function returns false. ctx is the field and rule that failed validation.
      const messages = { //each property should correspond to the name you've given to the rule.
        required: `The field ${ctx.field} is required.`,
        min: `The field ${ctx.field} is too short.`,
        max: `The field ${ctx.field} is too long.`,
        alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
        email: `The field ${ctx.field} must be a valid email.`,
        min_value: `The field ${ctx.field} is too low.`,
        max_value: `The field ${ctx.field} is too high.`,
        excluded: `You are not allowed this value for the field ${ctx.field}.`,
        country_excluded: `Due to restrictions, we do not accept users from this location.`,
        passwords_mismatch: `The passwords don't match.`,
        tos: `You must accept the Terms of Service.`
      };

      const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`; //ctx.rule.name is country_excluded for example.
      //If the rule broken is not listed in messages, return a generic error message.

      return message;
    },
    //Validation Triggers: these are the 4 and their default values:
    validateOnBlur: true, //whenever the field is clicked and then the user clicks out of the field
    validateOnChange: true, //whenever the user inputs a value and then clicks out of the field
    validateOnInput: false, //whenever the user inputs a value, ie each keystroke
    validateOnModelUpdate: true //whenever the value is updated via v-model directive.
  });
  }
}
