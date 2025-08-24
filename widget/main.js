let Widget = {

    emojis: [],
    TIME_LIMIT: 15000,
    scaleX: 854 / 1180,
    scaleY: 480 / 620,
    io: io("<backend_url>"),
    ui: {
        screen: document.querySelector('.screen'),
    },

    init: () => {

        Widget.io.emit('screenConnect',{});

        Widget.io.on('action', (data) => {

    
            const idx = Widget.emojis.findIndex(emoji => emoji.id == data.id);

            if(idx > -1){

                clearTimeout(Widget.emojis[idx].timeout);
                
                Widget.emojis[idx].p.x = data.p.x;
                Widget.emojis[idx].p.y = data.p.y;
                Widget.emojis[idx].emoji = data.emoji;

                Widget.emojis[idx].timeout = setTimeout(() => {

                    document.getElementById(Widget.emojis[idx].id)?.remove();
                    Widget.emojis.splice(idx, 1);

                }, Widget.TIME_LIMIT);

            }else{

                Widget.emojis.push({
                    ...data,
                    timeout: setTimeout(() => {

                        Widget.emojis.splice(
                             Widget.emojis.findIndex(emoji => emoji.id == data.id), 
                            1
                        );

                        document.getElementById(data.id)?.remove();

                    }, Widget.TIME_LIMIT)
                });


            }

            Widget.render();

        });


    },

    render : () => {
         for(const emoji of Widget.emojis){
            document.getElementById(emoji.id)?.remove();
            Widget.ui.screen.innerHTML += `<div class="emoji" id="${emoji.id}" style="top:${emoji.p.y * Widget.scaleY}px;left:${emoji.p.x * Widget.scaleX}px;">${emoji.emoji}</div>`;
        }
    }

}

window.addEventListener('onWidgetLoad', Widget.init, false);
