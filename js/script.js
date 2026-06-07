// ============================================================
// CHROMA — Color Converter & Scheme Generator
// Uses: https://www.thecolorapi.com
// ============================================================


// ============================================================
// 1. DOM ELEMENTS
// ============================================================

const hexInput       = document.querySelector('#hexInput');
const hexBtn         = document.querySelector('#hexBtn');
const hexResult      = document.querySelector('#hexResult');

const rInput         = document.querySelector('#rInput');
const gInput         = document.querySelector('#gInput');
const bInput         = document.querySelector('#bInput');
const rgbBtn         = document.querySelector('#rgbBtn');
const rgbResult      = document.querySelector('#rgbResult');

const colorPicker    = document.querySelector('#colorPicker');
const pickerBtnWrap  = document.querySelector('#pickerBtnWrap');
const pickerBtn      = document.querySelector('#pickerBtn');

const schemeHexInput = document.querySelector('#schemeHexInput');
const schemeMode     = document.querySelector('#schemeMode');
const schemeCount    = document.querySelector('#schemeCount');
const schemeBtn      = document.querySelector('#schemeBtn');
const schemeResult   = document.querySelector('#schemeResult');

const colorSwatch    = document.querySelector('#colorSwatch');
const colorName      = document.querySelector('#colorName');

const bgBlobLeft     = document.querySelector('#bgBlobLeft');
const bgBlobRight    = document.querySelector('#bgBlobRight');
const loader         = document.querySelector('#loader');
const errorMsg       = document.querySelector('#errorMsg');
const lottieSwatch   = document.querySelector('#lottieSwatch');


// ============================================================
// LOTTIE ANIMATION
// Plays in the preview card before a color is first chosen.
// ============================================================

