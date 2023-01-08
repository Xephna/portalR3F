import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import portalVertexShader from './shaders/portal/vertex'
import portalFragmentShader from './shaders/portal/fragment'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
	{
		uTime: 0,
		uColorStart: new THREE.Color('#ffffff'),
		uColorEnd: new THREE.Color('#000000')
	},
	portalVertexShader,
	portalFragmentShader
)

extend({PortalMaterial})



export default function Experience()
{
	const {nodes} = useGLTF('./model/portal1.glb')

	const bakedTexture = useTexture('./model/baked.jpg')
	bakedTexture.flipY = false
	console.log(nodes);

	const portalMaterial = useRef()

	useFrame((state, delta)=>{
		portalMaterial.current.uTime += delta * 2
	})

    return <>
		<color args={['#1a1f32']} attach='background' />

        <OrbitControls makeDefault />
		<Center>
			<mesh geometry={nodes.baked.geometry}>
				<meshBasicMaterial map={bakedTexture} />
			</mesh>

			<mesh
				geometry={nodes.poleLightA.geometry}
				position={[-1.568,1.355,-1.155]}
			>
				<meshBasicMaterial color='#ffffe5' />
			</mesh>

			<mesh
				geometry={nodes.poleLightB.geometry}
				position={[-0.2,1.358,-1.13]}
			>
				<meshBasicMaterial color='#ffffe5' />
			</mesh>

			<mesh
				geometry={nodes.portalLight.geometry}
				position={[-0.87,0.85,-3]}
				// position={nodes.portalLight.position}
				rotation={nodes.portalLight.rotation}
			>
				<portalMaterial ref={portalMaterial} />
			</mesh>
			
			<Sparkles
				size={5}
				scale={[4,2,4]}
				position={[-1,1,-1.3]}
				speed={0.3}
				count={45}
			/>
		</Center>
    </>
}