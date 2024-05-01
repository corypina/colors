const $ = (el) => {
    return document.querySelector(el)
}

const $$ = (el) => {
    return document.querySelectorAll(el)
}

const createEl = (args) => {
    let el = document.createElement(args.type)

    if (args.class) {
        if (args.class.constructor === Array) {
            el.classList.add(...args.class)
        } else {
            el.classList.add(args.class)
        }
    }
    if (args.id) {
        el.id = args.id
    }
    return el
}

const createPicker = () => {
    let el = createEl({ type: 'input', class: 'colorPicker' })
    el.setAttribute('type', 'text')
    el.setAttribute('data-coloris', '')
    return el
}

const next = (el, selector) => {
    const nextEl = el.nextElementSibling;
    if (!selector || (nextEl && nextEl.matches(selector))) {
        return nextEl;
    }
    return null;
}