const lottieAnim = lottie.loadAnimation({
    container: lottieSwatch,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: {"nm":"Flow 1","ddd":0,"h":500,"w":500,"meta":{"g":"LottieFiles Figma v112"},"layers":[{"ty":4,"nm":"Group 3","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[65,148]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[174.61,280.61],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[174.61,280.61],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[174.61,280.61],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[174.61,280.61],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":120},{"s":[250,250],"t":132}]},"r":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[-45],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[-45],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[-45],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[-45],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":120},{"s":[0],"t":132}]},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[],"ind":1},{"ty":4,"nm":"Ellipse 1","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[25,25]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[64,262.49],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[64,262.49],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[64,262.49],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[64,262.49],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":120},{"s":[70,260],"t":132}]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[10.495600000000001,0],[0,10.495600000000001],[-10.495600000000001,0],[0,-10.495600000000001]],"o":[[0,10.495600000000001],[-10.495600000000001,0],[0,-10.495600000000001],[10.495600000000001,0],[0,0]],"v":[[38,19],[19,38],[0,19],[19,0],[38,19]]}}},{"ty":"st","bm":0,"hd":false,"nm":"","lc":1,"lj":1,"ml":4,"o":{"a":0,"k":100},"w":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":120},{"s":[12],"t":132}]},"c":{"a":0,"k":[0.5,0.5,0.5]}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.851,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":2,"parent":1},{"ty":4,"nm":"Rectangle 18","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,194.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.9608,0.8744,0.2196]},"r":1,"o":{"a":0,"k":100}}],"ind":3,"parent":1},{"ty":4,"nm":"Rectangle 17","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,141.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.2902,0.2996]},"r":1,"o":{"a":0,"k":100}}],"ind":4,"parent":1},{"ty":4,"nm":"Rectangle 16","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[65,88.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.1902,0.6539,0.198]},"r":1,"o":{"a":0,"k":100}}],"ind":5,"parent":1},{"ty":4,"nm":"Rectangle 15","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,35.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.2902,0.5647,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":6,"parent":1},{"ty":4,"nm":"Rectangle 14","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[65,148]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[65,148]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0,0],[0,0],[27.61,0],[0,0],[0,27.61],[0,0]],"o":[[0,0],[0,0],[0,27.61],[0,0],[-27.61,0],[0,0],[0,0]],"v":[[0,0],[130,0],[130,246],[80,296],[50,296],[0,246],[0,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.851,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":7,"parent":1},{"ty":4,"nm":"Group 4","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[65,148]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[324.61,281.61],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[324.61,281.61],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[324.61,281.61],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[324.61,281.61],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":120},{"s":[250,250],"t":132}]},"r":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[45],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[45],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[45],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[45],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":120},{"s":[0],"t":132}]},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[],"ind":8},{"ty":4,"nm":"Ellipse 1","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[25,25]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[72.49,254],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[72.49,254],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[72.49,254],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[72.49,254],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":120},{"s":[70,260],"t":132}]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[10.495600000000001,0],[0,10.495600000000001],[-10.495600000000001,0],[0,-10.495600000000001]],"o":[[0,10.495600000000001],[-10.495600000000001,0],[0,-10.495600000000001],[10.495600000000001,0],[0,0]],"v":[[38,19],[19,38],[0,19],[19,0],[38,19]]}}},{"ty":"st","bm":0,"hd":false,"nm":"","lc":1,"lj":1,"ml":4,"o":{"a":0,"k":100},"w":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":120},{"s":[12],"t":132}]},"c":{"a":0,"k":[0.5,0.5,0.5]}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.851,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":9,"parent":8},{"ty":4,"nm":"Rectangle 18","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,194.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.5779,0.2196,0.9608]},"r":1,"o":{"a":0,"k":100}}],"ind":10,"parent":8},{"ty":4,"nm":"Rectangle 17","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,141.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.2902,0.8043,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":11,"parent":8},{"ty":4,"nm":"Rectangle 16","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[65,88.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0,0.9255,0.0155]},"r":1,"o":{"a":0,"k":100}}],"ind":12,"parent":8},{"ty":4,"nm":"Rectangle 15","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,35.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.8871,0.547,0]},"r":1,"o":{"a":0,"k":100}}],"ind":13,"parent":8},{"ty":4,"nm":"Rectangle 14","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[65,148]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[65,148]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0,0],[0,0],[27.61,0],[0,0],[0,27.61],[0,0]],"o":[[0,0],[0,0],[0,27.61],[0,0],[-27.61,0],[0,0],[0,0]],"v":[[0,0],[130,0],[130,246],[80,296],[50,296],[0,246],[0,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.851,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":14,"parent":8},{"ty":4,"nm":"Group 5","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[65,148]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[177.24,278.91],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[177.24,278.91],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[341.67,304.29],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[341.67,304.29],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[250,250],"t":120},{"s":[250,250],"t":132}]},"r":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[-43.69],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[-43.69],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[60],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[60],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[0],"t":120},{"s":[0],"t":132}]},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[],"ind":15},{"ty":4,"nm":"Ellipse 1","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[25,25]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[64.19,262.48],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[64.19,262.48],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[72.2,251.8],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[72.2,251.8],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[70,260],"t":120},{"s":[70,260],"t":132}]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[10.495600000000001,0],[0,10.495600000000001],[-10.495600000000001,0],[0,-10.495600000000001]],"o":[[0,10.495600000000001],[-10.495600000000001,0],[0,-10.495600000000001],[10.495600000000001,0],[0,0]],"v":[[38,19],[19,38],[0,19],[19,0],[38,19]]}}},{"ty":"st","bm":0,"hd":false,"nm":"","lc":1,"lj":1,"ml":4,"o":{"a":0,"k":100},"w":{"a":1,"k":[{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":0},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":12},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":30},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":42},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":60},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":72},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":90},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":102},{"o":{"x":0.33,"y":1},"i":{"x":0.68,"y":1},"s":[12],"t":120},{"s":[12],"t":132}]},"c":{"a":0,"k":[0.5,0.5,0.5]}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.851,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":16,"parent":15},{"ty":4,"nm":"Rectangle 18","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,194.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.1765,0.1844,0.2275]},"r":1,"o":{"a":0,"k":100}}],"ind":17,"parent":15},{"ty":4,"nm":"Rectangle 17","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,141.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.5,0.5,0.5]},"r":1,"o":{"a":0,"k":100}}],"ind":18,"parent":15},{"ty":4,"nm":"Rectangle 16","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[65,88.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.9255,0,0.3548]},"r":1,"o":{"a":0,"k":100}}],"ind":19,"parent":15},{"ty":4,"nm":"Rectangle 15","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[54,21.5]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[64,35.5]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-3.31],[0,0],[3.31,0],[0,0],[0,3.31],[0,0],[-3.31,0],[0,0]],"o":[[0,0],[0,3.31],[0,0],[-3.31,0],[0,0],[0,-3.31],[0,0],[3.31,0]],"v":[[108,6],[108,37],[102,43],[6,43],[0,37],[0,6],[6,0],[102,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.0919,0.6371,0.5825]},"r":1,"o":{"a":0,"k":100}}],"ind":20,"parent":15},{"ty":4,"nm":"Rectangle 14","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[65,148]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[65,148]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0,0],[0,0],[27.61,0],[0,0],[0,27.61],[0,0]],"o":[[0,0],[0,0],[0,27.61],[0,0],[-27.61,0],[0,0],[0,0]],"v":[[0,0],[130,0],[130,246],[80,296],[50,296],[0,246],[0,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[0.851,0.851,0.851]},"r":1,"o":{"a":0,"k":100}}],"ind":21,"parent":15},{"ty":4,"nm":"Frame 1 Bg","sr":1,"st":0,"op":121,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[250,250]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[250,250]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"sh","bm":0,"hd":false,"nm":"","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,-0.01],[0,0],[0.01,0],[0,0],[0,0.01],[0,0],[-0.01,0],[0,0]],"o":[[0,0],[0,0.01],[0,0],[-0.01,0],[0,0],[0,-0.01],[0,0],[0.01,0]],"v":[[500,0.01],[500,499.99],[499.99,500],[0.01,500],[0,499.99],[0,0.01],[0.01,0],[499.99,0]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"","c":{"a":0,"k":[1,1,1]},"r":1,"o":{"a":0,"k":100}}],"ind":22}],"v":"5.7.0","fr":60,"op":120,"ip":0,"assets":[]}
});

