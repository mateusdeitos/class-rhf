import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";

export const FormWatch = () => {
	const { getValues, register, watch } = useForm({
		defaultValues: {
			name: {
				firstName: "",
				lastName: "",
			},
		}
	});

	const [firstName, lastName] = watch(["name.firstName", "name.lastName"]);
	const form = watch();

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	return <>
		<div>
			<Input {...register("name.firstName")} label="Name" type="text" />
			<span>Length: {firstName.length}</span>
			<br />
			<Input {...register("name.lastName")} label="Name" type="text" />
			<span>Length: {lastName.length}</span>
			<br />
			<pre>{JSON.stringify(form, null, 2)}</pre>
		</div>
		<div>
			<button type="button" onClick={handleClick}>Enviar</button>
		</div>
	</>
}