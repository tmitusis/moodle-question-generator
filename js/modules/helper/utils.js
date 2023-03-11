const utils = (function () {
    function generateRandomInteger(from, to) {
        return Math.round(
            (Math.random() * (to - from)) + from
        );
    }

    const INT_RANGE_REGEX = /\[-?\d+\.\.-?\d+\]/gi;
    function generateRandomIntegerFromString(str) {
        const range = str.replace(/[\[\]]/g, '').split('..')
        return generateRandomInteger(parseInt(range[0]), parseInt(range[1]));
    }

    function generateRandomFloat(from, to, digits) {
        return parseFloat(((Math.random() * (to - from)) + from).toFixed(digits));
    }

    const FLOAT_RANGE_REGEX = /\[-?(\d+(\.\d+))\.\.-?(\d+(\.\d+))\](@\d+)?/gi;
    function generateRandomFloatFromString(str) {
        const at_idx = str.indexOf('@');
        const range = str.replace(/[\[\]]/g, '')
            .substring(0, at_idx === -1 ? str.length : at_idx)
            .split('..')
        ;
        let digits = 15;

        if (at_idx !== -1) {
            digits = parseInt(str.substring(at_idx + 1, str.length));
        }

        return generateRandomFloat(parseFloat(range[0]), parseFloat(range[1]), digits);
    }

    const RANDOM_NOUN_REGEX = /\(съществително\)/gi;
    function getRandomNoun() {
        return nouns[generateRandomInteger(0, nouns.length - 1)];
    }

    const RANDOM_ADJECTIVE_REGEX = /\(прилагателно\)/gi;
    function getRandomAdjective() {
        return adjectives[generateRandomInteger(0, adjectives.length - 1)];
    }

    const ONEOF_WORD_REGEX = /{([а-я]*[a-z]*)(,[а-я]*[a-z]*)*}/gi;
    function getOneOfWord(str) {
        const words = str.replace('{', '')
            .replace('}', '')
            .split(',')
        ;
        return words[generateRandomInteger(0, words.length - 1)];
    }

    return Object.freeze({
        INT_RANGE_REGEX,
        FLOAT_RANGE_REGEX,
        RANDOM_NOUN_REGEX,
        RANDOM_ADJECTIVE_REGEX,
        ONEOF_WORD_REGEX,

        generateRandomInteger,
        generateRandomIntegerFromString,
        generateRandomFloat,
        generateRandomFloatFromString,
        getRandomNoun,
        getRandomAdjective,
        getOneOfWord
    });
})();
