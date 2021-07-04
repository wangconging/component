<template>
  <div><div id="canvas-frame" /></div>
</template>

<script>
import THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      cube: null,
      width: 0,
      height: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this.threeStart();
    }, 1000);
  },
  methods: {
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(this.width, this.height);
      document.getElementById("canvas-frame").appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0xffffff, 1.0);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
      this.camera.position.x = 0;
      this.camera.position.y = 1000;
      this.camera.position.z = 0;
      this.camera.up.x = 0;
      this.camera.up.y = 0;
      this.camera.up.z = 1;
      this.camera.lookAt({
        x: 0,
        y: 0,
        z: 0,
      });
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initLight() {
     var light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
      light.position.set(100, 100, 200);
      this.scene.add(light);
    },
    initObject() {
      var geometry = new THREE.Geometry();
      var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
      });
      var color1 = new THREE.Color(0x444444),
        color2 = new THREE.Color(0xff0000);
      // 线的材质可以由2点的颜色决定
      var p1 = new THREE.Vector3(-100, 0, 100);
      var p2 = new THREE.Vector3(100, 0, -100);
      geometry.vertices.push(p1);
      geometry.vertices.push(p2);
      geometry.colors.push(color1, color2);
      var line = new THREE.Line(geometry, material, THREE.LinePieces);
      this.scene.add(line);
    },
    render() {
      renderer.clear();
      renderer.render(this.scene, this.camera);
      requestAnimationFrame(render);
    },
    threeStart() {
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initObject();
      this.render();
    },
  },
};
</script>

<style>
div#canvas-frame {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
}
</style>
