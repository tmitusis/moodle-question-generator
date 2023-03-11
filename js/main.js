// IIFE - does not clutter the global namespace
const to_export = (function (){
    var last_el = null;

    const nouns = [
        'абаджия',
        'абажур',
        'абанос',
        'абат',
        'абдал',
        'абдуктор',
        'абзац',
        'абисинец',
        'абитуриент',
        'аблаут',
        'аболиционизъм',
        'абонамент',
        'абонат',
        'абордаж',
        'абориген',
        'аборт',
        'абразив',
        'абсент',
        'абсолвент',
        'абсолют',
        'абсолютизъм',
        'абсорбент',
        'абсорбер',
        'абстракционист',
        'абсурд',
        'абсцес',
        'авангард',
        'аванс',
        'авантаджия',
        'авантаж',
        'авантюрист',
        'авджия',
        'авиатор',
        'авиодиспечер',
        'авиомодел',
        'авиомотор',
        'авоар',
        'австралопитек',
        'автобус',
        'автогараж',
        'автограф',
        'автозавод',
        'автоклав',
        'автократ',
        'автомат',
        'автомобил',
        'автомонтьор',
        'автопилот',
        'автопортрет',
        'автор',
        'авторемонт',
        'авторитет',
        'автохтон',
        'ага',
        'агент',
        'агитатор',
        'агитпропчик',
        'агнец',
        'агрегат',
        'агресор',
        'агроном',
        'ад',
        'адаптер',
        'адвокат',
        'адепт',
        'адет',
        'аджамия',
        'администратор',
        'адмирал',
        'адреналин',
        'адрес',
        'адресант',
        'адресат',
        'аеродрум',
        'аероплан',
        'аеротранспорт',
        'ажур',
        'азбест',
        'азиатец',
        'азимут',
        'азот',
        'айгър',
        'айляк',
        'айрян',
        'академизъм',
        'академик',
        'акваланг',
        'аквариум',
        'акомпанимент',
        'акорд',
        'акордеон',
        'акран',
        'акредитив',
        'акробат',
        'акропол',
        'аксесоар',
        'акт',
        'актив',
        'активист',
        'актьор',
        'акумулатор',
        'акцент',
        'акцидент',
        'акциз',
        'акционер',
        'акъл',
        'алабаш',
        'албатрос',
        'албинос',
        'албумин',
        'алдехид',
        'алигатор',
        'алкохол',
        'алкохолизъм',
        'алкохолик',
        'Аллах',
        'алманах',
        'алпинеум',
        'алпинизъм',
        'алпинист',
        'алтруизъм',
        'алтруист',
        'алуминий',
        'алхимик',
        'аматьор',
        'амбалаж',
        'амбреаж',
        'аметист',
        'амоний',
        'амоняк',
        'амортизатор',
        'ампер',
        'амперметър',
        'амулет',
        'амфет',
        'анализ',
        'аналог',
        'ананас',
        'анархизъм',
        'анасон',
        'анахронизъм',
        'ангажимент',
        'ангел',
        'анекдот',
        'анонс',
        'ансамбъл',
        'антагонист',
        'антиквар',
        'антипод',
        'антисемитизъм',
        'антихрист',
        'антракс',
        'антракт',
        'антрацит',
        'антураж',
        'анус',
        'анцуг',
        'анюитет',
        'аорист',
        'апарат',
        'апартамент',
        'апатит',
        'апаш',
        'апел',
        'аперитив',
        'апетит',
        'аплет',
        'апломб',
        'апогей',
        'апокалипсис',
        'апологет',
        'апорт',
        'апостол',
        'апостроф',
        'апотеоз',
        'аптекар',
        'арабаджия',
        'аралък',
        'арапин',
        'арбалет',
        'арбитраж',
        'арбитър',
        'аргатин',
        'аргумент',
        'арест',
        'арестант',
        'аристократ',
        'аркадаш',
        'армаган',
        'арнаутин',
        'аромат',
        'арсен',
        'арсенал',
        'артикул',
        'артист',
        'артък',
        'архаизъм',
        'архангел',
        'архивар',
        'архиватор',
        'възхищение',
        'съвет',
        'въздух',
        'гняв',
        'очакване',
        'помощ',
        'осъзнаване',
        'бекон',
        'багаж',
        'кръв',
        'смелост',
        'шах',
        'глина',
        'облекло',
        'въглища',
        'съгласие',
        'разбиране',
        'объркване',
        'съзнание',
        'сметана',
        'тъмнина',
        'усърдие',
        'прах',
        'образование',
        'съпричастие',
        'ентусиазъм',
        'завист',
        'равенство',
        'оборудване',
        'доказателства',
        'обратна връзка',
        'фитнес',
        'ласкателство',
        'шума',
        'шега',
        'мебели',
        'боклук',
        'злато',
        'клюка',
        'граматика',
        'благодарност',
        'дребен чакъл',
        'вина',
        'щастие',
        'железария',
        'омразата',
        'сено',
        'здраве',
        'топлина',
        'помогне',
        'колебание',
        'домашна работа',
        'честност',
        'чест/чест',
        'гостоприемство',
        'враждебност',
        'човечество',
        'смирение',
        'лед',
        'безсмъртие',
        'независимост',
        'информация',
        'интегритет',
        'сплашване',
        'жаргон',
        'ревност',
        'бижута',
        'правосъдие',
        'знание',
        'грамотност',
        'логика',
        'късмет',
        'дървен материал',
        'багаж',
        'поща',
        'управление',
        'стока',
        'мляко',
        'дух',
        'кал',
        'музика',
        'глупости',
        'потисничество',
        'оптимизъм',
        'кислород',
        'участие',
        'заплащане',
        'мир',
        'постоянство',
        'песимизъм',
        'пневмония',
        'поезия',
        'полиция',
        'гордост',
        'поверителност',
        'пропаганда',
        'обществен',
        'пунктуация',
        'възстановяване',
        'ориз',
        'ръжда',
        'удовлетворение',
        'срам',
        'овца',
        'жаргон',
        'софтуер',
        'спагети',
        'сила',
        'глад',
        'пара',
        'стомана',
        'материя',
        'поддържа',
        'пот',
        'гръм',
        'дървен материал',
        'трудя се',
        'трафик',
        'обучение',
        'боклук',
        'разбиране',
        'доблест',
        'жар',
        'насилие',
        'топлина',
        'отпадъци',
        'метеорологично време',
        'пшеница',
        'мъдрост',
        'работа'
    ];

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

    function generateRandomInteger(from, to) {
        return Math.round(
            (Math.random() * (to - from)) + from
        );
    }

    const INT_RANGE_REGEX = /\[-?\d+\.\.-?\d+\]/gi;
    function generateRandomIntegerFromString(str) {
        const range = str.replace(/[\[\]]/g, '').split('..')
        return generateRandomInteger(parseInt(range[0]), parseInt(range[1]));
    }

    function generateRandomFloat(from, to) {
        return (Math.random() * (to - from)) + from;
    }

    const FLOAT_RANGE_REGEX = /\[-?(\d+(\.\d+))\.\.-?(\d+(\.\d+))\]/gi;
    function generateRandomFloatFromString(str) {
        const range = str.replace(/[\[\]]/g, '').split('..')
        return generateRandomFloat(parseFloat(range[0]), parseFloat(range[1]));
    }

    const RANDOM_NOUN_REGEX = /\(съществително\)/gi;
    function getRandomNoun() {
        return nouns[generateRandomInteger(0, nouns.length - 1)];
    }

    const ONEOF_WORD_REGEX = /{([а-я]*[a-z]*)(,[а-я]*[a-z]*)*}/gi;
    function getOneOfWord(str) {
        const words = str.replace('{', '')
            .replace('}', '')
            .split(',')
        ;
        return words[generateRandomInteger(0, words.length - 1)];
    }

    return {
        generateZip,
        saveFile,
        utils: Object.freeze({
            INT_RANGE_REGEX,
            FLOAT_RANGE_REGEX,
            RANDOM_NOUN_REGEX,
            ONEOF_WORD_REGEX,

            generateRandomInteger,
            generateRandomIntegerFromString,
            generateRandomFloat,
            generateRandomFloatFromString,
            getRandomNoun,
            getOneOfWord
        })
    };
})();

// Exporting variables to global scope
const generateZip = to_export.generateZip;

// Generally this should be used
const saveFile = to_export.saveFile;

// Random utility functions
const utils = to_export.utils;
