// IIFE - does not clutter the global namespace

// TODO - write down the module's API
// TODO - write down the structure for the QUESTION OBJECT
// TODO - write down an example module called example

(function (){
    $(document).ready(function () {
        const qsel = $('#question-selection');
        const module_parent = $('#module-root-wrapper');
        const module_wrapper = $('#module-wrapper')[0];
        const gen_question = $('#generate_questions');
        const body_ref = $(document.body);

        // ============================ \\
        //  GENERATE QUESTION ON CLICK  \\
        // ============================ \\
        gen_question.click(function () {
            const els = $('.question-vitals');
            const question_counts = parseInt($('#number_of_questions').val());
            const answers_count = parseInt($('#number_of_answers').val());
            const base_question_name = $('#base_question_name').val() || 'Q';
            const questions = [];
            const file_cnt = [];
            let files = [];
            const i = 0;

            // Adding a new line after the categories
            file_cnt.push(utils.parseCategories('#category'));

            // Maximum number of tries to generate unique questions. If this number is not enough
            // A message informing the user of the situation will be shown
            const max_allowed_checks = question_counts * 10;

            function generateQuestions(i, question_generation_retries) {
                console.log('Started...');
                const q = module.generateQuestion(i + 1, answers_count, els);

                if (question_generation_retries === 0) {
                    generateFile(i, questions, file_cnt, question_generation_retries, max_allowed_checks, files);
                    return;
                }

                console.log(i, questions.length, question_counts, question_generation_retries);
                if (i > question_counts) {
                    console.log('i is greater than question_count');
                    generateFile(i, questions, file_cnt, question_generation_retries, max_allowed_checks, files);
                    return;
                }

                q.then(function (q) {
                    // This indicates that the question should not be converted to a file
                    if (q.dud) {
                        console.log('Question is a dud');
                        generateQuestions(i, --question_generation_retries);
                        return;
                    }

                    // If the question is not unique generate it again
                    if (!_isUnique(questions, q.question)) {
                        console.log('Question is not unique');
                        generateQuestions(i, --question_generation_retries);

                        return;
                    }

                    // Push the unique files to the array
                    // files = files.concat(q.files);
                    _addUnique(files, q.files);

                    const is_numeric = _areNumeric(q.answers);

                    // I don`t apply the generators here since this is the job of the module.
                    questions.push('::' + base_question_name + ' ' + (i + 1) + '::' + q.question);
                    questions.push('{' + (is_numeric ? '#' : ''));
                    questions.push(q.answers.join('\n'));
                    questions.push('}');
                    questions.push('');

                    generateQuestions(++i, question_generation_retries);
                }, function (err) {
                    console.error(err.message);
                    generateQuestions(i, --question_generation_retries);
                });
            }

            generateQuestions(0, max_allowed_checks);
        });

        // ============================ \\
        //  ON CHANGE SELECTED MODULE   \\
        // ============================ \\
        qsel.on('change', function () {
            const mod = qsel.val();
            const mod_name = $('#question-selection option:selected').text();

            module_wrapper.style.display = 'none';
            module_parent.empty();  // Clear any previous children, if any

            // If the default option was selected then don`t try to load it
            if (mod === 'default') {
                return;
            }

            // Load the selected module
            // Using this instead of ES6 imports because they are static.
            // This way is more dynamic and user friendly
            $.getScript( `js/modules/${mod}/index.js`).done(function (script, textStatus) {
                module_wrapper.style.display = 'initial';
                // On successful load init the module with it's parent
                module.init(function (el) {
                    module_parent.append(el);
                });
            }).fail(function (e, jqxhr, settings, exception) {
                const prev_el = $('#failed-loading-alert');

                if (prev_el.length) {
                    prev_el.remove();
                }

                // Alert handling code
                body_ref.append(
                    `<div id="failed-loading-alert" style="margin-top: 40px" class="row"><div class="offset-4 col-4 alert alert-warning module-failed-loading" role="alert">
                      [${jqxhr.toUpperCase()}] Скипр "${mod_name}" не успя да се зареди: "${e.statusText}"
                    </div></div>`
                );

                const alert_el = $(`#failed-loading-alert`);

                const alert_timeout_id = setTimeout(function () {
                    const fadeout_ts = 400;

                    alert_el.fadeOut(fadeout_ts, alert_el.remove.bind(alert_el));
                }, 5000);

                alert_el.on('click', function () {
                    alert_el.remove();
                    clearTimeout(alert_timeout_id);
                });
            });
        });
    });

    function generateFile(
        generated_questions,
        questions_data,
        file_cnt,
        question_retried,
        max_allowed_checks,
        files
    ) {
        if (generated_questions === 0) {
            ui.alert(
                'Няма успешно генерирани въпроси. Няма да се създаде архив.',
                'warning',
                ['Добре:primary']
            );

            return;
        }

        file_cnt.push(questions_data.join('\n'));

        if (question_retried === 0) {
            const ev = ui.alert(`Пробвах ${max_allowed_checks} пъти, но намерих само ${generated_questions} уникални въпроса. Да генерирам ли файла?`, 'warning', ['да:success', 'не:danger']);

            ev.once('alert-button-click', function handler(e) {
                const target = $(e.target);

                if (target.attr('data-name') === 'да') {
                    files.push({name: 'question.txt', data: file_cnt.join('\n')});
                    saveFile(files, _transform(module.name) + '.zip');
                }
            });
        } else {
            files.push({name: 'question.txt', data: file_cnt.join('\n')});
            saveFile(files, _transform(module.name) + '.zip');
        }
    }

    function _addUnique(current, new_arr) {
        for (let i = 0, max = new_arr.length; i < max; ++i) {
            const item = new_arr[i];
            let found = false;

            for (let j = 0, len = current.length; j < len; ++j) {
                const curr = current[j];

                if (item.name === curr.name && item.data == current.data) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                current.push(item);
            }
        }
    }

    function _areNumeric(answers_array) {
        let are_num = true;

        if (answers_array.length > 0) {
            for (let i = 0, max = answers_array.length; i < max; ++i) {
                const answ = answers_array[i];

                // We want all answers to be numeric, or we determine that the answers are not numeric
                // since it does not make sense that one of the answer is numeric and another is not
                are_num = (
                    answ.indexOf(':') > -1 ||
                    answ.indexOf('..') > -1
                ) && are_num;
            }
        } else {
            are_num = false;
        }

        return are_num;
    }

    function _isUnique(array, item) {
        for (let i = 0, max = array.length; i < max; ++i) {
            if (array[i].split('::')[2] === item) {
                return false;
            }
        }

        return true;
    }
    function _transform(name) {
        return name.toLowerCase().replace(' ', '-');
    }
    
    function compressionUpdate(obj) {
        console.log(`--> Прогрес ${obj.percent}%`);

        if (obj.currentFile) {
            console.log(`\tТекущият файл е: ${obj.currentFile}`);
        }
    }
    
    
    /**
     * @typedef ZippableData
     * @property name - the full path, relative to the beginning of the archive and name of the file
     * @property data - the data that is in the files. Supported types are "String" and "Buffer"
     */
    
    
    /**
     * Generate a .zip file from the data in the object
     * @param {ZippableData[]} data - the data to zip
     * @param {Function} cb - callback for when the zipping is completed
     */
    function generateZip(data, cb) {
        const zip = new JSZip();
        const zip_opts = {
            type : "blob",
            comment: "Генератор на въпроси за Moodle. Вижте https://github.com/tmitusis/moodle-question-generator",
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        };

        for (let i = 0, max = data.length; i < max; ++i) {
            const file = data[i];

            zip.file(file.name, file.data);
        }
    
        if (typeof cb === 'function') {
            zip.generateAsync(zip_opts, compressionUpdate).then(function (data) {
                cb(null, data);
            });
        } else {
            return zip.generateAsync(zip_opts, compressionUpdate);
        }
    }

    function saveFile(data, fname) {
        if (typeof fname !== 'string') {
            fname = 'moodle-question-bank.zip';
        }

        window.URL = window.URL || window.webkitURL;

        generateZip(data, function (err, fblob) {
            if (err) {
                alert('Създаването на архив пропадна: ' + err.message);
                return;
            }

            const a = document.createElement('a');
            a.download = fname;
            a.href = window.URL.createObjectURL(fblob);
            a.click();
        });
    }

    window.generateZip = generateZip;
    window.saveFile = saveFile;
})();
