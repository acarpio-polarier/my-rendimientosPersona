import { LayoutAnimation } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';

Array.prototype.deepClone = function () {
    return JSON.parse(JSON.stringify(this))
};


export function deepClone(object) {
    return JSON.parse(JSON.stringify(object))
}

export function getTiempoNotificacion(fecha_) {
    const fecha = LocaleConfig(new Date(fecha_))
    const dias = Math.abs(fecha.diffDays(new Date()))
    const horas = dias % 1 * 24
    const minutos = horas % 1 * 60
    const text_dias = Math.floor(dias) > 0 ? Math.floor(dias) + " días " : ""
    const text_horas = Math.floor(horas) > 0 ? Math.floor(horas) + " horas " : ""
    const text_minutos = Math.floor(minutos) > 0 ? Math.floor(minutos) + " minutos " : ""

    let text = text_dias + text_horas + text_minutos
    if (text.length === 0) {
        text = "unos instantes"
    }
    return "Hace " + text
}

export function validateDNI(dni) {
    var numero, letr, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();
    if (expresion_regular_dni.test(dni) === true) {
        numero = dni.substr(0, dni.length - 1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        } else {
            //alert('Dni correcto');
            return true;
        }
    } else {
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}

export function checkIBAN(iban) {
    iban = iban.replace(/\s/g, '')
    if (iban.length == 24) {
        var digitoControl = getCodigoControl_IBAN(iban.substr(0, 2).toUpperCase(), iban.substr(4));
        if (digitoControl == iban.substr(2, 2))
            return true;
    }
    return false;
}

function getCodigoControl_IBAN(codigoPais, cc) {
    let valoresPaises = {
        'A': '10',
        'B': '11',
        'C': '12',
        'D': '13',
        'E': '14',
        'F': '15',
        'G': '16',
        'H': '17',
        'I': '18',
        'J': '19',
        'K': '20',
        'L': '21',
        'M': '22',
        'N': '23',
        'O': '24',
        'P': '25',
        'Q': '26',
        'R': '27',
        'S': '28',
        'T': '29',
        'U': '30',
        'V': '31',
        'W': '32',
        'X': '33',
        'Y': '34',
        'Z': '35'
    };

    function modulo(valor, divisor) {
        var resto = 0;
        var dividendo = 0;
        for (var i = 0; i < valor.length; i += 10) {
            dividendo = resto + "" + valor.substr(i, 10);
            resto = dividendo % divisor;
        }
        return resto;
    }

    var dividendo = cc + valoresPaises[codigoPais.substr(0, 1)] + valoresPaises[codigoPais.substr(1, 1)] + '00';
    var digitoControl = 98 - modulo(dividendo, 97);
    if (digitoControl.length == 1) {
        digitoControl = '0' + digitoControl;
    }

    return digitoControl;
}

export function makeLayoutAnimation() {
    return LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export function addTransparencyToHexColor(hexColor, transparencyPercent) {
    if (transparencyPercent < 0 || transparencyPercent > 100) {
        throw new Error('Transparency percent must be between 0 and 100');
    }
    var _opacity = Math.round(Math.min(Math.max(transparencyPercent || 1, 0), 1) * 255);
    return hexColor + _opacity.toString(16).toUpperCase();
}
