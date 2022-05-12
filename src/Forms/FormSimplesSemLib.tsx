import { Input } from "../Inputs/Input"
import "../App.css";
import { useState } from "react";


export const FormSimplesSemLib = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [acceptTerms, setAcceptTerms] = useState(true);

	const handleClick = () => {
		alert(JSON.stringify({
			email,
			password,
			acceptTerms
		}, null, 2));
	}

	return <>
		<div>
			<Input label="E-mail" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
			<Input label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
			<Input label="Aceito os termos" type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)}/>
			<br />
		</div>
		<div>
			<button type="button" onClick={handleClick}>Enviar</button>
			<button type="button" onClick={() => {
				setEmail("");
				setPassword("");
				setAcceptTerms(true);
			}}>Reset</button>
		</div>
	</>
}