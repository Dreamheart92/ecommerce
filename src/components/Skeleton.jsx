import { Children, cloneElement } from "react"

export default function Skeleton({ style }) {
    const baseStyle = ' bg-stone-200 animate-pulse'

    return (
        <div className={style + baseStyle}></div>
    )
}