console.log = function () { };  // ログを出す時にはコメントアウトする

const FPS = 60;  // 60フレ

const SCREEN_WIDTH = 1080;              // スクリーン幅
const SCREEN_HEIGHT = 2340;              // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
const ASSETS = {
    "tball": "./resource/tball.png?20230503",
    "field": "./resource/field_64.png",
    "trcn": "./resource/trcn01.png",
};

//出現時
const appearSE = new Howl({
    src: 'https://iwasaku.github.io/test14/TRCNG/resource/appear.mp3'
});
//投げた時
const throwSE = new Howl({
    src: 'https://iwasaku.github.io/test14/TRCNG/resource/throw.mp3'
});
//当たった時
const hitSE = new Howl({
    src: 'https://iwasaku.github.io/test14/TRCNG/resource/hit.mp3'
});
//カウント
const countSE = new Howl({
    src: 'https://iwasaku.github.io/test14/TRCNG/resource/count.mp3'
});
//ゲット
const getSE = new Howl({
    src: 'https://iwasaku.github.io/test14/TRCNG/resource/get.mp3'
});
//GAMEOVER
const gameoverSE = new Howl({
    src: 'https://iwasaku.github.io/test11/UT-404/SSS2/resource/t02/12.mp3'
});

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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(1),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        move_trcn: Boolean(0),
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
        isFinish: Boolean(0),
        string: 'init'
    },
    WAIT: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isFinish: Boolean(0),
        string: 'wait'
    },
    MOVE: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(1),
        isFinish: Boolean(0),
        string: 'move'
    },
    STOP: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
        isFinish: Boolean(0),
        string: 'stop'
    },
    FINISH: {
        value: tmpEnumValue++,
        isStart: Boolean(1),
        isMove: Boolean(0),
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

let gameMode = null;
let group0 = null;  // BG
let group1 = null;  // TRCN
let group2 = null;  // TGT_RING
let group3 = null;  // TBALL
let tball = null;
let trcn = null;
let tgtRingW = null;    // 白
let tgtRingG = null;    // 緑
let tgtRingY = null;    // 黄
let tgtRingO = null;    // 朱
let tgtRingR = null;    // 赤
let trcnNum = 0;
let ballNum = 0;
let orgTrcnPos = tm.geom.Vector2(0, 0);
let bounceFrom = tm.geom.Vector2(0, 0);
let bounceTo = tm.geom.Vector2(0, 0);
let bounceDelta = tm.geom.Vector2(0, 0);
let bounceCounter = 0;
let countNum = 0;
let countNumCounter = 0;
let countNumDispCounter = 0;
let hitStep = -1;
let nowScore = 0;
let scoreTimer = 0;
let randomSeed = 3557;
let randomMode = Boolean(1);


tm.main(function () {
    // アプリケーションクラスを生成
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
    app.fitWindow();                            // 自動フィッティング有効
    app.background = "rgba(77, 136, 255, 1.0)"; // 背景色
    app.fps = FPS;                               // フレーム数

    var loading = tm.ui.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });

    // 読み込み完了後に呼ばれるメソッドを登録
    loading.onload = function () {
        app.replaceScene(LogoScene());
    };

    // ローディングシーンに入れ替える
    app.replaceScene(loading);

    // 実行
    app.run();
});

/*
 * ロゴ
 */
tm.define("LogoScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "logoLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#888",
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "UNOFFICIAL GAME",
                    align: "center",
                },
            ]
        });
        this.localTimer = 0;
    },

    update: function (app) {
        // 時間が来たらタイトルへ
        //        if (++this.localTimer >= 5 * app.fps)
        this.app.replaceScene(TitleScene());
    }
});

/*
 * タイトル
 */
