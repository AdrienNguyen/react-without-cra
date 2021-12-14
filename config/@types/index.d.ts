declare module '*.png' {
    const content: string
    export default content
}

declare module '*.svg' {
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
    export default SVG
}

declare module '*.jpg' {
    const content: string
    export default content
}

declare module '*.json' {
    const content: any
    export default content
}
