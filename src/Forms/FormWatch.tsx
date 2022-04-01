import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";

export const FormWatch = () => {
	const { getValues, register, watch } = useForm({
		defaultValues: {
			name: "",
		}
	});

	const name = watch("name");
	const form = watch();

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	return <>
		<div>
			<Input {...register("name")} label="Name" type="text" />
			<br />
			<span>Length: {name.length}</span>
			<br />
			<pre>{JSON.stringify(form, null, 2)}</pre>
		</div>
		<button type="button" onClick={handleClick}>Enviar</button>
	</>
}