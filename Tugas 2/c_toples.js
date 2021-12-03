let c_toples_body = [
    102/255, 95/255, 11/255, 1
];

let c_tutup_luar_bawah = [
    117/255, 109/255, 13/255, 1
];

let c_tutup_luar = [
    181/255, 169/255, 18/255, 1
];

let c_tutup_dalam1 = [
    117/255, 110/255, 14/255, 1
];

let c_tutup_dalam2 = [
    181/255, 169/255, 18/255, 1
];

let c_toples = []

for (let vert = 0; vert < toples_kiri.length; vert +=2) {
    c_toples.push(...c_toples_body)
};
for (let vert = 0; vert < tutup_luar_kiri_bawah.length; vert +=2) {
    c_toples.push(...c_tutup_luar_bawah)
};
for (let vert = 0; vert < tutup_luar_kiri.length; vert +=2) {
    c_toples.push(...c_tutup_luar)
};
for (let vert = 0; vert < tutup_dalam_kiri1.length; vert +=2) {
    c_toples.push(...c_tutup_dalam1)
};
for (let vert = 0; vert < tutup_dalam_kiri2.length; vert +=2) {
    c_toples.push(...c_tutup_dalam2)
};