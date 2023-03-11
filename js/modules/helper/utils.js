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

    function generateRandomFloat(from, to) {
        return (Math.random() * (to - from)) + from;
    }

    const FLOAT_RANGE_REGEX = /\[-?(\d+(\.\d+))\.\.-?(\d+(\.\d+))\]/gi;
    function generateRandomFloatFromString(str) {
        const range = str.replace(/[\[\]]/g, '').split('..')
        return generateRandomFloat(parseFloat(range[0]), parseFloat(range[1]));
    }

    const RANDOM_NOUN_REGEX = /\(съществително\)/gi;
    function getRandomNoun() {
        return nouns[generateRandomInteger(0, nouns.length - 1)];
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
        ONEOF_WORD_REGEX,

        generateRandomInteger,
        generateRandomIntegerFromString,
        generateRandomFloat,
        generateRandomFloatFromString,
        getRandomNoun,
        getOneOfWord
    });
})();
