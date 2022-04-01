import { useState } from 'react'
import './App.css'
import { FormComValidacao } from './Forms/FormComValidacao'
import { FormComValidacaoYup } from './Forms/FormComValidacaoYup'
import { FormMaisComplexo } from './Forms/FormMaisComplexo'
import { FormSetValue } from './Forms/FormSetValue'
import { FormSimples } from './Forms/FormSimples'
import { FormWatch } from './Forms/FormWatch'

const components = [
	{
		name: "Form Simples",
		component: FormSimples,
	},
	{
		name: "Form Mais Complexo",
		component: FormMaisComplexo,
	},
	{
		name: "Form Set Value",
		component: FormSetValue,
	},
	{
		name: "Form Watch",
		component: FormWatch,
	},
	{
		name: "Form Com Validação",
		component: FormComValidacao,
	},
	{
		name: "Form Com Validação Yup",
		component: FormComValidacaoYup,
	},
]

function App() {
	const [activeComponent, setActiveComponent] = useState(components[0])

	return (
		<div className="App">
			<div className="sidebar">
				<ul>
					{components.map(
						component =>
							<li
								key={component.name}
							>
								<a href="#" onClick={() => setActiveComponent(component)}>
									{component.name}
								</a>
							</li>
					)}
				</ul>
			</div>
			<div className="content">
				<activeComponent.component />
			</div>
		</div>
	)
}


export default App
