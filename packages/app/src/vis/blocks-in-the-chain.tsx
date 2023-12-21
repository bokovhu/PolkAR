import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { IVisualization } from "./api";
import { $cryptoDataService } from "../services";

interface VisualizedBlock {
    hash: string;
    parentHash: string;
    x: number;
    y: number;
    z: number;
}

function VisualizeBlocksInTheChain(
    props: {}
) {
    const visContainerRef = useRef<HTMLDivElement>(null);

    const dimensionsRef = useRef<{ width: number, height: number }>({ width: 0, height: 300 });
    const newBlocksRef = useRef<Array<VisualizedBlock>>([]);
    const blockObjectsRef = useRef<Array<{ block: VisualizedBlock, mesh: THREE.Mesh }>>([]);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, dimensionsRef.current.width / dimensionsRef.current.height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(dimensionsRef.current.width, dimensionsRef.current.height);
        visContainerRef.current!.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.z = 5;

        const addBlock = (block: VisualizedBlock) => {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(block.x, block.y, block.z);
            scene.add(cube);
            blockObjectsRef.current.push({
                block,
                mesh: cube
            });

            // Try to find parent block, and connect them with a line
            const parentBlock = blockObjectsRef.current.find((b) => b.block.hash === block.parentHash);
            if (parentBlock) {
                const material = new THREE.LineBasicMaterial({ color: 0xffffff });
                const points = [
                    new THREE.Vector3(block.x, block.y, block.z),
                    new THREE.Vector3(parentBlock.block.x, parentBlock.block.y, parentBlock.block.z),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, material);
                scene.add(line);
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);

            if (newBlocksRef.current.length > 0) {
                newBlocksRef.current.forEach(addBlock);
                newBlocksRef.current = [];
            }

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            dimensionsRef.current = { width: visContainerRef.current!.clientWidth, height: visContainerRef.current!.clientHeight };
            camera.aspect = dimensionsRef.current.width / dimensionsRef.current.height;
            camera.updateProjectionMatrix();
            renderer.setSize(dimensionsRef.current.width, dimensionsRef.current.height);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            visContainerRef.current?.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(
        () => {
            const api = $cryptoDataService.api!;
            let unsubscribe: (() => void) | null = null;
            const asyncLogic = async () => {
                unsubscribe = await api.rpc.chain.subscribeNewHeads(
                    async (header) => {
                        const newData = [];
                        newData.push({
                            hash: header.hash.toHex(),
                            parentHash: header.parentHash.toHex(),
                            x: 5.0 * (Math.random() - 0.5),
                            y: 5.0 * (Math.random() - 0.5),
                            z: 5.0 * (Math.random() - 0.5),
                        });
                        newBlocksRef.current.push(...newData);
                    }
                )
            };
            asyncLogic();

            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        },
        []
    );

    return <div ref={visContainerRef}></div>
}

export const BlocksInTheChain: IVisualization = {
    id: 'blocks-in-the-chain',
    name: 'Blocks in the Chain',
    description: 'Visualize the blocks in the chain',
    parameters: [],
    component: ({ }) => (
        <VisualizeBlocksInTheChain />
    )
};