let colorHasBeenSet = false;

function dismissLottie() {
    if (colorHasBeenSet) return;
    colorHasBeenSet = true;
    lottieSwatch.classList.add('hidden');
    colorSwatch.classList.add('active');
    pickerBtnWrap.classList.add('color-chosen');
    // Stop and destroy after the fade-out transition finishes
    setTimeout(() => lottieAnim.destroy(), 500);
}


// ============================================================
// 2. HELPERS
// ============================================================

function showLoader() {
    loader.classList.add('visible');
}

function hideLoader() {
    loader.classList.remove('visible');
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible');
    setTimeout(() => errorMsg.classList.remove('visible'), 3000);
}

// Trigger a CSS animation class by removing it first so it can restart
function triggerAnimation(el, className) {
    el.classList.remove(className);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add(className));
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = `copied: ${text}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 1800);
}

function updateBlobs(hexColor) {
    bgBlobLeft.style.setProperty('--blob-color', hexColor);
    bgBlobRight.style.setProperty('--blob-color', hexColor);
}

function updatePreview(hexColor, name) {
    dismissLottie();
    colorSwatch.style.backgroundColor = hexColor;
    colorName.textContent = name || hexColor;
    colorName.classList.add('named');
    triggerAnimation(colorSwatch, 'pop');
    setTimeout(() => colorSwatch.classList.remove('pop'), 400);
    updateBlobs(hexColor);
}

function showResult(el, html) {
    el.innerHTML = html;
    triggerAnimation(el, 'reveal');
    el.querySelector('.copy-hint').addEventListener('click', function () {
        copyToClipboard(this.dataset.copy);
    });
}

function isValidHex(hex) {
    return /^#?[0-9A-Fa-f]{6}$/.test(hex);
}

function isValidRgbValue(value) {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 255;
}

function syncInputs(data) {
    const hex = data.hex.value;
    hexInput.value = hex;
    schemeHexInput.value = hex;
    rInput.value = data.rgb.r;
    gInput.value = data.rgb.g;
    bInput.value = data.rgb.b;
}


// ============================================================
// 3. API
// ============================================================

async function fetchColorData(queryParam) {
    const url = `https://www.thecolorapi.com/id?${queryParam}&format=json`;
    showLoader();
    try {
        const response = await fetch(url);
        const data = await response.json();
        hideLoader();
        return data;
    } catch {
        hideLoader();
        showError('Could not connect to the Color API. Check your internet connection.');
        return null;
    }
}


