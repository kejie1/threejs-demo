<!--
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-23 09:47:43
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-23 11:23:07
 * @Description: 
-->
<template>
    <canvas id="webgl" :width="width" :height="height"></canvas>
</template>
<script lang="ts" setup>
import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3, PointLight, PointLightHelper, CapsuleGeometry, MeshBasicMaterial, MeshPhongMaterial } from 'three';
import { onMounted } from 'vue';
import { CreateScene } from '../util/createScene.ts'
const width = 1000
const height = 800
let scene: CreateScene
// 初始化时执行下渲染函数
const init = () => {
    const dom = document.getElementById('webgl') as HTMLCanvasElement
    scene = new CreateScene({ width, height, control: true, container: dom, cameraPosition: new Vector3(300, 300, 300), axes: true, stats: true })
    const box = new BoxGeometry(10, 10, 10) // 物体
    // MeshBasicMaterial不受光照影响
    const material = new MeshPhongMaterial({
        color: 0x049EF4,//0xff0000设置材质颜色为红色
        shininess: 100,
        specular: 0X44444
        // transparent: true,
        // opacity: 0.5
    });
    const light = new PointLight(0xfffff, 1.0, 0.0);
    light.position.set(500, 500, 500);
    const lightHelper = new PointLightHelper(light, 5);
    scene.addMesh(light);
    scene.addMesh(lightHelper);
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const mesh = new Mesh(box, material)
            mesh.position.set(20 * i, 0, 20 * j)
            scene.addMesh(mesh)
        }
    }
    const cap = new CapsuleGeometry(50, 50, 200, 400)
    const mesh = new Mesh(cap, material)
    scene.addMesh(mesh)

}

onMounted(() => {
    init()
})
</script>