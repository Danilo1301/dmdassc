import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Three
{
    public static camera: THREE.OrthographicCamera
    public static scene: THREE.Scene
    public static renderer: THREE.WebGLRenderer
    


    public static init()
    {
        const frustumSize = 6;
        const aspect = window.innerWidth / window.innerHeight;
        const camera = this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );

        camera.position.set( -200, 200, 200 );

        const scene = this.scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xFF00FF );
        camera.lookAt( scene.position );

        const renderer = this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( 1 );
        renderer.setSize( 400, 400 );

        document.body.appendChild( this.renderer.domElement );

        this.loadGLTF('')
    }

    public static loadGLTF(path: string)
    {
        const onProgress = () => {
            console.log("onProgress")
        }
    
        const onError = () => {
            console.log("onError")
        }
    
        const scene = this.scene;

        var loader = new GLTFLoader();
        loader.load('/static/cafemania/assets/player.glb', function(gltf) {
            //playerObj = gltf.scene;
    
            scene.add(gltf.scene);
        }, onProgress, onError);
    }
}