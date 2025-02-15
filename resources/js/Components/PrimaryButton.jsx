export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button {...props} disabled={disabled} className="primary-button">
            {children}
        </button>
    );
}