tm.define("TitleScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "title1Label",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y - SCREEN_CENTER_Y / 3,
                    fillStyle: "#fff",
                    fontSize: 128 + 96,
                    fontFamily: FONT_FAMILY,
                    text: "TARACHINE",
                    align: "center",
                },
                {
                    type: "Label", name: "title2Label",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#fff",
                    fontSize: 256 + 96,
                    fontFamily: FONT_FAMILY,
                    text: "ＧＯ",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "startButton",
                    init: [
                        {
                            text: "START",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y + SCREEN_CENTER_Y / 2,
                },
            ]
        });

        this.localTimer = 0;

        var self = this;
        this.startButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };
    },

    update: function (app) {
        app.background = "rgba(0, 0, 0, 1.0)"; // 背景色
        // 時間が来たらデモへ
        //        if(++this.localTimer >= 5*app.fps){
        //            this.app.replaceScene(DemoScene());
        //        }
    }
});

/*
 * デモ
 */
tm.define("DemoScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "demoLabel",
                    x: SCREEN_CENTER_X,
                    y: 320,
                    fillStyle: "#888",
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "",
                    align: "center",
                },
            ]
        });
        this.localTimer = 0;
    },

    update: function (app) {
        // 時間が来たらタイトルへ
        if (++this.localTimer >= 5 * app.fps) {
            this.app.replaceScene(TitleScene());
        }

        // タッチしたらタイトルへ
        var pointing = app.pointing;
        // タッチしているかを判定
        if (pointing.getPointing()) {
            this.app.replaceScene(TitleScene());
        }
    }
});

/*
 * ゲーム
 */
