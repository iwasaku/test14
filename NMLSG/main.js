phina.globalize();

console.log = function () { };  // ログを出す時にはコメントアウトする

const FPS = 60;  // 60フレ

const SCREEN_WIDTH = 1080;              // スクリーン幅
const SCREEN_HEIGHT = 2340;              // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const MAX_TOTAL_COUNT = 2100000000;  // 累積値の最大値（21億）

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
const ASSETS = {
    font: {
        "misaki_gothic": "https://cdn.leafscape.be/misaki/misaki_gothic_web.woff2"
    },
    image: {
        "tball": "./resource/tball.png?20230503",
        "field": "./resource/field_64.png",

        "cash_register": "./resource/cashRegister.png",
        "lemon": "./resource/lemon.png",
        "metal_wing": "./resource/metalWing.png",
        "nessie": "./resource/Nessie.png",
        "rabbit": "./resource/Rabbit.png",
        "ute_blue": "./resource/uteBlue.png",
        "ute_femo": "./resource/uteFemo.png",
        "ute_ninja": "./resource/uteNINJA.png",
        "ute_yado": "./resource/uteYado.png",
        "white_choco": "./resource/whiteChoco.png",
    },
    sound: {
        //出現時
        "appear_se": 'https://iwasaku.github.io/test14/TRCNG/resource/appear.mp3',
        //投げた時
        "throw_se": 'https://iwasaku.github.io/test14/TRCNG/resource/throw.mp3',
        //当たった時
        "hit_se": 'https://iwasaku.github.io/test14/TRCNG/resource/hit.mp3',
        //カウント
        "count_se": 'https://iwasaku.github.io/test14/TRCNG/resource/count.mp3',
        //ゲット
        "get_se": 'https://iwasaku.github.io/test14/TRCNG/resource/get.mp3',
        //GAME OVER
        "game_over_se": 'https://iwasaku.github.io/test11/UT-404/SSS2/resource/t02/12.mp3',
    }
};

// ゲームモード
let tmpEnumValue = 0;
const GAME_MODE = defineEnum({
    GAME_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    APPEAR_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    APPEAR: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    START_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    START: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(1),
        tap_tball: Boolean(1),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(1),
        move_z_trcn: Boolean(1),
        move_tgtring: Boolean(1),
        tp_tball: Boolean(0),
    },
    THROW_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(1),
        tap_tball: Boolean(0),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    THROW: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(1),
        tap_tball: Boolean(0),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    HIT_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    HIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    COUNT_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    COUNT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(1),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    GET_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    GET: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    RUNAWAY_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(1),
    },
    RUNAWAY: {
        value: tmpEnumValue++,
        disp_tball: Boolean(1),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(1),
    },
    MISS_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    MISS: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(1),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    GAME_OVER_INIT: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
    GAME_OVER: {
        value: tmpEnumValue++,
        disp_tball: Boolean(0),
        disp_trcn: Boolean(0),
        disp_tgtring: Boolean(0),
        tap_tball: Boolean(0),
        move_tball: Boolean(0),
        move_xy_trcn: Boolean(0),
        move_z_trcn: Boolean(0),
        move_tgtring: Boolean(0),
        tp_tball: Boolean(0),
    },
});

// TBALLの状態
tmpEnumValue = 0;
const TB_STATUS = defineEnum({
    INIT: {
        value: tmpEnumValue++,
        isStart: Boolean(0),
        isMove: Boolean(0),
        isSuccess: Boolean(0),
        isFinish: Boolean(0),
        string: 'init'
    },
    WAIT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isSuccess: Boolean(0),
        isFinish: Boolean(0),
        string: 'wait'
    },
    MOVE_SHORT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isSuccess: Boolean(0),
        isFinish: Boolean(0),
        string: 'move_short'
    },
    MOVE_LONG: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isSuccess: Boolean(0),
        isFinish: Boolean(0),
        string: 'move_long'
    },
    MOVE_MISS: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isSuccess: Boolean(0),
        isFinish: Boolean(0),
        string: 'move_miss'
    },
    MOVE_HIT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isSuccess: Boolean(1),
        isFinish: Boolean(0),
        string: 'move_hit'
    },
    MOVE_FALL: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isSuccess: Boolean(0),
        isFinish: Boolean(0),
        string: 'move_fall'
    },
    FINISH: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isSuccess: Boolean(0),
        isFinish: Boolean(1),
        string: 'finish'
    },
});

// TRCNの状態
tmpEnumValue = 0;
const TRCN_STATUS = defineEnum({
    INIT: {
        value: tmpEnumValue++,
        isStart: Boolean(0),
        isMove: Boolean(0),
        isAttack: Boolean(0),
        isFinish: Boolean(0),
        string: 'init'
    },
    WAIT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isAttack: Boolean(0),
        isFinish: Boolean(0),
        string: 'wait'
    },
    MOVE_XY_INIT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isAttack: Boolean(0),
        isFinish: Boolean(0),
        string: 'move'
    },
    MOVE_XY: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isAttack: Boolean(0),
        isFinish: Boolean(0),
        string: 'move'
    },
    MOVE_Z_INIT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isAttack: Boolean(1),
        isFinish: Boolean(0),
        string: 'move'
    },
    MOVE_Z: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isAttack: Boolean(1),
        isFinish: Boolean(0),
        string: 'move'
    },
    STOP: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isAttack: Boolean(0),
        isFinish: Boolean(0),
        string: 'stop'
    },
    FINISH: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isAttack: Boolean(0),
        isFinish: Boolean(1),
        string: 'finish'
    },
});

// ヒットタイプ
tmpEnumValue = -1;
const HIT_TYPE = defineEnum({
    NONE: {
        value: tmpEnumValue++,
        string: ''
    },
    NORMAL: {
        value: tmpEnumValue++,
        string: ''
    },
    NICE: {
        value: tmpEnumValue++,
        string: 'Nice!'
    },
    GREAT: {
        value: tmpEnumValue++,
        string: 'Great!!'
    },
    EXCELLENT: {
        value: tmpEnumValue++,
        string: 'Excellent!!!'
    },
    CRITICAL: {
        value: tmpEnumValue++,
        string: ''
    },
});

const startThetaTbl = [
    0,
    0,
    0,
    Math.PI / 2,
    0,
    0,
    0,
    0,
    Math.PI / 2,
    0,
    Math.PI,
];
const atkTbl = [
    { min: 5.0 * FPS, max: 7.5 * FPS },
    { min: 4.5 * FPS, max: 7.3 * FPS },
    { min: 4.0 * FPS, max: 7.1 * FPS },
    { min: 3.5 * FPS, max: 7.0 * FPS },
    { min: 3.0 * FPS, max: 6.5 * FPS },
    { min: 2.5 * FPS, max: 6.0 * FPS },
    { min: 2.0 * FPS, max: 5.5 * FPS },
    { min: 1.5 * FPS, max: 5.0 * FPS },
    { min: 1.0 * FPS, max: 4.5 * FPS },
    { min: 1.0 * FPS, max: 4.0 * FPS },
    { min: 0.5 * FPS, max: 4.0 * FPS },
];
const counterAtkTbl = [
    128, //5
    64, //6
    32, //7
    16, //8
    8,  //9
    2,  //10
];

const ENEMY_DEF = defineEnum({
    ENEMY_0: {
        name: "レモン",
        sprName: "lemon",
    },
    ENEMY_1: {
        name: "メタルウィング",
        sprName: "metal_wing",
    },
    ENEMY_2: {
        name: "ネッシー",
        sprName: "nessie",
    },
    ENEMY_3: {
        name: "ウサギ",
        sprName: "rabbit",
    },
    ENEMY_4: {
        name: "ホワイトチョコ",
        sprName: "white_choco",
    },
    ENEMY_5: {
        name: "レジ",
        sprName: "cash_register",
    },
    ENEMY_6: {
        name: "うてな",
        sprName: "ute_blue",
    },
    ENEMY_7: {
        name: "フェモ",
        sprName: "ute_femo",
    },
    ENEMY_8: {
        name: "にんじゃ",
        sprName: "ute_ninja",
    },
    ENEMY_9: {
        name: "ヤドカリ",
        sprName: "ute_yado",
    },
});
const enemyTbl = [
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_0],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_1],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_2],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_3],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_4],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_5],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_6, ENEMY_DEF.ENEMY_6, ENEMY_DEF.ENEMY_6, ENEMY_DEF.ENEMY_6],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_6, ENEMY_DEF.ENEMY_7, ENEMY_DEF.ENEMY_7, ENEMY_DEF.ENEMY_7],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_6, ENEMY_DEF.ENEMY_7, ENEMY_DEF.ENEMY_8, ENEMY_DEF.ENEMY_8],
    [ENEMY_DEF.ENEMY_0, ENEMY_DEF.ENEMY_1, ENEMY_DEF.ENEMY_2, ENEMY_DEF.ENEMY_3, ENEMY_DEF.ENEMY_4, ENEMY_DEF.ENEMY_5, ENEMY_DEF.ENEMY_6, ENEMY_DEF.ENEMY_7, ENEMY_DEF.ENEMY_8, ENEMY_DEF.ENEMY_9],
];

