import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";

export const FormSimples = () => {
	const { register, getValues, reset } = useForm({
		defaultValues: {
			email: "",
			password: "",
			acceptTerms: true,
		}
	});

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	return <>
		<div>
			<Input {...register("email")} label="E-mail" type="text" />
			<Input {...register("password")} label="Senha" type="password" />
			<Input {...register("acceptTerms")} label="Aceito os termos" type="checkbox" />
			<br />
		</div>
		<div>
			<button type="button" onClick={handleClick}>Enviar</button>
			<button type="button" onClick={() => reset()}>Reset</button>
		</div>
	</>
}