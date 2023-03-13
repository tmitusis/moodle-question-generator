function init(appendToBody) {
    const el_txt = `<form>
            <div class="row">
                <label for="category" class="form-label">Категория</label>
                <input id="category" type="text" placeholder="/примерни/категории" class="form-control" aria-describedby="category_help">
                <div id="category_help" class="form-text">Категория в която да е въпроса.</div>
            </div>
            <div class="row">
                <label for="number_of_questions" class="form-label">Брой въпроси</label>
                <input id="number_of_questions" type="number" class="form-control" aria-describedby="number_of_questions_help">
                <div id="number_of_questions_help" class="form-text">Колко въпроси искате да има</div>
            </div>
            <div class="row">
                <label for="question" class="form-label">Въпрос</label>
                <textarea id="question" rows="7" class="form-control" aria-describedby="question_help">
Могат да се използват различен синтаксис за генериране на произволни данни:
    - едно от: {кучето,къщата,дървото} - ще заменя този текст с един от изброените
    - в обхват: [1..5] - ще генерирам произволно цяло число между 1 и 5, включително
    - в обхват: [1.0..5.0] - ще генерирам произволно десетично число между 1.0 и 5.0, включително
    - в обхват: [1.0..5.0]@3 - ще генерирам произволно десетично число между 1.0 и 5.0, включително до уточненият брой символи(@3) след десетичната запетая. По подразбиране е 15.
    - използване на вграден речник: Използвайте (съществително) или (прилагателно) и ще избера една дума от съответният тип и ще я вмъкна там
</textarea>
                <div id="question_help" class="form-text">Въпросът към изпитваните</div>
            </div>
            <button id="generate_questions" type="button" class="btn btn-primary">Генерирай въпроси</button>
        </form>`
    ;

    appendToBody($(el_txt));

    $('#generate_questions').click(function () {
        var question = $('#question').val();

        const int_range = question.match(utils.INT_RANGE_REGEX) || [];
        const float_range = question.match(utils.FLOAT_RANGE_REGEX) || [];
        const words = question.match(utils.ONEOF_WORD_REGEX) || [];
        const nouns_match = question.match(utils.RANDOM_NOUN_REGEX) || [];
        const adjectives_match = question.match(utils.RANDOM_ADJECTIVE_REGEX) || [];

        const q_num = parseInt($('#number_of_questions').val());

        const fcont = [utils.parseCategories('#category'), ''];

        for (let j = 0; j < q_num; ++j) {
            let curr_q = question;

            // Заменя макрото за конкретни думи, колкото и пъти да го има
            for (let i = 0, max = words.length; i < max; ++i) {
                const MACRO = words[i];

                curr_q = curr_q.replace(
                    MACRO,
                    utils.getOneOfWord(MACRO)
                );
            }

            // Заменя макрото за произволни цифри в обхват с произволно цяло число в този обхват
            for (let i = 0, max = int_range.length; i < max; ++i) {
                const MACRO = int_range[i];

                curr_q = curr_q.replace(
                    MACRO,
                    utils.generateRandomIntegerFromString(MACRO)
                );
            }

            // Заменя макрото за произволни цифри в обхват с произволно десетично число в този обхват
            for (let i = 0, max = float_range.length; i < max; ++i) {
                const MACRO = float_range[i];

                curr_q = curr_q.replace(
                    MACRO,
                    utils.generateRandomFloatFromString(MACRO)
                );
            }

            // Заменя макрото за случайно съществително с дума
            for (let i = 0, max = nouns_match.length; i < max; ++i) {
                const MACRO = nouns_match[i];

                curr_q = curr_q.replace(
                    MACRO,
                    utils.getRandomNoun()
                );
            }

            // Заменя макрото за произволно прилагателно с дума
            for (let i = 0, max = adjectives_match.length; i < max; ++i) {
                const MACRO = adjectives_match[i];

                curr_q = curr_q.replace(
                    MACRO,
                    utils.getRandomAdjective()
                );
            }

            // Завърших генерирането на j-тият въпрос
            fcont.push(`::Q${j+1}::${curr_q} {}\n`);
        }

        saveFile(
            [{name: 'text-question.txt', data: fcont.join('\n')}],
            'text-questions.zip'
        );
    });
}
