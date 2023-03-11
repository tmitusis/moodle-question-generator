// IIFE - does not clutter the global namespace
(function (){
    var last_el = null;

    $(document).ready(function () {
        const el = $('#question-selection');
        const body_ref = $(document.body);
        
        el.on('change', function () {
            const mod = el.val();
            const mod_name = $('#question-selection option:selected').text();

            // Remove all the previously loaded modules
            $('script.module').remove();

            // Remove the previous module body, if any
            if (last_el !== null) {
                $(last_el).remove();
            }

            // If the default option was selected then don`t try to load it
            if (mod === 'default') {
                return;
            }

            // Load the selected module
            // Using this instead of ES6 imports because they are static.
            // This way is more dynamic and user friendly
            $.getScript( `js/modules/${mod}/index.js`).done(function (script, textStatus) {
                // On successful load init the module with it's parent
                init(function (el) {
                    $('#module-root-wrapper').append(el);
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
    
    
    function _compressionUpdate(obj) {
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
            zip.generateAsync(zip_opts, _compressionUpdate).then(function (data) {
                cb(null, data);
            });
        } else {
            return zip.generateAsync(zip_opts, _compressionUpdate);
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
