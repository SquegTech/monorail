function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {Object<string, {url: string, letters: Letters}>} Fonts
 * @typedef {Object<string, {left: number, top: number, width: number, height: number}>} Letters
 */
//   ###                   #     #            #####                 #
//  #   #                        #            #                     #
//  #      # ##   # ##    ##    ####    ###   #       ###   # ##   ####
//   ###   ##  #  ##  #    #     #     #   #  ####   #   #  ##  #   #
//      #  ##  #  #        #     #     #####  #      #   #  #   #   #
//  #   #  # ##   #        #     #  #  #      #      #   #  #   #   #  #
//   ###   #      #       ###     ##    ###   #       ###   #   #    ##
//         #
//         #

/**
 * A class that allows you to create a font from a sprite and use it in an HTML document.
 */
var SpriteFont = /*#__PURE__*/function () {
  //                           #                       #
  //                           #                       #
  //  ##    ##   ###    ###   ###   ###   #  #   ##   ###    ##   ###
  // #     #  #  #  #  ##      #    #  #  #  #  #      #    #  #  #  #
  // #     #  #  #  #    ##    #    #     #  #  #      #    #  #  #
  //  ##    ##   #  #  ###      ##  #      ###   ##     ##   ##   #

  /**
   * Creates the SpriteFont object for the specified element.
   * @param {HTMLElement} el The element to display the font on.
   * @param {string} font The font to use, setup in the setup function.
   */
  function SpriteFont(el, font) {
    _classCallCheck(this, SpriteFont);

    this.el = el;
    el.dataset.font = font;
    el.dataset.text = el.innerText;
    this.draw();
  } //  #                 #
  //  #                 #
  // ###    ##   #  #  ###
  //  #    # ##   ##    #
  //  #    ##     ##    #
  //   ##   ##   #  #    ##

  /**
   * Gets the text of the element.
   */


  _createClass(SpriteFont, [{
    key: "text",
    get: function get() {
      return this.el.dataset.text;
    }
    /**
     * Sets the text of the element.
     */
    ,
    set: function set(text) {
      this.el.dataset.text = text;
      this.draw();
    } //    #
    //    #
    //  ###  ###    ###  #  #
    // #  #  #  #  #  #  #  #
    // #  #  #     # ##  ####
    //  ###  #      # #  ####

    /**
     * Draws the text.
     */

  }, {
    key: "draw",
    value: function draw() {
      var html = "";

      for (var i = 0; i < this.el.dataset.text.length; i++) {
        var letter = this.el.dataset.text.substr(i, 1),
            font = SpriteFont.fonts[this.el.dataset.font],
            letterInfo = font.letters[letter];

        if (letterInfo) {
          html = "".concat(html, "<div style=\"display: inline-block; width: ").concat(letterInfo.width, "px; height: ").concat(letterInfo.height, "px; background: url(").concat(font.url, ") -").concat(letterInfo.left, "px ").concat(letterInfo.top, "px\"></div>");
        } else {
          html = "".concat(html, "<span>").concat(letter, "</span>");
        }
      }

      this.el.innerHTML = html;
    } //               #
    //               #
    //  ###    ##   ###   #  #  ###
    // ##     # ##   #    #  #  #  #
    //   ##   ##     #    #  #  #  #
    // ###     ##     ##   ###  ###
    //                          #

    /**
     * Sets up a font for use with SpriteFont.
     * @param {object} options The options to use.
     * @param {string} options.name The name of the font.
     * @param {string} options.url The URL of the image of the font.
     * @param {Letters} options.letters The list of available letters.
     */

  }], [{
    key: "setup",
    value: function setup(options) {
      SpriteFont.fonts[options.name] = {
        url: options.url,
        letters: options.letters
      };
    }
  }]);

  return SpriteFont;
}();
/** @type {Fonts} */


SpriteFont.fonts = {};
/* globals SpriteFont */

var start;
var stoppedTime = 0;
var timerInterval;
var timer;
var leftName;
var rightName;

