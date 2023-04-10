// Initialize the module, if needed
var module = (function () {
    function init(add_to_body) {}

    function generateQuestion(question_number, answers_count) {
        console.log(`Generating question number ${question_number}`);
        const word = utils.getRandomNoun();
        const num_docs = utils.generateRandomInteger(3, 6);
        const docs = [];
        const non_zero_docs = [];
        let has_zero = false;

        for (let i = 0; i < num_docs; ++i) {
            let df = utils.generateRandomInteger(0, 6);

            has_zero = has_zero || df === 0;

            // Only one non-null document
            if (has_zero) {
                df = utils.generateRandomInteger(1, 6);
            }

            docs.push(df);

            if (df !== 0) {
                non_zero_docs.push(df);
            }
        }

        const tf = non_zero_docs.length;
        const in_doc = non_zero_docs[utils.generateRandomInteger(0, tf - 1)];
        const tf_idf = _calculateTfIdf(tf, in_doc, num_docs);
        const correct_answer = tf_idf.toFixed(3);
        const possible_answ = [];

        // One of the answers is the correct answer. Here we generate the wrong ones
        for (let i = 0, max = answers_count - 1; i < max; ++i) {
            const answ = utils.generateRandomFloat(tf_idf/10, tf_idf*2, 3);

            // Just one correct answer per question here
            if (answ === correct_answer || answ % 1 === 0) {
                --i;
                continue;
            }

            possible_answ.push(answ);
        }

        possible_answ.splice(
            utils.generateRandomInteger(0, answers_count - 1),  // Random position
            0,                                        // Just insert the correct answer
            correct_answer                                      // The correct answer
        );

        return _generateQuestionObject(word, docs, correct_answer, possible_answ, question_number);
    }

    function _calculateTfIdf(tf, df, n) {
        console.log(`Calculating TF-IDF`);
        const idf = 1 + (df === 0 ? 0 : Math.log10(df/n));

        return tf * idf;
    }

    function _genTable(docs, word) {
        console.log(`Generating table`);
        const style =  "border: 1px solid black; padding: 2px 4px;";
        const html = [`<table style="${style}"><thead><tr>`];

        html.push(`<th style="${style}">Дума</th>`);

        for (let i = 0, max = docs.length; i < max; ++i) {
            html.push(`<th style="${style}">Документ ${i + 1}</th>`);
        }

        html.push('</tr></thead><tbody><tr>');

        html.push(`<td style="${style}">${word}</td>`);

        for (let i = 0, max = docs.length; i < max; ++i) {
            html.push(`<td style="${style}">${docs[i]}</td>`);
        }

        html.push('</tr></tbody></table>');

        return html.join('');
    }

    function _generateQuestionObject(word, docs, tf_idf, all_answers, question_number) {
        console.log(`Generating gift number ${question_number}`);
        const ret = {
            question: `[html]<p>Пресметнете TF-IDF за думата предоставена в примера:</p>\\n${_genTable(docs, word)}`,
            answers: [],
            files: []
        };

        for (let i = 0, max = all_answers.length; i < max; ++i) {
            const answ = all_answers[i];
            ret.answers.push(`\t${answ === tf_idf ? '=' : '~'} \\= ${answ}`);
        }

        return ret;
    }

    return {
        name: 'TF-IDF questions',
        init,
        generateQuestion
    }
})();
