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

    return Object.freeze({
        // Regular expresions
        INT_RANGE_REGEX,
        FLOAT_RANGE_REGEX,
        RANDOM_NOUN_REGEX,
        RANDOM_ADJECTIVE_REGEX,
        ONEOF_WORD_REGEX,

        // Data generators
        generateRandomInteger,
        generateRandomIntegerFromString,
        generateRandomFloat,
        generateRandomFloatFromString,
        getRandomNoun,
        getRandomAdjective,
        getOneOfWord,
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
        firstUp
    });
})();
