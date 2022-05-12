import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form"
import { Input } from "../Inputs/Input"
import "../App.css";
import { useEffect } from 'react';

interface IVendaForm {
	dataPedido: string;
	cliente: {
		nome: string;
		cpf: string;
	};
	valorVenda: number;
	items: Array<{
		id: number;
		descricao: string;
		quantidade: number;
		valorUnitario: number;
		valorTotal: number;
	}>
}


const defaultItem: IVendaForm["items"][0] = {
	id: 0,
	descricao: "",
	quantidade: 0,
	valorUnitario: 0,
	valorTotal: 0
}

const items: IVendaForm["items"] = [defaultItem];

export const FormDinamico = () => {
	const form = useForm<IVendaForm>({
		shouldFocusError: true,
		defaultValues: {
			dataPedido: new Date().toLocaleDateString("pt-BR"),
			cliente: {
				nome: "",
				cpf: "",
			},
			valorVenda: 0,
			items,
		},
	});
	const { register, reset, control, handleSubmit } = form;

	const { fields, append, remove } = useFieldArray<IVendaForm>({ name: "items", control });

	const handleClick = (data: any) => {
		alert(JSON.stringify(data, null, 2));
	}

	const handleErrors = (errors: any) => {
		console.log("errors", errors);
	}

	return <FormProvider {...form}>
		<div>
			<Input {...register("dataPedido")} label="Data da venda" type="date" />
			<Input {...register("cliente.nome")} label="Nome do cliente" type="text" />
			<Input {...register("cliente.cpf")} label="CPF do cliente" type="text" />
			<ValorVenda />
			<br />
			<table>
				<thead>
					<tr>
						<th>Descrição</th>
						<th>Quantidade</th>
						<th>Valor unitário</th>
						<th>Valor total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{fields.map((field, index) => (
						<Item key={field.id} index={index}>
							<td>
								<button tabIndex={-1} type="button" onClick={() => remove(index)}>Remover</button>
							</td>
						</Item>
					))}
					<button type="button" onClick={() => append({
						...defaultItem,
						id: fields.length
					})}>Add item</button>
				</tbody>
			</table>
		</div>
		<div>

			<button type="button" onClick={handleSubmit(handleClick, handleErrors)}>Enviar</button>
			<button type="button" onClick={() => reset()}>Reset</button>
		</div>
	</FormProvider>
}

const ValorVenda = () => {
	const { register, setValue, watch } = useFormContext<IVendaForm>();
	const total = watch("items").reduce((acc, item) => acc + item.valorTotal, 0);

	useEffect(() => {
		setValue("valorVenda", total);
	}, [total]);

	return <Input {...register("valorVenda")} label="Valor da venda" disabled type="number" />
}

interface ItemProps {
	index: number;
}
const Item: React.FC<ItemProps> = ({ index, children }) => {
	const { register, watch, setValue } = useFormContext<IVendaForm>();

	const [quantidade, valorUnitario] = watch([
		`items.${index}.quantidade`,
		`items.${index}.valorUnitario`,
	]);

	useEffect(() => {
		setValue(`items.${index}.valorTotal`, quantidade * valorUnitario);
	}, [quantidade, valorUnitario])

	return <tr>
		<td>
			<input {...register(`items.${index}.descricao`)} type="text" />
		</td>
		<td>
			<input {...register(`items.${index}.quantidade`)} type="text" />
		</td>
		<td>
			<input {...register(`items.${index}.valorUnitario`, {
				validate: value => {
					if (value > 10) {
						return true;
					}

					return "Valor unitário deve ser maior que 10";
				}
			})} type="text" />
		</td>
		<td>
			<input {...register(`items.${index}.valorTotal`)} disabled type="text" />
		</td>
		{children}
	</tr>

}