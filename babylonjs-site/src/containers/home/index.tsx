import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Panel, Well } from 'react-bootstrap';
import {
    Scene, MeshBuilder, Vector3, Color3, ArcRotateCamera, HemisphericLight, DirectionalLight, Mesh, StandardMaterial,
    ShadowGenerator, VolumetricLightScatteringPostProcess, Texture
} from 'babylonjs';
import { Scene as ReactBabylonJsScene, SceneEventArgs } from 'react-babylonjs';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {

    private scene: Scene;

    onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;
                
        this.scene = scene;

        let light = new HemisphericLight('hemi', new Vector3(0, -1, 0), scene);
        light.intensity = 0.8;

        let shadowLight = new DirectionalLight('dir01', new Vector3(1, -0.75, 1), scene);
        shadowLight.position = new Vector3(-40, 30, -40);
        shadowLight.intensity = 0.4;
        shadowLight.shadowMinZ = 1;
        shadowLight.shadowMaxZ = 2500;
        
        var camera = new ArcRotateCamera('Camera', 0, Math.PI / 4, 20, Vector3.Zero(), scene);
        // camera.lowerAlphaLimit = -0.0001;
        // camera.upperAlphaLimit = 0.0001;
        camera.lowerRadiusLimit = 8; // zoom right into logo
        camera.upperRadiusLimit = 20;
        camera.upperBetaLimit = Math.PI / 2;
        camera.attachControl(canvas);

        let shadowGenerator = new ShadowGenerator(1024 /* size of shadow map */, shadowLight);
        shadowGenerator.bias = 0.001;
        shadowGenerator.depthScale = 2500;

        shadowGenerator.useBlurExponentialShadowMap = true;
        // for self-shadowing (ie: blocks)
        shadowGenerator.forceBackFacesOnly = true;
        shadowGenerator.depthScale = 100;

        const boxDimension = 2;
        let box =  MeshBuilder.CreateBox('home-logo', { size: boxDimension }, scene);
        box.position.y = 3;
        shadowGenerator.getShadowMap().renderList.push(box);

        var floor = MeshBuilder.CreateBox('ground', { width: 100, height: 1, depth: 100 }, scene);

        var darkMaterial = new StandardMaterial('Grey', scene);
        darkMaterial.diffuseColor = Color3.FromInts(255, 255, 255); // Color3.FromInts(200, 200, 200)
        floor.material = darkMaterial;
        floor.position.y -= 1;
        floor.receiveShadows = true;

        const radiansFromCameraForShadows = -3 * (Math.PI / 4);

        scene.registerBeforeRender(() => {
            shadowLight.position.x = Math.cos(camera.alpha + radiansFromCameraForShadows) * 40;
            shadowLight.position.z = Math.sin(camera.alpha + radiansFromCameraForShadows) * 40;
            shadowLight.setDirectionToTarget(Vector3.Zero());
        });

        var godrayMesh = Mesh.CreateSphere('gr-mesh', 10, boxDimension, scene, false);
        godrayMesh.parent = box;
        godrayMesh.position.x -= (boxDimension / 2);
        godrayMesh.position.y += boxDimension;
        
        var grMat = new StandardMaterial('gr-mat', scene);
        grMat.wireframe = true;
        grMat.backFaceCulling = false;
        grMat.diffuseColor = new Color3(1, 1, 0);
        grMat.emissiveColor = new Color3(.5, .5, 0);
        godrayMesh.material = grMat;

        var godrays = new VolumetricLightScatteringPostProcess(
            'godrays', 1.0, camera, godrayMesh, 100, Texture.BILINEAR_SAMPLINGMODE, engine, false
        );

        // no particles in this demo, so we leave this false
        if (godrays['_volumetricLightScatteringRTT']) {
            godrays['_volumetricLightScatteringRTT'].renderParticles = true;
        }

        // some advanced godrays settings for you to play-with
        godrays.exposure = 0.35;
        
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
                        <Panel header={<div><strong>Home</strong> spinning box...</div>} bsStyle="success">
                            <p><strong>testing</strong> testing :)</p>
                        </Panel>
                    </div>
                </div>

                <Well bsSize="small" className="text-center">
                    <ReactBabylonJsScene
                        onSceneMount={this.onSceneMount}
                        visible={true}
                        shadersRepository={'/shaders/'}
                        width={600}
                        height={200}
                    />
                </Well>
            </div>
        );
    }
}
