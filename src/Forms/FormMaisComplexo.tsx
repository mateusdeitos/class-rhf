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

	const { register, getValues, reset } = useForm({
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

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	return <>
		<div>
			<Input {...register("name.firstName")} label="Nome" type="text" />
			<Input {...register("name.lastName")} label="Sobrenome" type="text" />
			<br />
			<Input {...register("local.cidade")} label="Cidade" type="text" />
			<select {...register("local.uf")} placeholder="UF">
				<option value="RS">RS</option>
				<option value="SC">SC</option>
				<option value="PR">PR</option>
				<option value="SP">SP</option>
			</select>
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
			<button type="button" onClick={handleClick}>Enviar</button>
			<button type="button" onClick={() => reset()}>Reset</button>
		</div>
	</>
}