const letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ']
let hashKeyArr = []

const convertHash = document.getElementById("convertHash");
const convertUnhash = document.getElementById("convertUnhash");

const unhashTextCopy = document.getElementById('unhashTextCopy');
const hashTextCopy = document.getElementById('hashTextCopy');

//copy text

function copyText(id) {
    let copyText = document.getElementById(id);
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert("text Copied");
}

// calc mod

function mod(number, maxLength) {
    return number - (maxLength * Math.floor(number / maxLength));
}

// find (hashed or unhashed) text letter index 

function findLetterIndex(letterIndex, keyIndex, encryptType) {
    if (encryptType === 'hash') {
        return letterArr[mod(letterIndex + hashKeyArr[keyIndex].index, letterArr.length)]
    }
    return letterArr[mod(letterIndex - hashKeyArr[keyIndex].index, letterArr.length)]
}

// generate array : hashKeyArr > { key: letter, index: selected letter index }

const generateHashKeyArr = (hashKey) => {
    for (let i = 0; i < hashKey.length; i++) {
        for (let j = 0; j < letterArr.length; j++) {
            if (hashKey[i] === letterArr[j]) {
                hashKeyArr.push({ key: hashKey[i], index: j })
                break;
            }
        }
    }
}

function EncryptText(encryptType, textID, keyID, showConvertedText) {
    let keyIndex = 0;
    let finalText = ''
    hashKeyArr = []

    const text = document.getElementById(textID).value.toLowerCase();
    const hashKey = document.getElementById(keyID).value.toLowerCase();

    generateHashKeyArr(hashKey)

    for (let i = 0; i < text.length; i++) {
        for (let letterIndex = 0; letterIndex < letterArr.length; letterIndex++) {
            if (text[i] === letterArr[letterIndex]) {
                finalText = finalText + findLetterIndex(letterIndex, keyIndex, encryptType)
                break;
            }
        }
        if (keyIndex === hashKeyArr.length - 1) {
            keyIndex = 0;
            continue;
        }
        keyIndex++
    }
    document.getElementById(showConvertedText).innerHTML = finalText;
}
hashTextCopy.addEventListener("click", () => copyText('showHashText'));
unhashTextCopy.addEventListener("click", () => copyText('showUnhashText'));

convertHash.addEventListener("click", () => EncryptText('hash', 'hashText', 'hashKey', 'showHashText'));
convertUnhash.addEventListener("click", () => EncryptText('unHash', 'unhashText', 'unhashKey', 'showUnhashText'));
