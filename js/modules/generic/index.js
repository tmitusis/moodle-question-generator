function init(appendToBody) {
    const el_txt = `<form id="generic-generator-form-element">
            <div class="row">
                <label for="category" class="form-label">Категория</label>
                <input id="category" type="text" placeholder="/примерни/категори" class="form-control" aria-describedby="category_help">
                <div id="category_help" class="form-text">Категория в която да е въпроса.</div>
            </div>
            <div style="margin-top: 20px" class="row">
                <div class="offset-3 col-6 no-padding">
                    <select id="import-type" class="form-select" aria-label="Select script import type">
                        <option value="functions" selected>Отделни функции</option>
                        <option value="files">Отделни файлове</option>
                        <option value="file">Три функции в един файл</option>
                    </select>
                </div>
            <div class="row">
                <label for="txtarea-question-generator-function" class="form-label">Генератор на въпрос</label>
                <textarea id="txtarea-question-generator-function" rows="7" class="form-control" aria-describedby="txtarea-question-generator-function-help"></textarea>
                <div id="txtarea-question-generator-function-help" class="form-text">Въпросът към изпитваните</div>
            </div>
            <!-- TODO - make this import question generator -->
            <div class="row">
                <label for="input-question-generator-function" class="form-label">Импорт на функция за генериарне на въпрос</label>
                <input id="input-question-generator-function" accept=".js" type="file" class="form-control" aria-describedby="input-question-generator-function-help">
                <div id="input-question-generator-function-help" class="form-text">Картина, която потребителят да гледа</div>
            </div>
            <div class="row">
                <label for="question" class="form-label">Въпрос</label>
                <textarea id="question" rows="7" class="form-control" aria-describedby="question_help">
Моля опишете елементите, за които да говорят студентите по следният начин: {кучето,къщата,дървото}.
                </textarea>
                <div id="question_help" class="form-text">Въпросът към изпитваните</div>
            </div>
            <div class="row">
                <label for="picture" class="form-label">Картинка</label>
                <input id="picture" accept=".jpg,.jpeg,.png,.webp" type="file" class="form-control" aria-describedby="picture_help">
                <div id="picture_help" class="form-text">Картина, която потребителят да гледа</div>
            </div>
            <div class="row">
                <label for="question" class="form-label">Въпрос</label>
                <textarea id="question" rows="7" class="form-control" aria-describedby="question_help">
Моля опишете елементите, за които да говорят студентите по следният начин: {кучето,къщата,дървото}.
                </textarea>
                <div id="question_help" class="form-text">Въпросът към изпитваните</div>
            </div>
            <div class="row">
                <label for="picture" class="form-label">Картинка</label>
                <input id="picture" accept=".js" type="file" class="form-control" aria-describedby="picture_help">
                <div id="picture_help" class="form-text">Картина, която потребителят да гледа</div>
            </div>
            <button id="generate_questions" type="button" class="btn btn-primary">Генерирай въпроси</button>
        </form>`
    ;

    appendToBody(el_txt);
}
