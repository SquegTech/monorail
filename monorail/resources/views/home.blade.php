<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>{{ config('app.name') }} League</title>

        <!-- Custom fonts for this template -->
        <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="{{ mix('/css/home.css') }}" rel="stylesheet">
        <link href="{{ mix('/css/fontawesome.css') }}" rel="stylesheet">
        <script src="https://embed.twitch.tv/embed/v1.js"></script>
    </head>

    <body style="background-color: rgb(0,0,12.2)" class="text-white">
        <div class="min-h-screen md:w-3/4 lg:w-1/2 pl-1 pr-1 md:ml-auto md:mr-auto md:pl-0 md:pr-0">
            <div class="text-center pb-6">
                <img src="/images/home/monorail_logo_150.png" class="h-64 mr-auto ml-auto" />
                <span class="text-4xl md:text-5xl font-bold">Monorail Racing League</span>
            </div>
            <div id="twitch-embed"></div>
            <div class="pt-6 pb-6">
                Monorail is the official racing league for Monolith offering tournaments for all skill levels since February of 2020. Whether you're a rookie racer looking to join our F5 series or a pro competing in the highest level of our F6 races, please follow the links below to join our community and sign up for tournament announcements!
            </div>
            <hr />
            <div class="grid grid-cols-2 pt-6 pb-6">
                <div class="text-8xl text-center">
                    <a href="https://store.steampowered.com/app/603960/Monolith/">
                        <i class="fab fa-steam"></i>
                    </a>
                </div>
                <div>
                    <div>
                        <a class="text-2xl font-bold" href="https://store.steampowered.com/app/603960/Monolith/">
                            Steam
                        </a>
                    </div>
                    <div>
                        Buy the game on Steam and begin your speedrunning journey!
                    </div>
                </div>
            </div>
            <hr />
            <div class="grid grid-cols-2 pt-6 pb-6">
                <div>
                    <div>
                        <a class="text-2xl font-bold" href="https://www.discord.gg/Monolith">
                            Community Discord
                        </a>
                    </div>
                    <div>
                        Our community Discord for all things Monolith! Come for strategy tips, Monorail announcements and discussion, and a welcoming community.
                    </div>
                </div>
                <div class="text-8xl text-center">
                    <a href="https://www.discord.gg/Monolith">
                        <i class="fab fa-discord"></i>
                    </a>
                </div>
            </div>
            <hr />
            <div class="grid grid-cols-2 pt-6 pb-6">
                <div class="text-8xl text-center">
                    <a href="https://discord.gg/qeWwGRHqmM">
                        <i class="fab fa-discord"></i>
                    </a>
                </div>
                <div>
                    <div>
                        <a class="text-2xl font-bold" href="https://discord.gg/qeWwGRHqmM">
                            Racing Discord
                        </a>
                    </div>
                    <div>
                        The official Discord server for Monorail! Join here to participate in races.
                    </div>
                </div>
            </div>
            <hr />
            <div class="grid grid-cols-2 pt-6 pb-6">
                <div>
                    <div>
                        <a class="text-2xl font-bold" href="https://twitter.com/MonorailRacing">
                            Twitter
                        </a>
                    </div>
                    <div>
                        Follow us on Twitter to get the latest news for upcoming tournaments!
                    </div>
                </div>
                <div class="text-8xl text-center">
                    <a href="https://twitter.com/MonorailRacing">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
            <hr />
            <div class="grid grid-cols-2 pt-6 pb-6">
                <div class="text-8xl text-center">
                    <a href="https://www.twitch.tv/MonorailRacing">
                        <i class="fab fa-twitch"></i>
                    </a>
                </div>
                <div>
                    <div>
                        <a class="text-2xl font-bold" href="https://www.twitch.tv/MonorailRacing">
                            Twitch
                        </a>
                    </div>
                    <div>
                        Our showcases typically run at 2pm Eastern on our official channel. Be sure to follow to be notified as soon as we go live!
                    </div>
                </div>
            </div>
            <hr />
            <div class="grid grid-cols-2 pt-6 pb-6">
                <div>
                    <div>
                        <a class="text-2xl font-bold" href="https://www.youtube.com/channel/UCMaLyfBBLFwXuEqIsV2kU5Q">
                            YouTube
                        </a>
                    </div>
                    <div>
                        Watch VODs of our past tournaments on our YouTube channel so you don't miss out on anything!
                    </div>
                </div>
                <div class="text-8xl text-center">
                    <a href="https://www.youtube.com/channel/UCMaLyfBBLFwXuEqIsV2kU5Q">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>

        <footer class="bg-black footer">
            <div class="text-right">
                <p>&copy; {{ config('app.name') }} {{ now()->year }}</p>
                <a href="https://github.com/SquegTech/monorail"><i class="fab fa-github"></i> Github</a>
            </div>
        </footer>
        <script type="text/javascript">
            new Twitch.Embed("twitch-embed", {
                width: '100%',
                height: 480,
                channel: "monorailracing",
                parent: ['{{ $parentUrl }}'],
                theme: 'dark',
                autoplay: true,
                muted: false,
            });
        </script>
    </body>
</html>