tm.define("GameScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        gameMode = GAME_MODE.GAME_INIT;
        group0 = tm.display.CanvasElement().addChildTo(this);
        group1 = tm.display.CanvasElement().addChildTo(this);
        group2 = tm.display.CanvasElement().addChildTo(this);
        group3 = tm.display.CanvasElement().addChildTo(this);

        this.bgField = tm.display.Sprite("field", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(group0);
        this.bgField.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        trcn = new Trcn().addChildTo(group1);
        tgtRingW = new TargetRing("#ffffff", 1).addChildTo(group2);
        tgtRingG = new TargetRing("#00ff00", 0).addChildTo(group2);
        tgtRingY = new TargetRing("#ffff00", 0).addChildTo(group2);
        tgtRingO = new TargetRing("#f58220", 0).addChildTo(group2);
        tgtRingR = new TargetRing("#ff0000", 0).addChildTo(group2);
        tball = new TBall().addChildTo(group3);

        this.fromJSON({
            children: [
                {
                    type: "Label", name: "nowTrcnNumLabel",
                    x: SCREEN_WIDTH - 32,
                    y: 32 + 32,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "0タラチネ",
                    align: "right",
                },
                {
                    type: "Label", name: "nowScoreLabel",
                    x: SCREEN_WIDTH - 32,
                    y: 64 + 32 + 32,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "0てん",
                    align: "right",
                },
                {
                    type: "Label", name: "ballNumLabel",
                    x: SCREEN_CENTER_X + 128 + 64,
                    y: SCREEN_HEIGHT - 256 + 64,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "10",
                    align: "right",
                },
                {
                    type: "Label", name: "gameOverLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y / 2,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 256 - 32,
                    fontFamily: FONT_FAMILY,
                    text: "GAME OVER",
                    align: "center",
                },
                {
                    type: "Label", name: "resultLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y / 2 + 256,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 96,
                    fontFamily: FONT_FAMILY,
                    text: "0タラチネ\n0てん",
                    align: "center",
                },
                {
                    type: "Label", name: "appearLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y / 2,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "あ！やせいのタラチネが\nとびだしてきた",
                    align: "center",
                },
                {
                    type: "Label", name: "hitTypeLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 128,
                    fontFamily: FONT_FAMILY,
                    text: "",
                    align: "center",
                },
                {
                    type: "Label", name: "countNumLabel",
                    x: SCREEN_CENTER_X + 64,
                    y: SCREEN_CENTER_Y + 64,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 1024,
                    fontFamily: FONT_FAMILY,
                    text: "1",
                    align: "center",
                },
                {
                    type: "Label", name: "successLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y / 2,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "やったー！\nタラチネをつかまえた！",
                    align: "center",
                },
                {
                    type: "Label", name: "runawayLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y / 2,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "あ！ボールから抜け出した",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "tweetButton",
                    init: [
                        {
                            text: "TWEET",
                            fontFamily: FONT_FAMILY,
                            fontSize: 80,
                            bgColor: "hsl(240, 80%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 256,
                    y: SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2),
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "restartButton",
                    init: [
                        {
                            text: "RESTART",
                            fontFamily: FONT_FAMILY,
                            fontSize: 80,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 256,
                    y: SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2),
                    alpha: 0.0,
                },
            ]
        });

        this.nowTrcnNumLabel.setAlpha(0.0);
        this.nowScoreLabel.setAlpha(0.0);
        this.ballNumLabel.setAlpha(0.0);
        this.gameOverLabel.setAlpha(0.0);
        this.resultLabel.setAlpha(0.0);
        this.appearLabel.setAlpha(0.0);
        this.hitTypeLabel.setAlpha(0.0);
        this.countNumLabel.setAlpha(0.0);
        this.successLabel.setAlpha(0.0);
        this.runawayLabel.setAlpha(0.0);
        this.tweetButton.sleep();
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };

        this.buttonAlpha = 0.0;
        if (!randomMode) randomSeed = 3557;
        nowScore = 0;
        appearTimer = 0;
        successTimer = 0;
        trcnNum = 0;
        ballNum = 10;
        this.frame = 0;
        this.stopBGM = false;
    },

    update: function (app) {
        switch (gameMode) {
            case GAME_MODE.GAME_INIT:
                gameMode = GAME_MODE.APPEAR_INIT;
            // THROUGH
            case GAME_MODE.APPEAR_INIT:
                appearSE.play();
                trcn.x = SCREEN_CENTER_X;
                trcn.y = SCREEN_CENTER_Y;
                trcn.setScale(1, 1);
                trcn.theta = startThetaTbl[trcnNum];

                appearTimer = 1 * app.fps;
                this.appearLabel.setAlpha(1.0);
                gameMode = GAME_MODE.APPEAR;
            // THROUGH
            case GAME_MODE.APPEAR:
                if (--appearTimer > 0) {
                    break;
                }
                this.appearLabel.setAlpha(0.0);

                gameMode = GAME_MODE.START_INIT;
            // THROUGH
            case GAME_MODE.START_INIT:
                this.nowTrcnNumLabel.text = trcnNum + "タラチネ";
                this.nowScoreLabel.text = nowScore + "てん";
                this.ballNumLabel.text = ballNum + "";

                this.nowTrcnNumLabel.setAlpha(1.0);
                this.nowScoreLabel.setAlpha(1.0);
                this.ballNumLabel.setAlpha(1.0);

                scoreTimer = 60 * 60;   // 1min.

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
            // THROUGH
            case GAME_MODE.START:
                if (--scoreTimer <= 0) scoreTimer = 0;
                break;
            case GAME_MODE.THROW_INIT:
                throwSE.play();
                gameMode = GAME_MODE.THROW;
            // THROUGH
            case GAME_MODE.THROW:
                this.nowTrcnNumLabel.setAlpha(0.0);
                this.nowScoreLabel.setAlpha(0.0);
                this.ballNumLabel.setAlpha(0.0);
                break;
            case GAME_MODE.HIT_INIT:
                hitSE.play();
                hitStep = 1;
                this.hitTypeLabel.setAlpha(1.0);
                this.hitTypeLabel.text = tball.hitType.string;
                tball.curveTimer = 0;
                tball.zRot = 0;
                tball.zRotOfs = 0;
                gameMode = GAME_MODE.HIT;
            // THROUGH
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
                        bounceTo.y = trcn.y - 256;
                        bounceDelta.x = (bounceTo.x - bounceFrom.x) / 15.0;
                        bounceDelta.y = (bounceTo.y - bounceFrom.y) / 15.0;
                        bounceCounter = 0;
                        hitStep = 2;
                    // THROUGH
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
                    // THROUGH
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

                        this.hitTypeLabel.setAlpha(0.0);
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
                countSE.play();
                if (tball.isGet === Boolean(1)) {
                    countNumDispCounter = 180;
                } else {
                    countNumDispCounter = myRandom(30, 150);
                }
                this.countNumLabel.text = countNum;
                this.countNumLabel.setAlpha(0.0);
                if (tball.hitType == HIT_TYPE.CRITICAL) {
                    gameMode = GAME_MODE.GET_INIT;
                } else {
                    gameMode = GAME_MODE.COUNT;
                }
            // THROUGH
            case GAME_MODE.COUNT:
                if (--countNumDispCounter > 0) {
                    if (++countNumCounter < 60) {
                        this.countNumLabel.setAlpha(countNumCounter / 60.0);
                    } else {
                        countNum++;
                        countNumCounter = 0;
                        countSE.play();
                        this.countNumLabel.text = countNum;
                        this.countNumLabel.setAlpha(0.0);
                    }
                } else {
                    this.countNumLabel.setAlpha(0.0);
                    if (tball.isGet === Boolean(1)) {
                        gameMode = GAME_MODE.GET_INIT;
                    } else {
                        gameMode = GAME_MODE.RUNAWAY_INIT;
                    }
                }
                break;
            case GAME_MODE.GET_INIT:
                getSE.play();
                successTimer = 2.5 * app.fps;
                this.successLabel.text = "やったー！\nタラチネをつかまえた！\n\n\n\n\n\n\n\n\n\n\n\n\n" + Math.trunc(tball.point) + "てん";
                this.successLabel.setAlpha(1.0);
                gameMode = GAME_MODE.GET;
            // THROUGH
            case GAME_MODE.GET:
                if (--successTimer > 0) {
                    break;
                }
                this.successLabel.setAlpha(0.0);
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

                appearTimer = 1 * app.fps;
                this.runawayLabel.setAlpha(1.0);

                gameMode = GAME_MODE.RUNAWAY;
            // THROUGH
            case GAME_MODE.RUNAWAY:
                if (--appearTimer > 0) {
                    tball.alpha -= 0.1;
                    if (tball.alpha < 0.0) {
                        tball.alpha = 0.0;
                    }
                    break;
                }
                this.runawayLabel.setAlpha(0.0);

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
            // THROUGH
            case GAME_MODE.MISS:
                if (--ballNum <= 0) {
                    gameMode = GAME_MODE.GAME_OVER_INIT;
                } else {
                    gameMode = GAME_MODE.START_INIT;
                }
                break;
            case GAME_MODE.GAME_OVER_INIT:
                gameoverSE.play();
                var self = this;
                // tweet ボタン
                var tmpStr = "TARACHINE GO\n";
                tmpStr += trcnNum + "タラチネ\n" + nowScore + "てん\n";
                this.tweetButton.onclick = function () {
                    var twitterURL = tm.social.Twitter.createURL({
                        type: "tweet",
                        text: tmpStr,
                        hashtags: ["TARACHINE"],
                        url: "https://iwasaku.github.io/test14/TRCNG/",
                    });
                    window.open(twitterURL);
                };
                this.ballNumLabel.text = "" + ballNum;
                this.resultLabel.text = trcnNum + "タラチネ\n" + nowScore + "てん\n";
                gameMode = GAME_MODE.GAME_OVER;
            // THROUGH
            case GAME_MODE.GAME_OVER:
                this.buttonAlpha += 0.05;
                if (this.buttonAlpha > 1.0) {
                    this.buttonAlpha = 1.0;
                }
                this.gameOverLabel.setAlpha(this.buttonAlpha);
                this.resultLabel.setAlpha(this.buttonAlpha);
                this.tweetButton.setAlpha(this.buttonAlpha);
                this.restartButton.setAlpha(this.buttonAlpha);
                if (this.buttonAlpha > 0.7) {
                    this.tweetButton.wakeUp();
                    this.restartButton.wakeUp();
                }
                break;
        }
    }
});