let gameMode = null;
let group0 = null;  // BG
let group1 = null;  // TRCN
let group2 = null;  // TGT_RING
let group3 = null;  // TBALL
let group4 = null;  // ラベル類
let tball = null;
let trcn = null;
let enemyDef = null;
let tgtRingW = null;    // 白
let tgtRingG = null;    // 緑
let tgtRingY = null;    // 黄
let tgtRingO = null;    // 朱
let tgtRingR = null;    // 赤
let trcnNum = 0;
let ballNum = 0;
let orgTrcnPos = phina.geom.Vector2(0, 0);
let bounceFrom = phina.geom.Vector2(0, 0);
let bounceTo = phina.geom.Vector2(0, 0);
let bounceDelta = phina.geom.Vector2(0, 0);
let bounceCounter = 0;
let countNum = 0;
let countNumCounter = 0;
let countNumDispCounter = 0;
let hitStep = -1;
let nowScore = 0;
let scoreTimer = 0;
let randomSeed = 3557;
let randomMode = Boolean(1);

let trophyArray = new Array();
let trcngPlayCount = 0;
let totalPlayCount = 0;
let maxScore = 0;
let totalScore = 0;
let maxStage = 0;
let maxGreatCount = 0;
let totalGreatCount = 0;
let maxExcellentCount = 0;
let totalExcellentCount = 0;
let maxCurveCount = 0;
let totalCurveCount = 0;
let tmpGreatCount = 0;
let tmpExcellentCount = 0;
let tmpCurveCount = 0;

let dbgMode = 0;
let dbgForceCritical = 0;
let dbgForceExcellent = 0;
let dbgForceGreat = 0;
let dbgFixEnemyKind = -1;
let dbgFixMoveKind = -1;

// 共有ボタン用
let postText = null;
const postURL = "https://iwasaku.github.io/test14/NMLSG/";
const postTags = "#ネムレス #NEMLESSS";

phina.main(function () {
    var app = GameApp({
        startLabel: 'logo',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
        fps: FPS,
        backgroundColor: 'black',

        // シーンのリストを引数で渡す
        scenes: [
            {
                className: 'LogoScene',
                label: 'logo',
                nextLabel: 'title',
            },
            {
                className: 'TitleScene',
                label: 'title',
                nextLabel: 'game',
            },
            {
                className: 'GameScene',
                label: 'game',
                nextLabel: 'game',
            },
        ]
    });

    // iOSなどでユーザー操作がないと音がならない仕様対策
    // 起動後初めて画面をタッチした時に『無音』を鳴らす
    app.domElement.addEventListener('touchend', function dummy() {
        var s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    // fps表示
    //app.enableStats();

    // 実行
    app.run();
});

/*
* ローディング画面をオーバーライド
*/
phina.define('LoadingScene', {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit(options);
        // 背景色
        var self = this;
        var loader = phina.asset.AssetLoader();

        // 明滅するラベル
        let label = phina.display.Label({
            text: "",
            fontSize: 64,
            fill: 'white',
        }).addChildTo(this).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        // ロードが進行したときの処理
        loader.onprogress = function (e) {
            // 進捗具合を％で表示する
            label.text = "{0}%".format((e.progress * 100).toFixed(0));
        };

        // ローダーによるロード完了ハンドラ
        loader.onload = function () {
            // Appコアにロード完了を伝える（==次のSceneへ移行）
            self.flare('loaded');
        };

        // ロード開始
        loader.load(options.assets);
    },
});

/*
 * ロゴ
 */
phina.define("LogoScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);
        this.localTimer = 0;
        this.font1 = false;
        this.font2 = false;
    },

    update: function (app) {
        // フォントロード完了待ち
        var self = this;
        document.fonts.load('10pt "misaki_gothic"').then(function () {
            self.font1 = true;
        });
        document.fonts.load('10pt "icomoon"').then(function () {
            self.font2 = true;
        });
        if (this.font1 && this.font2) {
            self.exit();
        }
    }
});

/*
 * タイトル
 */
phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);
        this.backgroundColor = 'black';

        this.title1Label = Label({
            text: "NxMxLxSSS",
            fontSize: 128 + 96,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y - SCREEN_CENTER_Y / 3,
        }).addChildTo(this);
        this.title2Label = Label({
            text: "ＧＯ",
            fontSize: 256 + 96,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y,
        }).addChildTo(this);
        this.versionLabel = Label({
            text: "v.9999",
            fontSize: 32,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X + 256 + 128,
            y: SCREEN_CENTER_Y + 128,
        }).addChildTo(this);
        this.trophyBgLabel = Label({
            text: "☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n☆☆☆☆☆☆☆☆☆☆\n",
            fontSize: 32,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + 128 + 256 - 16,
        }).addChildTo(this);
        this.trophyBgLabel.alpha = 0.25;
        this.trophyLabel = Label({
            text: "",
            fontSize: 32,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + 128 + 256 - 16,
        }).addChildTo(this);

        this.startButton = Button({
            text: "START",
            fontFamily: FONT_FAMILY,
            fontSize: 96,
            fill: "hsl(240, 0%, 70%)",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + SCREEN_CENTER_Y / 2 + 64,
            cornerRadius: 8,
            width: 512,
            height: 160,
        }).addChildTo(this);

        this.cdByLabel = Label({
            text: "Character Design\nby",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + SCREEN_CENTER_Y / 2 + 64 + 32 + 128 + 32,
        }).addChildTo(this);
        this.knpButton = Button({
            text: "＠57pool",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            fill: "#000",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + SCREEN_CENTER_Y / 2 + 64 + 32 + 128 + 128 + 64,
            width: 512,
            height: 160,
        }).addChildTo(this);

        this.localTimer = 0;

        // TARACHINE GOのプレイデータのLOAD
        {
            let tmp = null;
            tmp = localStorage.getItem('trcng.tpc');
            trcngPlayCount = (tmp === null) ? 0 : parseInt(tmp);
        }
        // プレイデータのLOAD
        {
            let tmp = null;
            tmp = localStorage.getItem('nmlsg.tpc');
            totalPlayCount = (tmp === null) ? 0 : parseInt(tmp);

            tmp = localStorage.getItem('nmlsg.msc');
            maxScore = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.tsc');
            totalScore = (tmp === null) ? 0 : parseInt(tmp);

            tmp = localStorage.getItem('nmlsg.mst');
            maxStage = (tmp === null) ? 0 : parseInt(tmp);

            tmp = localStorage.getItem('nmlsg.mgc');
            maxGreatCount = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.tgc');
            totalGreatCount = (tmp === null) ? 0 : parseInt(tmp);

            tmp = localStorage.getItem('nmlsg.mec');
            maxExcellentCount = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.tec');
            totalExcellentCount = (tmp === null) ? 0 : parseInt(tmp);

            tmp = localStorage.getItem('nmlsg.mcc');
            maxCurveCount = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.tcc');
            totalCurveCount = (tmp === null) ? 0 : parseInt(tmp);

            tmp = localStorage.getItem('nmlsg.dbg');
            dbgMode = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.fcr');
            dbgForceCritical = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.fex');
            dbgForceExcellent = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.fgr');
            dbgForceGreat = (tmp === null) ? 0 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.fen');
            dbgFixEnemyKind = (tmp === null) ? -1 : parseInt(tmp);
            tmp = localStorage.getItem('nmlsg.fmn');
            dbgFixMoveKind = (tmp === null) ? -1 : parseInt(tmp);
        }
        // トロフィー表示データ
        {
            makeTrophyArray();

            let tmpTrophy = "";
            let ii = 0;
            for (let jj = 0; jj < 10; jj++) {
                for (let kk = 0; kk < 10; kk++) {
                    if (trophyArray[ii++] === 1) {
                        tmpTrophy += "★";
                    } else {
                        tmpTrophy += "　";
                    }
                }
                if (jj !== 9) {
                    tmpTrophy += "\n";
                }
            }
            this.trophyLabel.text = tmpTrophy;

            // TARACHINE GOを１回もプレイしていない時はトロフィーを表示しない
            if (trcngPlayCount < 1) {
                this.trophyBgLabel.alpha = 0.0;
                this.trophyLabel.alpha = 0.0;
            }
        }
        this.knpButton.onclick = function () {
            window.open("https://twitter.com/9seigun");
        };
        var self = this;
        this.startButton.onpointstart = function () {
            self.exit();
        };
    },

    update: function (app) {
    }
});

/*
 * ゲーム
 */
