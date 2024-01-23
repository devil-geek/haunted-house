import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

// Fog

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

const axesHelper = new THREE.AxesHelper(6)
axesHelper.visible = false
scene.add(axesHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
// const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
// const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
// const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// bricksColorTexture.colorSpace = THREE.SRGBColorSpace

const woodColorTexture = textureLoader.load('/textures/wood/color.jpg')
const woodAmbientOcclusionTexture = textureLoader.load('/textures/wood/ambientOcclusion.jpg')
const woodNormalTexture = textureLoader.load('/textures/wood/normal.jpg')
const woodRoughnessTexture = textureLoader.load('/textures/wood/roughness.jpg')

woodColorTexture.colorSpace = THREE.SRGBColorSpace

const bricksColorTexture = textureLoader.load('/textures/wall/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/wall/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/wall/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/wall/roughness.jpg')

bricksColorTexture.colorSpace = THREE.SRGBColorSpace

const wallRepeat = 3
bricksColorTexture.repeat.set(wallRepeat, wallRepeat)
bricksAmbientOcclusionTexture.repeat.set(wallRepeat, wallRepeat)
bricksNormalTexture.repeat.set(wallRepeat, wallRepeat)
bricksRoughnessTexture.repeat.set(wallRepeat, wallRepeat)

bricksColorTexture.wrapS = THREE.RepeatWrapping
bricksAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
bricksNormalTexture.wrapS = THREE.RepeatWrapping
bricksRoughnessTexture.wrapS = THREE.RepeatWrapping

bricksColorTexture.wrapT = THREE.RepeatWrapping
bricksAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
bricksNormalTexture.wrapT = THREE.RepeatWrapping
bricksRoughnessTexture.wrapT = THREE.RepeatWrapping


const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.colorSpace = THREE.SRGBColorSpace


const glassColorTexture = textureLoader.load('/textures/glass/color.jpg')
const glassAmbientOcclusionTexture = textureLoader.load('/textures/glass/ambientOcclusion.jpg')
const glassHeightTexture = textureLoader.load('/textures/glass/height.png')
const glassNormalTexture = textureLoader.load('/textures/glass/normal.jpg')
const glassMetalnessTexture = textureLoader.load('/textures/glass/metallic.jpg')
const glassRoughnessTexture = textureLoader.load('/textures/glass/roughness.jpg')
const glassAlphaTexture = textureLoader.load('/textures/glass/opacity.jpg')

glassColorTexture.colorSpace = THREE.SRGBColorSpace

const booTexture = textureLoader.load('/textures/booface.jpg')
booTexture.colorSpace = THREE.SRGBColorSpace

const bushColorTexture = textureLoader.load('/textures/bush/color.jpg')
const bushAmbientOcclusionTexture = textureLoader.load('/textures/bush/ambientOcclusion.jpg')
const bushNormalTexture = textureLoader.load('/textures/bush/normal.jpg')
const bushRoughnessTexture = textureLoader.load('/textures/bush/roughness.png')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const wallMaterial = new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
})

const woodMaterial = new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    aoMap: woodAmbientOcclusionTexture,
    normalMap: woodNormalTexture,
    roughnessMap: woodRoughnessTexture
})

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(3, 5, 4.5),
    wallMaterial
)

const roomLeft = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 3.5),
    woodMaterial
)

const roomRight = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 1.5),
    woodMaterial
)

walls.position.y = 2.5

roomLeft.position.y = 1
roomLeft.position.x = -2.2

roomRight.position.y = 3.5
roomRight.position.x = 1.2
roomRight.position.z = 2

house.add(walls, roomLeft, roomRight)

// Roofs
const roofMaterial = new THREE.MeshStandardMaterial({ color: '#b35f45' })
const roofMesh = new THREE.Mesh(
    new THREE.ConeGeometry(3.8, 1, 4),
    roofMaterial
)

roofMesh.rotation.y = Math.PI * 0.25
roofMesh.position.y = 5.5

const roofDoor = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 0.4, 4),
    roofMaterial
)

roofDoor.rotation.y = Math.PI * 0.25
roofDoor.position.y = 2.15
roofDoor.position.z = 1.9

const roofGroup = new THREE.Group()
roofGroup.add(roofMesh, roofDoor)
roofGroup.scale.x = 0.7

