// Initialize the module, if needed
function init(appendToBody) {
    const el_txt = `<form class="offset-4 col-4">
            <div class="row">
                <label for="category" class="form-label">Категория</label>
                <input id="category" type="text" placeholder="/примерни/категории/" class="form-control" aria-describedby="category_help">
                <div id="category_help" class="form-text">Категория в която да е въпроса.</div>
            </div>
            <div class="row">
                <label for="number_of_answers" class="form-label">Брой отговори</label>
                <input id="number_of_answers" type="number" class="form-control" aria-describedby="number_of_answers_help">
                <div id="number_of_answers_help" class="form-text">Колко отговора искате да има всеки въпрос</div>
            </div>
            <div class="row">
                <label for="number_of_questions" class="form-label">Брой въпроси</label>
                <input id="number_of_questions" type="number" class="form-control" aria-describedby="number_of_questions_help">
                <div id="number_of_questions_help" class="form-text">Колко въпроси искате да има</div>
            </div>
            <button id="generate-tf-idf" type="button" class="btn btn-primary">Генерирай въпроси</button>
        </form>`
    ;

    appendToBody($(el_txt));

    function calculateTfIdf(tf, df, n) {
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

    function generateGift(word, docs, tf_idf, all_answers, question_number) {
        console.log(`Generating gift number ${question_number}`);
        const question = `::Q${question_number}::[html]<p>Пресметнете TF-IDF за думата предоставена в примера:</p>\n${_genTable(docs, word)} {`;
        const ret = [];

        ret.push(question);

        for (let i = 0, max = all_answers.length; i < max; ++i) {
            const answ = all_answers[i];
            console.log(`${answ} | ${tf_idf}: ${answ === tf_idf ? '=' : '~'}`)
            ret.push(`\t${answ === tf_idf ? '=' : '~'} \\= ${answ}`);
        }

        ret.push('}');

        return ret.join('\n');
    }

    function generateQuestion(question_number) {
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

        const answers_count = parseInt($('#number_of_answers').val());
        const tf = non_zero_docs.length;
        const in_doc = non_zero_docs[utils.generateRandomInteger(0, tf - 1)];
        const tf_idf = calculateTfIdf(tf, in_doc, num_docs);
        const correct_answer = tf_idf.toFixed(3);
        const possible_answ = [];

        // One of the answers is the correct answer. Here we generate the wrong ones
        for (let i = 0, max = answers_count - 1; i < max; ++i) {
            const answ = utils.generateRandomFloat(tf_idf/10, tf_idf*2).toFixed(3);

            // Just one correct answer per question here
            if (answ === correct_answer) {
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

        return generateGift(word, docs, correct_answer, possible_answ, question_number);
    }

    $('#generate-tf-idf').click(function () {
        const question_counts = parseInt($('#number_of_questions').val());
        const questions = [];

        const categories = $('#category').val().split('/').slice(1);

        const file_cnt = [];
        for (let i = 0, max = categories.length; i < max; ++i) {
            file_cnt.push(`$CATEGORY: $course$/${categories.slice(0, i + 1).join('/')}`);
        }

        // Adding a new line after the categories
        file_cnt.push('');

        for (let i = 0; i < question_counts; ++i) {
            questions.push(generateQuestion(i + 1));
        }

        file_cnt.push(questions.join('\n\n'));

        // TODO - figure out the question filename
        saveFile([{name: 'tf-idf-questions.txt', data: file_cnt.join('\n')}], 'tf-idf-questions.zip');
    });
}
