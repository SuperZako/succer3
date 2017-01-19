let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

function _print(_str: string, _x: number, _y: number, _col: number) {

}

/* Imageオブジェクトを生成 */
let img = new Image();
img.src = "../img/sprite2.png";

function spr(n: number, x: number, y: number, _w = 0, _h = 0, _flip_x = false, _flip_y = false) {
    n = Math.round(n);
    let col = n % 16;
    let row = Math.floor(n / 16);
    context.drawImage(img, col * 8, row * 8, 8, 8, x - offsetX, y - offsetY, 8, 8);
}



function rnd(n: number) {

    return Math.random() * n;

}



function btn(_i: number, _p?: number) {

    return false;

}

function btnp(_i: number, _p?: number) {
    return true;
}

function sfx(_n: number) {

}



function clip(_x = 0, _y = 0, _w = 0, _h = 0) {

}



function pal(_c0 = 0, _c1 = 0, _p = 0) {

}



let offsetX = 0;

let offsetY = 0;

function camera(x = 0, y = 0) {

    offsetX = x;

    offsetY = y;

}



function palt(_col = 0, _t = false) { }



function line(x0: number, y0: number, x1: number, y1: number, _col = 0) {

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



function rect(x0 = 0, y0 = 0, x1 = 0, y1 = 0, _col = 0) {

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



function rectfill(x0 = 0, y0 = 0, x1 = 0, y1 = 0, col: number) {
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
function color(_col = 0) { }
function circ(_x = 0, _y = 0, _r = 0, _col = 0) { }
function music(_n = 0, _a = 0, _b = 0) { }

//--succer
//--by rylauchelmi

let menu_offset = 128;
let menu_inc = 1;
let demo = true;
let timer = 10;
let blink = false;
let mode = 1;
let full_time = 2700;
let half_time = full_time / 2;

let max_val = 32767;
let cos22_5 = 0.9239;
let sin22_5 = 0.3827;

let fh = 384;
let fw = 256;
let fh2 = fh / 2;
let fw2 = fw / 2;
let penaltyw2 = 64;
let fh2_penaltyh = fh2 - 60;
let goalw = 60;
let goalh = 20;
let goall = 10;
let goalx2 = goalw / 2;
let goalx1 = -goalx2;
let border = 20;

let teamcolors = [0, 1, 5]
//teamcolors[0] = 0
let shirtcolors = [[1, 2], [8, 2], [9, 8], [10, 9], [11, 3], [12, 1], [13, 5], [6, 13], [7, 6], [15, 14]];
//shirtcolors[0] = { 1,2}
let skincolors = [[4, 5, 0], [15, 14, 4], [15, 14, 4], [15, 14, 9]];

let throwin = {
    pos: { x: 0, y: 0 },
    ballpos: { x: 0, y: 0 },
    timer: 0,
    balld: { x: 0, y: 0 },
    kickmax: 0,
    dist: 0
};

let max_kick = 20
let dribbledist = 4

let camtarget = {
    x: fw2,
    y: 0
};

let startpos = [
    { x: 0, y: 0.2 },
    { x: 0.4, y: 0.2 },
    { x: -0.4, y: 0.2 },
    { x: 0.35, y: 0.5 },
    { x: -0.35, y: 0.5 },
    { x: 0, y: 0.9792 },
];

let attackpos = [
    { x: 0, y: -0.2 },
    { x: 0.4, y: -0.1 },
    { x: -0.4, y: -0.25 },
    { x: 0.3, y: 0.1 },
    { x: -0.3, y: 0.2 },
    { x: 0, y: 0.90 },
];


let vel_inc = 0.2;
let min_vel = 0.1;
let ball_dist_thres = 64;

let menu = {
    timer: 10
};

var game_state;

var throwin_f;
var throwintype;
var throwinside;
var changing_side;
let man_with_ball;



function print_outlined(t, x, y, c, oc) {
    for (let i = x - 1; i < x + 1; ++i) {
        for (let j = y - 1; j < y + 1; ++j) {
            _print(t, i, j, oc)
        }
    }
    _print(t, x, y, c)
}


function dist_manh(a, b) {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
}


function draw_marker(f) {
    let sp = 29;
    if (can_kick(f))
        sp = 30
    if (f.hasball)
        sp = 31

    spr(sp, f.x - 4, f.y - 6)
}


function jersey_color(f) {
    let shirt = shirtcolors[teamcolors[f.teamcolors]]
    pal(8, shirt[1])
    pal(2, shirt[2])
    pal(4, skincolors[f.skin][3])
    pal(14, skincolors[f.skin][2])
    pal(15, skincolors[f.skin][1])
}


function spr_from_dir(f) {
    f.lastflip = true
    let fdirx = f.dir.x;
    let fdiry = f.dir.y;
    if (fdirx < -cos22_5) { //-- full left
        f.lastspr = 2
    } else {
        if (fdirx < -sin22_5) { //-- diag left...
            if (fdiry < 0) { //-- ...and up
                f.lastspr = 1
            } else { // -- ...and down
                f.lastspr = 3
            }
        } else {
            f.lastflip = false
            if (fdirx < sin22_5) { // then -- full...
                if (fdiry < 0) { // -- ...up
                    f.lastspr = 0
                } else { // -- ...down
                    f.lastspr = 4
                }
            } else {
                if (fdirx < cos22_5) { // then -- diag right...
                    if (fdiry < 0) { // then -- ...and up
                        f.lastspr = 1
                    } else { // -- ...and down
                        f.lastspr = 3
                    }
                } else { // --full right
                    f.lastspr = 2
                }
            }
        }
    }
}


function draw_footballer(f) {
    let animfactor = 1
    let animoffset = 20
    let anim_end = 1

    jersey_color(f)

    if (f.vel > min_vel) {
        animfactor = 4
        animoffset = 0
        anim_end = 4
        spr_from_dir(f)
    }

    f.animtimer += f.vel * 0.25
    while (Math.floor(f.animtimer) >= anim_end) {
        f.animtimer -= anim_end
    }

    let pos = sprite_pos(f)
    spr(animoffset + f.lastspr * animfactor + f.animtimer, pos.x, pos.y, 1, 1, f.lastflip)
}


function sprite_pos(f) {
    return { x: f.x - f.w, y: f.y - f.h };
}


function create_footballer(p, i) {
    return {
        x: 0,
        y: 0,
        w: 4,
        h: 8,
        d: { x: 0, y: 0 },
        vel: 0,
        dir: { x: 0, y: 1 },
        //--prevdir={ x = 0, y = 1 },
        lastspr: 4,
        hasball: false,
        animtimer: 0,
        timer: 0,
        damp: 0.9,
        lastflip: false,
        justshot: 0,
        ball_dist: max_val,
        startposidx: i,
        side: p * 2 - 1,
        keeper: false,
        teamcolors: p + 1,
        skin: Math.floor(rnd(skincolors.length - 1)) + 1,

        draw: function (fo) {
            fo.state.draw(fo)
        },

        update: function (fo) {
            fo.state.update(fo)
        },

        drawshadow: function (t) {
            spr(46, t.x - 2, t.y - 2)
        },

        state: fstate_ok,

        set_state: function (fo, st) {
            fo.state = st;
            if (st && st.start != null)
                st.start(fo)
        }
    };
}


let men = [];//{};


let ball = {
    x: 0,
    y: 0,
    z: 0,
    w: 2,
    h: 4,
    d: { x: 0, y: 0, z: 0 },
    damp: 0.975,
    // -- damp=0.95,
    dampair: 0.985,
    draw: function (b) {
        spr(44, b.x - b.w, b.y - b.h - b.z);
    },
    drawshadow: function (b) {
        spr(45, b.x - b.w + 1, b.y - b.h + 1);
    }
};

let balllasttouchedside = 0;
let dribble = { x: 0, y: 0 };
let dribblen = 0;


function touch_ball(m, dist) {
    return (m.x - dist < ball.x && ball.x < m.x + dist && m.y - dist < ball.y && ball.y < m.y + dist && ball.z < 8);
}


function dribble_ball(m) {
    if (m.justshot > 0) {
        m.justshot -= 1;
        m.hasball = false;
        return;
    }
    // --m.hasball = not m.keeper and touch_ball(m, dribbledist)
    m.hasball = touch_ball(m, dribbledist);
    if (m.hasball) {
        plus_in_place(dribble, muls(m.d, 1.1));
        dribblen += 1;
        balllasttouchedside = m.side;
        man_with_ball = m;
    }
}


function checktimer(a) {
    a.timer -= 1;
    return a.timer < 0;
}


function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}


function minus(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}


function plus(a, b) {
    return { x: a.x + b.x, y: a.y + b.y }
}


function plus_in_place(a, b) {
    a.x += b.x;
    a.y += b.y;
}


function mulv(a, b) {
    return { x: a.x * b.x, y: a.y * b.y };
}


function muls(a, b) {
    return { x: a.x * b, y: a.y * b, z: undefined };
}


function muls_in_place(a, b) {
    a.x *= b;
    a.y *= b;
}


function copy(a) {
    return { x: a.x, y: a.y };
}


function unit(a) {
    // -- if abs(a.x) > 32 or abs(a.y) > 32 then
    // --a.x/=32
    // --a.y/=32
    // --end
    let len = Math.sqrt(dot(a, a));
    return { x: a.x / len, y: a.y / len };
}


function clamp(x, lo, hi) {
    return Math.min(Math.max(x, lo), hi)
}


function clampsym(x, hi) {
    return Math.min(Math.max(x, -hi), hi)
}


function segment_intersect(a1, a2, b1, b2) {
    let ax = a2.x - a1.x
    let ay = a2.y - a1.y
    let bx = b2.x - b1.x
    let by = b2.y - b1.y
    let a1x = a1.x - b1.x
    let den = ax * by - ay * bx
    if (den == 0) return null;//{ r: false }
    let a1y = a1.y - b1.y
    let r = (a1y * bx - a1x * by) / den
    let s = (a1y * ax - a1x * ay) / den
    // -- if 0<= r <= 1 & 0 <= s <= 1, intersection exists
    if (r < 0 || 1 < r || s < 0 || 1 < s)
        return null;//{ r: false }
    return { r: true, x: a1.x + r * ax, y: a1.y + r * ay };
}



function check_net(ball, prevball, goal1, goal2) {
    let res = segment_intersect(prevball, ball, goal1, goal2)
    if (res) {
        if (goal1.x == goal2.x) {
            ball.d.x = -ball.d.x
        } else {
            ball.d.y = -ball.d.y
        }
        muls_in_place(ball.d, 0.25)
        ball.x = res.x
        ball.y = res.y
    }
}


let ballsfxtime = 0;
function ballsfx() {
    if (ballsfxtime <= 0)
        sfx(5);
    ballsfxtime = 7;
}


function check_post(p, prevball) {
    let d = distance(ball, p);
    if (d < ball.w) {
        let delta = minus(p, ball);
        let ballspeed = distance(ball, prevball);
        plus_in_place(ball, muls(delta, -1 / d * ball.w));
        plus_in_place(ball.d, muls(delta, -1 / d * ballspeed));
        ballsfx();
    }
}


function playing() {
    return game_state == game_state_playing
}


function is_throwin() {
    return game_state == game_state_ballin
}


function init_throwin(t, p, v, m) {
    throwintype = t;
    throwin.kickmax = m;
    throwinside = -balllasttouchedside;
    throwin.ballpos = p;
    if (ball.x < 0) throwin.ballpos.x *= -1;
    if (ball.y < 0) throwin.ballpos.y *= -1;
    throwin.pos = mulv(throwin.ballpos, v);
    let idx = side_to_idx(throwinside)
    if (t == fstate_goalkick) {
        throwin_f = men[men.length - 1 + idx - 2]; //--keeper
        throwin_f.set_state(throwin_f, keeper_state_run)
    } else {
        throwin_f = players[idx - 1].man
    }
    throwin.dist = distance(throwin.pos, throwin_f)
    camlastpos = copy(camtarget)
    set_game_state(game_state_toballout)
    sfx(0)
}


function update_cam() {
    if (playing()) camtarget = copy(ball)
    let bx = fw2 + border - 64
    let by = fh2 + border - 64
    camtarget.x = Math.floor(clampsym(camtarget.x, bx))
    camtarget.y = Math.floor(clampsym(camtarget.y, by))
}


function update_ball() {
    let prevball = { x: ball.x, y: ball.y };
    plus_in_place(ball, ball.d)
    let gravity = 0.1;
    if (ball.z > 0) {
        ball.d.z -= gravity
    } else {
        ball.z = 0
        if (Math.abs(ball.d.z) < 2 * gravity) {
            ball.d.z = 0
        } else {
            ball.d.z = Math.abs(ball.d.z) * 0.5
            ballsfx()
        }
    }
    ball.z += ball.d.z

    let post1 = { x: goalx1, y: fh2 };
    let post1_ = { x: goalx1, y: fh2 + goalh / 2 };
    let post2 = { x: goalx2, y: fh2 };
    let post2_ = { x: goalx2, y: fh2 + goalh / 2 };
    let fieldw2 = fw2 + border
    let fieldh2 = fh2 + border

    if (ball.y < 0) {
        post1.y = -post1.y
        post1_.y = -post1_.y
        post2.y = -post2.y
        post2_.y = -post2_.y
    }

    // --goal col
    if (ball.z <= goall) {
        //--nets
        check_net(ball, prevball, post1, post1_)
        check_net(ball, prevball, post2, post2_)
        check_net(ball, prevball, post1_, post2_)

        //--posts
        check_post(post1, prevball)
        check_post(post2, prevball)
        //--todo check horiz post
    }

    // --touch lines
    if (playing() && Math.abs(ball.x) > fw2) {
        init_throwin(fstate_throwin, { x: fw2, y: clampsym(Math.abs(ball.y), fh2) }, { x: 1, y: 1 }, 1)
    }

    // --scoring_team
    // --todo check ball really entering the goal...
    if (playing() && scoring_team == 0 && ball.z < goall && post1.x < ball.x && ball.x < post2.x && fh2 + goalh > Math.abs(ball.y) && Math.abs(ball.y) > fh2) {
        scoring_team = side_to_idx(ball.y > 0 && 1 || - 1)
        kickoff_team = scoring_team
        score[scoring_team] += 1
        camlastpos = copy(ball)
        set_game_state(game_state_goalmarked)
        sfx(0)
        sfx(15)
    }

    // --corner / goal kick
    if (playing() && Math.abs(ball.y) > fh2) {
        throwinside = -balllasttouchedside
        if (throwinside * ball.y < 0) {
            init_throwin(fstate_corner, { x: fw2, y: fh2 }, { x: 1.1, y: 1.03 }, 5);
        } else {
            init_throwin(fstate_goalkick, { x: rnd(penaltyw2), y: fh2_penaltyh }, { x: 1, y: 1.15 }, 25);
            // --init_throwin(fstate_goalkick, { x=penaltyw2, y=fh2_penaltyh }, { x=1, y=1.15 }, 25)
        }
    }

    // --field borders
    let bd = ball.d;
    if (ball.x < -fieldw2) {
        bd.x = Math.abs(bd.x) * 0.5;
        ball.x = -fieldw2
    }
    if (ball.x > fieldw2) {
        bd.x = -Math.abs(bd.x) * 0.5;
        ball.x = fieldw2;
    }
    if (ball.y < -fieldh2) {
        bd.y = Math.abs(bd.y) * 0.5;
        ball.y = -fieldh2
    }
    if (ball.y > fieldh2) {
        bd.y = -Math.abs(bd.y) * 0.5;
        ball.y = fieldh2;
    }

    // --damping
    if (ball.z < 0.1) {
        damp(ball)
    } else {
        muls_in_place(ball.d, ball.dampair)
    }
    bd.z *= ball.damp
}


function bubble_sort(t: any[]) {
    let len = t.length
    let active = true
    let tmp = null;
    while (active) {
        active = false
        for (let i = 0; i < len - 1; ++i) {
            if (t[i + 1].y < t[i].y) {
                tmp = t[i];
                t[i] = t[i + 1];
                t[i + 1] = tmp;
                active = true;
            }
        }
    }
}


let players = [];


function create_player(i) {
    let player = {
        man: null,
        num: i,
        but: 0,
        ai: false
    };
    // add(players, player);
    players.push(player);
}


function distance(a, b) {
    // -- return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
    // --local d= { x = a.x - b.x, y = a.y - b.y }
    // -- if (d.x * d.x < 0 or d.y * d.y < 0 or d.x * d.x + d.y * d.y < 0) return max_val
    // -- return sqrt(d.x * d.x + d.y * d.y)
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    dx *= dx
    dy *= dy
    let sum = dx + dy;
    if (dx < 0 || dy < 0 || sum < 0)
        return max_val;
    return Math.sqrt(sum);
}


function kick(p) {
    // --pass
    let passed = false
    if (p.but < 5) {
        passed = pass(p.man)
    }
    if (!passed) {
        let kickfactor = 1.0 + 0.1 * p.but;
        plus_in_place(ball.d, muls(p.man.dir, kickfactor));
        ball.d.z += kickfactor * 0.5;
        balllasttouchedside = p.man.side;
    }

    p.man.justshot = 5;
    ballsfx();
}


function tackle(p) {
    p.man.set_state(p.man, fstate_tackle)
}


function can_kick(f) {
    let kickdist = 8;
    return touch_ball(f, kickdist);
}


function button_released(p) {
    let f = p.man;
    if (can_kick(f)) {
        kick(p);
        balllasttouchedside = f.side;
    } else {
        if (f.justshot == 0) {
            tackle(p);
        }
    }
    p.but = 0;
}


function player_input(p) {
    if (p.ai || demo) {
        if (p.man.state.ai != null)
            p.man.state.ai(p);
    } else {
        if (p.man.state.input != null)
            p.man.state.input(p);
    }
}


function damp(m) {
    muls_in_place(m.d, m.damp)
}


function clampvec_getlen(v, n) {
    let l = Math.sqrt(dot(v, v));
    if (l > n) {
        muls_in_place(v, n / l)
        l = n
    }
    return l;
}


function man_update(f) {
    //--update state : draw, input or ai
    if (f.state.update != null)
        f.state.update(f);

    //--update position & check borders
    let newposx = f.x + f.d.x;
    let newposy = f.y + f.d.y;
    if (Math.abs(newposx) > fw2 + border) {
        newposx = f.x;
        f.d.x = 0;
    }
    if (Math.abs(newposy) > fh2 + border) {
        newposy = f.y;
        f.d.y = 0;
    }
    f.x = newposx;
    f.y = newposy;

    if (!playing()) {
        f.hasball = false;
    }
    //--velocity clamp
    if (f.state !== fstate_tackle)
        f.vel = clampvec_getlen(f.d, f.hasball && 1.4 || 1.6);
    //-- if (f.vel > min_vel) f.dir = unit(f.d)
    if (f.vel > min_vel)
        f.dir = muls(f.d, 1 / f.vel)
}


function nothing(t) {
}


let goal_up = {
    y: -fh2,
    draw: function () {
        let clipstartx = goalx1 - camtarget.x + 1 + 64
        let clipstarty = -camtarget.y + 64 - fh2
        let clipendx = goalx2 - goalx1
        let clipendy = goalh / 2 + 1
        spr(60, goalx2, -fh2 - 17)
        clip(clipstartx, clipstarty - 10, clipendx + 8, clipendy)
        for (let x = goalx1 - 1; x < goalx2 + 8; x += 8) {
            for (let y = -11; y < 7; y += 8) {
                spr(61, x, y - fh2)
            }
        }
        clip(clipstartx, clipstarty - goalh, clipendx - 1, clipendy)
        for (let x = goalx1 - 1; x < goalx2 + 8; x += 8) {
            for (let y = -goalh + 1; y < 8; y += 8) {
                spr(62, x, y - fh2)
            }
        }
        clip();
        let a = -goall - fh2;
        line(goalx1, a, goalx1, -fh2)
        line(goalx1, a, goalx2, a)
        line(goalx2, a, goalx2, -fh2)
    },
    drawshadow: nothing
}


let goal_down = {
    y: fh2 + goalh,
    draw: function (this) {
        spr(60, goalx2, fh2, 1, 1, false, true);
        color(7);
        rect(goalx1, -goall + fh2, goalx2, fh2);
        clip(goalx1 - camtarget.x + 64 + 1, -goall - camtarget.y + 64 + fh2 + 1, goalx2 - goalx1 - 1, goalh - 1);
        for (let x = goalx1; x <= goalx2 + 7; x += 8) {
            for (let y = -goall; y <= goall; y += 8) {
                spr(62, x, y + fh2);
            }
        }
        clip()
    },
    drawshadow: nothing
}


// -- -1 => 1 and 1 => 2
function side_to_idx(s: number) {
    return ((matchtimer >= half_time ? - s : s) + 1) / 2 + 1;
}


function idx_to_side(i) {
    return (matchtimer >= half_time ? - 1 : 1) * (2 * i - 3);
}


function distance_men_ball() {
    let nearestdist = [max_val, max_val];
    for (let m of men) {
        if (!m.keeper && m.state != fstate_down && m.state != fstate_tackle) {
            let d = dist_manh(m, ball);
            m.ball_dist = d;
            if (playing()) {
                let p = side_to_idx(m.side)
                if (d < nearestdist[p]) {
                    players[p].man = m
                    nearestdist[p] = d
                }
            }
        }
    }
}


function is_pass_ok(f, relpos, dist, dir) {
    if (is_throwin()) {
        return true
    }
    for (let m of men) {
        let side = (m.side != f.side)
        if (side) {
            let relpos2 = minus(m, f);
            let dist2 = Math.max(Math.sqrt(dot(relpos2, relpos2)), 1)
            let dir2 = { x: relpos2.x / dist2, y: relpos2.y / dist2 };
            if (dot(dir, dir2) > cos22_5 && dist2 / dist < 1.1) {
                return false
            }
        }
    }
    return true
}


function pass(f) {
    // --find the nearest teammate
    // -- in the right direction
    let maxd = 0;
    let target = null

    for (let m of men) {
        if (m.side == f.side && !m.keeper && m != f) {
            let front = 20
            let futm = plus(m, muls(m.d, front))
            let dist = distance(f, futm)
            if (dist < 96) {
                let relpos = minus(futm, f)
                let dir = muls(relpos, 1 / dist)
                let dirw = dot(f.dir, dir)
                if (dirw > sin22_5) {
                    let distw = clamp(-dist / 32 + 2, 0, 1)
                    let w = dirw * distw
                    // --todo: add obstruction consideration
                    if (w > maxd && is_pass_ok(f, relpos, dist, dir)) {
                        maxd = w;
                        target = dir
                    }
                }
            }
        }
    }

    if (target != null) {
        //--kick the ball in his direction
        let pass_strength = 3.0
        ball.d = muls(target, pass_strength)
        ball.d.z = 1
        return true
    }
    return false;
}

var score = [0, 0];
var matchtimer = 0;
var camlastpos;
var scoring_team = 0;
var starting_team: number;
var kickoff_team: number;
function start_match(dem) {
    score = [0, 0];
    demo = dem
    matchtimer = 0
    camlastpos = copy(camtarget)
    scoring_team = 0
    starting_team = Math.floor(rnd(2)) + 1
    kickoff_team = starting_team
    set_game_state(game_state_tokickoff)
}


function print_mode(m, t) {
    if (m == mode) print_outlined(t, 32 - menu_offset, 75, 6, 5)
}


function change_side(f) {
    f.side = -f.side
}


function set_state_ok(f) {
    if (f.keeper) {
        f.set_state(f, keeper_state_ok)
    } else {
        f.set_state(f, fstate_ok)
    }
}


let keeper_state_dive = {
    draw: function (k) {
        jersey_color(k)
        let pos = sprite_pos(k);
        spr(k.lastspr, pos.x, pos.y, 1, 1, k.d.x < 0)
    },

    start: function (k) {
        k.timer = 30
    },

    update: function (k) {
        k.lastspr = k.timer > 25 && 55 || 56;
        if (checktimer(k)) {
            k.lastspr = 0
            k.set_state(k, keeper_state_ok)
            return;
        }
        if (touch_ball(k, 5) && playing()) {
            ball.d.y = 3.0 * (-k.y / Math.abs(k.y))
            ball.d.x += k.d.x
            sfx(15)
            balllasttouchedside = k.side
        }
    }
}


function draw_keeper_ok(k) {
    let pos = sprite_pos(k)
    let sp = pos.y < 0 && 57 || 54;
    jersey_color(k);
    spr(sp, pos.x, pos.y);
}


let keeper_state_ok = {
    ai: undefined,
    input: undefined,
    draw: draw_keeper_ok,

    update: function (k) {
        //-- try to stay in front of the ball
        //--dive ?
        let future = 7
        let futureball = plus(ball, muls(ball.d, future))
        let res = segment_intersect(ball, futureball, { x: goalx1, y: fh2 * k.side }, { x: goalx2, y: fh2 * k.side })
        if (res) { //-- and abs(ball.dx) > 0.15 then
            let divefactor = 0.99
            let divemax = 10
            k.d.x = clampsym((res.x - k.x) * divefactor, divemax)
            k.set_state(k, keeper_state_dive)
            return;
        } else {// --just move
            let wantedx = clampsym(ball.x, goalx2)
            let mx = 1.0 //-- max move per frame
            k.x = clamp(wantedx, k.x - mx, k.x + mx)
            if (Math.abs(k.y) < fh2 - 4)
                k.y += k.side
        }

        if (touch_ball(k, 5) && playing()) {
            ball.d.y = -3.0 * k.side;
            balllasttouchedside = k.side
        }
    }
}


function create_keeper(p, i) {
    let k = create_footballer(p, i);
    k.state = keeper_state_ok;
    k.y = (p - 0.5) * (fh - 8);
    k.keeper = true;
    k.teamcolors = 0;
    return k;
}


function go_to(f, x: number, y: number, min_dist: number, steps: number) {
    if (Math.abs(f.x - x) < min_dist && Math.abs(f.y - y) < min_dist) {
        return true
    }


    let tmp = f.x + f.d.x * steps
    if (f.x < x) {
        if (tmp < x) {
            f.d.x += vel_inc
        }
    } else {
        if (tmp > x) {
            f.d.x -= vel_inc
        }
    }
    tmp = f.y + f.d.y * steps
    if (f.y < y) {
        if (tmp < y) {
            f.d.y += vel_inc
        }
    } else {
        if (tmp > y) {
            f.d.y -= vel_inc
        }
    }
    return false
}


function run_to(f, x, y) {
    return go_to(f, x, y, dribbledist - 1, 0)
}


function look_at(f, b) {
    f.dir = unit(minus(b, f))
    spr_from_dir(f)
}


function set_game_state(newstate) {
    if (newstate.init != null) {
        newstate.init()
    }
    game_state = newstate
}

let game_state_playing = {
    init: function () {
        players[0].ai = (mode == 2)
        players[1].ai = (mode > 0)
    }
}

let game_state_goalmarked = {
    timer: 60,

    init: function () {
        this.timer = 60
    },

    update: function () {
        if (checktimer(this)) {
            set_game_state(game_state_tokickoff)
        }
    }
};


let game_state_tokickoff = {
    timer: 60,

    init: function () {
        this.timer = 60
        for (let m of men) {
            set_state_ok(m)
        }
        // -- keepers
        men[men.length - 1 - 1].set_state(men[men.length - 1 - 1], keeper_state_run)
        men[men.length - 1].set_state(men[men.length - 1], keeper_state_run)
    },
    update: function () {
        // -- scroll to the center of the field
        let l = Math.max(this.timer / 60, 0)
        camtarget = muls(camlastpos, l)

        let to_exit = matchtimer > full_time

        // --  if (to_exit) plus_in_place(camtarget, muls({ x=fw2, y=0 }, 1 - l))

        let allok = true
        for (let m of men) {
            let i = m.startposidx;
            //--if not m.keeper then
            let dest = to_exit ? { x: 1, y: 0 } : startpos[i];
            //--    if 2* kickoff_team - 3 == m.side then
            if (idx_to_side(kickoff_team) == m.side && !to_exit) {
                if (i - 1 == 1)
                    dest = { x: 0, y: 0.01 };
                if (i - 1 == 2 || i - 1 == 3)
                    dest = { x: dest.x, y: 0.02 };
            }
            let ok = run_to(m, dest.x * fw2, dest.y * m.side * fh2);
            ok = ok && (m.vel < min_vel);
            allok = ok && allok
            //--    if (ok) look_at(m, ball)
            //--end
        }

        if (checktimer(this) && allok) {
            if (to_exit) {
                start_match(true)
            } else {
                //--keepers
                set_state_ok(men[men.length - 1 - 1])
                set_state_ok(men[men.length - 1])
                set_game_state(game_state_kickoff)
            }
        }
    }
}

let game_state_kickoff = {
    init: function (this) {
        muls_in_place(ball, 0)
        muls_in_place(ball.d, 0)
        scoring_team = 0
        changing_side = false
        for (let m of men) {
            look_at(m, ball)
        }
    },

    update: function (this) {
        //--debug("kickoff")
        //--wait for the player to kick off
        //--he can't move just kick in the direction he wants
        set_game_state(game_state_playing)

        //--local p = players[kickoff_team]

        //--local dir = { x=0, y=-p.man.side }
        //-- if (btn(0, p.num)) dir.x = -fw
        //-- if (btn(1, p.num)) dir.x = fw
        //--local do_kick= btn(4, p.num)--kickoff_team)

        //-- if (p.ia or demo) do_kick = true --dir.x = rnd(1) <= 0.5 and fw or - fw

        //--look_at(p.man, dir)
        //-- if (do_kick) then
        //--kick(p)
        //--sfx(0)
        //--kickoff_team = 0
        //--ball_thrown(p.man)
        //--end
    }
}

let game_state_toballout = {
    update: function (this) {
        //-- todo : tout le monde se met en place
        let l = distance(throwin_f, throwin.pos) / throwin.dist;
        camtarget = plus(muls(throwin.ballpos, 1 - l), muls(camlastpos, l))
        if (go_to(throwin_f, throwin.pos.x, throwin.pos.y, 2, 10))
            set_game_state(game_state_ballin)
    }
};

let game_state_ballin = {
    init: function (this) {
        ball.x = throwin.ballpos.x
        ball.y = throwin.ballpos.y
        muls_in_place(ball.d, 0)
        throwin_f.set_state(throwin_f, throwintype)
    },
}

function _init() {
    canvas = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.width = 128;
    canvas.height = 128;
    context = canvas.getContext('2d');
    context.msImageSmoothingEnabled = false;

    music(0, 0, 6)
    create_player(0)
    create_player(1)

    let fieldplayercount = 5
    for (let p = 0; p <= 1; ++p) {
        for (let i = 0; i < fieldplayercount; i++) {
            let man = create_footballer(p, i)
            man.x = fw2
            man.y = 0
            //--			if (p == 0) man.y = -man.y
            //add(men, man)
            men.push(man);
        }
    }

    // fieldplayercount += 1
    players[/*1*/0].man = men[0]
    players[/*2*/1].man = men[fieldplayercount]

    //add(men, create_keeper(0, fieldplayercount))
    men.push(create_keeper(0, fieldplayercount));
    //add(men, create_keeper(1, fieldplayercount))
    men.push(create_keeper(1, fieldplayercount));

    start_match(true)
}


function ball_thrown(f) {
    f.lastspr = 2
    set_state_ok(f)
    balllasttouchedside = f.side
    f.justshot = 10
    set_game_state(game_state_playing)
}


function throw_in(dy) {
    let dx = -1;
    if (throwin.ballpos.x < 0) dx = -dx;
    if (dy != 0) dx /= 2;
    let power = 3;
    let d = unit({ x: dx, y: dy });
    ball.d = muls(d, power);
    ball.d.z = 1.5;
}


function fs_throwin_ai(p) {
    let f = p.man
    let dy = 0
    if (ball.y * f.side > 0) {
        dy = -2
    } else {
        if (ball.y * f.side > -fh2 / 2) dy = -1
    }
    dy *= f.side

    if (checktimer(throwin)) {
        throw_in(dy)
        ball_thrown(f)
        return
    }
    f.lastspr = 2 + dy
    if (pass(f)) ball_thrown(f)
}


function fs_throwin_input(p) {
    let dy = 0
    if (btn(2, p.num)) dy -= 2;
    if (btn(3, p.num)) dy += 2;
    if (btn(0, p.num) || btn(1, p.num)) dy /= 2;
    p.man.lastspr = 2 + dy;
    if (btn(4, p.num)) {
        //--if (not pass(p.man)) throw_in(dy)
        throw_in(dy);
        ball_thrown(p.man);
    }
}


function fs_throwin_draw(f) {
    jersey_color(f)
    let pos = sprite_pos(f)
    f.lastflip = f.x > 0
    spr(48 + f.lastspr, pos.x, pos.y, 1, 1, f.lastflip)
    ball.x = f.x
    ball.y = f.y
    ball.z = 7
    ball.d.z = 0
}


function throwin_start(this) {
    throwin.timer = 35
    throwin_f.x = throwin.pos.x
    throwin_f.y = throwin.pos.y
    muls_in_place(throwin_f.d, 0)
}


let fstate_throwin = {
    start: throwin_start,
    ai: fs_throwin_ai,
    input: fs_throwin_input,
    draw: fs_throwin_draw
};


function kicking(p) {
    if (run_to(throwin_f, throwin.ballpos.x, throwin.ballpos.y)) {
        ball_thrown(throwin_f)
        ball.d.x = throwin.balld.x
        ball.d.y = throwin.balld.y
        ball.d.z = 5
    }
}


let fstate_running = {
    ai: kicking,
    input: kicking,
    draw: draw_footballer
};


function kick_dir() {
    throwin.balld = muls({ x: throwin.ballpos.x - throwin_f.x, y: throwin.ballpos.y - throwin_f.y }, 0.25)
    clampvec_getlen(throwin.balld, throwin.kickmax)
    look_at(throwin_f, ball)
}


function fs_corner_ai(p) {
    //--todo : move the player
    if (checktimer(throwin)) {
        kick_dir()
        throwin_f.set_state(throwin_f, fstate_running)
    }
}


function fs_corner_input(p) {
    if (btn(0, p.num)) throwin_f.d.x -= vel_inc
    if (btn(1, p.num)) throwin_f.d.x += vel_inc
    if (btn(2, p.num)) throwin_f.d.y -= vel_inc
    if (btn(3, p.num)) throwin_f.d.y += vel_inc

    kick_dir()
    if (btn(4, p.num)) throwin_f.set_state(throwin_f, fstate_running)
}


let fstate_corner = {
    start: throwin_start,
    ai: fs_corner_ai,
    input: fs_corner_input,
    draw: draw_footballer
};


let fstate_goalkick = {
    start: throwin_start,
    ai: fs_corner_ai,
    input: fs_corner_input,
    draw: draw_footballer
};


function get_controlled(side) {
    return players[side_to_idx(side) - 1].man
}


function findpos2(f, t) {
    if (f == throwin_f) return
    let dest = attackpos[f.startposidx]
    let sid = 1
    if (is_throwin() && t.x * dest.x < 0) sid = -0.5
    let x = sid * dest.x * fw2 + t.x / 2
    //--x = clampsym(x, is_throwin() and fw2/ 2 or fw2)
    x = clampsym(x, fw2)
    let y = f.side * dest.y * fh2 + t.y
    y = clampsym(y, fh2 * 0.8)
    run_to(f, x, y)
}


function findpos(f) {
    //-- if not is_controlled(f) then
    if (f != get_controlled(f.side)) {
        //--local futurme = plus(f, muls({ x=f.d.x, y=f.d.y }, 10))
        //--local futurcon = plus(fcon, muls({ x=fcon.d.x, y=fcon.d.y }, 10))
        //--local futurball = plus(ball, muls({ x=ball.d.x, y=ball.d.y }, 10))
        //--local closer= dist_manh(futurme, futurball) < dist_manh(futurcon, futurball)
        //-- if(dist and don or closer) then
        if (playing() && f.ball_dist < ball_dist_thres && get_controlled(f.side).ball_dist > ball_dist_thres / 2) {
            run_to(f, ball.x, ball.y)
        } else {
            findpos2(f, ball)
        }
    }
}


let keeper_state_run = {
    draw: draw_footballer,
};


let fstate_ok = {
    ai: function (p) {
        let f = p.man;
        if (f == null) return

        //-- if (is_throwin()) findpos2(f, ball)
        if (is_throwin()) findpos2(f, { x: 0, y: 0 })

        if (playing()) {
            //-- if running after the ball and it's going to leave the field on the throwin side
            //-- and a team mate is in front of the ball... let him handle the situation

            if ((f.hasball || run_to(f, ball.x, ball.y)) && ball.z < 8 && f.justshot <= 0) {
                //-- try to shoot
                let goal = { x: 0, y: -f.side * fh2 }
                if (dist_manh(goal, f) < 75) {
                    f.dir = unit(minus(goal, f))
                    p.but = rnd(max_kick / 2) + max_kick / 3
                    kick(p)
                    return
                }
                //-- try to pass
                if (!pass(f)) {
                    //-- try to get near the goal
                    if (f.hasball) {
                        let togoal = minus(goal, f);//--unit(minus(goal, f))
                        if (dot(f.dir, togoal) < sin22_5) {
                            let side = { x: -f.dir.y, y: f.dir.x }
                            let turn = plus(f, muls(side, 35))
                            run_to(f, turn.x, turn.y)
                        } else {
                            run_to(f, 0, goal.y * 0.75)
                        }
                    }
                }
            }
        }
    },

    input: function (p) {
        if (p.man == null || (!playing() && !is_throwin())) return
        let man = p.man

        if (btn(0, p.num)) man.d.x -= vel_inc
        if (btn(1, p.num)) man.d.x += vel_inc
        if (btn(2, p.num)) man.d.y -= vel_inc
        if (btn(3, p.num)) man.d.y += vel_inc

        if (playing()) {
            if (btn(4, p.num)) {
                p.but += 1
                if (p.but >= max_kick) button_released(p)
            } else {
                if (p.but > 0) button_released(p)
            }
        }
    },

    draw: draw_footballer,

    update: function (f) {
        if (playing())
            findpos(f);

        if (is_throwin() || game_state == game_state_toballout) {
            if (throwintype == fstate_throwin) findpos(f);
            if (throwintype == fstate_goalkick) findpos2(f, { x: 0, y: 0 });
            if (throwintype == fstate_corner) findpos2(f, { x: 0, y: -fh2 * throwinside });
        }
    }
}

let fstate_down = {
    start: function (f) {
        f.timer = 60
        if (f.keeper) f.lastspr = 0
    },

    draw: function (f) {
        let down_spr = 37
        let pos = sprite_pos(f)
        jersey_color(f)
        spr(down_spr + f.lastspr, pos.x, pos.y, 1, 1, f.lastflip)
    },

    update: function (f) {
        if (checktimer(f)) {
            set_state_ok(f)
        } else {
            damp(f)
        }
    }
};

let fstate_tackle = {
    start: function (f) {
        f.timer = 45
        plus_in_place(f.d, muls(f.dir, 3.0))
    },

    draw: function (f) {
        let pos = sprite_pos(f)
        jersey_color(f)
        spr(32 + f.lastspr, pos.x, pos.y, 1, 1, f.lastflip)
    },

    update: function (f) {
        if (checktimer(f)) {
            set_state_ok(f)
        } else {
            damp(f)

            // -- check collision
            for (let m of men) {
                check_tackle(f, m)
            }
        }
    }
};


function check_tackle(tackler, other) {
    if (tackler != other) {
        let dist = distance(tackler, other)
        let tackle_dist = 5
        if (dist < tackle_dist)
            other.set_state(other, fstate_down)
    }
}


function stick_ball(f) {
    let prevball = muls(ball, 1)
    muls_in_place(ball, 0.8)
    plus_in_place(ball, muls(plus(f, muls(f.dir, 3)), 0.2));//-- + lerp to wanted_ball
}


function _update() {
    ballsfxtime -= 1
    if (playing()) {
        // --time management
        let first_half = !(matchtimer >= half_time)
        if (!demo)
            matchtimer += 1;

        if (first_half && matchtimer >= half_time || matchtimer > full_time) {
            changing_side = first_half
            //foreach(men, change_side)
            for (let m of men) {
                change_side(m);
            }
            camlastpos = copy(camtarget)
            set_game_state(game_state_tokickoff)
            kickoff_team = 3 - starting_team
            sfx(matchtimer > full_time && 1 || 0)
            return
        }

        dribblen = 0
        //foreach(men, dribble_ball)
        for (let m of men) {
            dribble_ball(m);
        }
        if (dribblen > 0) {
            ball.d.x = dribble.x / dribblen
            ball.d.y = dribble.y / dribblen
            muls_in_place(dribble, 0)

            // --improving ball control
            if (dribblen == 1) stick_ball(man_with_ball)

            if (clampvec_getlen(ball.d, 10) > 1) ballsfx()
        }

        distance_men_ball()
    }

    //foreach(men, damp)
    for (let m of men) {
        damp(m);
    }
    //foreach(players, player_input)
    for (let p of players) {
        player_input(p);
    }
    //foreach(men, man_update)
    for (let m of men) {
        man_update(m);
    }
    update_ball()

    if (is_throwin())
        players[side_to_idx(throwinside) - 1].man = throwin_f;

    if (game_state.update != null)
        game_state.update()

    update_cam()

    if (demo) {
        if (checktimer(menu)) {
            menu.timer = 10
            blink = !blink
        }
        if (btnp(0)) mode -= 1
        if (btnp(1)) mode += 1
        if (mode < 0) mode = 2
        if (mode > 2) mode = 0
        if (btnp(2)) changeshirt(1)
        if (btnp(3)) changeshirt(2)
        if (btn(4)) start_match(false)
    }
}


function changeshirt(i) {
    teamcolors[i] += 1
    if (teamcolors[i] >= shirtcolors.length - 1)
        teamcolors[i] = 1
    if (teamcolors[i] == teamcolors[3 - i])
        teamcolors[i] += 1
}


function _draw() {
    camera()
    rectfill(0, 0, 127, 127, 3)

    camera(camtarget.x - 64, camtarget.y - 64)

    for (let y = -fh2; y <= fh2 - 1; y += 32) {
        rectfill(-fw2, y, fw2, y + 16, 3)
        rectfill(-fw2, y + 16, fw2, y + 32, 11)
    }

    color(7)
    rect(-fw2, -fh2, fw2, fh2)
    line(-fw2, 0, fw2, 0)

    rect(-penaltyw2, -fh2, penaltyw2, -fh2_penaltyh)
    rect(-penaltyw2, fh2, penaltyw2, fh2_penaltyh)

    circ(0, 0, 30)

    palt(3, true)
    palt(0, false)

    let draw_list = [];//{}
    //add(draw_list, goal_up)
    draw_list.push(goal_up);
    //add(draw_list, ball)
    draw_list.push(ball);
    for (let i of men) {
        //add(draw_list, i)
        draw_list.push(i);
    }
    //add(draw_list, goal_down)
    draw_list.push(goal_down);
    bubble_sort(draw_list)

    for (let i of draw_list) {
        i.drawshadow(i);
    }

    for (let i of draw_list) {
        i.draw(i)
    }

    draw_marker(players[0].man)
    draw_marker(players[1].man)

    //-- for i in all(men) do
    //    --line(i.x, i.y, i.x + 10 * i.dir.x, i.y + 10 * i.dir.y, 10)
    //-- end

    pal()
    palt()
    camera()

    if (scoring_team != 0) print_outlined("goal!", 55, 6, 7, 0)
    if (matchtimer > full_time) print_outlined("game over", 47, 16, 7, 0)
    if (changing_side) print_outlined("half time", 47, 16, 7, 0)

    print_outlined(score[1], 116, 1, 12, 0)
    print_outlined("-", 120, 1, 7, 0)
    print_outlined(score[2], 124, 1, 8, 0)
    if (demo) {
        menu_offset = Math.max(menu_offset / 2, 1)
    } else {
        menu_offset = Math.min(menu_offset * 2, 128)
        print_outlined(Math.floor(matchtimer / 30), 1, 122, 7, 0)
    }
    print_outlined("succer", 51 + menu_offset, 40, 7, 0)
    print_mode(0, "player vs player")
    print_mode(1, "player vs cpu")
    print_mode(2, "   cpu vs cpu")
    draw_button(0, 20, 74)
    draw_button(1, 100, 74)
    print_outlined("team colors", 42 + menu_offset, 90, 6, 5)
    draw_button(2, 20, 89)
    draw_button(3, 100, 89)
    if (blink)
        print_outlined("press z to start", 32 - menu_offset, 110, 6, 5)
}


function draw_button(s, x, y) {
    spr(64 + s, x - menu_offset, y + (btnp(s) && 1 || 0))
}