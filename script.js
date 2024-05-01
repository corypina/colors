const buildColumn = (num) => {
    let column = createEl({ type: 'div', class: 'colorCol', id: `col${num}` })
    let content = createEl({ type: 'div', class: 'colContent' })
    // let name = createEl({ type: 'div', class: 'colorName' })
    // content.append(name)
    let picker = createPicker()
    content.append(picker)
    column.append(content)
    $('#main').append(column)
}

const setUrl = () => {
    let arr = []
    $$('.colorPicker').forEach(picker => {
        arr.push(picker.value.substring(1))
    })
    let currentUrlWithoutParams = window.location.origin + window.location.pathname;
    let newUrl = currentUrlWithoutParams + '?colors=' + arr.join('-');
    window.history.pushState(null, '', newUrl)
}

const setColors = (colors) => {
    for (let x = 0; x < 5; x++) {
        buildColumn(x + 1);
    }
    let cols = $$('.colorCol')
    let pickers = $$('.colorPicker')
    for (let x = 0; x < 5; x++) {
        cols[x].style.backgroundColor = colors[x];
        cols[x].setAttribute('data-color', colors[x]);
        pickers[x].value = colors[x]
    }

    document.addEventListener('coloris:pick', event => {
        const color = event.detail.color
        let column = event.detail.currentEl.parentNode.parentNode
        column.style.backgroundColor = color
        column.setAttribute('data-color', color)
        setUrl()
        $('#util span').textContent = "Copy Codes"
    });

    Coloris({
        alpha: false
    });
}

const getColorsFromUrl = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('colors')) {
        return urlParams.get('colors')
    } else {
        return false
    }
}

const copyCodes = () => {
    let arr = []
    $$('.colorPicker').forEach(picker => {
        arr.push("#" + picker.value.substring(1))
    })
    let merged = arr.join("\n");
    // Create a temporary textarea element
    var textarea = document.createElement("textarea");

    // Set the text content of the textarea to the merged text
    textarea.textContent = merged;

    // Append the textarea to the document body
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    console.log("Text copied to clipboard:");
    $('#util span').textContent = "Copied!"
}

document.addEventListener('DOMContentLoaded', () => {

    if (getColorsFromUrl()) {
        let str = getColorsFromUrl()
        let arr = str.split("-");
        let colors = arr.map(function (string) {
            return "#" + string;
        });
        setColors(colors)
        setUrl()
    } else {
        const grays = ['f0f0f0', 'd4d4d4', 'b8b8b8', '9c9c9c', '7f7f7f'];
        let colors = grays.map(function (string) {
            return "#" + string;
        });
        setColors(colors);
        setUrl()
    }

    $('#util span').addEventListener('click', () => {
        copyCodes()
    })
});