var Race = /*#__PURE__*/function () {
  function Race() {
    _classCallCheck(this, Race);
  }

  _createClass(Race, null, [{
    key: "DOMContentLoaded",
    value: function DOMContentLoaded(ev) {
      timer = new SpriteFont(document.getElementById("timer"), "Monolith Regular");
      leftName = new SpriteFont(document.getElementById("left-name"), "Monolith Large");
      rightName = new SpriteFont(document.getElementById("right-name"), "Monolith Large");
      new SpriteFont(document.getElementById("timer-text"), "Monolith Regular");
      new SpriteFont(document.getElementById("commentary-text"), "Monolith Regular");
      new SpriteFont(document.getElementById("twitter"), "Monolith Regular");
      document.querySelector("#timer").addEventListener("mousedown", function (ev) {
        switch (ev.button) {
          case 0:
            switch (document.querySelector("#timer").classList[0]) {
              case "reset":
              case "stopped":
                start = new Date().getTime() - stoppedTime;
                timerInterval = setInterval(Race.updateTimer, 1);
                document.querySelector("#timer").classList.remove("stopped");
                document.querySelector("#timer").classList.remove("reset");
                document.querySelector("#timer").classList.add("running");
                break;

              case "running":
                stoppedTime = new Date().getTime() - start;
                clearInterval(timerInterval);
                document.querySelector("#timer").classList.remove("reset");
                document.querySelector("#timer").classList.remove("running");
                document.querySelector("#timer").classList.add("stopped");
                break;
            }

            break;

          case 2:
            switch (document.querySelector("#timer").classList[0]) {
              case "reset":
              case "stopped":
                stoppedTime = 0;
                timer.text = "0:00.00";
                document.querySelector("#timer").classList.remove("running");
                document.querySelector("#timer").classList.remove("stopped");
                document.querySelector("#timer").classList.add("reset");
                break;
            }

            if (event.preventDefault) {
              event.preventDefault();
            }

            if (event.stopPropagation) {
              event.stopPropagation();
            }

            break;
        }
      });
      document.querySelector("#timer").addEventListener("oncontextmenu", function () {
        return false;
      });
      document.querySelector("#left-victories").addEventListener("click", function () {
        if (!document.querySelector("#left-victory2").classList.contains("hidden")) {
          document.querySelector("#left-victory1").classList.add("hidden");
          document.querySelector("#left-victory2").classList.add("hidden");
        } else if (!document.querySelector("#left-victory1").classList.contains("hidden")) {
          document.querySelector("#left-victory2").classList.remove("hidden");
        } else {
          document.querySelector("#left-victory1").classList.remove("hidden");
        }
      });
      document.querySelector("#right-victories").addEventListener("click", function () {
        if (!document.querySelector("#right-victory2").classList.contains("hidden")) {
          document.querySelector("#right-victory1").classList.add("hidden");
          document.querySelector("#right-victory2").classList.add("hidden");
        } else if (!document.querySelector("#right-victory1").classList.contains("hidden")) {
          document.querySelector("#right-victory2").classList.remove("hidden");
        } else {
          document.querySelector("#right-victory1").classList.remove("hidden");
        }
      });
    }
  }, {
    key: "updateTimer",
    value: function updateTimer() {
      var diff = new Date().getTime() - start;
      timer.text = "".concat(diff >= 60 * 60 * 1000 ? "".concat(Math.floor(diff / (60 * 60 * 1000)), ":") : "").concat("0".concat(Math.floor(diff % (1000 * 60 * 60) / (1000 * 60)).toString()).slice(diff >= 10 * 60 * 1000 ? -2 : -1), ":").concat("0".concat(Math.floor(diff % (1000 * 60) / 1000).toString()).slice(-2), ".").concat("0".concat(Math.floor(diff % 1000 / 10)).slice(-2));
    }
  }]);

  return Race;
}();

