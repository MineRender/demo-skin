import {Renderer, SceneInspector, SkinObject, Skins, OrbitControls} from "minerender";
import {Intersection, Vector3} from "three";

console.log("hi");

const renderer = new Renderer({
    camera: {
        near: 1,
        far: 2000,
        position: [-50, 40, -50],
        lookingAt: [0, 10, 0]
    },
    render: {
        stats: true,
        fpsLimit: 60,
        antialias: false,
        renderAlways: true
    },
    composer: {
        enabled: false
    },
    debug: {
        grid: false,
        axes: true
    }
});
// document.body.appendChild(renderer.renderer.domElement);
window["renderer"] = renderer;
renderer.appendTo(document.body);

const sceneInspector = new SceneInspector(renderer);
sceneInspector.appendTo(document.getElementById('inspector'));

let skinObject: SkinObject;

renderer.scene.addSkin().then(skinObject_ => {
    skinObject = skinObject_;
    window["skin"] = skinObject_;

    setSkin("inventivetalent");


    // dummy intersection
    const intersection: Intersection = {
        object: skinObject_,
        distance: 0,
        point: new Vector3(),
        instanceId: skinObject_.isInstanced ? skinObject_.instanceCounter : undefined
    }
    sceneInspector.selectObject(skinObject_, intersection)
});

function setSkin(skin: string) {
    console.log("setting skin to", skin);
    if (skin.startsWith("http")) {
        skinObject.setSkinTexture(skin)
    } else {
        Skins.fromUuidOrUsername(skin).then(skin => {
            console.log(skin);
            if (typeof skin !== "undefined") {
                skinObject.setSkinTexture(skin)
            }
        })
    }
}

window["setSkin"] = setSkin;

const skinInput = document.getElementById("skin-input") as HTMLInputElement;
skinInput.addEventListener("change", () => {
    setSkin(skinInput.value);
})


const controls = new OrbitControls(renderer.camera, renderer.renderer.domElement);
controls.target.setY(10);
renderer.registerEventDispatcher(controls);
controls.update();


//TODO: autostart option, maybe
renderer.start();