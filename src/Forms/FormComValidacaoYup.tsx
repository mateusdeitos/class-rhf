import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";
import { useEffect } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
	name: yup.string().min(5, "O nome deve ter no mínimo 5 caracteres").required("Nome é obrigatório"),
	acceptTerms: yup.boolean().isTrue("Você deve aceitar os termos"),
})

export const FormComValidacaoYup = () => {
	const { handleSubmit, register, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			acceptTerms: false,
		}
	});

	const handleClick = (data: any) => {
		alert(JSON.stringify(data, null, 2));
	}

	const handleErrors = (errors: any) => {
		console.log(errors);
	}

	useEffect(() => {
		console.log(errors);
	}, [errors])

	return <>
		<div>
			<Input {...register("name")} label="Name" type="text" />
			{!!errors.name && <span>{errors.name.message}</span>}
			<br />

			<Input {...register("acceptTerms")} label="Aceito os termos" type="checkbox" />
			{!!errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}
			<br />
		</div>
		<button type="button" onClick={handleSubmit(handleClick, handleErrors)}>Enviar</button>
	</>
}