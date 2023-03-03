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
