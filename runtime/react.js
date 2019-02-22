import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Refraction from "./";

function reactRenderer({ container, Component, props }) {
    render(createElement(Component,  props), container);

    return () => {
        unmountComponentAtNode(container);
    }
}

export default class RefractionReact extends Refraction {
    constructor() {
        super(reactRenderer)
    }
}