const roofLeft = new THREE.Mesh(
    new THREE.ConeGeometry(2.8, 0.6, 4),
    roofMaterial
)
roofLeft.rotation.y = Math.PI * 0.25
roofLeft.position.y = 2.3
roofLeft.position.x = -1.5

const roofRight = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 0.5, 4),
    roofMaterial
)
roofRight.rotation.y = Math.PI * 0.25
roofRight.position.y = 4.75
roofRight.position.x = 1.25
roofRight.position.z = 2

house.add(roofGroup, roofLeft, roofRight)


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 2.1, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)

door.position.y = 1
door.position.z = 2.26
house.add(door)


// Windows
const windowMaterial = new THREE.MeshStandardMaterial({
    map: glassColorTexture,
    transparent: true,
    alphaMap: glassAlphaTexture,
    aoMap: glassAmbientOcclusionTexture,
    displacementMap: glassHeightTexture,
    displacementScale: 0.1,
    normalMap: glassNormalTexture,
    metalnessMap: glassMetalnessTexture,
    roughnessMap: glassRoughnessTexture
})
const windowFront = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 1.2),
    windowMaterial
)
windowFront.position.y = 3.6
windowFront.position.z = 2.2
windowFront.position.x = -0.6

const windowBack = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 1.2),
    new THREE.MeshStandardMaterial({ color: '#ffa44f' })
)
windowBack.position.y = 3.6
windowBack.position.z = 2.255
windowBack.position.x = -0.6


house.add(windowFront, windowBack)


// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushAmbientOcclusionTexture,
    normalMap: bushNormalTexture,
    displacementMap: bushRoughnessTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.4, 0.4, 0.4)
bush1.position.set(1, 0.2, 2.3)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.5, 0.1, 2.2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1, 0.1, 2.3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1.5, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)


// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 4 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)

    grave.castShadow = true
    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
}

// Floor
const floorMaterial = new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
})

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    floorMaterial
)
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


/**
 * Ghosts
 */
const ghostMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.6, map: booTexture })
const ghostGeometry = new THREE.SphereGeometry(1, 12, 12)

const ghost1 = new THREE.Group()
const ghost1Light = new THREE.PointLight('#ff00ff', 6, 3)
const ghost1Mesh = new THREE.Mesh(ghostGeometry, ghostMaterial)
ghost1Mesh.scale.set(0.4, 0.4, 0.4)

ghost1.add(ghost1Light, ghost1Mesh)
scene.add(ghost1)

const ghost2Mesh = new THREE.Mesh(ghostGeometry, ghostMaterial)
ghost2Mesh.scale.set(0.4, 0.4, 0.4)
ghost2Mesh.rotateY(Math.PI)

const ghost2 = new THREE.Group()
const ghost2Light = new THREE.PointLight('#00ffff', 6, 3)
ghost2.add(ghost2Light, ghost2Mesh)
scene.add(ghost2)

const ghost3Mesh = new THREE.Mesh(ghostGeometry, ghostMaterial)
ghost3Mesh.scale.set(0.4, 0.4, 0.4)
ghost3Mesh.rotateY(Math.PI)

const ghost3 = new THREE.Group()
const ghost3Light = new THREE.PointLight('#ffff00', 6, 3)
ghost3.add(ghost3Light, ghost3Mesh)

scene.add(ghost3)

ghost1Light.castShadow = true
ghost2Light.castShadow = true
ghost3Light.castShadow = true

ghost1Light.shadow.mapSize.width = 256
ghost1Light.shadow.mapSize.height = 256
ghost1Light.shadow.camera.far = 7


ghost2Light.shadow.mapSize.width = 256
ghost2Light.shadow.mapSize.height = 256
ghost2Light.shadow.camera.far = 7

ghost3Light.shadow.mapSize.width = 256
ghost3Light.shadow.mapSize.height = 256
ghost3Light.shadow.camera.far = 7


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 3, 7)
doorLight.position.set(0, 1.8, 2.9)
house.add(doorLight)

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Shadows
moonLight.castShadow = true
doorLight.castShadow = true
walls.castShadow = true
roomLeft.castShadow = true
roomRight.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
floor.receiveShadow = true
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    ghost1.lookAt(house.position)
    ghost2.lookAt(house.position)
    ghost3.lookAt(house.position)
    // Update controls
    controls.update()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    //ghost1.rotation.y = elapsedTime * 0.4

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()