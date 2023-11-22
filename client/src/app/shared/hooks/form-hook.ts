import { useReducer, useCallback } from 'react';

interface Input {
  value: string;
  isValid: boolean;
}

interface FormState {
  inputs: Record<string, Input>;
  isValid: boolean;
}

type FormAction =
  | { type: 'INPUT_CHANGE'; value: string; isValid: boolean; inputId: string }
  | { type: 'SET_DATA'; inputs: Record<string, Input>; formIsValid: boolean };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: Record<string, Input>,
  initialFormValidity: boolean
): [FormState, (id: string, value: string, isValid: boolean) => void, (inputData: Record<string, Input>, formValidity: boolean) => void] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData: Record<string, Input>, formValidity: boolean) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