phina.define("GameScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);
        this.backgroundColor = 'black';

        gameMode = GAME_MODE.GAME_INIT;
        group0 = DisplayElement().addChildTo(this);
        group1 = DisplayElement().addChildTo(this);
        group2 = DisplayElement().addChildTo(this);
        group3 = DisplayElement().addChildTo(this);
        group4 = DisplayElement().addChildTo(this);

        this.bgField = phina.display.Sprite("field").addChildTo(group0);
        this.bgField.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        trcn = new Trcn("cash_register").addChildTo(group1);
        tgtRingW = new TargetRing("#ffffff", 1).addChildTo(group2);
        tgtRingG = new TargetRing("#00ff00", 0).addChildTo(group2);
        tgtRingY = new TargetRing("#ffff00", 0).addChildTo(group2);
        tgtRingO = new TargetRing("#f58220", 0).addChildTo(group2);
        tgtRingR = new TargetRing("#ff0000", 0).addChildTo(group2);
        tball = new TBall().addChildTo(group3);

        this.nowTrcnNumLabel = Label({
            text: "0ネムレス",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "right",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_WIDTH - 32,
            y: 32 + 32,
        }).addChildTo(group4);
        this.nowScoreLabel = Label({
            text: "0てん",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "right",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_WIDTH - 32,
            y: 64 + 32 + 32,
        }).addChildTo(group4);
        this.ballNumLabel = Label({
            text: "10",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "right",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X + 128 + 64,
            y: SCREEN_HEIGHT - 256 + 64,
        }).addChildTo(group4);
        this.gameOverLabel = Label({
            text: "GAME OVER",
            fontSize: 256 - 32,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y / 2,
        }).addChildTo(group4);
        this.resultLabel = Label({
            text: "0ネムレス\n0てん\n0%\n",
            fontSize: 96,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y / 2 + (256 + 96),
        }).addChildTo(group4);
        this.appearLabel = Label({
            text: "",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y / 2 + 96,
        }).addChildTo(group4);
        this.hitTypeLabel = Label({
            text: "",
            fontSize: 128,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y,
        }).addChildTo(group4);
        this.countNumLabel = Label({
            text: "1",
            fontSize: 1024,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X + 64,
            y: SCREEN_CENTER_Y + 64,
        }).addChildTo(group4);
        this.successLabel = Label({
            text: "",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y - 48,
        }).addChildTo(group4);
        this.runawayLabel = Label({
            text: "あ！ボールから抜け出した",
            fontSize: 64,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y / 2,
        }).addChildTo(group4);

        // X
        this.xButton = Button({
            text: String.fromCharCode(0xe902),
            fontSize: 80,
            fontFamily: "icomoon",
            fill: "#7575EF",
            x: SCREEN_CENTER_X - 256 - 160,
            y: SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2),
            cornerRadius: 8,
            width: 120,
            height: 120,
        }).addChildTo(group4);
        this.xButton.onclick = function () {
            // https://developer.x.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
            let shareURL = "https://x.com/intent/tweet?text=" + encodeURIComponent(postText + "\n" + postTags + "\n") + "&url=" + encodeURIComponent(postURL);
            window.open(shareURL);
        };
        this.xButton.alpha = 0.0;
        this.xButton.sleep();

        // threads
        this.threadsButton = Button({
            text: String.fromCharCode(0xe901),
            fontSize: 80,
            fontFamily: "icomoon",
            fill: "#7575EF",
            x: SCREEN_CENTER_X - 256,
            y: SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2),
            cornerRadius: 8,
            width: 120,
            height: 120,
        }).addChildTo(group4);
        this.threadsButton.onclick = function () {
            // https://developers.facebook.com/docs/threads/threads-web-intents/
            // web intentでのハッシュタグの扱いが環境（ブラウザ、iOS、Android）によって違いすぎるので『#』を削って通常の文字列にしておく
            let shareURL = "https://www.threads.net/intent/post?text=" + encodeURIComponent(postText + "\n\n" + postTags.replace(/#/g, "")) + "&url=" + encodeURIComponent(postURL);
            window.open(shareURL);
        };
        this.threadsButton.alpha = 0.0;
        this.threadsButton.sleep();

        // bluesky
        this.bskyButton = Button({
            text: String.fromCharCode(0xe900),
            fontSize: 80,
            fontFamily: "icomoon",
            fill: "#7575EF",
            x: SCREEN_CENTER_X - 256 + 160,
            y: SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2),
            cornerRadius: 8,
            width: 120,
            height: 120,
        }).addChildTo(group4);
        this.bskyButton.onclick = function () {
            // https://docs.bsky.app/docs/advanced-guides/intent-links
            let shareURL = "https://bsky.app/intent/compose?text=" + encodeURIComponent(postText + "\n" + postTags + "\n" + postURL);
            window.open(shareURL);
        };
        this.bskyButton.alpha = 0.0;
        this.bskyButton.sleep();

        this.restartButton = Button({
            text: "RESTART",
            fontSize: 80,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#B2B2B2",
            x: SCREEN_CENTER_X + 256,
            y: SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2),
            cornerRadius: 8,
            width: 320,
            height: 120,
        }).addChildTo(group4);

        this.nowTrcnNumLabel.alpha = 0.0;
        this.nowScoreLabel.alpha = 0.0;
        this.ballNumLabel.alpha = 0.0;
        this.gameOverLabel.alpha = 0.0;
        this.resultLabel.alpha = 0.0;
        this.appearLabel.alpha = 0.0;
        this.hitTypeLabel.alpha = 0.0;
        this.countNumLabel.alpha = 0.0;
        this.successLabel.alpha = 0.0;
        this.runawayLabel.alpha = 0.0;
        this.restartButton.alpha = 0.0;
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointstart = function () {
            self.exit();
        };

        this.buttonAlpha = 0.0;
        if (!randomMode) randomSeed = 3557;
        nowScore = 0;
        appearTimer = 0;
        successTimer = 0;
        trophyLv = calcTrophyLv();
        trcnNum = 0;
        ballNum = 10;
        tmpGreatCount = 0;
        tmpExcellentCount = 0;
        tmpCurveCount = 0;
        this.frame = 0;
        this.stopBGM = false;
    },

    update: function (app) {
        switch (gameMode) {
            case GAME_MODE.GAME_INIT:
                gameMode = GAME_MODE.APPEAR_INIT;
            // FALLTHRU
            case GAME_MODE.APPEAR_INIT:
                enemyDef = enemyTbl[trophyLv][trcnNum];
                if (dbgMode === 1) {
                    if (dbgFixEnemyKind != -1) enemyDef = enemyTbl[9][dbgFixEnemyKind];
                }
                trcn.remove();
                trcn = new Trcn(enemyDef.sprName).addChildTo(group1);
                SoundManager.play("appear_se");
                trcn.x = SCREEN_CENTER_X;
                trcn.y = SCREEN_CENTER_Y;
                trcn.setScale(1, 1);
                trcn.theta = startThetaTbl[trcnNum];
                trcn.atkTimer = myRandom2(atkTbl[trcnNum].min, atkTbl[trcnNum].max);
                if (dbgMode === 1) {
                    trcn.atkTimer = 99 * FPS;
                }

                appearTimer = 1 * FPS;
                this.appearLabel.text = "あ！やせいの" + enemyDef.name + "が\nとびだしてきた";
                this.appearLabel.alpha = 1.0;
                gameMode = GAME_MODE.APPEAR;
            // FALLTHRU
            case GAME_MODE.APPEAR:
                if (--appearTimer > 0) {
                    break;
                }
                this.appearLabel.alpha = 0.0;

                gameMode = GAME_MODE.START_INIT;
            // FALLTHRU
            case GAME_MODE.START_INIT:
                this.nowTrcnNumLabel.text = trcnNum + "ネムレス";
                this.nowScoreLabel.text = nowScore + "てん";
                this.ballNumLabel.text = ballNum + "";

                this.nowTrcnNumLabel.alpha = 1.0;
                this.nowScoreLabel.alpha = 1.0;
                this.ballNumLabel.alpha = 1.0;

                scoreTimer = 60 * FPS;   // 1min.

                tball.x = SCREEN_CENTER_X;
                tball.y = SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4;
                tball.setScale(1.0);
                tball.zRot = 0;
                tball.zRotOfs = 0;
                tball.rotation = 0;

                tgtRingW.dispFlag = Boolean(1);
                if (trcnNum <= 2) {
                    // 0〜2
                    tgtRingG.dispFlag = Boolean(1);
                    tgtRingY.dispFlag = Boolean(0);
                    tgtRingO.dispFlag = Boolean(0);
                    tgtRingR.dispFlag = Boolean(0);
                } else if (trcnNum <= 5) {
                    // 3〜5
                    tgtRingG.dispFlag = Boolean(0);
                    tgtRingY.dispFlag = Boolean(1);
                    tgtRingO.dispFlag = Boolean(0);
                    tgtRingR.dispFlag = Boolean(0);
                } else if (trcnNum <= 7) {
                    // 6〜7
                    tgtRingG.dispFlag = Boolean(0);
                    tgtRingY.dispFlag = Boolean(0);
                    tgtRingO.dispFlag = Boolean(1);
                    tgtRingR.dispFlag = Boolean(0);
                } else {
                    // 8〜9
                    tgtRingG.dispFlag = Boolean(0);
                    tgtRingY.dispFlag = Boolean(0);
                    tgtRingO.dispFlag = Boolean(0);
                    tgtRingR.dispFlag = Boolean(1);
                }
                let tmpSpd = trcnNum + 2;
                if (tmpSpd > 10) tmpSpd = 10;
                tgtRingG.sizeSpd = tmpSpd;
                tgtRingY.sizeSpd = tmpSpd;
                tgtRingO.sizeSpd = tmpSpd;
                tgtRingR.sizeSpd = tmpSpd;
                gameMode = GAME_MODE.START;
            // FALLTHRU
            case GAME_MODE.START:
                if (--scoreTimer <= 0) scoreTimer = 0;
                break;
            case GAME_MODE.THROW_INIT:
                SoundManager.play("throw_se");
                gameMode = GAME_MODE.THROW;
            // FALLTHRU
            case GAME_MODE.THROW:
                this.nowTrcnNumLabel.alpha = 0.0;
                this.nowScoreLabel.alpha = 0.0;
                this.ballNumLabel.alpha = 0.0;
                break;
            case GAME_MODE.HIT_INIT:
                SoundManager.play("hit_se");
                hitStep = 1;
                this.hitTypeLabel.alpha = 1.0;
                this.hitTypeLabel.text = tball.hitType.string;
                tball.curveTimer = 0;
                tball.zRot = 0;
                tball.zRotOfs = 0;
                gameMode = GAME_MODE.HIT;
            // FALLTHRU
            case GAME_MODE.HIT:
                switch (hitStep) {
                    case 1:
                        // step1:tball.xがtgtRing.xより大きい時は右上、小さい時は左上の座標を求める
                        bounceFrom.x = tball.x;
                        bounceFrom.y = tball.y;
                        if (tball.x > trcn.x) {
                            bounceTo.x = trcn.x + 256;
                        } else {
                            bounceTo.x = trcn.x - 256;
                        }
                        bounceTo.y = trcn.y - (256 + 128);
                        bounceDelta.x = (bounceTo.x - bounceFrom.x) / 15.0;
                        bounceDelta.y = (bounceTo.y - bounceFrom.y) / 15.0;
                        bounceCounter = 0;
                        hitStep = 2;
                    // FALLTHRU
                    case 2:
                        // step2:step1で求めた座標へtballを移動
                        if (++bounceCounter <= 15) {
                            tball.x = bounceFrom.x + bounceDelta.x * bounceCounter;
                            tball.y = bounceFrom.y + bounceDelta.y * bounceCounter;
                            break;
                        }
                        orgTrcnPos.x = trcn.x;
                        orgTrcnPos.y = trcn.y;
                        bounceFrom.x = trcn.x;
                        bounceFrom.y = trcn.y;
                        bounceDelta.x = (bounceTo.x - bounceFrom.x) / 15.0;
                        bounceDelta.y = (bounceTo.y - bounceFrom.y) / 15.0;
                        bounceCounter = 0;
                        hitStep = 3;
                    // FALLTHRU
                    case 3:
                        // step3:trcnを縮小しながらtballの座標へ移動
                        if (++bounceCounter <= 15) {
                            trcn.x = bounceFrom.x + bounceDelta.x * bounceCounter;
                            trcn.y = bounceFrom.y + bounceDelta.y * bounceCounter;
                            trcn.setScale(1 - bounceCounter / 15);
                            break;
                        }
                        trcn.setScale(0, 0);
                        bounceFrom.x = tball.x;
                        bounceFrom.y = tball.y;
                        bounceTo.x = SCREEN_CENTER_X;
                        bounceTo.y = SCREEN_CENTER_Y;
                        bounceDelta.x = (bounceTo.x - bounceFrom.x) / 15.0;
                        bounceDelta.y = (bounceTo.y - bounceFrom.y) / 15.0;
                        bounceCounter = 0;

                        this.hitTypeLabel.alpha = 0.0;
                        this.hitTypeLabel.text = "";
                        hitStep = 4;
                    case 4:
                        // step4:tballを拡大しながら画面中央へ
                        if (++bounceCounter <= 15) {
                            tball.x = bounceFrom.x + bounceDelta.x * bounceCounter;
                            tball.y = bounceFrom.y + bounceDelta.y * bounceCounter;
                            tball.setScale(tball.size * (1 + bounceCounter * 1.0));
                            break;
                        }
                        hitStep = 5;
                        gameMode = GAME_MODE.COUNT_INIT;
                }
                break;
            case GAME_MODE.COUNT_INIT:
                countNum = 1;
                countNumCounter = 0;
                SoundManager.play("count_se");
                if (tball.isGet === Boolean(1)) {
                    countNumDispCounter = 180;
                } else {
                    countNumDispCounter = myRandom(30, 150);
                }
                this.countNumLabel.text = countNum;
                this.countNumLabel.alpha = 0.0;
                if (tball.hitType == HIT_TYPE.CRITICAL) {
                    gameMode = GAME_MODE.GET_INIT;
                } else {
                    gameMode = GAME_MODE.COUNT;
                }
            // FALLTHRU
            case GAME_MODE.COUNT:
                if (--countNumDispCounter > 0) {
                    if (++countNumCounter < 60) {
                        this.countNumLabel.alpha = countNumCounter / 60.0;
                    } else {
                        countNum++;
                        countNumCounter = 0;
                        SoundManager.play("count_se");
                        this.countNumLabel.text = countNum;
                        this.countNumLabel.alpha = 0.0;
                    }
                } else {
                    this.countNumLabel.alpha = 0.0;
                    if (tball.isGet === Boolean(1)) {
                        gameMode = GAME_MODE.GET_INIT;
                    } else {
                        gameMode = GAME_MODE.RUNAWAY_INIT;
                    }
                }
                break;
            case GAME_MODE.GET_INIT:
                SoundManager.play("get_se");
                successTimer = 2.5 * FPS;
                this.successLabel.text = "やったー！\n" + enemyDef.name + "をつかまえた！\n\n\n\n\n\n\n\n\n\n\n\n\n" + Math.trunc(tball.point) + "てん";
                this.successLabel.alpha = 1.0;
                gameMode = GAME_MODE.GET;
            // FALLTHRU
            case GAME_MODE.GET:
                if (--successTimer > 0) {
                    break;
                }
                this.successLabel.alpha = 0.0;
                trcnNum++;
                nowScore += Math.trunc(tball.point);
                if (--ballNum <= 0) {
                    gameMode = GAME_MODE.GAME_OVER_INIT;
                } else {
                    gameMode = GAME_MODE.APPEAR_INIT;
                }
                break;
            case GAME_MODE.RUNAWAY_INIT:
                trcn.x = SCREEN_CENTER_X;
                trcn.y = SCREEN_CENTER_Y;
                trcn.setScale(1.0);
                trcn.theta = startThetaTbl[trcnNum];

                appearTimer = 1 * FPS;
                this.runawayLabel.alpha = 1.0;

                gameMode = GAME_MODE.RUNAWAY;
            // FALLTHRU
            case GAME_MODE.RUNAWAY:
                if (--appearTimer > 0) {
                    tball.alpha -= 0.1;
                    if (tball.alpha < 0.0) {
                        tball.alpha = 0.0;
                    }
                    break;
                }
                this.runawayLabel.alpha = 0.0;

                if (--ballNum <= 0) {
                    gameMode = GAME_MODE.GAME_OVER_INIT;
                } else {
                    gameMode = GAME_MODE.START_INIT;
                }
                break;
            case GAME_MODE.MISS_INIT:
                tball.curveTimer = 0;
                tball.zRot = 0;
                tball.zRotOfs = 0;
                gameMode = GAME_MODE.MISS;
            // FALLTHRU
            case GAME_MODE.MISS:
                if (--ballNum <= 0) {
                    gameMode = GAME_MODE.GAME_OVER_INIT;
                } else {
                    gameMode = GAME_MODE.START_INIT;
                }
                break;
            case GAME_MODE.GAME_OVER_INIT:
                SoundManager.play("game_over_se");
                var self = this;
                // 実績チェック＆セーブ
                checkAndSaveTrophy(nowScore, (trcnNum + 1), tmpGreatCount, tmpExcellentCount, tmpCurveCount);
                // tweet ボタン
                postText = "NxMxLxSSS GO\n";
                postText += trcnNum + "ネムレス\n" + nowScore + "てん\n" + calcTrophyNum() + "%";

                this.ballNumLabel.text = "" + ballNum;
                this.resultLabel.text = trcnNum + "ネムレス\n" + nowScore + "てん\n" + calcTrophyNum() + "%\n";
                gameMode = GAME_MODE.GAME_OVER;
            // FALLTHRU
            case GAME_MODE.GAME_OVER:
                this.buttonAlpha += 0.05;
                if (this.buttonAlpha > 1.0) {
                    this.buttonAlpha = 1.0;
                }
                this.gameOverLabel.alpha = this.buttonAlpha;
                this.resultLabel.alpha = this.buttonAlpha;
                this.xButton.alpha = this.buttonAlpha;
                this.threadsButton.alpha = this.buttonAlpha;
                this.bskyButton.alpha = this.buttonAlpha;
                this.restartButton.alpha = this.buttonAlpha;
                if (this.buttonAlpha > 0.7) {
                    this.xButton.wakeUp();
                    this.threadsButton.wakeUp();
                    this.bskyButton.wakeUp();
                    this.restartButton.wakeUp();
                }
                break;
        }
    }
});

