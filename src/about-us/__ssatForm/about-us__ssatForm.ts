// @ts-ignore
import SimpowerValidation from 'simpower-validation';

const ssatForm = document.querySelector<HTMLFormElement>('#ssatForm')!;
const ssatText = ssatForm.elements['ssatText' as any] as HTMLTextAreaElement;
const ssatUserName = ssatForm.elements['ssatUserName' as any] as HTMLInputElement;
const ssatUserEmail = ssatForm.elements['ssatUserEmail' as any] as HTMLInputElement;

const validation = new SimpowerValidation(ssatForm, {
  validateFieldOnEvent: {
    event: 'blur',
    afterFirstSubmition: true,
    lockInputOnValidation: false,
  },
  validateOnSubmit: {
    lockFormOnValidation: false,
    revalidateAllFieldsBeforeSubmition: false,
  }
});

validation
  .addField(
    'ssatText',
    [{
      validator(inputValue: string) {
        return inputValue.trim();
      },
      errorMessage: 'Ошибка',
    }],
    {
      ruleErrorMessages: {
        on: true,
        position: {
          prepand: '.about-us__ssatForm-field-group-ssatText',
        },
        removeContainerFromDOMAfterSuccess: true,
        classes: ['about-us__ssatForm-field-validation-error'],
      },
      invalidViewOfField: {
        on: true,
        classes: ['about-us__ssatForm-textarea_invalid'],
      },
    }
  )
  .addField(
    'ssatUserName',
    [
      {
        validator(inputValue: string) {
          return inputValue.trim();
        },
        errorMessage: 'Ошибка',
      },
      {
        validator(inputValue: string) {
          const nameRegEx = /^[а-яА-Я\s]{1,40}$/;
          return inputValue.match(nameRegEx);
        },
        errorMessage: 'Ошибка',
      },
    ],
    {
      ruleErrorMessages: {
        on: true,
        position: {
          prepand: '.about-us__ssatForm-field-group-ssatUserName',
        },
        removeContainerFromDOMAfterSuccess: true,
        classes: ['about-us__ssatForm-field-validation-error'],
      },
      invalidViewOfField: {
        on: true,
        classes: ['about-us__ssatForm-input_invalid'],
      },
    }
  )
  .addField(
    'ssatUserEmail',
    [{
        validator(inputValue: string) {
          if (!inputValue.trim()) {
            return false
          }

          const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          return inputValue.match(emailRegEx);
        },
        errorMessage: 'Ошибка',
    }],
    {
      ruleErrorMessages: {
        on: true,
        position: {
          prepand: '.about-us__ssatForm-field-group-ssatUserEmail',
        },
        removeContainerFromDOMAfterSuccess: true,
        classes: ['about-us__ssatForm-field-validation-error'],
      },
      invalidViewOfField: {
        on: true,
        classes: ['about-us__ssatForm-input_invalid'],
      },
    }
  )
  .addField(
    'ssatConsent',
    [{
        validator(inputValue: boolean) {
          return inputValue;
        },
        errorMessage: 'Необходимо согласие'
    }],
    {
      ruleErrorMessages: {
        on: true,
        position: {
          append: '.about-us__ssatForm-consent-checkbox',
        },
        removeContainerFromDOMAfterSuccess: true,
        classes: ['about-us__ssatForm-consent-error_hidden'],
      },
      invalidViewOfField: {
        on: true,
        classes: ['about-us__ssatForm-consent-checkbox-input_invalid'],
      },
    }
  );

validation.onSuccess(
  () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        text: ssatText.value,
        name: ssatUserName.value,
        email: ssatUserEmail.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },
  'submit'
);
