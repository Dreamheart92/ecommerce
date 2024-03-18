export default function Button({ children, variant = 'primary', style, ...props }) {
    let baseClass = `text-${variant === 'text' ? 'black' : 'white'} text-md px-6 py-2`

    if (variant === 'primary') {
        baseClass += ' bg-stone-900 hover:bg-stone-700'
    } else if (variant === 'secondary') {
        baseClass += ' border'
    } else if (variant === 'text') {
        baseClass += ' underline'
    }

    if (style) {
        baseClass += style;
    }

    return (
        <button
            {...props}
            className={baseClass}>
            {children}
        </button>
    )
}