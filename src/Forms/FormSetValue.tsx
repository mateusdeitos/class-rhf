import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";

export const FormSetValue = () => {
	const { setValue, getValues, register } = useForm({
		defaultValues: {
			name: "",
		}
	});

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	const askSomething = () => {
		const response = prompt("What is your name?");
		if (response) {
			setValue("name", response);
		}
	}

	return <>
		<div>
			<Input {...register("name")} label="Name" type="text" disabled />
			<button type="button" onClick={askSomething}>Obter Nome</button>
			<br />
		</div>
		<div>
			<button type="button" onClick={handleClick}>Enviar</button>
		</div>
	</>
}