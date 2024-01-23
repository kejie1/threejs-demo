<!--
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-22 14:27:04
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-23 09:40:46
 * @Description: 
-->

<template>
    <canvas id="webgl" :width="width" :height="height"></canvas>
</template>
<script lang="ts" setup>
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { onMounted } from 'vue';
import { CreateScene } from '../util/createScene.ts'
const width = 1000
const height = 800
let scene: CreateScene

// 初始化时执行下渲染函数
const init = () => {
    const dom = document.getElementById('webgl') as HTMLCanvasElement
    scene = new CreateScene({ width, height, control: true, container: dom, cameraPosition: new Vector3(-100, 0, 100), axes: true })
    const box = new BoxGeometry(10, 10, 10) // 物体
    const material = new MeshBasicMaterial({
        color: 0xff0000,//0xff0000设置材质颜色为红色
        transparent: true,
        opacity: 0.5
    });
    const mesh = new Mesh(box, material)
    mesh.position.set(0, 0, 0)
    scene.addMesh(mesh)
}

onMounted(() => {
    init()
})
</script>