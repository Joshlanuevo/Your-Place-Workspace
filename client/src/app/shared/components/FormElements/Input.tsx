"use client";
import { useEffect, useReducer } from "react";
import { validate } from "../../util/validator";

const inputReducer = (state, action) => {
  switch (action.type) {
      case 'CHANGE':
          return {
              ...state,
              value: action.val,
              isValid: validate(action.val, action.validators)
          }
      case 'TOUCH':
          return {
              ...state,
              isTouched: true
          }    
      default:
          return state;    
  }
}

const Input = (props: any) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        autoComplete="off"
        value={inputState.value}
        className="w-full border mb-4 rounded-sm border-gray-400 bg-white py-1 px-2 focus:bg-gray-300 focus:border-purple-700"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className="w-full border border-gray-300 bg-gray-200 py-1 px-2 focus:bg-gray-300 focus:border-purple-700"
      />
    );

  return (
    <div
      className={`form-control block ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label
        htmlFor={props.id}
        className="font-bold mb-2"
      >
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-500">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
