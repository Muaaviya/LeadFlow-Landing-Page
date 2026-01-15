import React, { useRef, useEffect, useState } from 'react';
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const ShaderCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glProgramRef = useRef<WebGLProgram | null>(null);
    const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    // Always use dark background color #010203
    const backgroundColor = [0.004, 0.008, 0.012];

    useEffect(() => {
        const gl = glRef.current;
        const program = glProgramRef.current;
        const location = glBgColorLocationRef.current;
        if (gl && program && location) {
            gl.useProgram(program);
            gl.uniform3fv(location, new Float32Array(backgroundColor));
        }
    }, [backgroundColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) { console.error("WebGL not supported"); return; }
        glRef.current = gl;

        const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
        const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;

        // Pink/ruby color theme (#EC4899 = RGB 236, 72, 153)
        vec3 foregroundColor=vec3(0.925 + v.x*0.075, 0.28 + v.y*0.15, 0.6 - v.y*v.x*0.1);
        vec3 color=mix(uBackgroundColor,foregroundColor,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) throw new Error("Could not create shader");
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
            }
            return shader;
        };

        const program = gl.createProgram();
        if (!program) throw new Error("Could not create program");
        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        glProgramRef.current = program;

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const aPosition = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        const iTimeLoc = gl.getUniformLocation(program, 'iTime');
        const iResLoc = gl.getUniformLocation(program, 'iResolution');
        glBgColorLocationRef.current = gl.getUniformLocation(program, 'uBackgroundColor');
        gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

        let animationFrameId: number;
        const render = (time: number) => {
            gl.uniform1f(iTimeLoc, time * 0.001);
            gl.uniform2f(iResLoc, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        animationFrameId = requestAnimationFrame(render);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
};

export interface PricingCardProps {
    planName: string;
    description: string;
    price: string;
    features: string[];
    buttonText: string;
    isPopular?: boolean;
    buttonVariant?: 'primary' | 'secondary';
}

export const PricingCard = ({
    planName, description, price, features, buttonText, isPopular = false, buttonVariant = 'primary'
}: PricingCardProps) => {
    return (
        <div
            className={`
        relative flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300 rounded-3xl
        backdrop-blur-xl border
        ${isPopular
                    ? 'scale-105 z-10 bg-[#1a0a14]/90 border-pink-500/50 hover:border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.15)]'
                    : 'bg-[#0e0e11]/80 border-white/10 hover:border-pink-500/70'
                }
      `}
        >
            {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-pink-400 to-pink-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-pink-500/30">
                    Most Popular
                </span>
            )}
            <div className="mb-5">
                <h3 className="text-2xl font-semibold text-pink-500 tracking-wide">{planName}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{description}</p>
            </div>
            <div className="mb-6 flex items-baseline">
                <span className="text-5xl font-light text-white">${price}</span>
                <span className="text-gray-500 ml-1 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckIcon className="w-4 h-4 text-pink-400 shrink-0" /> {feature}
                    </li>
                ))}
            </ul>
            <RippleButton
                className={`
          w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300
          ${buttonVariant === 'primary'
                        ? 'bg-linear-to-r from-pink-400 to-pink-500 hover:from-pink-300 hover:to-pink-400 text-black shadow-lg shadow-pink-500/25'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30'
                    }
        `}
            >
                {buttonText}
            </RippleButton>
        </div>
    );
};


interface ModernPricingPageProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    plans: PricingCardProps[];
    showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
    title,
    subtitle,
    plans,
    showAnimatedBackground = true,
}: ModernPricingPageProps) => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-24 overflow-hidden bg-[#010203]">
            {showAnimatedBackground && <ShaderCanvas />}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8">
                    {plans.map((plan) => <PricingCard key={plan.planName} {...plan} />)}
                </div>
            </div>
        </section>
    );
};
