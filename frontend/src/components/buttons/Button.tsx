export interface ButtonProps {
    children: React.ReactElement;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button onClick={props.onClick}>
            {props.children}
        </button>
    )
}