import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import './HeroVisual.css'

const DEPTH = 140
const PALETTE = ['#7df9ff', '#9ad2ff', '#ff5fd0', '#ffffff']

/** 10秒ループを構成するカット定義 */
type CutConfig = {
  dur: number
  pos: [number, number, number]
  pitch: number
  yaw: number
  roll: number
  fov: number
  /** シーン全体の流速倍率(1 = 基準、小さいとスローモーション) */
  speed: number
  /** カット内でカメラが前進する速度 */
  dolly: number
  tint: string
  ringA: string
  ringB: string
  bg: string
  layout: 'left' | 'right' | 'center' | 'title'
  tag?: string
  line: string
  sub?: string
}

const CUTS: CutConfig[] = [
  {
    dur: 2.5,
    pos: [0, 0, 5],
    pitch: 0,
    yaw: 0,
    roll: 0,
    fov: 74,
    speed: 1,
    dolly: 1.6,
    tint: '#ffffff',
    ringA: '#37e7ff',
    ringB: '#ff4dd2',
    bg: '#04030f',
    layout: 'left',
    tag: 'EPISODE 01 / OPENING',
    line: '駆け抜けろ、',
  },
  {
    dur: 2.5,
    pos: [0, -3.4, 5],
    pitch: 0.06,
    yaw: 0,
    roll: -0.32,
    fov: 92,
    speed: 1.9,
    dolly: 3,
    tint: '#ffc4e6',
    ringA: '#ff4dd2',
    ringB: '#ffb347',
    bg: '#0d0312',
    layout: 'right',
    line: 'もっと速く——',
  },
  {
    dur: 2.5,
    pos: [6.5, 1.2, 5],
    pitch: 0.05,
    yaw: 0.55,
    roll: 0.14,
    fov: 70,
    speed: 1.3,
    dolly: 1,
    tint: '#cfe8ff',
    ringA: '#7df9ff',
    ringB: '#b39cff',
    bg: '#020614',
    layout: 'center',
    line: '世界が、開ける。',
  },
  {
    dur: 2.5,
    pos: [0, 0, 8],
    pitch: 0,
    yaw: 0,
    roll: 0,
    fov: 58,
    speed: 0.3,
    dolly: -0.5,
    tint: '#ffffff',
    ringA: '#37e7ff',
    ringB: '#ff4dd2',
    bg: '#04030f',
    layout: 'title',
    tag: 'SCHOOL WORKSPACE',
    line: '光の先へ。',
    sub: 'MAIN VISUAL — 2026',
  },
]

const TOTAL = CUTS.reduce((sum, c) => sum + c.dur, 0)

/** epoch(起点ミリ秒)から現在のカット番号・カット内経過秒・全体経過秒を求める */
function timelineAt(epoch: number) {
  const t = ((performance.now() - epoch) / 1000) % TOTAL
  let acc = 0
  for (let i = 0; i < CUTS.length; i++) {
    if (t < acc + CUTS[i].dur) return { cut: i, local: t - acc, t }
    acc += CUTS[i].dur
  }
  return { cut: 0, local: 0, t }
}

/** DOM 側でカット番号を state として追う(3D 側と同じ epoch を共有して同期) */
function useCut(epoch: number) {
  const [cut, setCut] = useState(0)
  useEffect(() => {
    let raf = 0
    const loop = () => {
      setCut(timelineAt(epoch).cut)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [epoch])
  return cut
}

/** カメラの脇を高速で流れていく光の線(スピード線) */
function SpeedLines({
  epoch,
  tint,
  count = 1200,
}: {
  epoch: number
  tint: string
  count?: number
}) {
  const ref = useRef<THREE.LineSegments>(null)

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 6)
    const colors = new Float32Array(count * 6)
    const speeds = new Float32Array(count)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      // カメラ進行軸のまわりにドーナツ状に配置(中心付近は空けて抜け感を出す)
      const radius = 2.5 + Math.random() ** 1.5 * 16
      const theta = Math.random() * Math.PI * 2
      const x = Math.cos(theta) * radius
      const y = Math.sin(theta) * radius
      const z = -Math.random() * DEPTH
      const length = 2 + Math.random() * 6

      positions.set([x, y, z, x, y, z - length], i * 6)
      speeds[i] = 45 + Math.random() * 90

      color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)])
      const brightness = 0.6 + Math.random() * 0.9
      // 先頭は明るく、尾は暗く — 残像らしさ
      colors.set([...color.toArray().map((v) => v * brightness), 0, 0, 0], i * 6)
    }
    return { positions, colors, speeds }
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    const mul = CUTS[timelineAt(epoch).cut].speed
    const pos = ref.current.geometry.attributes.position
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      const dz = speeds[i] * mul * Math.min(delta, 0.05)
      arr[i * 6 + 2] += dz
      arr[i * 6 + 5] += dz
      if (arr[i * 6 + 5] > 8) {
        arr[i * 6 + 2] -= DEPTH
        arr[i * 6 + 5] -= DEPTH
      }
    }
    pos.needsUpdate = true
  })

  return (
    <lineSegments ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        color={tint}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  )
}

/** 舞い散る光の粒 */
function StreakParticles({ epoch, count = 500 }: { epoch: number; count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions.set(
        [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -Math.random() * DEPTH],
        i * 3,
      )
      speeds[i] = 25 + Math.random() * 50
    }
    return { positions, speeds }
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    const mul = CUTS[timelineAt(epoch).cut].speed
    const pos = ref.current.geometry.attributes.position
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += speeds[i] * mul * Math.min(delta, 0.05)
      if (arr[i * 3 + 2] > 8) arr[i * 3 + 2] -= DEPTH
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#bfe9ff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
        sizeAttenuation
      />
    </points>
  )
}

