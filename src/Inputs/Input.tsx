import { forwardRef, HTMLAttributes, HTMLProps, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, id, ...rest } = props;
	return <div className="input-group">
		{label && <label htmlFor={id}>{label}</label>}
		<input {...rest} autoComplete="new-password" id={id} ref={ref} />
	</div>
})

