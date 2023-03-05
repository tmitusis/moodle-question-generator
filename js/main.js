// IIFE - does not clutter the global namespace
const to_export = (function (){
    $(document).ready(function () {
        const el = $('#question-selection');
        
        el.on('change', function () {
            const mod = el.val();
    
            // Remove all the previously loaded modules
            $('script.module').remove();
    
            // Load the selected module
            $(document.head).append(`<script id="${mod}" class="module" type="application/javascript" src="js/modules/${mod}/index.js"></script>`);
        });
    });
    
    
    function _compressionUpdate(obj) {
        console.log(`Progressed ${obj.percent}%`);
    
        if (obj.currentFile) {
            console.log(`\tCurrent file is: ${obj.currentFile}`);
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
     */
    function generateZip(data, cb) {
        const zip = new JSZip();
        const zip_opts = {
            type : "blob",
            comment: "Moodle question bank automatically generated via Moodle question generator. See https://github.com/tmitusis/moodle-question-generator",
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
    
    function saveFile(fblob, fname) {
        if (typeof fname !== 'stirng') {
            fname = 'moodle-question-bank.zip';
        }
    
        window.URL = window.URL || window.webkitURL;
        
        //http://html5-demos.appspot.com/static/a.download.html
        //https://developer.mozilla.org/en-US/docs/Web/API/Blob
        var a = document.createElement('a');
        a.download = fname;
        a.href = window.URL.createObjectURL(fblob);
        a.click();
    }

    return {
        generateZip,
        saveFile
    };
})();

const generateZip = to_export.generateZip;
const saveFile = to_export.saveFile;
