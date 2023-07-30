const utils = (function () {
    function Events() {
        this.__events = {};
    }

    Events.prototype.on = function on(event, handler) {
        const events = this.__events;

        events[event] = events[event] || [];
        events[event].push(handler);
    }

    Events.prototype.once = function once(event, handler) {
        const events = this.__events;
        const _this = this;

        events[event] = events[event] || [];
        events[event].push(function _handler (data) {
            _this.off(event, _handler);
            // Whatever the
            handler(data);
        });
    }

    Events.prototype.off = function off(event, handler) {
        const handlers = this.__events[event] || [];

        for (let i = 0, max = handlers.length; i < max; ++i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    }

    Events.prototype.emit = function emit(event, data) {
        const handlers = this.__events[event] || [];

        for (let i = 0, max = handlers.length; i < max; ++i) {
            const handler = handlers[i];

            if (typeof handler === 'function') {
                handler(data);
            } else {
                console.error(`Bad handler: ${event}:${handler}`);
            }
        }
    }

    const EVENTS = {};
    /**
     * @desc Взима произволен елемент от масива
     * @param {Array} array - масива от който да вземе елемент
     * @returns {*} - произволният елемент
     */
    function getRandomElement(array) {
        return array[generateRandomInteger(0, array.length - 1)];
    }

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

    const LETTERS_LATIN_RANGE_REGEX = /\[([a-z]+)\.\.([a-z])\](@[ul]+)?/gi;
    const LETTERS_LATIN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    /**
     * @desc Взима произволна латинска буква в обхвата и я връща
     * @param {String} from - буквата, от която да започнем. По подразбиране "a"
     * @param {String} to - буквата, до която да продължим. По подразбиране "z"
     @param {String} str_case - дали да върне малка(l) или голяма('u')
     * @returns {String} - една от горе-изброените букви
     */
    function getLatinLetter(from = 'a', to = 'z', str_case = 'l') {
        var char =  getRandomElement(
            LETTERS_LATIN.slice(
                LETTERS_LATIN.indexOf(from),
                LETTERS_LATIN.indexOf(to) + 1
            )
        );

        if (str_case === 'u') {
            char = char.toUpperCase();
        }

        return char;
    }

    /**
     * @desc Генерира произволна буква в обхвата и голяма/малка
     * @param {String} str - текст, описващ обхвата и дали да е голяма(u) или малка(l). пр: [a..c]@u.
     * @returns {String} - избраната главна/малка буква
     */
    function getLatinLetterFromString(str) {
        str = str.replace(/[\[\]]/g, '');
        const at_idx = str.indexOf('@');
        const range = str
            .substring(0, at_idx === -1 ? str.length : at_idx)
            .split('..')
        ;
        let str_case = 'l';

        if (at_idx !== -1) {
            str_case = str.substring(at_idx + 1, str.length);
        }

        return getLatinLetter(range[0], range[1], str_case);
    }

    const LETTERS_CYRILLIC_RANGE_REGEX = /\[([а-я]+)\.\.([а-я]+)\](@[ul]+)?/gi;
    const LETTERS_CYRILLIC = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'ю', 'я'];
    /**
     * @desc Взима произволна кирилска буква в обхвата и я връща
     * @param {String} from - буквата, от която да започнем. По подразбиране "а"
     * @param {String} to - буквата, до която да продължим. По подразбиране "я"
     * @param {String} str_case - дали да върне малка(l) или голяма('u')
     * @returns {String} - една от горе-изброените букви
     */
    function getCyrillicLetter(from = 'а', to = 'я', str_case = 'l') {
        var char = getRandomElement(
            LETTERS_CYRILLIC.slice(
                LETTERS_CYRILLIC.indexOf(from),
                LETTERS_CYRILLIC.indexOf(to) + 1
            )
        );

        if (str_case === 'u') {
            char = char.toUpperCase();
        }

        return char;
    }

    /**
     * @desc Генерира произволна буква в обхвата и голяма/малка
     * @param {String} str - текст, описващ обхвата и дали да е голяма(u) или малка(l). пр: [в..ж]@u.
     * @returns {String} - избраната главна/малка буква
     */
    function getCyrillicLetterFromString(str) {
        str = str.replace(/[\[\]]/g, '');
        const at_idx = str.indexOf('@');
        const range = str
            .substring(0, at_idx === -1 ? str.length : at_idx)
            .split('..')
        ;
        let str_case = 'l';

        if (at_idx !== -1) {
            str_case = str.substring(at_idx + 1, str.length);
        }

        return getCyrillicLetter(range[0], range[1], str_case);
    }

    /**
     * @desc Парсва <input>, който съдържа описаните
     * @param {*} selector - нещо, по което може да се индентифицира <input> елемента. Подава се на $()
     * @returns {string} - категориите направени в GIFT формат
     */
    function parseCategories(selector) {
        const categories = $(selector).val().split('/').slice(1);
        const cnt = [];

        cnt.push('');
        for (let i = 0, max = categories.length; i < max; ++i) {
            cnt.push(`$CATEGORY: $course$/${categories.slice(0, i + 1).join('/')}`);
            cnt.push('');
        }

        return cnt.join('\n');
    }

    function applyGenerators(text) {
        const words = text.match(utils.ONEOF_WORD_REGEX) || [];
        const int_range = text.match(utils.INT_RANGE_REGEX) || [];
        const float_range = text.match(utils.FLOAT_RANGE_REGEX) || [];
        const nouns_match = text.match(utils.RANDOM_NOUN_REGEX) || [];
        const adjectives_match = text.match(utils.RANDOM_ADJECTIVE_REGEX) || [];
        const latin_letter_match = text.match(utils.LETTERS_LATIN_RANGE_REGEX) || [];
        const cyrillic_letter_match = text.match(utils.LETTERS_CYRILLIC_RANGE_REGEX) || [];

        // Заменя макрото за конкретни думи, колкото и пъти да го има
        for (let i = 0, max = words.length; i < max; ++i) {
            const MACRO = words[i];

            text = text.replace(
                MACRO,
                utils.getOneOfWord(MACRO)
            );
        }

        // Заменя макрото за произволни цифри в обхват с произволно цяло число в този обхват
        for (let i = 0, max = int_range.length; i < max; ++i) {
            const MACRO = int_range[i];

            text = text.replace(
                MACRO,
                utils.generateRandomIntegerFromString(MACRO)
            );
        }

        // Заменя макрото за произволни цифри в обхват с произволно десетично число в този обхват
        for (let i = 0, max = float_range.length; i < max; ++i) {
            const MACRO = float_range[i];

            text = text.replace(
                MACRO,
                utils.generateRandomFloatFromString(MACRO)
            );
        }

        // Заменя макрото за случайно съществително с дума
        for (let i = 0, max = nouns_match.length; i < max; ++i) {
            const MACRO = nouns_match[i];

            text = text.replace(
                MACRO,
                utils.getRandomNoun()
            );
        }

        // Заменя макрото за произволно прилагателно с дума
        for (let i = 0, max = adjectives_match.length; i < max; ++i) {
            const MACRO = adjectives_match[i];

            text = text.replace(
                MACRO,
                utils.getRandomAdjective()
            );
        }

        // Заменя макрото за произволната буква с такава
        for (let i = 0, max = latin_letter_match.length; i < max; ++i) {
            const MACRO = latin_letter_match[i];

            text = text.replace(
                MACRO,
                utils.getLatinLetterFromString(MACRO)
            );
        }

        // Заменя макрото за произволната буква с такава
        for (let i = 0, max = cyrillic_letter_match.length; i < max; ++i) {
            const MACRO = cyrillic_letter_match[i];

            text = text.replace(
                MACRO,
                utils.getCyrillicLetterFromString(MACRO)
            );
        }

        return text;
    }

    function on(event, handler) {
        EVENTS[event] = EVENTS[event] || [];
        EVENTS[event].push(handler);
    }

    function once(event, handler) {
        const _this = this;

        EVENTS[event] = EVENTS[event] || [];
        EVENTS[event].push(function _handler (data) {
            _this.off(event, _handler);
            // Whatever the
            handler(data);
        });
    }

    function off(event, handler) {
        const handlers = EVENTS[event] || [];

        for (let i = 0, max = handlers.length; i < max; ++i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
                break;
            }
        }
    }

    function emit(event, data, _this) {
        const handlers = this.__events[event] || [];

        for (let i = 0, max = handlers.length; i < max; ++i) {
            const handler = handlers[i];

            if (typeof handler === 'function') {
                handler(data);
            } else {
                console.log(`Bad handler: ${event}:${handler}`);
            }
        }
    }

    function firstUp(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    // Code gotten from here:
    // https://stackoverflow.com/a/12300351
    function dataURItoBlob(dataURI) {
        const split = dataURI.split(',');
        const byteString = atob(split[1]);

        // separate out the mime component
        const mimeString = split[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        const ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], {type: mimeString});
    }

    return Object.freeze({
        // Regular expresions
        INT_RANGE_REGEX,
        FLOAT_RANGE_REGEX,
        RANDOM_NOUN_REGEX,
        RANDOM_ADJECTIVE_REGEX,
        ONEOF_WORD_REGEX,
        LETTERS_LATIN_RANGE_REGEX,
        LETTERS_CYRILLIC_RANGE_REGEX,

        // Data generators
        getRandomElement,
        generateRandomInteger,
        generateRandomIntegerFromString,
        generateRandomFloat,
        generateRandomFloatFromString,
        getRandomNoun,
        getRandomAdjective,
        getOneOfWord,
        getLatinLetter,
        getLatinLetterFromString,
        getCyrillicLetter,
        getCyrillicLetterFromString,
        applyGenerators,

        // Parsers
        parseCategories,

        // Events
        Events,
        on,
        once,
        off,
        emit,

        // Misc
        firstUp,
        dataURItoBlob
    });
})();
