# Class React Hook Form

# O problema

Trabalhar com forms no react, embora possível, com o tempo se torna algo difícil de gerenciar, principalmente se for um form mais complexo além de não ser performático usar *state* para lidar diretamente com mudanças nos inputs

# Como a lib react-hook-form resolve esse problema

A lib que usamos para trabalhar com forms no react permite com que trabalhamos com os inputs de forma não-controlada, ou seja, mudanças nos inputs registrados não disparam renderizações para o react e essa abstração fica por baixo dos panos, ou seja, acaba sendo muito simples de criar um form utilizando-a.

# useForm

useForm é o principal hook utilizado no react-hook-form, ele irá retornar os métodos da lib que farão o vínculo e o controle dos dados do form

```jsx
export const StoryReactHookForm_FormSimples = () => {
	const { register, getValues, reset } = useForm<IFormSimples>({
		defaultValues: {
			email: "",
			password: "",
			acceptTerms: true,
		}
	});

	const handleClick = () => {
		const values = getValues();
		alert(JSON.stringify(
			values,
			null,
			2
		));
	};

	return <>
		<Input {...register("email")} label="E-mail" type="text" />
		<Input {...register("password")} label="Senha" type="password" />
		<br />
		<Switch {...register("acceptTerms")} label="Aceito os termos" />
		<div>
			<button className="btn btn-primary" type="button" onClick={handleClick}>Enviar</button>
			<button className="btn btn-secondary" type="button" onClick={() => reset()}>Reset</button>
		</div>
	</>;
};
```

```jsx
export const StoryReactHookForm_FormMaisComplexo = () => {
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
	};

	return <>
		<Input {...register("name.firstName")} label="Nome" type="text" />
		<Input {...register("name.lastName")} label="Sobrenome" type="text" />
		<br />
		<Input {...register("local.cidade")} label="Cidade" type="text" />
		<Select {...register("local.uf")} label="Estados">
			<option value="RS">RS</option>
			<option value="SC">SC</option>
			<option value="PR">PR</option>
			<option value="SP">SP</option>
		</Select>
		<br />
		<div>
			{hobbies.map((hobby, index) => (
				<React.Fragment key={hobby.name}>
					<Switch
						key={hobby.name}
						{...register(`hobbies.${index}.checked`)}
						label={hobby.name}
						type="checkbox"
					/>
					<span style={{ width: 12 }}></span>
				</React.Fragment>
			))}
		</div>
		<br />
		<div>
			<button className="btn btn-primary" type="button" onClick={handleClick}>Enviar</button>
			<button className="btn btn-secondary" type="button" onClick={() => reset()}>Reset</button>
		</div>
	</>; 
};
```

## Métodos

### register

Registra inputs na lib, ao registrar um input uma ref é repassada para esse input e dessa forma a lib consegue obter o valor do input registrado.

```tsx
import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"

const Form = () => {
	const {register} = useForm();

	return <input type="text" {...register("nome")} />
}
```

### getValues

Obtém os valores atuais do form

<aside>
💡 Importante, esse método não irá disparar as validações setadas nos campos

</aside>

```tsx
import { useForm } from "react-hook-form"
import { Input } from "../Inputs/Input"

interface IFormSimples {
	email: string;
}

export const FormSimples = () => {
	const { register, getValues, reset } = useForm<IFormSimples>({
		defaultValues: {
			email: ""
		}
	});

	const handleClick = () => {
		alert(JSON.stringify(getValues(), null, 2));
	}

	return <>
		<div>
			<Input {...register("email")} label="E-mail" type="text" />
			<br />
		</div>
		<div>
			<button type="button" onClick={handleClick}>Enviar</button>
		</div>
	</>
}
```

### handleSubmit

Parecido com o getValues mas irá disparar as validações ao ser chamado.

A diferença dele é que ele irá retornar uma nova função ao ser executado, isso é feito dessa forma para ele ser passado ao evento `onSubmit` dos forms, mas não é necessário usar dessa forma.

```tsx
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
```

### setValue

Método útil para setar diretamente o valor de um campo no form quando não for possível usar apenas o register, exemplo

```tsx
export const FormSetValue = () => {
	const { setValue, getValues, register } = useForm({
		defaultValues: {
			name: "",
		}
	});

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
	</>
}
```

### Watch

Método útil para obter os valores do form em realtime, ou seja, quando um valor mudar, o watch para aquele valor será disparado. Pode ser utilizado sem nenhum parâmetro para poder observar mudanças no objeto de dados do form inteiro

```tsx
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

	// Observando mudanças em 2 campos
	const [firstName, lastName] = watch(["name.firstName", "name.lastName"]);

	// Observando mudanças no 'name'
	const name = watch("name");

	// Observando mudanças no form inteiro
	const form = watch();

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
```