// ============================================================
// 4. CONVERT HEX → RGB
// ============================================================

async function convertHexToRgb() {
    const hex = hexInput.value.trim();

    if (!isValidHex(hex)) {
        showError('Please enter a valid HEX color like #1a2b3c');
        return;
    }

    const data = await fetchColorData(`hex=${hex.replace('#', '')}`);
    if (!data) return;

    const { r, g, b } = data.rgb;
    const rgbString = `rgb(${r}, ${g}, ${b})`;

    showResult(hexResult, `
        ${rgbString}
        <span class="copy-hint" data-copy="${rgbString}">copy</span>
    `);

    syncInputs(data);
    updatePreview(data.hex.value, data.name.value);
}


// ============================================================
// 5. CONVERT RGB → HEX
// ============================================================

async function convertRgbToHex() {
    const r = rInput.value;
    const g = gInput.value;
    const b = bInput.value;

    if (!isValidRgbValue(r) || !isValidRgbValue(g) || !isValidRgbValue(b)) {
        showError('Please enter valid RGB values between 0 and 255.');
        return;
    }

    const data = await fetchColorData(`rgb=${r},${g},${b}`);
    if (!data) return;

    const hex = data.hex.value;

    showResult(rgbResult, `
        ${hex}
        <span class="copy-hint" data-copy="${hex}">copy</span>
    `);

    syncInputs(data);
    updatePreview(hex, data.name.value);
}


// ============================================================
// 6. COLOR PICKER
// ============================================================

pickerBtn.addEventListener('click', () => colorPicker.click());

colorPicker.addEventListener('input', async function () {
    const hex = colorPicker.value;
    const data = await fetchColorData(`hex=${hex.replace('#', '')}`);
    if (!data) return;
    syncInputs(data);
    updatePreview(hex, data.name.value);
});


// ============================================================
// 7. SCHEME GENERATOR
// ============================================================

async function generateScheme() {
    const hex = schemeHexInput.value.trim();
    const mode = schemeMode.value;

    if (!isValidHex(hex)) {
        showError('Please enter a valid HEX color like #1a2b3c');
        return;
    }

    const cleanHex = hex.replace('#', '');
    const count = Math.min(10, Math.max(2, parseInt(schemeCount.value) || 5));
    const url = `https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${mode}&count=${count}&format=json`;

    showLoader();
    schemeResult.innerHTML = '';

    try {
        const response = await fetch(url);
        const data = await response.json();
        hideLoader();

        data.colors.forEach((color, index) => {
            const hex = color.hex.value;
            const name = color.name.value;

            const chip = document.createElement('div');
            chip.classList.add('scheme-chip');
            chip.innerHTML = `
                <div class="scheme-color" style="background-color: ${hex}"></div>
                <div class="scheme-hex">${hex}</div>
                <div class="scheme-name">${name}</div>
            `;
            chip.addEventListener('click', () => copyToClipboard(hex));
            schemeResult.appendChild(chip);

            setTimeout(() => chip.classList.add('visible'), index * 80);
        });

    } catch {
        hideLoader();
        showError('Could not load color scheme. Check your internet connection.');
    }
}


// ============================================================
// 8. EVENT LISTENERS
// ============================================================

hexBtn.addEventListener('click', convertHexToRgb);
rgbBtn.addEventListener('click', convertRgbToHex);
schemeBtn.addEventListener('click', generateScheme);

hexInput.addEventListener('keydown', e => { if (e.key === 'Enter') convertHexToRgb(); });
schemeHexInput.addEventListener('keydown', e => { if (e.key === 'Enter') generateScheme(); });
[rInput, gInput, bInput].forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') convertRgbToHex(); });
});


// ============================================================
// 9. INIT
// ============================================================

async function init() {
    const data = await fetchColorData('hex=4a90d9');
    if (data) {
        // Pre-fill inputs silently — don't dismiss the lottie on load
        syncInputs(data);
        // Prime the swatch color so it's ready when the user first interacts
        // but do NOT touch colorName — keep "Pick a color to start"
        colorSwatch.style.backgroundColor = data.hex.value;
    }
}

init();
