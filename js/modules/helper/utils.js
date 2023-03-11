const utils = (function () {
    /**
     * @desc Генерира произволно цяло число в обхват, включително
     * @param {Number} from - начало на обхвата
     * @param {Number} to - край на обхвата
     * @returns {number} - генерираното число
     */
    function generateRandomInteger(from, to) {
        return Math.round(
            (Math.random() * (to - from)) + from
        );
    }

    const INT_RANGE_REGEX = /\[-?\d+\.\.-?\d+\]/gi;

    /**
     * @desc Генерира произволно число, като приема текст, описващ обхвата
     * @param {String} str - текст, описващ обхвата. пр: [1..4].
     * @returns {number} - генерираното число
     */
    function generateRandomIntegerFromString(str) {
        const range = str.replace(/[\[\]]/g, '').split('..')
        return generateRandomInteger(parseInt(range[0]), parseInt(range[1]));
    }

    /**
     * @desc Генерира произволно десетично число, в даден обхват, с дадени брой цифри след десетичната запетая
     * @param {Number} from - начало на обхвата, десетично число
     * @param {Number} to - край на обхвата, десетично число
     * @param {Number} digits - брой цифри след десетичната запетая, цяло число
     * @returns {number} - генерираното число
     */
    function generateRandomFloat(from, to, digits) {
        return parseFloat(((Math.random() * (to - from)) + from).toFixed(digits));
    }

    const FLOAT_RANGE_REGEX = /\[-?(\d+(\.\d+))\.\.-?(\d+(\.\d+))\](@\d+)?/gi;
    /**
     * @desc Генерира произволно десетично число, като приема текст, описващ обхвата
     * @param {String} str - текст, описващ обхвата и точността. пр: [1.0..4.5]@3.
     * @returns {number} - генерираното число
     */
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

    /**
     * @desc Връща произволна дума от глобалният речник със съществителни "nouns"
     * @returns {String} - дсадената дума
     */
    function getRandomNoun() {
        return nouns[generateRandomInteger(0, nouns.length - 1)];
    }

    const RANDOM_ADJECTIVE_REGEX = /\(прилагателно\)/gi;
    /**
     * @desc Връща произволна дума от глобалният речник със прилагателни "adjectives"
     * @returns {String} - дсадената дума
     */
    function getRandomAdjective() {
        return adjectives[generateRandomInteger(0, adjectives.length - 1)];
    }

    const ONEOF_WORD_REGEX = /{([а-я]*[a-z]*)(,[а-я]*[a-z]*)*}/gi;

    /**
     * @desc Избира една от изброените думи и я връща
     * @param {String} str - изброените думи. пр: {куче,котка,къща}
     * @returns {String} - една от горе-изброените думи
     */
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