/** くぐり抜けていくネオンリング */
function WarpRings({
  epoch,
  ringA,
  ringB,
  count = 7,
}: {
  epoch: number
  ringA: string
  ringB: string
  count?: number
}) {
  const group = useRef<THREE.Group>(null)
  const spacing = DEPTH / count

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const mul = CUTS[timelineAt(epoch).cut].speed
    group.current.children.forEach((ring, i) => {
      ring.position.z += 32 * mul * Math.min(delta, 0.05)
      if (ring.position.z > 10) ring.position.z -= DEPTH
      ring.rotation.z = t * 0.4 + i * 0.8
      const s = 1 + Math.sin(t * 2 + i) * 0.04
      ring.scale.setScalar(s)
    })
  })

  return (
    <group ref={group}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} position={[0, 0, -i * spacing]} frustumCulled={false}>
          <torusGeometry args={[7 + (i % 3), 0.05, 8, 96]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? ringA : ringB}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** 消失点の光球 — 走った先にある「光」 */
function VanishingLight() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref} position={[0, 0, -95]}>
      <sphereGeometry args={[2.6, 24, 24]} />
      <meshBasicMaterial color={[2.5, 3.2, 4]} fog={false} toneMapped={false} />
    </mesh>
  )
}

/** 足元を流れるグリッド */
function RushingFloor({ epoch }: { epoch: number }) {
  const group = useRef<THREE.Group>(null)
  const scroll = useRef(0)
  useFrame((_, delta) => {
    if (!group.current) return
    const mul = CUTS[timelineAt(epoch).cut].speed
    // セル1マスぶんでループさせて無限スクロールに見せる
    scroll.current = (scroll.current + 26 * mul * Math.min(delta, 0.05)) % 2
    group.current.position.z = scroll.current - 1
  })
  return (
    <group ref={group}>
      <Grid
        position={[0, -5.5, -20]}
        args={[10, 10]}
        cellSize={2}
        sectionSize={10}
        cellColor="#173a5e"
        sectionColor="#1e6f8f"
        fadeDistance={90}
        fadeStrength={2}
        infiniteGrid
      />
    </group>
  )
}

/** カットごとのカメラワーク — 切替時の FOV キックとシェイクが疾走感の要 */
function CameraRig({ epoch }: { epoch: number }) {
  useFrame((state) => {
    const { cut, local, t } = timelineAt(epoch)
    const cfg = CUTS[cut]
    const cam = state.camera as THREE.PerspectiveCamera

    // カット頭で強く、指数減衰するインパクト量
    const kick = Math.exp(-local * 5)
    const shake = kick * 0.06

    cam.position.set(
      cfg.pos[0] + state.pointer.x * 0.6 + Math.sin(t * 1.7) * 0.06 + Math.sin(local * 83) * shake,
      cfg.pos[1] + state.pointer.y * 0.4 + Math.sin(t * 1.3) * 0.1 + Math.cos(local * 71) * shake,
      cfg.pos[2] - cfg.dolly * local,
    )
    cam.rotation.set(
      cfg.pitch,
      cfg.yaw - state.pointer.x * 0.02,
      cfg.roll + Math.sin(t * 0.9) * 0.03,
    )
    cam.fov = cfg.fov + kick * 14 + Math.sin(t * 2.3) * 1.2
    cam.updateProjectionMatrix()
  })
  return null
}

/** 1文字ずつ叩き込むタイトル文字 */
function SlamText({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="slam-char" style={{ animationDelay: `${i * 0.045}s` }}>
          {ch}
        </span>
      ))}
    </>
  )
}

export default function HeroVisual() {
  const epoch = useMemo(() => performance.now(), [])
  const cut = useCut(epoch)
  const cfg = CUTS[cut]

  return (
    <section className="hero-visual">
      <Canvas
        className="hero-canvas"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 74, near: 0.1, far: 200 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[cfg.bg]} />
        <fog attach="fog" args={[cfg.bg, 10, 130]} />
        <CameraRig epoch={epoch} />
        <SpeedLines epoch={epoch} tint={cfg.tint} />
        <StreakParticles epoch={epoch} />
        <WarpRings epoch={epoch} ringA={cfg.ringA} ringB={cfg.ringB} />
        <VanishingLight />
        <RushingFloor epoch={epoch} />
        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.25} mipmapBlur radius={0.7} />
          <ChromaticAberration offset={[0.0016, 0.0008]} radialModulation modulationOffset={0.5} />
          <Noise opacity={0.06} />
          <Vignette offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Canvas>

      {/* key=cut で毎カット DOM を作り直し、CSS アニメーションを再生し直す */}
      <div key={cut} className={`hero-overlay layout-${cfg.layout}`}>
        {cfg.tag && <p className="hero-tag">{cfg.tag}</p>}
        <p className={`hero-line ${cfg.layout === 'title' ? 'hero-line-title' : ''}`}>
          <SlamText text={cfg.line} />
        </p>
        {cfg.sub && <p className="hero-sub">{cfg.sub}</p>}
      </div>

      <div key={`flash-${cut}`} className="cut-flash" aria-hidden="true" />

      <div className="cut-indicator" aria-hidden="true">
        <span className="cut-label">
          CUT {String(cut + 1).padStart(2, '0')} / {String(CUTS.length).padStart(2, '0')}
        </span>
        <span className="cut-ticks">
          {CUTS.map((_, i) => (
            <i key={i} className={i === cut ? 'on' : ''} />
          ))}
        </span>
      </div>

      <div className="hero-frame" aria-hidden="true" />
    </section>
  )
}
