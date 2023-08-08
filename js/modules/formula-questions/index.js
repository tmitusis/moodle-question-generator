var module = (function () {
    const MATH_FUNCTIONS = ['cos', 'sin', 'tg', 'ctg', 'arccos', 'arcsin', 'arctg', 'arcctg'];

    const FORMULA_GENERATORS = [
        function () {
            const RANDOM_INT = utils.generateRandomInteger(0, 9);
            const RANDOM_CHAR1 = utils.getLatinLetter('a', 'z', 'u');
            var RANDOM_CHAR2 = utils.getLatinLetter('a', 'z', 'u');

            while (RANDOM_CHAR2 === RANDOM_CHAR1) {
                RANDOM_CHAR2 = utils.getLatinLetter('a', 'z', 'u');
            }

            return `ако log<sub>${RANDOM_INT}</sub>${RANDOM_CHAR1}=${RANDOM_CHAR2}, то ${RANDOM_INT}<sup>${RANDOM_CHAR2}</sup> = ${RANDOM_CHAR1}`;
        },

        function () {
            const RANDOM_CHAR1 = utils.getLatinLetter('a', 'z');
            var RANDOM_CHAR2 = utils.getLatinLetter('a', 'z');

            while (RANDOM_CHAR2 === RANDOM_CHAR1) {
                RANDOM_CHAR2 = utils.getLatinLetter('a', 'z');
            }

            return `(${RANDOM_CHAR1} + ${RANDOM_CHAR2})<sup>2</sup> = ${RANDOM_CHAR1}<sup>2</sup> + 2${RANDOM_CHAR1}${RANDOM_CHAR2} + ${RANDOM_CHAR2}<sup>2</sup>`;
        },

        function () {
            const RANDOM_CHAR1 = utils.getLatinLetter('a', 'z');
            var RANDOM_CHAR2 = utils.getLatinLetter('a', 'z');

            while (RANDOM_CHAR2 === RANDOM_CHAR1) {
                RANDOM_CHAR2 = utils.getLatinLetter('a', 'z');
            }

            return `(${RANDOM_CHAR1} + ${RANDOM_CHAR2})<sup>3</sup> = ${RANDOM_CHAR1}<sup>3</sup> + 3${RANDOM_CHAR1}<sup>2</sup>${RANDOM_CHAR2} + 3${RANDOM_CHAR1}${RANDOM_CHAR2}<sup>2</sup> + ${RANDOM_CHAR2}<sup>3</sup>`;
        },

        function () {
            return `${utils.getLatinLetter('a', 'z')}<sup>2</sup> + ${utils.getLatinLetter('a', 'z')}<sup>2</sup> = ${utils.getLatinLetter('a', 'z')}<sup>2</sup>`;
        },

        function () {
            const UP_TO = utils.generateRandomInteger(2, 5);
            const RANDOM_CHAR1 = utils.getLatinLetter();
            var RANDOM_CHAR2 = utils.getLatinLetter();
            const ARR = [`${RANDOM_CHAR2}<sub>${RANDOM_CHAR1}</sub>`];

            while (RANDOM_CHAR2 === RANDOM_CHAR1) {
                RANDOM_CHAR2 = utils.getLatinLetter();
            }

            for (let i = 1; i < UP_TO; ++i) {
                ARR.push(`${RANDOM_CHAR2}<sub>${RANDOM_CHAR1} + ${i}</sub>`);
            }

            return `${RANDOM_CHAR2}<sub>${RANDOM_CHAR1}</sub> = ${ARR.reverse().join(' + ')}`;
        }
    ];

    function init(appendToBody) {
        const el_txt = `<div class="row">
            <label for="formula-text" class="form-label">Текст</label>
            <input id="formula-text" type="text" class="form-control" aria-describedby="formula-text-help" value="Въведете HTML код, който генерира следната формула, без използване на CSS или JS.">
            <div id="formula-text-help" class="form-text">Текст, който ще се визуализира над формулата.</div>
        </div>
        <span style="padding: 2px 4px 2px" id="html-elements-wrapper"></span>`;

        appendToBody($(el_txt));
    }

    function generateQuestion(number, answers_count) {
        const title = $('#formula-text').val();
        const formula = utils.getRandomElement(FORMULA_GENERATORS)();
        const formula_cnt = $('#html-elements-wrapper');

        formula_cnt.append(formula);

        return new Promise(function (resolve, reject) {
            html2canvas(document.getElementById('html-elements-wrapper'))
                .then(canvas => {
                    const img_name = `question-${number}.png`;
                    const data_url = canvas.toDataURL('image/png');
                    const q_txt = `${title}<br><img alt="Picture not loaded." src="@@PLUGINFILE@@/${img_name}">`

                    formula_cnt.empty();

                    resolve({
                        question: `[html] ${utils.applyGenerators(q_txt)}`,
                        answers: [`=${formula.replaceAll('=', '\\=')}`],
                        files: [{
                            name: img_name,
                            data: utils.dataURItoBlob(data_url)
                        }],
                        dud: false
                    });
                })
        });
    }

    return {
        name: 'Formula questions',
        init,
        generateQuestion
    }
})();
