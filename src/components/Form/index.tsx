interface FormProps {
  firstLabel: string;
  firstField: string;
  placeholder: string;
  secondLabel: string;
}

export function Form(props: FormProps) {
  return (
    <form>
      <div>
        <label htmlFor={props.firstField}>{props.firstLabel}</label>
        <input type={props.firstField} placeholder={props.placeholder} />
      </div>
      <div>
        <label>{props.secondLabel}</label>
        <input />
      </div>
      <button type='submit'>Enviar</button>
    </form>
  );
}
