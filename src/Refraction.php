<?php

namespace Spatie\Refraction;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\Support\Responsable;

class Refraction implements Htmlable, Responsable
{
    /** @var string */
    protected $component;

    /** @var array */
    protected $props;

    /** @var string */
    protected $layout;

    public function __construct(string $component, array $props = [])
    {
        $this->component = $component;

        $this->props = $props;
    }

    protected function propsJson(): string
    {
        if (empty($this->props)) {
            return '{}';
        }

        return e(json_encode($this->props));
    }

    public function toResponse($request)
    {
        return view('layout', ['slot' => $this]);
    }

    public function toHtml(): string
    {
        return "<div data-component=\"{$this->component}\" data-props=\"{$this->propsJson()}\"></div>";
    }
}
