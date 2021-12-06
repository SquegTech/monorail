<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Support\Facades\URL;

class RaceController extends Controller
{
    /**
     * @param Request $request
     * @param string $leftRacer
     * @param string $rightRacer
     * @return Renderable
     */
    public function index(Request $request, string $leftRacer, string $rightRacer): Renderable
    {
        return view('race', [
            'leftRacer' => $this->getParsedRacer($leftRacer),
            'rightRacer' => $this->getParsedRacer($rightRacer),
            'parentUrl' => config('monorail.twitch_embed_parent')
        ]);
    }

    /**
     * @param string $unparsedRacer
     * @return array
     */
    private function getParsedRacer(string $unparsedRacer): array
    {
        if (!str_contains($unparsedRacer, ':')) {
            return [
                'twitch_username' => $unparsedRacer,
                'display_name' => $unparsedRacer
            ];
        }

        $racerSegments = explode(':', $unparsedRacer);

        return [
            'twitch_username' => $racerSegments[0],
            'display_name' => $racerSegments[1]
        ];
    }
}
