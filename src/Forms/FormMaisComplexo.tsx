import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";
import React from "react";

const hobbies = [
	{
		name: "Assistir NetFlix",
		checked: false,
	},
	{
		name: "Assistir Futebol",
		checked: false,
	},
];

export const FormMaisComplexo = () => {

	const { register, getValues, reset, handleSubmit } = useForm({
		defaultValues: {
			name: {
				firstName: "",
				lastName: "",
			},
			local: {
				cidade: "",
				uf: "",
			},
			hobbies
		}
	});

	const handleClick = (data: any) => {
		alert(JSON.stringify(data, null, 2));
	}

	return <>
		<div>
			<Input {...register("name.firstName")} label="Nome" type="text" />
			<Input {...register("name.lastName")} label="Sobrenome" type="text" />
			<br />
			<Input {...register("local.cidade")} label="Cidade" type="text" />
			<Input {...register("local.uf")} label="UF" type="text" />
			<br />
			<div className="vertical-checkboxes-container">
				{hobbies.map((hobby, index) => (
					<React.Fragment key={hobby.name}>
						<Input
							key={hobby.name}
							{...register(`hobbies.${index}.checked`)}
							label={hobby.name}
							type="checkbox"
						/>
						<span style={{ width: 12 }}></span>
					</React.Fragment>
				))}
			</div>
		</div>
		<div>
			<button type="button" onClick={handleSubmit(handleClick, (errors) => console.log(errors))}>Enviar</button>
			<button type="button" onClick={() => reset()}>Reset</button>
		</div>
	</>
}