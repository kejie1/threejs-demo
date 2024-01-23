<!--
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-23 09:47:43
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-23 10:52:36
 * @Description: 
-->
<template>
    <canvas id="webgl" :width="width" :height="height"></canvas>
</template>
<script lang="ts" setup>
import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3, PointLight, PointLightHelper, AmbientLight, SpotLight, CameraHelper, DirectionalLight, DirectionalLightHelper } from 'three';
import { onMounted } from 'vue';
import { CreateScene } from '../util/createScene.ts'
const width = 1000
const height = 800
let scene: CreateScene
// 初始化时执行下渲染函数
const init = () => {
    const dom = document.getElementById('webgl') as HTMLCanvasElement
    scene = new CreateScene({ width, height, control: true, container: dom, cameraPosition: new Vector3(-50, 0, 50), axes: true, stats: true })
    const box = new BoxGeometry(10, 10, 10) // 物体
    // MeshBasicMaterial不受光照影响
    const material = new MeshLambertMaterial({
        color: 0x049EF4,//0xff0000设置材质颜色为红色
        // transparent: true,
        // opacity: 0.5
    });
    const mesh = new Mesh(box, material)
    mesh.position.set(0, 0, 0)
    // const light = new PointLight(0xfffff, 1.0, 0.0);
    // light.position.set(-50, 20, -50);
    // const lightHelper = new PointLightHelper(light, 1);
    // const light = new AmbientLight(0xfffff, 1.0)
    // const light = new SpotLight(0xfffff, 1.0)
    const light = new DirectionalLight(0xfffff, 1.0)
    const lightHelper = new DirectionalLightHelper(light, 5);
    // 光线开始位置
    light.position.set(50, 20, 30)
    // 方向光指向mesh
    light.target = mesh
    scene.addMesh(light);
    scene.addMesh(lightHelper);
    scene.addMesh(mesh)
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            mesh.rotateY(0.1)
        }, 500 * i)
    }
}

onMounted(() => {
    init()
})
</script>