document.addEventListener("DOMContentLoaded", Race.DOMContentLoaded);
SpriteFont.setup({
  name: "Monolith Regular",
  url: "/images/race/regular.png",
  letters: {
    " ": {
      left: 0,
      top: 0,
      width: 8,
      height: 10
    },
    "!": {
      left: 8,
      top: 0,
      width: 8,
      height: 10
    },
    "?": {
      left: 16,
      top: 0,
      width: 8,
      height: 10
    },
    "#": {
      left: 24,
      top: 0,
      width: 8,
      height: 10
    },
    "$": {
      left: 32,
      top: 0,
      width: 8,
      height: 10
    },
    "%": {
      left: 40,
      top: 0,
      width: 8,
      height: 10
    },
    "&": {
      left: 48,
      top: 0,
      width: 8,
      height: 10
    },
    "'": {
      left: 56,
      top: 0,
      width: 8,
      height: 10
    },
    "(": {
      left: 64,
      top: 0,
      width: 8,
      height: 10
    },
    ")": {
      left: 72,
      top: 0,
      width: 8,
      height: 10
    },
    "[": {
      left: 80,
      top: 0,
      width: 8,
      height: 10
    },
    "]": {
      left: 88,
      top: 0,
      width: 8,
      height: 10
    },
    "*": {
      left: 96,
      top: 0,
      width: 8,
      height: 10
    },
    "+": {
      left: 104,
      top: 0,
      width: 8,
      height: 10
    },
    ",": {
      left: 112,
      top: 0,
      width: 8,
      height: 10
    },
    "-": {
      left: 120,
      top: 0,
      width: 8,
      height: 10
    },
    ".": {
      left: 132,
      top: 0,
      width: 3,
      height: 10
    },
    "/": {
      left: 136,
      top: 0,
      width: 8,
      height: 10
    },
    "0": {
      left: 144,
      top: 0,
      width: 8,
      height: 10
    },
    "1": {
      left: 152,
      top: 0,
      width: 8,
      height: 10
    },
    "2": {
      left: 160,
      top: 0,
      width: 8,
      height: 10
    },
    "3": {
      left: 168,
      top: 0,
      width: 8,
      height: 10
    },
    "4": {
      left: 176,
      top: 0,
      width: 8,
      height: 10
    },
    "5": {
      left: 184,
      top: 0,
      width: 8,
      height: 10
    },
    "6": {
      left: 192,
      top: 0,
      width: 8,
      height: 10
    },
    "7": {
      left: 200,
      top: 0,
      width: 8,
      height: 10
    },
    "8": {
      left: 208,
      top: 0,
      width: 8,
      height: 10
    },
    "9": {
      left: 216,
      top: 0,
      width: 8,
      height: 10
    },
    ":": {
      left: 226,
      top: 0,
      width: 3,
      height: 10
    },
    ";": {
      left: 232,
      top: 0,
      width: 8,
      height: 10
    },
    "^": {
      left: 240,
      top: 0,
      width: 8,
      height: 10
    },
    "_": {
      left: 248,
      top: 0,
      width: 8,
      height: 10
    },
    "`": {
      left: 256,
      top: 0,
      width: 8,
      height: 10
    },
    "A": {
      left: 264,
      top: 0,
      width: 8,
      height: 10
    },
    "B": {
      left: 272,
      top: 0,
      width: 8,
      height: 10
    },
    "C": {
      left: 280,
      top: 0,
      width: 8,
      height: 10
    },
    "D": {
      left: 288,
      top: 0,
      width: 8,
      height: 10
    },
    "E": {
      left: 296,
      top: 0,
      width: 8,
      height: 10
    },
    "F": {
      left: 304,
      top: 0,
      width: 8,
      height: 10
    },
    "G": {
      left: 312,
      top: 0,
      width: 8,
      height: 10
    },
    "H": {
      left: 320,
      top: 0,
      width: 8,
      height: 10
    },
    "I": {
      left: 328,
      top: 0,
      width: 8,
      height: 10
    },
    "J": {
      left: 336,
      top: 0,
      width: 8,
      height: 10
    },
    "K": {
      left: 344,
      top: 0,
      width: 8,
      height: 10
    },
    "L": {
      left: 352,
      top: 0,
      width: 8,
      height: 10
    },
    "M": {
      left: 360,
      top: 0,
      width: 8,
      height: 10
    },
    "N": {
      left: 368,
      top: 0,
      width: 8,
      height: 10
    },
    "O": {
      left: 376,
      top: 0,
      width: 8,
      height: 10
    },
    "P": {
      left: 384,
      top: 0,
      width: 8,
      height: 10
    },
    "Q": {
      left: 392,
      top: 0,
      width: 8,
      height: 10
    },
    "R": {
      left: 400,
      top: 0,
      width: 8,
      height: 10
    },
    "S": {
      left: 408,
      top: 0,
      width: 8,
      height: 10
    },
    "T": {
      left: 416,
      top: 0,
      width: 8,
      height: 10
    },
    "U": {
      left: 424,
      top: 0,
      width: 8,
      height: 10
    },
    "V": {
      left: 432,
      top: 0,
      width: 8,
      height: 10
    },
    "W": {
      left: 440,
      top: 0,
      width: 8,
      height: 10
    },
    "X": {
      left: 448,
      top: 0,
      width: 8,
      height: 10
    },
    "Y": {
      left: 456,
      top: 0,
      width: 8,
      height: 10
    },
    "Z": {
      left: 464,
      top: 0,
      width: 8,
      height: 10
    },
    "Ä": {
      left: 472,
      top: 0,
      width: 8,
      height: 10
    },
    "Ö": {
      left: 480,
      top: 0,
      width: 8,
      height: 10
    },
    "Ü": {
      left: 488,
      top: 0,
      width: 8,
      height: 10
    },
    "a": {
      left: 264,
      top: 0,
      width: 8,
      height: 10
    },
    "b": {
      left: 272,
      top: 0,
      width: 8,
      height: 10
    },
    "c": {
      left: 280,
      top: 0,
      width: 8,
      height: 10
    },
    "d": {
      left: 288,
      top: 0,
      width: 8,
      height: 10
    },
    "e": {
      left: 296,
      top: 0,
      width: 8,
      height: 10
    },
    "f": {
      left: 304,
      top: 0,
      width: 8,
      height: 10
    },
    "g": {
      left: 312,
      top: 0,
      width: 8,
      height: 10
    },
    "h": {
      left: 320,
      top: 0,
      width: 8,
      height: 10
    },
    "i": {
      left: 328,
      top: 0,
      width: 8,
      height: 10
    },
    "j": {
      left: 336,
      top: 0,
      width: 8,
      height: 10
    },
    "k": {
      left: 344,
      top: 0,
      width: 8,
      height: 10
    },
    "l": {
      left: 352,
      top: 0,
      width: 8,
      height: 10
    },
    "m": {
      left: 360,
      top: 0,
      width: 8,
      height: 10
    },
    "n": {
      left: 368,
      top: 0,
      width: 8,
      height: 10
    },
    "o": {
      left: 376,
      top: 0,
      width: 8,
      height: 10
    },
    "p": {
      left: 384,
      top: 0,
      width: 8,
      height: 10
    },
    "q": {
      left: 392,
      top: 0,
      width: 8,
      height: 10
    },
    "r": {
      left: 400,
      top: 0,
      width: 8,
      height: 10
    },
    "s": {
      left: 408,
      top: 0,
      width: 8,
      height: 10
    },
    "t": {
      left: 416,
      top: 0,
      width: 8,
      height: 10
    },
    "u": {
      left: 424,
      top: 0,
      width: 8,
      height: 10
    },
    "v": {
      left: 432,
      top: 0,
      width: 8,
      height: 10
    },
    "w": {
      left: 440,
      top: 0,
      width: 8,
      height: 10
    },
    "x": {
      left: 448,
      top: 0,
      width: 8,
      height: 10
    },
    "y": {
      left: 456,
      top: 0,
      width: 8,
      height: 10
    },
    "z": {
      left: 464,
      top: 0,
      width: 8,
      height: 10
    },
    "ä": {
      left: 472,
      top: 0,
      width: 8,
      height: 10
    },
    "ö": {
      left: 480,
      top: 0,
      width: 8,
      height: 10
    },
    "ü": {
      left: 488,
      top: 0,
      width: 8,
      height: 10
    },
    "ß": {
      left: 496,
      top: 0,
      width: 8,
      height: 10
    }
  }
});
SpriteFont.setup({
  name: "Monolith Large",
  url: "/images/race/large.png",
  letters: {
    "A": {
      left: 0,
      top: 0,
      width: 25,
      height: 40
    },
    "B": {
      left: 25,
      top: 0,
      width: 25,
      height: 40
    },
    "C": {
      left: 50,
      top: 0,
      width: 25,
      height: 40
    },
    "D": {
      left: 75,
      top: 0,
      width: 25,
      height: 40
    },
    "E": {
      left: 100,
      top: 0,
      width: 25,
      height: 40
    },
    "F": {
      left: 125,
      top: 0,
      width: 25,
      height: 40
    },
    "G": {
      left: 150,
      top: 0,
      width: 25,
      height: 40
    },
    "H": {
      left: 175,
      top: 0,
      width: 25,
      height: 40
    },
    "I": {
      left: 200,
      top: 0,
      width: 25,
      height: 40
    },
    "J": {
      left: 225,
      top: 0,
      width: 25,
      height: 40
    },
    "K": {
      left: 250,
      top: 0,
      width: 25,
      height: 40
    },
    "L": {
      left: 275,
      top: 0,
      width: 25,
      height: 40
    },
    "M": {
      left: 300,
      top: 0,
      width: 25,
      height: 40
    },
    "N": {
      left: 325,
      top: 0,
      width: 25,
      height: 40
    },
    "O": {
      left: 350,
      top: 0,
      width: 25,
      height: 40
    },
    "P": {
      left: 375,
      top: 0,
      width: 25,
      height: 40
    },
    "Q": {
      left: 400,
      top: 0,
      width: 25,
      height: 40
    },
    "R": {
      left: 425,
      top: 0,
      width: 25,
      height: 40
    },
    "S": {
      left: 450,
      top: 0,
      width: 25,
      height: 40
    },
    "T": {
      left: 475,
      top: 0,
      width: 25,
      height: 40
    },
    "U": {
      left: 500,
      top: 0,
      width: 25,
      height: 40
    },
    "V": {
      left: 525,
      top: 0,
      width: 25,
      height: 40
    },
    "W": {
      left: 550,
      top: 0,
      width: 25,
      height: 40
    },
    "X": {
      left: 575,
      top: 0,
      width: 25,
      height: 40
    },
    "Y": {
      left: 600,
      top: 0,
      width: 25,
      height: 40
    },
    "Z": {
      left: 625,
      top: 0,
      width: 25,
      height: 40
    },
    "Ä": {
      left: 650,
      top: 0,
      width: 25,
      height: 40
    },
    "Ö": {
      left: 675,
      top: 0,
      width: 25,
      height: 40
    },
    "Ü": {
      left: 700,
      top: 0,
      width: 25,
      height: 40
    },
    "a": {
      left: 0,
      top: 0,
      width: 25,
      height: 40
    },
    "b": {
      left: 25,
      top: 0,
      width: 25,
      height: 40
    },
    "c": {
      left: 50,
      top: 0,
      width: 25,
      height: 40
    },
    "d": {
      left: 75,
      top: 0,
      width: 25,
      height: 40
    },
    "e": {
      left: 100,
      top: 0,
      width: 25,
      height: 40
    },
    "f": {
      left: 125,
      top: 0,
      width: 25,
      height: 40
    },
    "g": {
      left: 150,
      top: 0,
      width: 25,
      height: 40
    },
    "h": {
      left: 175,
      top: 0,
      width: 25,
      height: 40
    },
    "i": {
      left: 200,
      top: 0,
      width: 25,
      height: 40
    },
    "j": {
      left: 225,
      top: 0,
      width: 25,
      height: 40
    },
    "k": {
      left: 250,
      top: 0,
      width: 25,
      height: 40
    },
    "l": {
      left: 275,
      top: 0,
      width: 25,
      height: 40
    },
    "m": {
      left: 300,
      top: 0,
      width: 25,
      height: 40
    },
    "n": {
      left: 325,
      top: 0,
      width: 25,
      height: 40
    },
    "o": {
      left: 350,
      top: 0,
      width: 25,
      height: 40
    },
    "p": {
      left: 375,
      top: 0,
      width: 25,
      height: 40
    },
    "q": {
      left: 400,
      top: 0,
      width: 25,
      height: 40
    },
    "r": {
      left: 425,
      top: 0,
      width: 25,
      height: 40
    },
    "s": {
      left: 450,
      top: 0,
      width: 25,
      height: 40
    },
    "t": {
      left: 475,
      top: 0,
      width: 25,
      height: 40
    },
    "u": {
      left: 500,
      top: 0,
      width: 25,
      height: 40
    },
    "v": {
      left: 525,
      top: 0,
      width: 25,
      height: 40
    },
    "w": {
      left: 550,
      top: 0,
      width: 25,
      height: 40
    },
    "x": {
      left: 575,
      top: 0,
      width: 25,
      height: 40
    },
    "y": {
      left: 600,
      top: 0,
      width: 25,
      height: 40
    },
    "z": {
      left: 625,
      top: 0,
      width: 25,
      height: 40
    },
    "ä": {
      left: 650,
      top: 0,
      width: 25,
      height: 40
    },
    "ö": {
      left: 675,
      top: 0,
      width: 25,
      height: 40
    },
    "ü": {
      left: 700,
      top: 0,
      width: 25,
      height: 40
    },
    "0": {
      left: 725,
      top: 0,
      width: 25,
      height: 40
    },
    "1": {
      left: 750,
      top: 0,
      width: 25,
      height: 40
    },
    "2": {
      left: 775,
      top: 0,
      width: 25,
      height: 40
    },
    "3": {
      left: 800,
      top: 0,
      width: 25,
      height: 40
    },
    "4": {
      left: 825,
      top: 0,
      width: 25,
      height: 40
    },
    "5": {
      left: 850,
      top: 0,
      width: 25,
      height: 40
    },
    "6": {
      left: 875,
      top: 0,
      width: 25,
      height: 40
    },
    "7": {
      left: 900,
      top: 0,
      width: 25,
      height: 40
    },
    "8": {
      left: 925,
      top: 0,
      width: 25,
      height: 40
    },
    "9": {
      left: 950,
      top: 0,
      width: 25,
      height: 40
    },
    "_": {
      left: 975,
      top: 0,
      width: 25,
      height: 40
    }
  }
});
