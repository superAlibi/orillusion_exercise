import { BoxGeometry, Color, LitMaterial, MeshRenderer, Object3D, Vector3 } from "@orillusion/core";

// 显示区域的最大宽度
const defaultXmax = 2000, defaultYmax = 2000, defaultZmax = 2000;
// 单个模型的长宽高
const defaultWmax = 20, defaultHmax = 20, defaultLmax = 20;


const count = 5000;
interface Param {
  Xmax: number,
  Ymax: number,
  Zmax: number,
  // 单个模型的长宽高
  Wmax: number, Hmax: number, Lmax: number;
}

export const GetRandomObj=(params: Partial<Param> = {}) =>{
  Object.assign(params || {}, {
    Xmax: defaultXmax, Ymax: defaultYmax, Zmax: defaultZmax,
    Wmax: defaultWmax, Hmax: defaultHmax, Lmax: defaultLmax
  })
  const { Xmax, Ymax, Zmax,
    Wmax, Hmax, Lmax } = params as Param
  const Objs: Object3D[] = []
  
  for (let index = 0; index < count; index++) {
    const obj = new Object3D()
    
    
    

    let mr = obj.addComponent(MeshRenderer)

    mr.geometry = new BoxGeometry(Wmax * Math.random(), Hmax * Math.random(), Lmax * Math.random())

    mr.material = new LitMaterial()
    mr.material.setUniformColor('baseColor', new Color(Math.random(), Math.random(), Math.random()))
    obj.localPosition = new Vector3(Xmax * Math.random(), Ymax * Math.random(), Zmax * Math.random())

    obj.rotationY = 45
    Objs.push(obj)


  }
  return Objs
}
export const RandomObjs = GetRandomObj()