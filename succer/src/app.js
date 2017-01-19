/// <reference path="./main.ts" />
var cnt = 0;
function animate() {
    cnt++;
    requestAnimationFrame(animate);
    if (cnt % 2) {
        _update();
        _draw();
    }
}
window.onload = function () {
    _init();
    animate();
};
//# sourceMappingURL=app.js.map