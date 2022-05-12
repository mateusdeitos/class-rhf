import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";

export const FormComValidacao = () => {
	const { handleSubmit, register, formState: { errors } } = useForm({
		shouldFocusError: true,
		defaultValues: {
			name: "",
			acceptTerms: false,
		}
	});

	const handleClick = (data: any) => {
		alert(JSON.stringify(data, null, 2));
	}

	return <>
		<div>
			<Input {...register("name", {
				required: "O nome é obrigatório",

				validate: (value) => {
					if (value !== "Mateus") {
						return "Só pode ser Mateus";
					}

					return true;
				},

			})} label="Name" type="text" />
			<br />

			<Input {...register("acceptTerms", {
				required: { value: true, message: "Você precisa aceitar os termos" },
			})} label="Aceito os termos" type="checkbox" />
			<br />
			<pre>{JSON.stringify({
				name: errors?.name?.message || "",
				acceptTerms: errors?.acceptTerms?.message || "",
			}, null, 2)}</pre>
		</div>
		<button type="button" onClick={handleSubmit(handleClick, errors => console.log(errors))}>Enviar</button>
	</>
}