var module = (function () {
    function init(appendToBody) {
        const el_txt = `<div class="row">
                <label for="question" class="form-label">Въпрос</label>
                <textarea id="question" rows="7" class="form-control" aria-describedby="question_help">
Могат да се използват различен синтаксис за генериране на произволни данни:
    - едно от: {кучето,къщата,дървото} - ще заменя този текст с един от изброените
    - в обхват: [1..5] - ще генерирам произволно цяло число между 1 и 5, включително
    - в обхват: [1.0..5.0] - ще генерирам произволно десетично число между 1.0 и 5.0, включително
    - в обхват: [1.0..5.0]@3 - ще генерирам произволно десетично число между 1.0 и 5.0, включително до уточненият брой символи(@3) след десетичната запетая. По подразбиране е 15.
    - латинска буква: [c..p]@l - ще избере произволна малка(по подразбиране) буква между изброените("c" и "p"), включително
    - латинска голяма буква: [c..p]@u - ще избере произволна главна буква между изброените("c" и "p"), включително
    - кирилска буква: [в..л]@l - ще избере произволна малка(по подразбиране) буква между изброените("в" и "л"), включително
    - кирилска голяма буква: [в..л]@u - ще избере произволна главна буква между изброените("в" и "л"), включително
    - използване на вграден речник: Използвайте (съществително) или (прилагателно) и ще избера една дума от съответният тип и ще я вмъкна там
</textarea>
                <div id="question_help" class="form-text">Въпросът към изпитваните</div>
            </div>`
        ;

        appendToBody($(el_txt));
    }

    function generateQuestion() {
        const question = $('#question').val();

        // Завърших генерирането на j-тият въпрос
        return new Promise(function (resolve, reject) {
            resolve({
                question: utils.applyGenerators(question),
                answers: [],
                files: []
            });
        })
    }

    return {
        name: 'Text question',
        init,
        generateQuestion
    }
})();
