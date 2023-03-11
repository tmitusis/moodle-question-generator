function init(appendToBody) {
    function _buildUi() {
        const el_txt = `<form class="offset-4 col-4">
            <div class="row">
                <label for="category" class="form-label">Категория</label>
                <input id="category" type="text" placeholder="/примерни/категори" class="form-control" aria-describedby="category_help">
                <div id="category_help" class="form-text">Категория в която да е въпроса.</div>
            </div>
            <div class="row">
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
            </div>
            <button id="generate_questions" type="button" class="btn btn-primary">Генерирай въпроси</button>
        </form>`
        ;

        return $(el_txt);
    }

    appendToBody(_buildUi());

    $('#generate_questions').click(function () {
        const question_template = $('#question').val();
        const regex = /{[a-яА-Я\s0-9,]+}/i;    // TODO - продължи
        const possible_words_placeholder = regex.exec(question_template)[0];
        const cleaned_question = question_template.replace(possible_words_placeholder, '%QUESTION%');
        const possible_words = possible_words_placeholder
            .replace('{', '')
            .replace('}', '')
            .split(',')
        ;
        const questions = [];

        const categories = $('#category').val().split('/').slice(1);
        const picture = $('#picture')[0].files[0];
        const file_cnt = [];
        const files = [];

        for (let i = 0, max = categories.length; i < max; ++i) {
            file_cnt.push(`$CATEGORY: $course$/${categories.slice(0, i + 1).join('/')}`);
        }

        // Adding a new line after the categories
        file_cnt.push('');

        for (let i = 0; i < possible_words.length; ++i) {
            questions.push(
                '<p>' +
                cleaned_question.replace('%QUESTION%', possible_words[i]) +
                `</p><img alt="${$('#alt_text').val() || 'Picture: ' + picture.name}" src="@@PLUGINFILE@@/${picture.name}">` +
                '\n{}'
            );
        }

        file_cnt.push(questions.join('\n\n'));

        files.push({name: 'picture-questions.txt', data: file_cnt.join('\n')});
        files.push({name: picture.name, data: (picture)});

        saveFile(files, 'picture-questions.zip');
    });
}
