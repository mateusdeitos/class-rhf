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

	const form = watch();
	const name = watch("name");
	const [firstName, lastName] = watch(["name.firstName", "name.lastName"]);

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	return <>
		<div>
			<Input {...register("name.firstName")} label="Firstname" type="text" />
			<span>Length: {firstName.length}</span>
			<br />
			<Input {...register("name.lastName")} label="Lastname" type="text" />
			<span>Length: {lastName.length}</span>
			<br />
			<span>Name</span>
			<pre>{JSON.stringify(name, null, 2)}</pre>
			<br />
			<span>Form</span>
			<pre>{JSON.stringify(form, null, 2)}</pre>
		</div>
		<div>
			<button type="button" onClick={handleClick}>Enviar</button>
		</div>
	</>
}