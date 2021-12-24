import lang from '@/locales/default-lang'

const translate = (key: string) => {
    const template =
        lang[key] ||
        lang[
            Object.keys(lang).find(
                (k) => k?.toLocaleLowerCase() === key?.toLocaleLowerCase(),
            )
        ]
    if (!template) return key
    return template
}

export const t = translate
