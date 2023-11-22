import { AssetKey, BlockObject, BlockStates, Renderer, SceneInspector, SkinObject, Skins, OrbitControls } from "minerender";
import { Intersection, Vector3 } from "three";

console.log("hi");

const renderer = new Renderer({
    camera: {
        near: 1,
        far: 2000,
        position: [50, 35, 50]
    },
    render: {
        stats: true,
        fpsLimit: 0,
        antialias: false
    },
    composer: {
        enabled: false
    },
    debug: {
        grid: true,
        axes: true
    }
});
window["renderer"] = renderer;
renderer.appendTo(document.body);

const sceneInspector = new SceneInspector(renderer);
sceneInspector.appendTo(document.getElementById('inspector'));


//TODO


const controls = new OrbitControls(renderer.camera, renderer.renderer.domElement);
renderer.registerEventDispatcher(controls);
controls.update();



//TODO: autostart option, maybe
renderer.start();