var module = (function () {
    const COMPARATORS = ['>', '<'];
    const OPERATORS = ['||', '&&'];
    const MAP = {
        'true': 'труе',
        'false': 'фалсе'
    };

    function init(appendToBody) {
        const el_txt = `<div class="row">
            <label for="bool-operations" class="form-label">Брой булеви операции("exp || exp" е една)</label>
            <input id="bool-operations" type="number" min="1" value="1" class="form-control" aria-describedby="bool-help">
            <div id="bool-help" class="form-text">Колко булеви операции да се генерират. Формата е "exp &&/|| exp" и могат да се генерират 2 + броя операции уникални въпроси.</div>
        </div>`
        ;

        appendToBody($(el_txt));
    }

    function _generateOperation(bool_opers) {
        const opers = [`1 ${utils.getRandomElement(COMPARATORS)} 2`];
        var count = 3;

        for (let i = 0; i < bool_opers; ++i) {
            opers.push(utils.getRandomElement(OPERATORS));
            opers.push(`${count++} ${utils.getRandomElement(COMPARATORS)} ${count++}`);
        }

        return opers.join(' ');
    }

    function generateQuestion(number, answers_count) {
        const COUNT_BOOLEAN_OPERATORS = parseInt($('#bool-operations').val());
        const operation = _generateOperation(COUNT_BOOLEAN_OPERATORS);
        const question = `[html]<p>Какво ще се изведе в конзолата след изпълнениято на тази команда на JS:</p><p>console.log(${operation});</p><p>Въведете само едно число или една дума.</p>`;
        const evaled_operation = eval(operation).toString();

        return new Promise(function (resolve, reject) {
            resolve({
                question: utils.applyGenerators(question),
                answers: [
                    `=${evaled_operation}`,
                    `=${MAP[evaled_operation]}`
                ],
                files: [],
                dud: false
            });
        });
    }

    return {
        name: 'Boolean checks',
        init,
        generateQuestion
    }
})();