/*
 * TrcnBall
 */
tm.define("TBall", {
    superClass: "tm.app.Sprite",

    init: function () {
        this.superInit("tball", 256, 256);
        this.direct = '';
        this.zRot = 0;
        this.zRotOfs = 0;
        this.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 16;
        this.spd = 10.0;
        this.alpha = 0.0;
        this.vecArray = new Array();
        this.status = TB_STATUS.INIT;

        this.moveCounter = 0;
        this.orgPos = tm.geom.Vector2(this.x, this.y);
        this.point = 0;
        this.hitType = HIT_TYPE.NONE;
        this.size = 1;
        this.isGet = Boolean(0);
        this.centerPos = tm.geom.Vector2(0, 0);
        this.correctDelta = tm.geom.Vector2(0, 0);
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
                if (this.moveCounter++ >= 60) {
                    this.status = TB_STATUS.WAIT;
                    gameMode = GAME_MODE.HIT_INIT;
                }

                return;
            }
        }

        if (gameMode.tap_tball === Boolean(1)) {
            var pointing = app.pointing;
            if (pointing.getPointingEnd()) {
                this.point = 0;
                this.hitType = HIT_TYPE.NONE;

                // カーブボールチェック
                this.leftCurve = Boolean(0);
                this.rightCurve = Boolean(0);
                this.correctDelta.x = 0;
                this.correctDelta.y = 0;
                // 指を離した
                do {
                    let endPos = this.vecArray.pop();
                    let startPos = this.vecArray.shift();
                    let dx = endPos.x - startPos.x;
                    let dy = endPos.y - startPos.y;
                    console.log("delta=" + dx + "," + dy);

                    let moveDist = calcDistVec(startPos, endPos);
                    console.log("moveDist=" + moveDist);

                    // 移動量が少ない
                    if (moveDist < 128) {
                        // 移動無し扱い
                        this.x = SCREEN_CENTER_X;
                        this.y = SCREEN_CENTER_Y + SCREEN_CENTER_Y * 3 / 4;
                        this.curveTimer = 0;
                        this.zRot = 0;
                        this.zRotOfs = 0;
                        this.status = TB_STATUS.WAIT;
                        console.log("nothing");
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
                        console.log("dy plus");
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
                        console.log("|dy|<|dx|");
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
                        } else {
                            this.rightCurve = Boolean(1);
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
                        console.log("too short");
                        break;
                    }


                    // 移動距離が大きすぎる
                    if (moveDist > SCREEN_HEIGHT * 3 / 4) {
                        // 画面外へ飛ばす
                        this.status = TB_STATUS.MOVE_LONG;
                        this.moveCounter = 0;
                        console.log("too long");
                        break;
                    }

                    // ターゲットリングの中心と着弾点との距離
                    let tmpDist = calcDist(endPos.x + this.correctDelta.x * 60, endPos.y + this.correctDelta.y * 60, tgtRingW.x, tgtRingW.y);
                    console.log("tmpDist=" + tmpDist);
                    this.point = 256 - tmpDist;    // 256~0点
                    this.point += 256 * (scoreTimer / (60 * 60))    // 256~0点

                    // 着弾点がターゲットリング外                    
                    if (tmpDist >= 256) {
                        this.status = TB_STATUS.MOVE_MISS;
                        this.moveCounter = 0;
                        console.log("miss");
                        break;
                    }

                    // 着弾点がターゲットリング内

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
                                // エクセレントかつ着弾点が中心から1%以内ならクリティカル
                                correctRatio = 10000; // basicRatio=1% getRatio=1%の時でも100%になる倍率
                                this.point *= 50.0;
                                this.hitType = HIT_TYPE.CRITICAL;
                            } else {
                                correctRatio = 1.85;
                                this.point *= 10.0;
                                this.hitType = HIT_TYPE.EXCELLENT;
                            }
                        } else if (tgtRingRadius <= 256 * 0.75) {
                            // 30〜75%：グレート
                            correctRatio = 1.5;
                            this.point *= 5.0;
                            this.hitType = HIT_TYPE.GREAT;
                        } else {
                            // 75〜100%：ナイス
                            correctRatio = 1.15;
                            this.point *= 2.0;
                            this.hitType = HIT_TYPE.NICE;
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

                    console.log("tgtRingG.size=" + tgtRingG.size);
                    console.log("getRatio=" + getRatio);
                    console.log("correctRatio=" + correctRatio);
                    console.log("getRandom=" + getRandom);
                    if (getRandom <= basicRatio * getRatio * correctRatio * curveRatio) {
                        console.log("get");
                        this.isGet = Boolean(1);
                    } else {
                        console.log("missing");
                        this.isGet = Boolean(0);
                    }
                    this.status = TB_STATUS.MOVE_HIT;
                    this.moveCounter = 0;
                    console.log("hit");
                    console.log("point=" + this.point);
                    console.log("hit_type=" + this.hitType.value);
                } while (false);
            } else if (pointing.getPointing()) {
                // タッチした最初のフレームは配列を初期化する
                if (pointing.getPointingStart()) {
                    this.vecArray.splice(0);
                }
                // タッチした位置に徐々に近づける
                this.x += (pointing.x - this.x) * 0.9;
                this.y += (pointing.y - this.y) * 0.9;
                let tmpVec = tm.geom.Vector2(this.x, this.y);
                this.vecArray.push(tmpVec);
                if (this.vecArray.length > 30) {
                    this.vecArray.shift();
                    // 円起動チェック
                    // 全ての点の平均（＝予想中心点）を求める
                    let tmpAllPos = tm.geom.Vector2(0, 0);
                    this.vecArray.forEach(function (element) {
                        tmpAllPos.x += element.x;
                        tmpAllPos.y += element.y;
                    });
                    this.centerPos = tm.geom.Vector2(0, 0);
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

                    // 平均値が一定以上
                    if (tmpAve > SCREEN_WIDTH / 4) {
                        // 差分が一定以下なら円起動を描いているとみなす
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
tm.define("TargetRing", {
    //円を表示するクラスを継承
    superClass: "tm.display.CircleShape",
    //初期化処理
    init: function (color, isFix) {
        //継承元クラスの初期化 （幅、高さ、色）
        this.superInit(512, 512, {
            fillStyle: "transparent",
            strokeStyle: color,
            lineWidth: 10
        });
        this.x = trcn.x;
        this.y = trcn.y;
        this.size = 512;
        this.isFix = isFix;
        this.dispFlag = Boolean(0);
        this.alpha = 0.0;
        this.sizeSpd = 0;
    },
    update: function (app) {
        if (gameMode.disp_tgtring === Boolean(0)) {
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
        this.setSize(this.size, this.size);
        if (gameMode.move_tgtring === Boolean(1)) {
            this.size -= this.sizeSpd;
            if (this.size <= 0) this.size = 512;
        }
    },
});
/*
 * Trcn
 */
tm.define("Trcn", {
    superClass: "tm.app.Sprite",

    init: function () {
        this.spriteName = "trcn";
        this.superInit(this.spriteName, 512, 512);
        this.direct = '';
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 80;
        this.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y).setScale(1, 1);
        this.zRot = 0;
        this.theta = 0;
        this.status = TRCN_STATUS.INIT;
    },

    update: function (app) {
        if (gameMode.disp_trcn === Boolean(0)) {
            this.alpha = 0.0;
        } else {
            this.alpha = 1.0;
        }
        if (gameMode.move_trcn === Boolean(0)) {
            return;
        }

        switch (this.status) {
            case TRCN_STATUS.INIT:
                this.xSpd = 1;
                this.ySpd = 0;
                this.status = TRCN_STATUS.MOVE;
                break;
            default:
        }

        if (tball.status.isMove) return;
        switch (trcnNum) {
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
                this.theta += Math.PI / 120;
                break;
        }
        tgtRingR.setPosition(this.x, this.y);
        tgtRingW.setPosition(this.x, this.y);
    },
});

// 指定の範囲で乱数を求める
// ※start < end
// ※startとendを含む
function myRandom(start, end) {
    if (randomMode) {
        var max = (end - start) + 1;
        return Math.floor(Math.random() * Math.floor(max)) + start;
    } else {
        var mod = (end - start) + 1;
        randomSeed = (randomSeed * 5) + 1;
        for (; ;) {
            if (randomSeed < 2147483647) break;
            randomSeed -= 2147483647;
        }
        return (randomSeed % mod) + start;
    }
}

// ２点間の距離を求める
function calcDist(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
}
function calcDistVec(aVec, bVec) {
    return Math.sqrt(Math.pow(aVec.x - bVec.x, 2) + Math.pow(aVec.y - bVec.y, 2));
}
