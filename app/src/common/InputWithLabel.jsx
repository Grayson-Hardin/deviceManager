import "../index.css";
export function InputWithLabel(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.labelText} </label>
      <input
        name={props.name}
        type={props.type}
        id={props.name}
        {...props.register(props.name, props.validation)}
      ></input>

      {props.errors && props.errors[props.name] && (
        <p className={"inputValidation"}>{props.errors[props.name].message}</p>
      )}
    </>
  );
}
