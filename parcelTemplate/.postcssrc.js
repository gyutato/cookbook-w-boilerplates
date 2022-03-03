// import, export: ECMAScript Module (ESM).
// 그러나 NodeJS는 ESM을 지원하지 않고 CommonJS 방식을 제공함.

//import
const autoprefixer = require('autoprefixer')

// export {
//   plugins: [
//     autoprefixer
//   ]
// }
module.exports = {
    plugins: [
        require('autoprefixer') // 굳이 변수를 사용하지 않아도 어차피 함수의 평가값이 사용되니까..
    ]
}

// postcssrc.js 파일같은 경우에는 어떤 내용들을 번들러를 통해 변환하는 용도로 사용하는 것. 즉 브라우저가 아닌 NodeJS에서 작동하는 개념이므로...