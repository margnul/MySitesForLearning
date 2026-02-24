import * as THREE from 'three'

import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// В конструкторе или перед созданием света


class PhotoCard {
  constructor(wrapperElement, imageUrl, normalMapUrl) {
    this.wrapperElement = wrapperElement
    this.imageUrl = imageUrl
    this.normalMapUrl = normalMapUrl // ссылка на normal map
    if (!this.wrapperElement) return

    this.rotatingSpeed = 10
    this.cardTargetRotation = { x: 0, y: 0 }

    RectAreaLightUniformsLib.init();

    this.initScene()
    this.initCamera()
    this.initRenderer()
    this.initCard()
    this.bindEvents()
    this.animate()
  }

  initScene() {
    this.scene = new THREE.Scene()
  }

  initCamera() {
    const width = this.wrapperElement.offsetWidth
    const height = this.wrapperElement.offsetHeight
    console.log(this.wrapperElement.offsetHeight)
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    this.camera.position.z = 3
  }

  initRenderer() {
    const width = this.wrapperElement.offsetWidth
    const height = this.wrapperElement.offsetHeight

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.physicallyCorrectLights = true

    this.wrapperElement.appendChild(this.renderer.domElement)
  }

  // ─── МАТЕРИАЛ ДЛЯ КАРТОЧКИ ─────────────
  createFrontMaterial() {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(this.imageUrl)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy()

    const materialOptions = {
      map: texture,
      roughness: 0.15,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.6,
    }

    // Если указан normal map, загружаем её
    if (this.normalMapUrl) {
      const normalMap = loader.load(this.normalMapUrl)
      materialOptions.normalMap = normalMap
      materialOptions.normalScale = new THREE.Vector2(0.2, 0.2) // сила эффекта
    }

    return new THREE.MeshPhysicalMaterial(materialOptions)
  }

  initCard() {
    const width = 1.4
    const height = 2
    const depth = 0.003
    const geometry = new THREE.BoxGeometry(width, height, depth)

    const frontMaterial = this.createFrontMaterial()

    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8,
      metalness: 0.0,
    })

    const materials = [
      sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, sideMaterial
    ]

    this.card = new THREE.Mesh(geometry, materials)
    this.scene.add(this.card)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    //this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(2, 3, 4)
    //this.scene.add(directionalLight)

    const sphereLight = new THREE.HemisphereLight(0xffffff, 0x000000,  2)
    this.scene.add(sphereLight)

    const rectLight = new THREE.RectAreaLight(0xffffff, 10.2, 5, 1.2);
    rectLight.position.set(0, 5, 6);
    rectLight.lookAt(this.card.position);
    this.scene.add(rectLight)
  }

  animate() {
    requestAnimationFrame(() => this.animate())

    const diffY = this.cardTargetRotation.y - this.card.rotation.y
    const diffX = this.cardTargetRotation.x - this.card.rotation.x
    const tolerance = 0.01

    if (Math.abs(diffY) > tolerance) {
      this.card.rotation.y += diffY / (100 / this.rotatingSpeed)
    }
    if (Math.abs(diffX) > tolerance) {
      this.card.rotation.x += diffX / (100 / this.rotatingSpeed)
    }

    this.renderer.render(this.scene, this.camera)
   
  }

  resetCardRotation() {
    this.cardTargetRotation.x = 0
    this.cardTargetRotation.y = 0
  }

  mouseOnCard(e) {
    const rect = this.wrapperElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = (x - rect.width / 2) / rect.width
    const dy = (y - rect.height / 2) / rect.height

    const movingX = 1.5
    const movingY = 1

    this.cardTargetRotation.y = movingX * dx
    this.cardTargetRotation.x = movingY * dy
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      const width = this.wrapperElement.offsetWidth
      const height = this.wrapperElement.offsetHeight
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    })

    document.addEventListener('mousemove', e => {
      if (this.wrapperElement.matches(':hover')) {
        this.rotatingSpeed = 10
        this.mouseOnCard(e)
      } else {
        this.rotatingSpeed = 2
        this.resetCardRotation()
      }
    })

    window.addEventListener('blur', () => this.resetCardRotation())
    document.addEventListener('visibilitychange', () => this.resetCardRotation())
    
  }
}


// Функция для добавления нескольких карточек

export function createPhotoCards(containerSelector, imageUrls, normalMapUrls) {
  const container = document.querySelector(containerSelector)
  if (!container) return

  imageUrls.forEach((url, index) => {
    const wrappers = document.querySelectorAll('[data-js-canvas-wrapper]')
    const wrapper = wrappers[index]
    const normalMap = normalMapUrls[index] || null
    new PhotoCard(wrapper, url, normalMap)
  })
}

const images = [
  '../images/photocards/photocard1.jpg',
  '../images/photocards/photocard2.jpg'
  // '../images/photocards/material_4.jpg',
  // '../images/photocards/material_5.jpg'
]

const normalMaps = [
  '../images/photocards/material3.jpg',
  '../images/photocards/material3.jpg'
]

createPhotoCards('[data-js-canvas-album]', images, normalMaps)