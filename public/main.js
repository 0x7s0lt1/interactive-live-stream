
let App = {

    io: io("<backend_url>"),
    id: null,
    selectedEmoji: null,
    emojiTimeout: null,
    ui: {
        pickerWrapper: document.querySelector('.picker-wrapper'),
        emojiPicker: document.querySelector('.emoji-picker'),
        screen: document.querySelector('.screen'),
        screenWrapper: document.querySelector('.screen-wrapper'),
        toInsert: document.querySelector('.to-insert'),
    },
    picker: new EmojiMart.Picker({
        onEmojiSelect: function(event){
        
            App.selectedEmoji = event.native;
            App.ui.toInsert.innerHTML = App.selectedEmoji;

        }
    }),

    init: () => {

        App.ui.pickerWrapper.appendChild(App.picker);

        App.io.on('handshake', (data) => {
            App.id = data.id;
        });

        App.ui.screen.addEventListener('click', App.handleClick, false);
        App.ui.screen.addEventListener('touchmove', App.handleTouch, false);

    },


    handleClick : (event) => {

        App.action(
            event.offsetX,
            event.offsetY
        );

    },

    handleTouch: (event) => {

        App.action(
            event.changedTouches[0].offsetX,
            event.changedTouches[0].offsetY,
        );

    },

    action: (x, y) => {

        if(!App.id){
            alert('Please reload the page');
            return;
        }

        if(!App.selectedEmoji){
            alert('Please select an emoi');
            return;
        }

        App.io.emit('action', {
            id: App.id,
            emoji: App.selectedEmoji,
            p: { x, y }
        });

        App.displayEmoji(x, y);

    },

    displayEmoji:(x, y) => {

        document.getElementById('emoji')?.remove();
        App.ui.screen.innerHTML += `<div class="emoi" id="emoji" style="top:${y}px;left:${x}px;">${App.selectedEmoji}</div>`;

        clearTimeout(App.emojiTimeout);
        App.emojiTimeout = setTimeout(() => document.getElementById('emoji')?.remove(), 15000);    
    

    }


}


window.addEventListener('load', App.init, false);