/*
 * TrcnBall
 */
phina.define("TBall", {
    superClass: "Sprite",

    init: function (option) {
        this.superInit("tball");
        this.direct = '';
        this.zRot = 0;
        this.zRotOfs = 0;
        this.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4).setSize(256, 256).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 16;
        this.spd = 10.0;
        this.alpha = 0.0;
        this.vecArray = new Array();
        this.status = TB_STATUS.INIT;

        this.moveCounter = 0;
        this.orgPos = phina.geom.Vector2(this.x, this.y);
        this.point = 0;
        this.hitType = HIT_TYPE.NONE;
        this.size = 1;
        this.isGet = Boolean(0);
        this.centerPos = phina.geom.Vector2(0, 0);
        this.correctDelta = phina.geom.Vector2(0, 0);
        this.curveTimer = 0;
        this.leftCurve = Boolean(0);
        this.rightCurve = Boolean(0);
    },

    update: function (app) {
        if (this.status === TB_STATUS.INIT) {
            this.status = TB_STATUS.WAIT;
        }

        if (gameMode.disp_tball === Boolean(0)) {
            this.alpha = 0.0;
        } else if (gameMode.tp_tball === Boolean(0)) {
            this.alpha = 1.0;
        }

        if (gameMode.move_tball === Boolean(1)) {
            if (this.status === TB_STATUS.MOVE_SHORT) {
                // 手前に落とす
                this.y = this.orgPos.y - Math.sin(Math.PI * (this.moveCounter / 50)) * 512;
                if (this.leftCurve) {
                    this.x = this.orgPos.x - Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                if (this.rightCurve) {
                    this.x = this.orgPos.x + Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                this.x += (this.correctDelta.x * this.moveCounter);
                this.y += (this.correctDelta.y * this.moveCounter);
                this.size = (60 - this.moveCounter) / 60;
                this.setScale(this.size);
                if (this.moveCounter++ >= 60) {
                    this.status = TB_STATUS.WAIT;
                    gameMode = GAME_MODE.MISS_INIT;
                }
                return;
            }
            if (this.status === TB_STATUS.MOVE_LONG) {
                // 画面外へ
                this.y = this.orgPos.y - Math.sin(Math.PI * (this.moveCounter / 80)) * 512;
                if (this.leftCurve) {
                    this.x = this.orgPos.x - Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                if (this.rightCurve) {
                    this.x = this.orgPos.x + Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                this.x += (this.correctDelta.x * this.moveCounter);
                this.y += (this.correctDelta.y * this.moveCounter);
                this.size = (60 - this.moveCounter) / 60;
                this.setScale(this.size);
                if (this.moveCounter++ >= 60) {
                    this.status = TB_STATUS.WAIT;
                    gameMode = GAME_MODE.MISS_INIT;
                }
                return;
            }
            if (this.status === TB_STATUS.MOVE_MISS) {
                // 画面外へ
                this.y = this.orgPos.y - Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                if (this.leftCurve) {
                    this.x = this.orgPos.x - Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                if (this.rightCurve) {
                    this.x = this.orgPos.x + Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                this.x += (this.correctDelta.x * this.moveCounter);
                this.y += (this.correctDelta.y * this.moveCounter);
                this.size = (60 - this.moveCounter) / 60;
                this.setScale(this.size);
                if (this.moveCounter++ >= 60) {
                    this.status = TB_STATUS.WAIT;
                    gameMode = GAME_MODE.MISS_INIT;
                }
                return;
            }

            if (this.status === TB_STATUS.MOVE_FALL) {
                // 画面下へ
                this.y += -20 + this.moveCounter * 2.5;
                this.size += 0.01;
                if (this.size >= 1.0) this.size = 1.0;
                this.setScale(this.size);
                if (this.moveCounter++ >= 60) {
                    this.status = TB_STATUS.WAIT;
                    gameMode = GAME_MODE.MISS_INIT;
                }
                return;
            }

            if (this.status === TB_STATUS.MOVE_HIT) {
                this.y = this.orgPos.y - Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                if (this.leftCurve) {
                    this.x = this.orgPos.x - Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                if (this.rightCurve) {
                    this.x = this.orgPos.x + Math.sin(Math.PI * (this.moveCounter / 60)) * 512;
                }
                this.x += (this.correctDelta.x * this.moveCounter);
                this.y += (this.correctDelta.y * this.moveCounter);
                this.size = ((60.0 - this.moveCounter * 0.8) / 60.0);
                this.setScale(this.size);
                this.moveCounter++;
                if (this.moveCounter >= 60) {
                    this.status = TB_STATUS.WAIT;
                    gameMode = GAME_MODE.HIT_INIT;
                } else if (this.moveCounter >= 30) {
                    if (trcn.status.isAttack) {
                        let tmpDist = calcDist(this.x, this.y, trcn.x, trcn.y);
                        if (tmpDist <= 256 * trcn.size) {
                            this.moveCounter = 0;
                            this.status = TB_STATUS.MOVE_FALL;
                        }
                    }
                }
                return;
            }
        }

        if (gameMode.tap_tball === Boolean(1)) {
            var pointing = app.pointer;
            if (pointing.getPointingEnd()) {
                // 指を離した

                this.point = 0;
                this.hitType = HIT_TYPE.NONE;

                // カーブボールチェック
                this.leftCurve = Boolean(0);
                this.rightCurve = Boolean(0);
                this.correctDelta.x = 0;
                this.correctDelta.y = 0;

                do {
                    let endPos = this.vecArray.pop();
                    let startPos = this.vecArray.shift();
                    let dx = endPos.x - startPos.x;
                    let dy = endPos.y - startPos.y;

                    let moveDist = calcDistVec(startPos, endPos);

                    // 移動量が少ない
                    if (moveDist < 128) {
                        // 移動無し扱い
                        this.x = SCREEN_CENTER_X;
                        this.y = SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4;
                        this.curveTimer = 0;
                        this.zRot = 0;
                        this.zRotOfs = 0;
                        this.status = TB_STATUS.WAIT;
                        break;
                    }

                    // 画面下向き
                    // dyがプラス
                    if (dy >= 0) {
                        // 移動無し扱い
                        this.x = SCREEN_CENTER_X;
                        this.y = SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4;
                        this.curveTimer = 0;
                        this.zRot = 0;
                        this.zRotOfs = 0;
                        this.status = TB_STATUS.WAIT;
                        break;
                    }

                    // 画面上方90°以外
                    // |dy|<|dx|
                    if (Math.abs(dy) < Math.abs(dx)) {
                        // 移動無し扱い
                        this.x = SCREEN_CENTER_X;
                        this.y = SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4;
                        this.curveTimer = 0;
                        this.zRot = 0;
                        this.zRotOfs = 0;
                        this.status = TB_STATUS.WAIT;
                        break;
                    }

                    gameMode = GAME_MODE.THROW_INIT;
                    this.orgPos = endPos;

                    // カーブボールチェック
                    let curveRatio = 1.0;
                    if (this.curveTimer > 0) {
                        curveRatio = 1.7;
                        this.correctDelta.x = (-endPos.x + (trcn.x + myRandom(0, 20) - 10));
                        if (this.correctDelta.x > 128) {
                            this.correctDelta.x = 128;
                        }
                        if (this.correctDelta.x < -128) {
                            this.correctDelta.x = -128;
                        }
                        this.correctDelta.y = (-endPos.y + (trcn.y + myRandom(0, 20) - 10));
                        if (this.correctDelta.y > 128) {
                            this.correctDelta.y = 128;
                        }
                        if (this.correctDelta.y < -128) {
                            this.correctDelta.y = -128;
                        }
                        this.correctDelta.x /= 60;
                        this.correctDelta.y /= 60;

                        if (endPos.x < trcn.x) {
                            this.leftCurve = Boolean(1);
                            tmpCurveCount++;
                        } else {
                            this.rightCurve = Boolean(1);
                            tmpCurveCount++;
                        }
                    }

                    // 移動距離が小さすぎる
                    let minDist = SCREEN_HEIGHT * 1 / 4;
                    if (this.curveTimer > 0) minDist = SCREEN_HEIGHT * 1 / 8;
                    if (moveDist < minDist) {
                        // 手前に落とす
                        this.curveTimer = 0;
                        this.zRot = 0;
                        this.zRotOfs = 0;
                        this.status = TB_STATUS.MOVE_SHORT;
                        this.moveCounter = 0;
                        break;
                    }


                    // 移動距離が大きすぎる
                    if (moveDist > SCREEN_HEIGHT * 3 / 4) {
                        // 画面外へ飛ばす
                        this.status = TB_STATUS.MOVE_LONG;
                        this.moveCounter = 0;
                        break;
                    }

                    // ターゲットリングの中心と着弾点との距離
                    let tmpDist = calcDist(endPos.x + this.correctDelta.x * 60, endPos.y + this.correctDelta.y * 60, tgtRingW.x, tgtRingW.y);
                    this.point = 256 - tmpDist;    // 256~0点
                    this.point += 256 * (scoreTimer / (60 * FPS))    // 256~0点

                    // 着弾点がターゲットリング外                    
                    if (tmpDist >= 256) {
                        this.status = TB_STATUS.MOVE_MISS;
                        this.moveCounter = 0;
                        break;
                    }

                    // 着弾点がターゲットリング内
                    if (!trcn.status.isAttack) {
                        if (trcnNum >= 5) {
                            if (myRandom(1, counterAtkTbl[trcnNum - 5]) === 1) {
                                trcn.atkTimer = 0;
                            }
                        } else {
                            if (myRandom(1, 256) === 1) {
                                trcn.atkTimer = 0;
                            }
                        }
                    }

                    // trcnの基本補足率
                    let basicRatio = 0.70;  // 70%（最小値は1%）
                    // ターゲットリングの色による捕獲確率
                    let tmpRatio = (10 - trcnNum) * 10.0;   // 100~10%
                    let getRatio = myRandom(tmpRatio - 9, tmpRatio);
                    this.point *= ((trcnNum + 1) * 0.5);  // 0.5~5.0倍

                    // ターゲットリングの大きさによる補正倍率
                    let correctRatio = 0;
                    let tgtRingRadius = tgtRingG.size * 0.5;
                    if (tmpDist < tgtRingRadius) {
                        // 着弾点がターゲットリングの内側
                        if (tgtRingRadius <= 256.0 * 0.3) {
                            // 0〜30%：エクセレント＝1.85倍
                            if (tmpDist < 256.0 * 0.01) {
                                // エクセレントかつ着弾点が中心から1%以内なら1%の確率でクリティカル
                                if (myRandom(1, 100) === 1) {
                                    correctRatio = 10000; // basicRatio=1% getRatio=1%の時でも100%になる倍率
                                    this.point *= 50.0;
                                    this.hitType = HIT_TYPE.CRITICAL;
                                } else {
                                    // 抽選に外れたのでやっぱりエクセレント
                                    correctRatio = 1.85;
                                    this.point *= 10.0;
                                    this.hitType = HIT_TYPE.EXCELLENT;
                                }
                            } else {
                                correctRatio = 1.85;
                                this.point *= 10.0;
                                this.hitType = HIT_TYPE.EXCELLENT;
                            }
                            tmpExcellentCount++;
                            tmpGreatCount++;
                        } else if (tgtRingRadius <= 256 * 0.75) {
                            // 30〜75%：グレート
                            correctRatio = 1.5;
                            this.point *= 5.0;
                            this.hitType = HIT_TYPE.GREAT;
                            tmpGreatCount++;
                        } else {
                            // 75〜100%：ナイス
                            correctRatio = 1.15;
                            this.point *= 2.0;
                            this.hitType = HIT_TYPE.NICE;
                        }
                        if (dbgMode === 1) {
                            if (dbgForceCritical === 1) {
                                correctRatio = 10000;
                                this.point *= 1.0;
                                this.hitType = HIT_TYPE.CRITICAL;
                            } else if (dbgForceExcellent === 1) {
                                correctRatio = 10000;
                                this.point *= 1.0;
                                this.hitType = HIT_TYPE.EXCELLENT;
                            } else if (dbgForceGreat === 1) {
                                correctRatio = 10000;
                                this.point *= 1.0;
                                this.hitType = HIT_TYPE.GREAT;
                            } else {
                                correctRatio = 10000;
                                this.point *= 1.0;
                                this.hitType = HIT_TYPE.NICE;
                            }
                        }
                    } else {
                        // 着弾点がターゲットリングの外側
                        correctRatio = 1.0;
                        this.point *= 1.0;
                        this.hitType = HIT_TYPE.NORMAL;
                    }
                    if (this.curveTimer > 0) {
                        this.point *= 2.0;
                    }

                    let getRandom = myRandom(1, 100);
                    if (dbgMode === 1) getRandom = 0;
                    if (getRandom <= basicRatio * getRatio * correctRatio * curveRatio) {
                        this.isGet = Boolean(1);
                    } else {
                        this.isGet = Boolean(0);
                    }

                    this.status = TB_STATUS.MOVE_HIT;
                    this.moveCounter = 0;
                } while (false);
            } else if (pointing.getPointing()) {
                // タッチした最初のフレームは配列を初期化する
                if (pointing.getPointingStart()) {
                    this.vecArray.splice(0);
                }
                // タッチした位置に徐々に近づける
                this.x += (pointing.x - this.x) * 0.3;
                this.y += (pointing.y - this.y) * 0.3;
                let tmpVec = phina.geom.Vector2(this.x, this.y);
                this.vecArray.push(tmpVec);
                if (this.vecArray.length > 30) {
                    this.vecArray.shift();
                    // 円起動チェック
                    // 全ての点の平均（＝予想中心点）を求める
                    let tmpAllPos = phina.geom.Vector2(0, 0);
                    this.vecArray.forEach(function (element) {
                        tmpAllPos.x += element.x;
                        tmpAllPos.y += element.y;
                    });
                    this.centerPos = phina.geom.Vector2(0, 0);
                    this.centerPos.x = tmpAllPos.x / this.vecArray.length;
                    this.centerPos.y = tmpAllPos.y / this.vecArray.length;
                    // 全ての点と予想中心点との距離（＝予想半径）の平均、最大、最小値を求める
                    let tmpMin = Number.MAX_SAFE_INTEGER;
                    let tmpMax = Number.MIN_SAFE_INTEGER;
                    let tmpAve = 0;
                    let tmpCenterPos = this.centerPos;
                    this.vecArray.forEach(function (element) {
                        let tmpR = calcDistVec(tmpCenterPos, element);
                        tmpAve += tmpR;
                        if (tmpMin > tmpR) tmpMin = tmpR;
                        if (tmpMax < tmpR) tmpMax = tmpR;
                    });
                    tmpAve = tmpAve / this.vecArray.length;;

                    // 平均値が一定以上ならなんとなく円軌道っぽい
                    if (tmpAve > SCREEN_WIDTH / 4) {
                        // 最大と最小の差分が一定値以下なら円軌道を描いているとみなす
                        if ((tmpMax - tmpMin) <= SCREEN_WIDTH / 4) {
                            this.curveTimer = 120;
                        }
                    }
                }
                if (this.curveTimer > 0) {
                    this.curveTimer--;
                    this.zRotOfs = this.curveTimer / 1.5;
                } else {
                    this.zRotOfs = 0;
                }
            }
        } else {
            if (gameMode.value < GAME_MODE.THROW_INIT.value) {
                this.x = SCREEN_CENTER_X;
                this.y = SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4;
            }
        }
        this.zRot += this.zRotOfs;
        this.rotation = this.zRot;
    },
});

/*
* ターゲットリング
*/
phina.define("TargetRing", {
    //円を表示するクラスを継承
    superClass: "phina.display.CircleShape",
    //初期化処理
    init: function (color, isFix) {
        this.superInit({
            radius: 512,
            backgroundColor: "transparent",
            fill: null,
            stroke: color,
            strokeWidth: 10
        });
        this.x = trcn.x;
        this.y = trcn.y;
        this.isFix = isFix;
        this.dispFlag = Boolean(0);
        this.alpha = 0.0;
        this.sizeSpd = 0;
    },
    update: function (app) {
        if (gameMode.disp_tgtring === Boolean(0)) {
            this.alpha = 0.0;
        } else if (trcn.status.isAttack === Boolean(1)) {
            this.alpha = 0.0;
        } else {
            if (this.dispFlag === Boolean(1)) {
                this.alpha = 1.0;
            } else {
                this.alpha = 0.0;
            }
        }

        this.x = trcn.x;
        this.y = trcn.y;
        if (this.isFix === 1) return;
        if (gameMode.move_tgtring === Boolean(1)) {
            let tmp = this.radius - this.sizeSpd;
            if (tmp <= 0) tmp = 512;
            this.radius = tmp;
        }
    },
});

/*
 * Trcn
 */
phina.define("Trcn", {
    superClass: "Sprite",

    init: function (sprName) {
        this.spriteName = sprName;
        this.superInit(this.spriteName);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 80;
        this.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y).setSize(512, 512).setScale(1, 1);
        this.zRot = 0;
        this.atkTimer = myRandom2(atkTbl[trcnNum].min, atkTbl[trcnNum].max);
        this.zPos = 0;
        this.size = 0;
        this.theta = 0;
        this.status = TRCN_STATUS.INIT;
    },

    update: function (app) {
        if (gameMode.disp_trcn === Boolean(0)) {
            this.alpha = 0.0;
        } else {
            this.alpha = 1.0;
        }

        if (this.status === TRCN_STATUS.MOVE_XY) {
            if (gameMode.move_xy_trcn) {
                if (--this.atkTimer <= 0) {
                    this.atkTimer = myRandom2(atkTbl[trcnNum].min, atkTbl[trcnNum].max);
                    this.status = TRCN_STATUS.MOVE_Z_INIT;
                }
            }
        }
        switch (this.status) {
            case TRCN_STATUS.INIT:
                this.xSpd = 1;
                this.ySpd = 0;
                this.status = TRCN_STATUS.WAIT;
            // FALLTHRU
            case TRCN_STATUS.WAIT:
                this.status = TRCN_STATUS.MOVE_XY_INIT;
            // FALLTHRU
            case TRCN_STATUS.MOVE_XY_INIT:
                this.setScale(1.0);
                this.status = TRCN_STATUS.MOVE_XY;
            // FALLTHRU
            case TRCN_STATUS.MOVE_XY:
                if (!gameMode.move_xy_trcn) {
                    break;
                }
                if (tball.status.isMove) {// ボールが移動中はXY平面移動はしない
                    break;
                }
                let tmpTrcnNum = trcnNum;
                if (dbgMode === 1) {
                    if (dbgFixMoveKind != -1) tmpTrcnNum = dbgFixMoveKind;
                }
                switch (tmpTrcnNum) {
                    case 0:
                        // 固定
                        this.x = SCREEN_CENTER_X;
                        this.y = SCREEN_CENTER_Y;
                        break;
                    case 1:
                        // 左右(遅)
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y;
                        this.theta += Math.PI / 240;
                        break;
                    case 2:
                        // 左右（早）
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta + Math.PI) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y;
                        this.theta += Math.PI / 60;
                        break;
                    case 3:
                        // 円(右回り)
                        this.x = SCREEN_CENTER_X + Math.cos(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.y = SCREEN_CENTER_Y - ((SCREEN_WIDTH - 256) * 0.25) + Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.theta += Math.PI / 120;
                        break;
                    case 4:
                        // 円(左回り)
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y - ((SCREEN_WIDTH - 256) * 0.25) + Math.cos(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.theta += Math.PI / 60;
                        break;
                    case 5:
                        // 波
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y - ((SCREEN_WIDTH - 256) * 0.25) + Math.cos(this.theta * 3) * (SCREEN_WIDTH - 256) * 0.25;
                        this.theta += Math.PI / 120;
                        break;
                    case 6:
                        // 波
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y - ((SCREEN_WIDTH - 256) * 0.5) + Math.cos(this.theta * 4.3) * (SCREEN_WIDTH - 256) * 0.5;
                        this.theta += Math.PI / 180;
                        break;
                    case 7:
                        // 波
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta * 2) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y + Math.sin(this.theta * 3) * (SCREEN_WIDTH - 256) * 0.5;
                        this.theta += Math.PI / 180;
                        break;
                    case 8:
                        // 波(メガネ)
                        this.x = SCREEN_CENTER_X + (1 + Math.cos(this.theta * 2)) * Math.cos(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.y = SCREEN_CENTER_Y + (1 + Math.cos(this.theta * 2)) * Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.theta += Math.PI / 100;
                        break;
                    case 9:
                        // 波
                        this.x = SCREEN_CENTER_X + Math.sin(this.theta * 3) * (SCREEN_WIDTH - 256) * 0.5;
                        this.y = SCREEN_CENTER_Y + Math.sin(this.theta * 4) * (SCREEN_WIDTH - 256) * 0.5;
                        this.theta += Math.PI / 240;
                        break;
                    case 10:
                        // 波
                        this.x = SCREEN_CENTER_X + (1 + Math.cos(this.theta * (7 / 8))) * Math.cos(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.y = SCREEN_CENTER_Y + (1 + Math.cos(this.theta * (7 / 8))) * Math.sin(this.theta) * (SCREEN_WIDTH - 256) * 0.25;
                        this.theta += Math.PI / 50;
                        break;
                    default:
                        this.x = SCREEN_CENTER_X;
                        this.y = SCREEN_CENTER_Y;
                        this.theta += Math.PI / 30;
                        break;
                }
                tgtRingR.setPosition(this.x, this.y);
                tgtRingW.setPosition(this.x, this.y);
                break;
            case TRCN_STATUS.MOVE_Z_INIT:
                this.zPos = 0.0;
                this.status = TRCN_STATUS.MOVE_Z;
            // FALLTHRU
            case TRCN_STATUS.MOVE_Z:
                this.zPos += 1.0;
                if (this.zPos >= 1 * FPS) {
                    this.size = 1.0;
                    this.status = TRCN_STATUS.MOVE_XY_INIT;
                } else {
                    this.size = 1.0 + Math.sin(Math.PI * (this.zPos / (1 * FPS)));
                }
                trcn.setScale(this.size);
                break;
            case TRCN_STATUS.STOP:
                break;
            case TRCN_STATUS.FINISH:
                break;
            default:
        }
    },
});

// 指定の範囲で乱数を求める
// ※start < end
// ※startとendを含む
function myRandom(start, end) {
    if (randomMode) {
        let max = (end - start) + 1;
        return Math.floor(Math.random() * Math.floor(max)) + start;
    } else {
        let mod = (end - start) + 1;
        randomSeed = (randomSeed * 5) + 1;
        for (; ;) {
            if (randomSeed < 2147483647) break;
            randomSeed -= 2147483647;
        }
        return (randomSeed % mod) + start;
    }
}
function myRandom2(start, end) {
    let max = (end - start) + 1;
    return Math.floor(((Math.random() + Math.random()) / 2) * Math.floor(max)) + start;
}

// ２点間の距離を求める
function calcDist(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
}
function calcDistVec(aVec, bVec) {
    return Math.sqrt(Math.pow(aVec.x - bVec.x, 2) + Math.pow(aVec.y - bVec.y, 2));
}

// 実績チェック＆Save
function makeTrophyArray() {
    // TARACHINE GOを１回もプレイしていない時は実績チェックをしない
    if (trcngPlayCount < 1) return;

    // 一旦初期化
    trophyArray = new Array();

    // 累計プレイ回数
    if (totalPlayCount >= 1) trophyArray[0] = 1;
    if (totalPlayCount >= 4) trophyArray[1] = 1;
    if (totalPlayCount >= 9) trophyArray[2] = 1;
    if (totalPlayCount >= 16) trophyArray[3] = 1;
    if (totalPlayCount >= 25) trophyArray[4] = 1;
    if (totalPlayCount >= 36) trophyArray[5] = 1;
    if (totalPlayCount >= 49) trophyArray[6] = 1;
    if (totalPlayCount >= 64) trophyArray[7] = 1;
    if (totalPlayCount >= 81) trophyArray[8] = 1;
    if (totalPlayCount >= 100) trophyArray[9] = 1;

    // ハイスコア
    if (maxScore >= 1000) trophyArray[10] = 1;
    if (maxScore >= 4000) trophyArray[11] = 1;
    if (maxScore >= 9000) trophyArray[12] = 1;
    if (maxScore >= 16000) trophyArray[13] = 1;
    if (maxScore >= 25000) trophyArray[14] = 1;
    if (maxScore >= 36000) trophyArray[15] = 1;
    if (maxScore >= 49000) trophyArray[16] = 1;
    if (maxScore >= 64000) trophyArray[17] = 1;
    if (maxScore >= 81000) trophyArray[18] = 1;
    if (maxScore >= 100000) trophyArray[19] = 1;

    // 累計の得点
    if (totalScore >= 20000) trophyArray[20] = 1;
    if (totalScore >= 80000) trophyArray[21] = 1;
    if (totalScore >= 180000) trophyArray[22] = 1;
    if (totalScore >= 320000) trophyArray[23] = 1;
    if (totalScore >= 500000) trophyArray[24] = 1;
    if (totalScore >= 720000) trophyArray[25] = 1;
    if (totalScore >= 980000) trophyArray[26] = 1;
    if (totalScore >= 1280000) trophyArray[27] = 1;
    if (totalScore >= 1620000) trophyArray[28] = 1;
    if (totalScore >= 2000000) trophyArray[29] = 1;

    // 最高プレイ面数（クリアした面では無い）
    if (maxStage >= 1) trophyArray[30] = 1;
    if (maxStage >= 2) trophyArray[31] = 1;
    if (maxStage >= 3) trophyArray[32] = 1;
    if (maxStage >= 4) trophyArray[33] = 1;
    if (maxStage >= 5) trophyArray[34] = 1;
    if (maxStage >= 6) trophyArray[35] = 1;
    if (maxStage >= 7) trophyArray[36] = 1;
    if (maxStage >= 8) trophyArray[37] = 1;
    if (maxStage >= 9) trophyArray[38] = 1;
    if (maxStage >= 10) trophyArray[39] = 1;

    // Great or Excellentの最高回数
    if (maxGreatCount >= 1) trophyArray[40] = 1;
    if (maxGreatCount >= 2) trophyArray[41] = 1;
    if (maxGreatCount >= 3) trophyArray[42] = 1;
    if (maxGreatCount >= 4) trophyArray[43] = 1;
    if (maxGreatCount >= 5) trophyArray[44] = 1;
    if (maxGreatCount >= 6) trophyArray[45] = 1;
    if (maxGreatCount >= 7) trophyArray[46] = 1;
    if (maxGreatCount >= 8) trophyArray[47] = 1;
    if (maxGreatCount >= 9) trophyArray[48] = 1;
    if (maxGreatCount >= 10) trophyArray[49] = 1;
    // 累計のGreat or Excellentの回数
    if (totalGreatCount >= 2) trophyArray[50] = 1;
    if (totalGreatCount >= 8) trophyArray[51] = 1;
    if (totalGreatCount >= 18) trophyArray[52] = 1;
    if (totalGreatCount >= 32) trophyArray[53] = 1;
    if (totalGreatCount >= 50) trophyArray[54] = 1;
    if (totalGreatCount >= 72) trophyArray[55] = 1;
    if (totalGreatCount >= 98) trophyArray[56] = 1;
    if (totalGreatCount >= 128) trophyArray[57] = 1;
    if (totalGreatCount >= 162) trophyArray[58] = 1;
    if (totalGreatCount >= 200) trophyArray[59] = 1;

    // Excellentの最高回数
    if (maxExcellentCount >= 1) trophyArray[60] = 1;
    if (maxExcellentCount >= 2) trophyArray[61] = 1;
    if (maxExcellentCount >= 3) trophyArray[62] = 1;
    if (maxExcellentCount >= 4) trophyArray[63] = 1;
    if (maxExcellentCount >= 5) trophyArray[64] = 1;
    if (maxExcellentCount >= 6) trophyArray[65] = 1;
    if (maxExcellentCount >= 7) trophyArray[66] = 1;
    if (maxExcellentCount >= 8) trophyArray[67] = 1;
    if (maxExcellentCount >= 9) trophyArray[68] = 1;
    if (maxExcellentCount >= 10) trophyArray[69] = 1;
    // 累計のExcellentの回数
    if (totalExcellentCount >= 2) trophyArray[70] = 1;
    if (totalExcellentCount >= 8) trophyArray[71] = 1;
    if (totalExcellentCount >= 18) trophyArray[72] = 1;
    if (totalExcellentCount >= 32) trophyArray[73] = 1;
    if (totalExcellentCount >= 50) trophyArray[74] = 1;
    if (totalExcellentCount >= 72) trophyArray[75] = 1;
    if (totalExcellentCount >= 98) trophyArray[76] = 1;
    if (totalExcellentCount >= 128) trophyArray[77] = 1;
    if (totalExcellentCount >= 162) trophyArray[78] = 1;
    if (totalExcellentCount >= 200) trophyArray[79] = 1;

    // カーブボールの最高回数
    if (maxCurveCount >= 1) trophyArray[80] = 1;
    if (maxCurveCount >= 2) trophyArray[81] = 1;
    if (maxCurveCount >= 3) trophyArray[82] = 1;
    if (maxCurveCount >= 4) trophyArray[83] = 1;
    if (maxCurveCount >= 5) trophyArray[84] = 1;
    if (maxCurveCount >= 6) trophyArray[85] = 1;
    if (maxCurveCount >= 7) trophyArray[86] = 1;
    if (maxCurveCount >= 8) trophyArray[87] = 1;
    if (maxCurveCount >= 9) trophyArray[88] = 1;
    if (maxCurveCount >= 10) trophyArray[89] = 1;
    // 累計のカーブボールの回数
    if (totalCurveCount >= 2) trophyArray[90] = 1;
    if (totalCurveCount >= 8) trophyArray[91] = 1;
    if (totalCurveCount >= 18) trophyArray[92] = 1;
    if (totalCurveCount >= 32) trophyArray[93] = 1;
    if (totalCurveCount >= 50) trophyArray[94] = 1;
    if (totalCurveCount >= 72) trophyArray[95] = 1;
    if (totalCurveCount >= 98) trophyArray[96] = 1;
    if (totalCurveCount >= 128) trophyArray[97] = 1;
    if (totalCurveCount >= 162) trophyArray[98] = 1;
    if (totalCurveCount >= 200) trophyArray[99] = 1;

    // デバッグ表示
    console.log("trophyArray:" + trophyArray);
    console.log("totalPlayCount:" + totalPlayCount);
    console.log("maxScore:" + maxScore);
    console.log("totalScore:" + totalScore);
    console.log("maxStage:" + maxStage);
    console.log("maxGreatCount:" + maxGreatCount);
    console.log("totalGreatCount:" + totalGreatCount);
    console.log("maxExcellentCount" + maxExcellentCount);
    console.log("totalExcellentCount" + totalExcellentCount);
    console.log("maxCurveCount:" + maxCurveCount);
    console.log("totalCurveCount:" + totalCurveCount);
}
function checkAndSaveTrophy(tmpScore, tmpStage, tmpGreatCount, tmpExcellentCount, tmpCurveCount) {
    // TARACHINE GOを１回もプレイしていない時は実績チェックをしない
    if (trcngPlayCount < 1) return;

    // 累計プレイ回数
    totalPlayCount++;
    if (totalPlayCount > MAX_TOTAL_COUNT) totalPlayCount = MAX_TOTAL_COUNT;

    // 今回の得点
    // 前回値よりも大きければ更新
    if (maxScore < tmpScore) maxScore = tmpScore

    // 累計の得点
    totalScore += tmpScore;
    if (totalScore > MAX_TOTAL_COUNT) totalScore = MAX_TOTAL_COUNT;

    // 今回のプレイ面数（クリアした面では無い）
    // 最大値よりも大きければ更新
    if (maxStage < tmpStage) maxStage = tmpStage;

    // 今回のGreat or Excellentの回数
    // 最大値よりも大きければ更新
    if (maxGreatCount < tmpGreatCount) maxGreatCount = tmpGreatCount;
    // 累計のGreat or Excellentの回数
    totalGreatCount += tmpGreatCount;
    if (totalGreatCount > MAX_TOTAL_COUNT) totalGreatCount = MAX_TOTAL_COUNT;

    // 今回のExcellentの回数
    // 最大値よりも大きければ更新
    if (maxExcellentCount < tmpExcellentCount) maxExcellentCount = tmpExcellentCount;
    // 累計のExcellentの回数
    totalExcellentCount += tmpExcellentCount;
    if (totalExcellentCount > MAX_TOTAL_COUNT) totalExcellentCount = MAX_TOTAL_COUNT;

    // 今回のカーブボールの回数
    // 最大値よりも大きければ更新
    if (maxCurveCount < tmpCurveCount) maxCurveCount = tmpCurveCount;
    // 累計のカーブボールの回数
    totalCurveCount += tmpCurveCount;
    if (totalCurveCount > MAX_TOTAL_COUNT) totalCurveCount = MAX_TOTAL_COUNT;

    // 実績解放
    makeTrophyArray();

    // 進捗の保存
    localStorage.setItem('nmlsg.tpc', totalPlayCount);
    localStorage.setItem('nmlsg.msc', maxScore);
    localStorage.setItem('nmlsg.tsc', totalScore);
    localStorage.setItem('nmlsg.mst', maxStage);
    localStorage.setItem('nmlsg.mgc', maxGreatCount);
    localStorage.setItem('nmlsg.tgc', totalGreatCount);
    localStorage.setItem('nmlsg.mec', maxExcellentCount);
    localStorage.setItem('nmlsg.tec', totalExcellentCount);
    localStorage.setItem('nmlsg.mcc', maxCurveCount);
    localStorage.setItem('nmlsg.tcc', totalCurveCount);
}

function calcTrophyNum() {
    let ret = 0;

    // TARACHINE GOを１回もプレイしていない時は実績解除数をカウントしない
    if (trcngPlayCount < 1) return ret;

    for (let ii = 0; ii < trophyArray.length; ii++) {
        if (trophyArray[ii] === 1) ret++;
    }
    return ret;
}

function calcTrophyLv() {
    let num = calcTrophyNum();
    if (num >= 80) return 9;
    if (num >= 63) return 8;
    if (num >= 48) return 7;
    if (num >= 35) return 6;
    if (num >= 24) return 5;
    if (num >= 15) return 4;
    if (num >= 8) return 3;
    if (num >= 3) return 2;
    if (num >= 1) return 1;
    if (num >= 0) return 0;
}
