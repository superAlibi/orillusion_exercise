<script setup lang="ts">
import { Engine3D, Scene3D, Object3D, Camera3D, DirectLight, HoverCameraController, View3D, AtmosphericComponent, MeshRenderer, BoxGeometry, LitMaterial, } from '@orillusion/core'
import { onMounted, ref } from 'vue';
import { RandomObjs } from './components/random';
const canvsref = ref<HTMLCanvasElement>()
onMounted(() => {

  
  // initializa engine
  Engine3D.init({
    canvasConfig: {
      canvas: canvsref.value
    }
  }).then(() => {


    // create new scene as root node
    let scene3D: Scene3D = new Scene3D()
    // add an Atmospheric sky enviroment
    let sky = scene3D.addComponent(AtmosphericComponent)
    sky.sunY = 0.6
    // create camera
    let cameraObj: Object3D = new Object3D()
    let camera = cameraObj.addComponent(Camera3D)
    // adjust camera view
    camera.perspective(60, Engine3D.aspect, 1, 5000.0)
    // set camera controller
    let controller = cameraObj.addComponent(HoverCameraController)
    controller.setCamera(0, 0, 15)
    // add camera node
    scene3D.addChild(cameraObj)
    // create light
    let light: Object3D = new Object3D()
    // add direct light component
    let component: DirectLight = light.addComponent(DirectLight)
    // adjust lighting
    light.rotationX = 45
    light.rotationY = 30
    component.intensity = 1
    // add light object
    scene3D.addChild(light)
    RandomObjs.forEach((v) => {
      console.log(v);
      
      // add object
      // scene3D.addChild(v)

    })
 /*    const obj: Object3D = new Object3D()
    // add MeshRenderer
    let mr: MeshRenderer = obj.addComponent(MeshRenderer)
    // set geometry
    mr.geometry = new BoxGeometry(5, 5, 5)
    // set material
    mr.material = new LitMaterial()
    // set rotation
    obj.rotationY = 45
    scene3D.addChild(obj) */
    // create a view with target scene and camera
    let view = new View3D()
    view.scene = scene3D
    view.camera = camera
    // start render
    Engine3D.startRenderView(view)
  })
})
</script>

<template>
  <canvas ref="canvsref"></canvas>
</template>

<style scoped>
canvas {
  height: 100vh;
  width: 100vw;
  display: block;
}
</style>
