<!--
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-23 09:47:43
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-23 15:25:37
 * @Description: 
-->
<template>
    <canvas id="webgl" :width="width" :height="height"></canvas>
</template>
<script lang="ts" setup>
import { Color, Mesh, Vector3, PointLight, PointLightHelper, CapsuleGeometry, MeshPhongMaterial } from 'three';
import { onMounted } from 'vue';
import { CreateScene } from '../util/createScene.ts'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
const width = 1000
const height = 800
const gui = new GUI()
let scene: CreateScene
const options = {
    color: 0x049EF4,//0xff0000设置材质颜色为红色
    shininess: 100,
    specular: 0X44444,
    transparent: true,
    opacity: 0.5
}
// 初始化时执行下渲染函数
const init = () => {
    const dom = document.getElementById('webgl') as HTMLCanvasElement
    scene = new CreateScene({ width, height, control: true, container: dom, cameraPosition: new Vector3(300, 300, 300), axes: true, stats: true })
    // MeshBasicMaterial不受光照影响
    const material = new MeshPhongMaterial(options);
    const light = new PointLight(0xfffff, 1.0, 0.0);
    light.position.set(500, 500, 500);
    const lightHelper = new PointLightHelper(light, 5);
    scene.addMesh(light);
    scene.addMesh(lightHelper);
    const cap = new CapsuleGeometry(50, 50, 200, 400)
    const mesh = new Mesh(cap, material)
    scene.addMesh(mesh)
    const materialGUI = gui.addFolder('颜色')
    materialGUI.addColor(mesh.material, 'color').name('模型颜色')
    materialGUI.addColor(mesh.material, 'specular').name('高光')
    materialGUI.add(light, 'intensity', 0, 2).name('光线强度')
    materialGUI.add(mesh.material, 'opacity', [0, 0.2, 0.4, 0.6, 0.8, 10]).name('透明度')
    materialGUI.add(mesh.material, 'transparent').name('透明度')
    const positionGUI = gui.addFolder('定位')
    positionGUI.add(mesh.position, 'x', 0, 1000, 2)
    positionGUI.add(mesh.position, 'y', 0, 1000, 2)
    positionGUI.add(mesh.position, 'z', 0, 1000, 2)
    positionGUI.add(mesh.position, 'y', {
        left: -100,
        center: 0,
        right: 100
    }).name('方位选择')
    positionGUI.close()
}

onMounted(() => {
    init()
})
</script>