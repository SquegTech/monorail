<html>
    <head>
        <title>{{ $leftRacer['display_name'] }} vs. {{ $rightRacer['display_name'] }} - Monorail Racing</title>
        <link rel="stylesheet" href="{{ mix('/css/race.css') }}" />
        <script src="{{ mix('/js/race.js') }}"></script>
    </head>
    <body>
        <div id="race-scene">
            <div id="overlay"></div>
            <div id="left-video">
                <iframe
                    src="https://player.twitch.tv/?channel={{ $leftRacer['twitch_username'] }}&autoplay=true&muted=true&parent={{ $parentUrl }}"
                    width="1523"
                    height="857"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="false"
                ></iframe>
            </div>
            <div id="right-video">
                <iframe
                    src="https://player.twitch.tv/?channel={{ $rightRacer['twitch_username'] }}&autoplay=true&muted=true&parent={{ $parentUrl }}"
                    width="1523"
                    height="857"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="false"
                ></iframe>
            </div>
            <div id="left-name">{{ $leftRacer['display_name'] }}</div>
            <div id="right-name">{{ $rightRacer['display_name'] }}</div>
            <div id="timer" class="reset" oncontextmenu="return false;">0:00.00</div>
            <div id="timer-text">TIMER</div>
            <div id="commentary-text">COMMENTARY</div>
            <div id="left-victory1" class="hidden"></div>
            <div id="left-victory2" class="hidden"></div>
            <div id="right-victory1" class="hidden"></div>
            <div id="right-victory2" class="hidden"></div>
            <div id="left-victories"></div>
            <div id="right-victories"></div>
            <div id="twitter">@MonorailRacing</div>
        </div>
        <svg>
            <filter id="red">
                <feColorMatrix type="matrix" values="
                            0 0 0 0 0.78548
                            0 0 0 0 0.02585
                            0 0 0 0 0.01778
                            0 0 0 1 0
                        " />
            </filter>
            <filter id="green">
                <feColorMatrix type="matrix" values="
                            0 0 0 0 0
                            0 0 0 0 1
                            0 0 0 0 0
                            0 0 0 1 0
                        " />
            </filter>
        </svg>
    </body>
</html>
