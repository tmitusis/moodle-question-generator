const ui = (function () {
    const ALERT_TYPES = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
    ];

    /**
     * @desc An alert to be shown
     * @param {String} message - the message to be shown
     * @param {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')} type
     * @param {String[]|String} buttons - an array of one or more of the designated types. If just the name is provided it will be used. If the name and type are provided in a pair(name:type) the selected type will be used.
     */
    function alert(message, type, buttons) {
        if (ALERT_TYPES.indexOf(type) === -1) {
            console.error('Bad alert type! Must be one of: ' + JSON.stringify(ALERT_TYPES));
            return;
        }
        const ev = new utils.Events();

        // If there is only one button required just make it into an array
        if (typeof buttons === 'string') {
            buttons = [buttons];
        }

        if (typeof buttons !== 'object' && typeof buttons?.length !== 'number') {
            buttons = ['добре', 'откажи'];
        }

        const CURRENT_ALERT_NO = $('.alert').length + 1;

        buttons = buttons.map(btn => {
            const arr = btn.split(':')

            return `<button
                style="display: inline; float: right; margin-left: 4px;" 
                type="button" 
                data-name="${arr[0]}"
                class="btn btn-sm btn-${arr[1] || type} alert-button" 
                data-bs-dismiss="alert" 
                aria-label="${utils.firstUp(arr[0])}">
                    ${utils.firstUp(arr[0])}
                </button>`;
            }
        );

        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div id="alert-${CURRENT_ALERT_NO}" style="position: fixed; bottom: ${70*CURRENT_ALERT_NO}px; left: 10%; right: 10%" class="alert alert-${type} alert-dismissible" role="alert">`,
            `${message}`,
            buttons.join(''),
            '</div>'
        ].join('');

        document.body.append(wrapper);

        const btns = $(`#alert-${CURRENT_ALERT_NO} > .btn`);

        for (let i = 0, max = btns.length; i < max; ++i) {
            const btn = btns[i];

            btn.addEventListener('click', function (e) {
                ev.emit('alert-button-click', e);
                const el = $(wrapper);

                el.hide('slow', wrapper.remove);
            });
        }

        return ev;
    }

    return {
        alert
    };
})();
