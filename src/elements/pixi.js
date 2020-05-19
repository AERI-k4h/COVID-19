import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

// this.WIDTH = 5000
// this.HEIGHT = 5000

export default () => {

    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
    })

    document.body.prepend(app.view)

    // Create viewport

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction
    })

    // Add the viewport to the stage
    app.stage.addChild(viewport)

    s.pixi = viewport

    // Activate plugins

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: .5, maxScale: 3 })
        .fitWidth(1500)
        // .setZoom(.5)
        // .fitWidth()
        // .moveCenter()
        // .moveCenter(0,0)

    // Prevent pinch gesture in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault();
    }, { passive: false });

}