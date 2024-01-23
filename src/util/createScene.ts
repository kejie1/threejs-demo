/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-22 16:40:16
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-23 11:28:36
 * @Description:
 */
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Object3D,
  Vector3,
  AxesHelper,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
type ThreeConfigType = {
  width: number;
  height: number;
  container: HTMLElement;
  backgroundColor?: string;
  cameraPosition?: Vector3;
  cameraTarget?: Vector3;
  control?: boolean;
  axes?: boolean;
  axesSize?: number | undefined;
  stats?: boolean | undefined;
};
export class CreateScene {
  options: ThreeConfigType;
  scene: Scene | undefined;
  camera: PerspectiveCamera | undefined;
  renderer: WebGLRenderer | undefined;
  animationId: number | undefined;
  stats: Stats | undefined;
  constructor(options: ThreeConfigType) {
    this.options = options;
    // 配置不存在的兜底
    if (this.options.width === undefined) {
      this.options.width = 1000;
    }

    if (this.options.height === undefined) {
      this.options.height = 800;
    }

    if (this.options.backgroundColor === undefined) {
      this.options.backgroundColor = "#000000";
    }

    if (this.options.cameraPosition === undefined) {
      this.options.cameraPosition = new Vector3(0, 0, 10);
    }

    if (this.options.cameraTarget === undefined) {
      this.options.cameraTarget = new Vector3(0, 0, 0);
    }
    if (this.options.axes && !this.options.axesSize) {
      this.options.axesSize = 100;
    }
    if (this.options.stats) this.stats = new Stats();
    this.initScene();
  }
  initScene() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      this.options.width / this.options.height,
      0.1,
      3000
    );
    this.renderer = new WebGLRenderer({
      canvas: this.options.container,
      antialias: true,
    });
    // 相机位置
    this.camera.position.set(
      this.options.cameraPosition!.x,
      this.options.cameraPosition!.y,
      this.options.cameraPosition!.z
    );
    // 相机视角位置
    this.camera.lookAt(this.options.cameraTarget!);
    this.renderer.setSize(this.options.width, this.options.height);
    // 滑动轨道
    this.options.control &&
      new OrbitControls(this.camera, this.renderer.domElement);
    //   是否需要参考线
    this.options.axes && this.scene.add(new AxesHelper(this.options.axesSize));
    // 是否显示帧率
    this.stats && document.body.appendChild(this.stats.dom);
    // 监听窗口
    window.addEventListener("reset", this.onWidowResize);
    this.animate();
  }
  //   添加模型
  addMesh(mesh: Object3D, axes?: boolean) {
    axes && mesh.add(new AxesHelper(this.options.axesSize));
    this.scene!.add(mesh);
  }
  //   渲染
  render() {
    this.renderer!.render(this.scene!, this.camera!);
  }
  //   窗口监听
  onWidowResize() {
    // 更新相机宽高比
    this.camera!.aspect = this.options.width / this.options.height;
    // 修改相机矩阵(就是摄像机的视野以及渲染画面的范围)
    this.camera!.updateProjectionMatrix();
    // 更新渲染器
    this.renderer!.setSize(this.options.width, this.options.height);
    // 设置渲染器的像素比
    this.renderer!.setPixelRatio(window.devicePixelRatio);
  }
  animate() {
    this.stats && this.stats.update();
    this.render();
    this.camera!.updateProjectionMatrix();
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }
}
