import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Panel, Well } from 'react-bootstrap';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'

import { Scene as ReactBabylonJsScene, SceneEventArgs } from 'react-babylonjs';

import * as CANNON from 'cannon'
window.CANNON = CANNON

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {

    private scene: BABYLON.Scene;

    onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;
                
        this.scene = scene;

        const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        
        // update /Views/Shared/_Layout.cshtml to include JS for engine of choice.
        //this.scene.enablePhysics(gravityVector, new OimoJSPlugin())
        this.scene.enablePhysics(gravityVector, new BABYLON.CannonJSPlugin())
        
        let light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, -1, 0), scene);
        light.intensity = 0.8;

        let shadowLight = new BABYLON.DirectionalLight('dir01', new BABYLON.Vector3(1, -0.75, 1), scene);
        shadowLight.position = new BABYLON.Vector3(-40, 30, -40);
        shadowLight.intensity = 0.4;
        shadowLight.shadowMinZ = 1;
        shadowLight.shadowMaxZ = 2500;
        
        var camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / -2, Math.PI / 4, 16, BABYLON.Vector3.Zero(), scene);
        // camera.lowerAlphaLimit = -0.0001;
        // camera.upperAlphaLimit = 0.0001;
        camera.lowerRadiusLimit = 8; // zoom right into logo
        camera.upperRadiusLimit = 20;
        camera.upperBetaLimit = Math.PI / 2;
        camera.attachControl(canvas);

        let shadowGenerator = new BABYLON.ShadowGenerator(1024 /* size of shadow map */, shadowLight);
        shadowGenerator.bias = 0.001;
        shadowGenerator.depthScale = 2500;

        shadowGenerator.useBlurExponentialShadowMap = true;
        // for self-shadowing (ie: blocks)
        shadowGenerator.forceBackFacesOnly = true;
        shadowGenerator.depthScale = 100;

        var floor = BABYLON.MeshBuilder.CreateBox('ground', { width: 10, height: 1, depth: 10 }, scene);

        var darkMaterial = new BABYLON.StandardMaterial('Grey', scene);
        darkMaterial.diffuseColor = BABYLON.Color3.FromInts(255, 255, 255); // Color3.FromInts(200, 200, 200)
        floor.material = darkMaterial;
        floor.receiveShadows = true;

        const radiansFromCameraForShadows = -3 * (Math.PI / 4);

        scene.registerBeforeRender(() => {
            shadowLight.position.x = Math.cos(camera.alpha + radiansFromCameraForShadows) * 40;
            shadowLight.position.z = Math.sin(camera.alpha + radiansFromCameraForShadows) * 40;
            shadowLight.setDirectionToTarget(BABYLON.Vector3.Zero());
        });

        var sphere = BABYLON.Mesh.CreateSphere('sphere', 10, 2, scene, false);
        sphere.position.y = 5
        
        shadowGenerator.getShadowMap().renderList.push(sphere);
        
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
        floor.physicsImpostor = new BABYLON.PhysicsImpostor(floor, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

        // GUI
        var plane = BABYLON.MeshBuilder.CreatePlane("plane", {size: 2}, scene);
        plane.parent = sphere;
        plane.position.y = 2;

        var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

        var button1 = GUI.Button.CreateSimpleButton("but1", "Click Me");
        button1.width = 1;
        button1.height = 0.4;
        button1.color = "white";
        button1.fontSize = 200;
        button1.background = "green";
        button1.onPointerUpObservable.add(function() {
            sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 10, 0), sphere.getAbsolutePosition());
        });
        advancedTexture.addControl(button1); 
    
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    public render() {
        return (
            <div style={{ paddingTop: '15px' }}>
                <div className="row">
                    <div className="col-xs-12">
                        <Panel header={<div>bouncy <strong>BabylonJS</strong> sphere...</div>} bsStyle="success">
                            <p><strong>click</strong> label to bounce sphere - all ES6, yay!</p>
                        </Panel>
                    </div>
                </div>

                <Well bsSize="small" className="text-center">
                    <ReactBabylonJsScene
                        onSceneMount={this.onSceneMount}
                        visible={true}
                        shadersRepository={'/shaders/'}
                        width={600}
                        height={400}
                    />
                </Well>
            </div>
        );
    }
}
