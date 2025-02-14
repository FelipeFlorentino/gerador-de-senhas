function getChartTypes() {
    const uppercase = document.querySelector('#incluir_maiusculas').checked;
    const lowercase = document.querySelector('#incluir_minusculas').checked;
    const number = document.querySelector('#incluir_numeros').checked;
    const specialCharacter = document.querySelector('#incluir_caractere_especial').checked;

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    if (number) {
        charTypes.push('0123456789');
    }

    if (specialCharacter) {
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    return charTypes;
}

function getsenhaSize() {
    const size = document.querySelector('#size').value;
    
    if (isNaN(size) || size < 4 || size > 128) {
        message('Tamanho inválido, digite um número entre 4 e 128!', 'danger');
    }

    return size;
}

function generatesenha(size, charTypes) {
    let senhaGenerated = '';
    const selectedChars = charTypes.join('');

    charTypes.forEach(type => {
        senhaGenerated += type[Math.floor(Math.random() * type.length)];
    });

    while (senhaGenerated.length < size) {
        senhaGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    senhaGenerated = senhaGenerated.split('').sort(() => Math.random() - 0.5).join('');

    return senhaGenerated;
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getsenhaSize();
    const charTypes = getChartTypes();

    if (!size) {
        return;
    }
    
    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', 'danger');
        return;
    }

    const senhaGenerated = generatesenha(size, charTypes);

    document.querySelector('#senha_container').classList.add('show');
    document.querySelector('#senha').textContent = senhaGenerated;
});

document.querySelector('#copiar').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#senha').textContent);
    message('Senha copiada com sucesso!', 'success');
});