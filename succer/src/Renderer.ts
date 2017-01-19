

namespace Renderer {

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    /* Imageオブジェクトを生成 */
    let img = new Image();
    img.src = "../img/sprite2.png";

    let offsetX = 0;
    let offsetY = 0;


    export function init() {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.width = 128;
        canvas.height = 128;
        context = canvas.getContext('2d');
        context.msImageSmoothingEnabled = false;
    }

    export function camera(x = 0, y = 0) {
        offsetX = x;
        offsetY = y;
    }

    export function print(_str: string, _x: number, _y: number, _col: number) {

    }
    export function print_outlined(t, x, y, c, oc) {
        for (let i = x - 1; i < x + 1; ++i) {
            for (let j = y - 1; j < y + 1; ++j) {
                print(t, i, j, oc)
            }
        }
        print(t, x, y, c)
    }
    export function spr(n: number, x: number, y: number, _w = 0, _h = 0, _flip_x = false, _flip_y = false) {
        n = Math.round(n);
        let col = n % 16;
        let row = Math.floor(n / 16);
        context.drawImage(img, col * 8, row * 8, 8, 8, x - offsetX, y - offsetY, 8, 8);
    }

    export function palt(_col = 0, _t = false) { }

    export function line(x0: number, y0: number, x1: number, y1: number, _col = 0) {
        x0 -= offsetX;
        x1 -= offsetX;
        y0 -= offsetY;
        y1 -= offsetY;
        if (context) {
            context.save();
            //新しいパスを開始する
            context.beginPath();
            //パスの開始座標を指定する
            context.moveTo(x0, y0);
            //座標を指定してラインを引いていく
            context.lineTo(x1, y1);
            //パスを閉じる（最後の座標から開始座標に向けてラインを引く）
            context.closePath();
            //現在のパスを輪郭表示する
            context.stroke();
            context.restore();
        }
    }
    export function rect(x0 = 0, y0 = 0, x1 = 0, y1 = 0, _col = 0) {
        x0 -= offsetX;
        x1 -= offsetX;
        y0 -= offsetY;
        y1 -= offsetY;

        if (context) {
            context.save();
            context.strokeRect(x0, y0, x1 - x0, y1 - y0);
            context.restore();
        }

    }



    export function rectfill(x0 = 0, y0 = 0, x1 = 0, y1 = 0, col: number) {
        x0 -= offsetX;
        x1 -= offsetX;
        y0 -= offsetY;
        y1 -= offsetY;
        if (context) {
            context.save();
            switch (col) {
                case 3:
                    context.fillStyle = 'green';
                    break;

                case 4:

                    context.fillStyle = 'red';

                    break;

                case 6:

                    context.fillStyle = "gray";

                    break;

                case 7:

                    context.fillStyle = 'white';

                    break;

                default:

                    break;

            }
            context.fillRect(x0, y0, x1 - x0, y1 - y0);
            context.restore();
        }
    }
    export function color(_col = 0) { }
}