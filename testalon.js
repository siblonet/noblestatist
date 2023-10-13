const Upcased = {
    "A": "z",
    "B": "y",
    "C": "x",
    "D": "w",
    "E": "v",
    "F": "u",
    "G": "t",
    "H": "s",
    "I": "r",
    "J": "q",
    "K": "p",
    "L": "o",
    "M": "n",
    "N": "m",
    "O": "l",
    "P": "k",
    "Q": "j",
    "R": "i",
    "S": "h",
    "T": "g",
    "U": "f",
    "V": "e",
    "W": "d",
    "X": "c",
    "Y": "b",
    "Z": "a"
}

const Lowcasd = {
    "a": "Z",
    "b": "Y",
    "c": "X",
    "d": "W",
    "e": "V",
    "f": "U",
    "g": "T",
    "h": "S",
    "i": "R",
    "j": "Q",
    "k": "P",
    "l": "O",
    "m": "N",
    "n": "M",
    "o": "L",
    "p": "K",
    "q": "J",
    "r": "I",
    "s": "H",
    "t": "G",
    "u": "F",
    "v": "E",
    "w": "D",
    "x": "C",
    "y": "B",
    "z": "A"
}

const Nud = {
    "1": 0,
    "2": 9,
    "3": 8,
    "4": 7,
    "5": 6,
    "6": 5,
    "7": 4,
    "8": 3,
    "9": 2,
    "0": 1
}

const Sumd = {
    "é": "|",
    "â": " ",
    "ô": "Ü",
    "î": "Ï",
    "ê": "Ë",
    "û": "Ö",
    "ë": "Ä",
    "ï": "ÿ",
    "ä": "ü",
    "ö": "ö",
    "ü": "ä",
    "ÿ": "ï",
    "Ä": "ë",
    "Ö": "û",
    "Ë": "ê",
    "Ï": "î",
    "Ü": "ô",
    " ": "â",
    "|": "é",
    "`": "@",
    "~": "§",
    "#": "<",
    "{": ">",
    "}": "£",
    "[": "%",
    "]": "µ",
    "§": "~",
    "µ": "]",
    "%": "[",
    "£": "}",
    ">": "{",
    "<": "#",
    "@": "`",
    "?": "+",
    "&": ".",
    "'": ",",
    "(": ";",
    "-": ":",
    "è": "!",
    "_": "*",
    "ç": "ù",
    "à": "$",
    ")": "^",
    "=": "=",
    "^": ")",
    "$": "à",
    "ù": "ç",
    "*": "_",
    "!": "è",
    ":": "-",
    ";": "(",
    ",": "'",
    ".": "&",
    "+": "?"
}

const deed = {
    "¨": "²",
    "²": "/",
    "°": "°"
}


function whatisthis(ee) {
    const adaa = ee.replaceAll("/", "¨");
    let dof = "";
    [...adaa].forEach(en => {
        dof += Upcased[`${en}`];
        dof += Lowcasd[`${en}`];
        dof += Nud[`${en}`];
        dof += Sumd[`${en}`];
        dof += deed[`${en}`];

    });
    const ada = dof.replaceAll("undefined", "");

    return ada;
}


function thisiswhatd(eee) {
    let dof = "";
    [...eee].forEach(en => {
        dof += Upcased[`${en}`];
        dof += Lowcasd[`${en}`];
        dof += Nud[`${en}`];
        dof += Sumd[`${en}`];
        dof += deed[`${en}`];
    })
    const adaa = dof.replaceAll("undefined", "");
    console.log(adaa);
    return adaa;
}

const sa = whatisthis("cyclic-zany-plum-bear-us-east-1");
console.log(sa);


