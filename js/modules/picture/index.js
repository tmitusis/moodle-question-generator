var module = (function () {
    function init(appendToBody) {
        function _buildUi() {
            const el_txt = `<div class="row">
                <label for="picture" class="form-label">Картинка</label>
                <input id="picture" accept=".jpg,.jpeg,.png,.webp" type="file" class="form-control" aria-describedby="picture_help">
                <div id="picture_help" class="form-text">Картина, която потребителят да гледа</div>
            </div>
            <div class="row">
                <label for="alt_text" class="form-label">Алтернативен текст</label>
                <input id="alt_text" type="text" class="form-control" aria-describedby="alt_text_help">
                <div id="alt_text_help" class="form-text">Текст, който да се показва, ако картинката не може да се зареди поради някаква причина</div>
            </div>
            <div class="row">
                <label for="question" class="form-label">Въпрос</label>
                <textarea id="question" rows="7" class="form-control" aria-describedby="question_help">
Моля опишете елементите, за които да говорят студентите по следният начин: {кучето,къщата,дървото}.
                </textarea>
                <div id="question_help" class="form-text">Въпросът към изпитваните</div>
            </div>`
            ;

            return $(el_txt);
        }

        appendToBody(_buildUi());
    }

    function generateQuestion(number, answers_count) {
        const question_template = $('#question').val();
        const regex = /{[a-яА-Я\s0-9,]+}/i;
        const possible_words_placeholder = regex.exec(question_template)[0];
        const cleaned_question = question_template.replace(possible_words_placeholder, '%QUESTION%');
        const possible_words = possible_words_placeholder
            .replace('{', '')
            .replace('}', '')
            .split(',')
        ;

        const picture = $('#picture')[0].files[0];

        if (picture === undefined) {
            ui.alert('Не сте добавили изображение. Моля добавете и тогава пробвайте пак.', 'warning', ['Добре:primary']);
            return Promise.reject();
        }

        const question = `[html]<p>` +
            cleaned_question.replace(
                '%QUESTION%',
                possible_words[utils.generateRandomInteger(0, possible_words.length - 1)]
            ) +
            `</p><img alt="${$('#alt_text').val() || 'Picture: ' + picture.name}" src="@@PLUGINFILE@@/${picture.name}">` +
            '\n{}'
        ;

        return new Promise(function (resolve, reject) {
            resolve({
                question: utils.applyGenerators(question),
                answers: [],
                files: [
                    {name: picture.name, data: (picture)}
                ]
            });
        });
    }

    return {
        name: 'Picture questions',
        init,
        generateQuestion
    }
})();
