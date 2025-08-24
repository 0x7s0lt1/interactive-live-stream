## Interactive Livestream
This project enables real-time audience interaction on a livestream by allowing viewers to display emojis directly on the stream screen. It is designed to increase viewer engagement by providing a visual way for the audience to react and by allowing them to be part of the stream.

<img src="https://i.imgur.com/Fvw1Z4p.png" alt='idk' />

Viewers visit a public webpage where they can click or tap on a representation of the stream screen. When they place an emoji, it instantly appears on the OBS stream for 15 seconds.

The project is built on three core components that work together:

### Public User Page
A simple website where audience can send their emoji reactions.

### Backend Server
A Node.js server using Socket.IO that acts as the central hub, receiving emoji events from the public page and broadcasting them to the OBS widget.

### StreamElements Widget
A custom HTML/CSS/JS widget built for StreamElements. When added as a browser source in OBS, it listens for events from the backend to display emojis on screen.

[Emoji Picker](https://github.com/missive/emoji-mart) - 
[OBS](https://github.com/obsproject/obs-studio) - 
[StreamElements](https://dev.streamelements.com/docs/api-docs/775038fd4f4a9-stream-elements-custom-widgets)
