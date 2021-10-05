function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

let canvas = document.getElementById('myCanvas');
let gl = canvas.getContext('experimental-webgl');

let gambar_kanan = [
    ...toples_kanan, ...tutup_luar_kanan_bawah, ...tutup_luar_kanan, ...tutup_dalam_kanan1, ...tutup_dalam_kanan2
]
// Offset gambar kanan ke bawah 1.5
for (let vert = 0; vert < gambar_kanan.length; vert += 2){
    gambar_kanan[vert + 1] -= 1.5
}

let vertices = [
    ...toples_kiri, ...tutup_luar_kiri_bawah, ...tutup_luar_kiri, ...tutup_dalam_kiri1, ...tutup_dalam_kiri2, 
    ...gambar_kanan 
];


let vertexShaderCode = `
attribute vec2 a_position;
attribute vec4 a_color;
varying vec4 v_color;

void main() {
    gl_Position = vec4(a_position, 0, 1.5);
    gl_PointSize = 20.0;
    v_color = a_color;
}
`;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);


let fragmentShaderCode = `
precision mediump float;
varying vec4 v_color;

void main() {
    gl_FragColor = v_color;
}
`;
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

let coords = gl.getAttribLocation(shaderProgram, "a_position");
var colorLocation = gl.getAttribLocation(shaderProgram, "a_color");

// Generate warna untuk setiap
var color = [...c_toples, ...c_toples];
// for (let i = 0; i < vertices.length/3; i++) {
//     let r = Math.random()/2 + 0.45;
//     let g = Math.random()/2 + 0.45;
//     let b = Math.random()/2 + 0.45;
//     for (let j = 0; j < 3; j++) {
//         color.push(r);
//         color.push(g);
//         color.push(b);
//         color.push(1);
//     }
// }

function drawScene() {
    gl.useProgram(shaderProgram);
    
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLocation);
    
    
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coords);

    gl.clearColor(0.15, 0.15, 0.15, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log(vertices);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length/2);
}

let isGoingUp = true;
let delta = 0;
animate();

function animate (){
    let increment = 0.0042;
    delta += increment;
    if (delta > 2){
        delta = 0;
        isGoingUp = !isGoingUp;
    }
    if (!isGoingUp){
        increment *= -1;
    }
    for (vert = 0; vert < gambar_kanan.length; vert += 2){
        gambar_kanan[vert + 1] += increment;
    }
    
    vertices = [
        ...toples_kiri, ...tutup_luar_kiri_bawah, ...tutup_luar_kiri, ...tutup_dalam_kiri1, ...tutup_dalam_kiri2, 
        ...gambar_kanan 
    ]; 

    drawScene();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);