webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__games_space_battle_space_battle_component__ = __webpack_require__("../../../../../src/app/games/space-battle/space-battle.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Components



// Games

var routes = [
    //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */] },
    { path: 'games/space-battle', component: __WEBPACK_IMPORTED_MODULE_5__games_space_battle_space_battle_component__["a" /* SpaceBattleComponent */] }
    /*
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes',     component: HeroesComponent }*/
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"app\">\r\n\r\n  <router-outlet></router-outlet>\r\n\r\n  <nav class=\"nav\">\r\n\r\n    <a routerLink=\"./\" routerLinkActive=\"active\">Home</a>\r\n\r\n    <a routerLink=\"./games/space-battle\" routerLinkActive=\"active\">Game space-battle</a>\r\n\r\n    <a routerLink=\"./dashboard\" routerLinkActive=\"active\">Dashboard</a>\r\n\r\n    <a routerLink=\"./login\" class=\"nav-a-right\">Login</a>\r\n\r\n  </nav>\r\n\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".nav {\n  position: absolute;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  z-index: 1000;\n  padding: 0 1rem 1rem 0;\n}\n.nav .nav-a-right {\n  float: right;\n  margin-right: .5rem;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(AuthService) {
        this.AuthService = AuthService;
        this.AuthService.setAuthHook();
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
        //console.log(THREE);
        //jQuery('body').css('color','red');
        var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, SEPARATION = 200, AMOUNTX = 10, AMOUNTY = 10, camera, scene, renderer;
        init();
        animate();
        function init() {
            var container, separation = 100, amountX = 50, amountY = 50, particles, particle;
            container = document.createElement('div');
            document.body.appendChild(container);
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 100;
            scene = new THREE.Scene();
            renderer = new THREE.CanvasRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            // particles
            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial({
                color: 0xffffff,
                program: function (context) {
                    context.beginPath();
                    context.arc(0, 0, 0.5, 0, PI2, true);
                    context.fill();
                }
            });
            var geometry = new THREE.Geometry();
            for (var i = 0; i < 100; i++) {
                particle = new THREE.Sprite(material);
                particle.position.x = Math.random() * 2 - 1;
                particle.position.y = Math.random() * 2 - 1;
                particle.position.z = Math.random() * 2 - 1;
                particle.position.normalize();
                particle.position.multiplyScalar(Math.random() * 10 + 450);
                particle.scale.x = particle.scale.y = 10;
                scene.add(particle);
                geometry.vertices.push(particle.position);
            }
            // lines
            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 }));
            scene.add(line);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);
            //
            window.addEventListener('resize', onWindowResize, false);
        }
        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        //
        function onDocumentMouseMove(event) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        }
        function onDocumentTouchStart(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }
        function onDocumentTouchMove(event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }
        //
        function animate() {
            requestAnimationFrame(animate);
            render();
        }
        function render() {
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY + 200 - camera.position.y) * .05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.less")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_window_service__ = __webpack_require__("../../../../../src/app/services/window.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__games_space_battle_space_battle_component__ = __webpack_require__("../../../../../src/app/games/space-battle/space-battle.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// Components




// Games

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_11__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_12__dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_13__games_space_battle_space_battle_component__["a" /* SpaceBattleComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_7__services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_8__services_window_service__["a" /* WindowRef */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    }),
    __metadata("design:paramtypes", [])
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "[class*='col-'] {\r\n  float: left;\r\n  padding-right: 20px;\r\n  padding-bottom: 20px;\r\n}\r\n[class*='col-']:last-of-type {\r\n  padding-right: 0;\r\n}\r\n\r\n.dashboard-container {\r\n  position: absolute;\r\n  padding: 4rem 0 0 0;\r\n  margin-top: 4rem;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"dashboard-container\">\r\n  <br>\r\n  In developing...\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log(1);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'my-dashboard',
        template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/games/space-battle/space-battle.component.html":
/***/ (function(module, exports) {

module.exports = "<div\r\nclass=\"space-battle-container\"\r\n(mouseenter)=\"onEvent($event)\"\r\n(mouseleave)=\"onEvent($event)\"\r\n(mousemove)=\"coordinates($event)\"\r\non-click=\"onEvent($event)\"\r\non-dblclick=\"onEvent($event)\"\r\non-contextmenu=\"onEvent($event)\"\r\n>\r\n\r\n  <!-- Indications -->\r\n  <div class=\"panel\">\r\n    <audio controls autoplay loop>\r\n      <!--<source src=\"assets/games/musics/AMemoryAway.ogg\" type=\"audio/ogg\"-->\r\n      <source src=\"assets/games/musics/Brightlight---Space_Bugs.mp3\" type=\"audio/mpeg\">\r\n      Your browser does not support the audio element.\r\n    </audio>\r\n    <div class=\"points\">Points: {{points}}</div>\r\n    <div class=\"spoil\">Spoil: {{spoil}}</div>\r\n  </div>\r\n\r\n\r\n  <!-- Space ship -->\r\n  <img\r\n  class=\"space-ship\"\r\n  [src]=\"img_ship\"\r\n  width=\"6%\"\r\n  [ngStyle]=\"{left: ship_position}\"\r\n  >\r\n\r\n  <!-- Fire -->\r\n  <img\r\n  class=\"shoot_roket\"\r\n  [src]=\"img_roket\"\r\n  width=\"2%\"\r\n  [ngStyle]=\"{left: roket.start, bottom: run_fly(roket) }\"\r\n  *ngFor='let roket of rokets_shoot'\r\n  >\r\n\r\n  <!-- Chimeras -->\r\n  <img\r\n  class=\"chimeras\"\r\n  [src]=\"chimera.img\"\r\n  [ngStyle]=\"{ left: chimera.position.x, top: chimera.position.y, opacity: chimera.opacity, display: chimera.display, width: chimera.width  }\"\r\n  *ngFor='let chimera of chimeras'\r\n  >\r\n\r\n\r\n\r\n\r\n</div>\r\n\r\n<!--\r\n\r\n  *ngFor='let value of values; trackBy: index;'\r\n  [title]=roket.number\r\n\r\n-->\r\n"

/***/ }),

/***/ "../../../../../src/app/games/space-battle/space-battle.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".space-battle-container {\n  position: absolute;\n  margin-top: 4rem;\n  width: 100%;\n  height: 100%;\n  cursor: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n.panel {\n  text-align: right;\n  width: 100%;\n}\naudio {\n  position: absolute;\n  left: 0;\n  opacity: .3;\n}\naudio:hover {\n  opacity: .7;\n}\n.points,\n.spoil {\n  font-size: 1.5rem;\n  margin: .5rem;\n}\n.space-ship {\n  position: absolute;\n  bottom: 5rem;\n}\n.shoot_roket {\n  position: absolute;\n  margin-left: 2%;\n}\n.chimeras {\n  position: absolute;\n  opacity: .5;\n  transition: 1s ease-in-out;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/games/space-battle/space-battle.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpaceBattleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { WindowRef } from '../../services/window.service';
var SpaceBattleComponent = (function () {
    function SpaceBattleComponent() {
        this.img_ship = 'assets/games/space-battle/space-ship.svg';
        this.img_roket = 'assets/games/space-battle/roket.png';
        this.img_chimera = 'assets/games/space-battle/chimera.png';
        this.ship_position = '50%';
        this.rokets_shoot = [];
        this.rokets_counter = 0;
        this.points = 0;
        this.spoil = 0;
        this.clientX = 0;
        this.clientY = 0;
        this.chimeras = [];
        this.chimeras_counter = 0;
        this.clientWidth = document.body.clientWidth;
        this.audio = new Audio();
        // winRef.nativeWindow.onmousemove = this.onmousemove
    }
    // (mousemove) - event
    SpaceBattleComponent.prototype.coordinates = function (event) {
        this.clientX = event.clientX;
        this.clientY = event.clientY;
        // console.log(this.clientY)
        this.ship_position = event.clientX + 'px';
    };
    // (mouseenter, mouseleave, on-click, on-dblclick, on-contextmenu) - events
    SpaceBattleComponent.prototype.onEvent = function (event) {
        this.event = event;
        console.log(this.event);
        console.log(this.event.type);
        if (this.event.type == 'click')
            this.ship_shoot();
    };
    SpaceBattleComponent.prototype.ship_shoot = function () {
        var _this = this;
        // Shot sound
        this.audio.src = 'assets/games/sounds/Explosion18.ogg';
        this.audio.load();
        this.audio.play();
        //
        this.rokets_counter++;
        this.rokets_shoot.push({
            number: this.rokets_counter,
            start: this.ship_position,
            bottom: 21
        });
        this.run_fly(this.rokets_counter);
        //
        // Change aim
        //this.chimeras.pop()
        console.log(this.spape_position_percent());
        this.chimeras.map(function (chimera) {
            chimera.position.y = _this.persent_to_number(chimera.position.y) - 1 + '%';
            console.log(_this.persent_to_number(chimera.position.x));
            if ((_this.spape_position_percent() < _this.persent_to_number(chimera.position.x) + 3) &&
                (_this.spape_position_percent() > _this.persent_to_number(chimera.position.x) - 3)) {
                // chimera.position.x = '50%'
                chimera.position.y = '-30%';
                chimera.position.x = _this.random(30) + '%';
                chimera.opacity = '0';
                // chimera.display = 'none'
                chimera.img = 'assets/games/space-battle/snot.png';
                setTimeout(function () {
                    chimera.img = '';
                }, 500);
                chimera.width = '0%';
                // chimera.position.x = (this.persent_to_number(chimera.position.x) - 30) + '%'
                _this.points++;
            }
        });
    };
    SpaceBattleComponent.prototype.run_fly = function (roket) {
        var _this = this;
        setTimeout(function () {
            if (roket.bottom)
                roket.bottom++;
            if (roket.bottom > 100)
                _this.rokets_shoot.pop();
        }, 70);
        return roket.bottom + '%';
    };
    SpaceBattleComponent.prototype.birth_of_a_chimera = function () {
        this.chimeras_counter++;
        //
        if (this.chimeras.length < 10) {
            this.chimeras.push({
                number: this.chimeras_counter,
                name: 'Chimera-' + this.chimeras_counter,
                position: { x: this.random(10) + '%', y: '-10%' },
                width: '8%',
                top: 21
            });
        }
        console.log('birth_of_a_chimera');
        console.log(this.chimeras);
    };
    SpaceBattleComponent.prototype.chimera_cicle = function () {
        var _this = this;
        setInterval(function () {
            _this.birth_of_a_chimera();
        }, 5000);
        setInterval(function () {
            _this.chimeras.map(function (chimera) {
                chimera.position.x = _this.persent_to_number(chimera.position.x) + _this.random_pluss() + '%';
                chimera.position.y = _this.persent_to_number(chimera.position.y) + _this.random_pluss() + 3 + '%';
                chimera.opacity = '.7';
                setTimeout(function () {
                    chimera.width = '8%';
                    //chimera.position.x = ( this.persent_to_number(chimera.position.x) + 10 ) + '%'
                    setTimeout(function () {
                        chimera.img = 'assets/games/space-battle/chimera.png';
                    }, 1000);
                }, 1000);
                //chimera.display = 'block'
                if (_this.persent_to_number(chimera.position.y) > 120) {
                    chimera.position = { x: _this.random(10) + '%', y: '-100%' };
                    _this.spoil++;
                }
                if (_this.persent_to_number(chimera.position.x) < 5)
                    chimera.position.x = '15%'; // 
                if (_this.persent_to_number(chimera.position.x) > 90)
                    chimera.position.x = '80%'; // 
                //console.log(chimera.position.x)
            });
        }, 300);
    };
    SpaceBattleComponent.prototype.ngOnInit = function () {
        console.log('space-battle');
        this.chimera_cicle();
    };
    // Util
    SpaceBattleComponent.prototype.persent_to_number = function (persent) {
        persent = persent.slice(0, persent.length - 1);
        return persent = parseInt(persent);
    };
    SpaceBattleComponent.prototype.random_pluss = function () {
        return Math.random() * 2;
    };
    SpaceBattleComponent.prototype.random = function (x) {
        return Math.random() * x;
    };
    SpaceBattleComponent.prototype.spape_position_percent = function () {
        return Math.round(this.event.clientX / (this.clientWidth / 100));
    };
    return SpaceBattleComponent;
}());
SpaceBattleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'space-battle',
        template: __webpack_require__("../../../../../src/app/games/space-battle/space-battle.component.html"),
        styles: [__webpack_require__("../../../../../src/app/games/space-battle/space-battle.component.less")]
    }),
    __metadata("design:paramtypes", [])
], SpaceBattleComponent);

//# sourceMappingURL=space-battle.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<audio autoplay loop>\r\n  <!--<source src=\"assets/games/musics/AMemoryAway.ogg\" type=\"audio/ogg\"-->\r\n  <source src=\"assets/games/musics/Arrient_X_ArtJumper---Lost_Souls.mp3\" type=\"audio/mpeg\">\r\n  Your browser does not support the audio element.\r\n</audio>\r\n\r\n<div\r\n  class=\"home-container\"\r\n  (mouseenter)=\"onEvent($event)\"\r\n  (mouseleave)=\"onEvent($event)\"\r\n  (mousemove)=\"coordinates($event)\"\r\n  on-click=\"onEvent($event)\"\r\n  on-dblclick=\"onEvent($event)\"\r\n  on-contextmenu=\"onEvent($event)\"\r\n  >\r\n    <div class=\"sheet\">\r\n\r\n      <div class=\"head\">\r\n          <!--img\r\n            src=\"../assets/img/I.png\"\r\n            (mouseenter)=\"photo_onEvent($event)\"\r\n            (mouseleave)=\"photo_onEvent($event)\"\r\n            (mousemove)=\"photo_coordinates($event)\"\r\n            on-click=\"photo_onEvent($event)\"\r\n            on-dblclick=\"photo_onEvent($event)\"\r\n            on-contextmenu=\"photo_onEvent($event)\"\r\n            [ngStyle]=\"{ 'transform': photo_transform, 'filter': photo_philter  }\"\r\n            style=\"-webkit-filter: invert(100%); /* Safari */\"\r\n          -->\r\n            <img\r\n            src=\"../assets/img/I.png\"\r\n            on-click=\"photo_onEvent($event)\"\r\n            on-dblclick=\"photo_onEvent($event)\"\r\n            on-contextmenu=\"photo_onEvent($event)\"\r\n            [ngStyle]=\"{ 'transform': photo_transform, 'filter': photo_philter  }\"\r\n            style=\"-webkit-filter: invert(100%); /* Safari */\"\r\n            >\r\n\r\n          <h2 class=\"title\"> I'm web-developer: <strong class=\"blink\" >Fullstack JS Developer (Angular, NodeJS)</strong>, Web-Design, Web-3D </h2>\r\n          <hr>\r\n      </div>\r\n\r\n      <h1> PERSONAL INFORMATION</h1>\r\n\r\n      <div @explainerAnim>\r\n        <div class=\"an-1\">Dyachuk Vitaliy</div>\r\n        <div class=\"an-1\">Khmelnitsky (Ukraine)</div>\r\n        <div class=\"an-1\"><b>Sex &nbsp;</b>Male | <b>Date of birth &nbsp;</b>03/06/1983 | <b>Nationality &nbsp;</b>Ukrainian</div>\r\n        <a class=\"an-1\" href=\"https://github.com/SpiritUrban\">My GitHub</a>\r\n      </div>\r\n\r\n      <h1> EDUCATION AND TRAINING </h1>\r\n      <p>\r\n        <b>2001–2005</b>\r\n        Higher education\r\n      </p>\r\n\r\n\r\n      <h1>WORK EXPERIENCE </h1>\r\n\r\n\r\n      <div id=\"container\" [@listAnimation]=\"myjsondata_length\">\r\n        <div id=\"list\" class=\"unit\" *ngFor='let unit of myjsondata'>\r\n          <b>{{unit.years}} </b>{{unit.title}}\r\n          <span class=\"gray\">...{{unit.company}}</span>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <h1> PERSONAL SKILLS </h1>\r\n      <p>\r\n          <b>Mother tongue(s)</b> Ukrainian, Russian\r\n          <br>\r\n          <br>\r\n\r\n          <b>Other language(s) </b> English - Upper-Intermediate  (Fast progress)\r\n          <br>\r\n          <br>\r\n\r\n          <b>Job-related skills </b>\r\n          <br>\r\n          ▪ AngularJS - 3 years\r\n          <br>\r\n          ▪ Angular - 2 years\r\n          <br>\r\n          ▪ NodeJS - 3 year\r\n          <br>\r\n          ▪ HTML/ CSS/ I began to use in 2006. Total experience  6 years\r\n          <br>\r\n          ▪ Jade, Sass, Less -  3 years\r\n          <br>\r\n          ▪ JavaScript - Total experience  4 years\r\n          <br>\r\n          ▪ CoffeScript(LiveScript) - 1 year\r\n          <br>\r\n          ▪ TypeScript - 2 years\r\n          <br>\r\n          ▪ C++ - 1 year\r\n          <br>\r\n          ▪ ActionScript - 1 year\r\n          <br>\r\n          ▪ Java - 2 month\r\n          <br>\r\n          ▪ PHP — Rarely used to make changes to WordPress and Jumla and other CMS. Total experience 0.5 years\r\n          <br>\r\n          ▪ MySQL — Total experience 0.5 years\r\n          <br>\r\n          ▪ MongoDB - 3 year (current)\r\n          <br>\r\n          <br>\r\n\r\n          <!-- More details-->\r\n          <b>More details</b>\r\n          <br>\r\n          ▪ WebRTC - Streaming API based on the current browser (the same principle that is running Skype)\r\n          <br>\r\n          ▪ Working with the recognition function of the API and speech synthesis.\r\n          <br>\r\n          ▪ Using the browser-based File-API\r\n          <br>\r\n          ▪ Building architecture based protocol sockets\r\n          <br>\r\n          ▪ Crossdomain application architecture (creating a sustainable system located on different servers and operating as a single unit)\r\n          <br>\r\n          ▪ Messaging communication between frames\r\n          <br>\r\n          ▪ Payment systems: PayPall, Stripe ...\r\n          <br>\r\n          ▪ Authorization for social networks\r\n          <br>\r\n          <br>\r\n\r\n          <b>Frameworks:</b>\r\n          <br>\r\n          ▪  AngularJS - 3 years\r\n          <br>\r\n          ▪  Angular 2-8 - 3 years\r\n          <br>\r\n          <br>\r\n\r\n          <b>Server Administration:</b>\r\n          <br>\r\n          ▪ VPS + NodeJS - 3year\r\n          <br>\r\n          ▪ Ubuntu 14, 16\r\n          <br>\r\n          ▪ CentOS 6\r\n          <br>\r\n          <br>\r\n\r\n          <b>Work width:</b>\r\n          <br>\r\n          ▪ Linux 14, 14\r\n          <br>\r\n          ▪ CentOS 6\r\n          <br>\r\n          ▪ MacOS\r\n          <br>\r\n          ▪ Windows: 95, 98, XP, 7, 10\r\n          <br>\r\n          ▪ DOS\r\n          <br>\r\n          <br>\r\n\r\n          <b>Graphics:</b>\r\n          <br>\r\n          ▪ Photoshop: +13 year\r\n          <br>\r\n          ▪ Adobe Illustrator: +10year\r\n          <br>\r\n          ▪ 3DSMax : +7year\r\n          <br>\r\n          ▪ CorelDrow: +4year\r\n          <br>\r\n          <br>\r\n\r\n          <b>Intensive practice during study</b>\r\n          <br>\r\n          ▪  Paskal 3.0 - 7.0 - 3year\r\n          <br>\r\n          ▪  Assembler - 8 month\r\n          <br>\r\n          ▪  C++ 1 year\r\n          <br>\r\n          <br>\r\n\r\n          <b>Many scattered experience:</b>\r\n          <br>\r\n          ▪ Various CMS, programs.\r\n          <br>\r\n          ▪ User experience - 20 years (Mainly for the development, design, training)\r\n          <br>\r\n          <br>\r\n\r\n          <b>Other experience:</b>\r\n          <br>\r\n          ▪ Team lead, Mentor\r\n          <br>\r\n          ▪ Self-management projects\r\n          <br>\r\n          ▪ Extensive experience of self-organization\r\n          <br>\r\n          ▪ The organizational work\r\n          <br>\r\n          ▪ Teaching\r\n          <br>\r\n          ▪ Studied psychology - 18years\r\n          <br>\r\n          ▪ Many years of studying and pondering: social systems, forms of social interaction, infrastructure systems\r\n          <br>\r\n          <br>\r\n\r\n          <b>Learn and interested :</b>\r\n          <br> \r\n          ▪ NativeScript\r\n          <br>\r\n          ▪ Neural Network / Artificial Intelligence / Big Data / Python\r\n          <br>\r\n          ▪ VR, Web-VR, Learning Technologies\r\n          <br>\r\n          ▪ Unity3d\r\n          <br>\r\n          ▪ IoT\r\n          <br>\r\n          <br>\r\n\r\n          <b style=\"color: red\">Works:</b>\r\n\r\n          <br>\r\n          <a href=\"https://www.js-clan.com/\">JS-CLAN (Own project)</a>\r\n\r\n          <br>\r\n          <a href=\"http://www.adventurebucketlist.com/learnmore/\">www.adventurebucketlist.com/learnmore/ (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"https://www.jopwell.com/\">inter tools for jopwell.com (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"https://uboro.io\">uboro.io (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"https://mvs.gov.ua/\"> Inner organization system (MBC) Ministry of Internal Affairs of Ukraine. (Frontend on Angular) (Mentor)</a>\r\n\r\n          <br>\r\n          <a href=\"http://www.nemportal.dk/frontpage.php\">/nemportal.dk/ Send og modtag elektroniske fakturaer (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"http://officient.dk/\">/officient.dk/ Send og modtag elektroniske fakturaer (Teamwork) /in progress/</a>\r\n\r\n          <br>\r\n          <a href=\"http://officient.com/\">/officient.com/ Simplify Your Accounts Payable [main page] (Teamwork) /in progress/</a>\r\n\r\n          <br>\r\n          <a href=\"https://clients.primeairtime.com/\">/clients.primeairtime.com/ Prime Airtime (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"https://airnetworks.com.au/\">/airnetworks.com.au/ Air Networks (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"http://r4.okm.pub/\">/r4.okm.pub/ Recharge (Only my Work)</a>\r\n\r\n          <br>\r\n          <a href=\"http://northstar-limos.squarespace.com\">northstar-limos.squarespace.com</a>\r\n\r\n          <br>\r\n          <a href=\"https://www.js-clan.com/programs/rozvivalka/rozvivalka-app\">rozvivalka.xyz</a>\r\n\r\n          <br>\r\n          <a href=\"https://www.skladovka.ua/\">skladovka.ua</a>\r\n\r\n          <br>\r\n          <a href=\"https://ide.c9.io/spiriturban/miprosco\">www.miprosco.com (code)</a>\r\n\r\n          <br>\r\n          <a href=\"https://ide.c9.io/spiriturban/rest-ex4\">Social network - backend Node.js  (code)</a>\r\n\r\n          <br>\r\n          <a href=\"http://paleoyums.com/\">paleoyums.com (Teamwork)</a>\r\n\r\n          <br>\r\n          <a href=\"http://writtent.com/\"> writtent.com (Teamwork)</a>\r\n\r\n          <br>\r\n          and other ...\r\n          \r\n          <br>\r\n          <br>\r\n\r\n          <b>Designs:</b>\r\n          <br>\r\n          <a href=\"http://www.behance.net/spirit_urban\">www.behance.net/spirit_urban </a>\r\n          <br>\r\n          <a href=\"http://www.thecoldwarera.com/aboutus.html\">\r\n            Vitaly Dyachuk - graphic designer</a>\r\n\r\n\r\n          <br>\r\n          <br>\r\n          <b>Projects of my students (with my mentoring)</b>\r\n          <br>\r\n          <a href=\"http://alinapiatyhor.com/novorozhdennye-stoimost\">Photographer's site (work with mail, generation of site structure from data)(Express.js)</a>\r\n          <br>\r\n          <a href=\"https://github.com/RomanPeredrii\">RomanPeredrii (Code sources on GitHub)(Express.js, React.js, WebRTS, socket.io, MongoDB, Firebird)</a>\r\n          <br>\r\n          <a href=\"https://github.com/Mooninghnk\">Totoro (Code sources on GitHub)(Node.js, Express.js, ethereum, web3.js, metamask, socket.io, MongoDB, FileAPI)</a>\r\n          <br>\r\n          <a href=\"https://github.com/TarasOstasha/express-js\">Taras Ostasha (Code sources on GitHub)(Node.js, Express.js, Angular, Passport.js)</a>\r\n          <br>          \r\n          <a href=\"https://github.com/semeguk\">Sergiy Semeguk (Code sources on GitHub)(JS, Node.js, Express.js, Angular)</a>\r\n          <br>\r\n          and other ...\r\n          <br>\r\n\r\n\r\n          <br>\r\n          <br>\r\n\r\n          <!-- <b>Progress Log:</b>\r\n          <br>\r\n          <a href=\"http://dyachuk-progress-log.blogspot.com/\">My blog with  my professional skills in time. My studies thoughts and inferences</a> -->\r\n\r\n      </p>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".head {\n  text-align: center;\n}\nimg {\n  margin: auto;\n}\na {\n  color: #0078ff;\n}\nh1 {\n  color: chocolate;\n}\nh2 {\n  color: lavender;\n}\nb {\n  color: #00ad92;\n}\nstrong {\n  color: #00ffd2;\n  background: black;\n}\n.home-container {\n  position: absolute;\n  height: 100%;\n  overflow: auto;\n  width: 100%;\n  margin: auto;\n  margin-top: 4rem;\n}\n.home-container .title {\n  color: #00ad92;\n}\n.home-container a {\n  color: white;\n  text-shadow: 4px 5px 4px black, 0 0 0.4em black;\n  background: repeating-linear-gradient(45deg, rgba(39, 39, 39, 0.75), rgba(23, 23, 23, 0.53) 16px, rgba(255, 185, 0, 0.27) 10px, rgba(255, 172, 0, 0.4) 30px);\n}\n.home-container a:hover {\n  background: repeating-linear-gradient(45deg, rgba(39, 39, 39, 0.75), rgba(23, 23, 23, 0.53) 16px, red 10px, red 30px);\n}\n.sheet {\n  width: 80%;\n  margin: 2em auto;\n  padding: 1em 2em;\n  background: rgba(0, 0, 0, 0.7);\n}\n.gray {\n  color: gray;\n  display: inline;\n}\np {\n  display: inline;\n}\n.unit {\n  margin: 5px 0;\n}\n/* The animation code */\n@-webkit-keyframes example {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes example {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.blink {\n  opacity: 1;\n  -webkit-animation-name: example;\n          animation-name: example;\n  -webkit-animation-duration: 4s;\n          animation-duration: 4s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(http) {
        this.http = http;
        this.photo_transform = 'rotate(0deg)';
        this.photo_philter = 'invert(0%)';
        this.clientX = 0;
        this.clientY = 0;
        this.photo_clientX = 0;
        this.photo_clientY = 0;
    }
    HomeComponent.prototype.getData = function () {
        return this.http.get('./assets/data/data.json')
            .map(function (res) { return res.json(); }); //records in this case
    };
    //---------------------------------- GROUP -------------------------------------
    // (mouseenter, mouseleave, on-click, on-dblclick, on-contextmenu) - events
    HomeComponent.prototype.onEvent = function (event) {
        this.event = event;
        console.log(this.event);
        console.log(this.event.type);
        //this.photo_transform = 'rotate('+event.clientX+'deg)';
    };
    // (mousemove) - event
    HomeComponent.prototype.coordinates = function (event) {
        this.clientX = event.clientX;
        this.clientY = event.clientY;
        //console.log(this.clientY)
        //this.photo_transform = 'rotate('+ event.clientX/3 +'deg)';
    };
    //---------------------------------- GROUP -------------------------------------
    // (mouseenter, mouseleave, on-click, on-dblclick, on-contextmenu) - events
    HomeComponent.prototype.photo_onEvent = function (event) {
        this.photo_event = event;
        //console.log(this.photo_event)
        //console.log(this.photo_event.type)
        if (this.photo_event.type == 'mouseenter')
            this.stresFoo();
        else
            this.relaxFoo();
        //if (this.photo_event.type == 'mouseleave')
    };
    // (mousemove) - event
    HomeComponent.prototype.photo_coordinates = function (event) {
        this.photo_clientX = event.clientX;
        this.photo_clientY = event.clientY;
    };
    HomeComponent.prototype.stresFoo = function () {
        var _this = this;
        this.photo_philter = 'invert(100%)';
        //
        this.stres = setInterval(function () {
            _this.photo_transform = 'rotate(10deg)';
            setTimeout(function () {
                _this.photo_transform = 'rotate(0deg)';
            }, 20);
        }, 100);
    };
    HomeComponent.prototype.relaxFoo = function () {
        clearInterval(this.stres);
        this.photo_transform = 'rotate(0deg)';
        this.photo_philter = 'invert(0%)';
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getData().subscribe(function (data) {
            _this.myjsondata = data;
            _this.myjsondata_length = _this.myjsondata.length;
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.less")],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["i" /* trigger */])('listAnimation', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["j" /* transition */])('* => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["k" /* query */])(':enter', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 0 }), { optional: true }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["k" /* query */])(':enter', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["l" /* stagger */])('300ms', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["m" /* animate */])('1s ease-in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["n" /* keyframes */])([
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                        ]))
                    ]), { optional: true }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["k" /* query */])(':leave', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["l" /* stagger */])('300ms', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["m" /* animate */])('1s ease-in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["n" /* keyframes */])([
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
                        ]))
                    ]), { optional: true })
                ])
            ]),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["i" /* trigger */])('explainerAnim', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["j" /* transition */])('* => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["k" /* query */])('.an-1', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(-40px)' })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["k" /* query */])('.an-1', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["l" /* stagger */])('500ms', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["m" /* animate */])('800ms 1.2s ease-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)' })),
                    ])),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["k" /* query */])('.an-1', [
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["m" /* animate */])(1000, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* style */])('*'))
                    ])
                ])
            ])
        ]
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"login-container\">\r\n  Login\r\n  <br>\r\n  <hr>\r\n  In developing...\r\n  <br>\r\n  <a (click)=\"x()\" >Facebook</a>\r\n  <br>\r\n  <br>\r\n  <div id=\"uLogin\" data-ulogin=\"display=panel;theme=flat;fields=first_name,last_name;providers=vkontakte,odnoklassniki,mailru,facebook;hidden=other;redirect_uri=;mobilebuttons=0;callback=initAuth\"></div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-container {\n  position: absolute;\n  padding: 4rem 0 0 0;\n  margin-top: 4rem;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log(1);
    };
    LoginComponent.prototype.x = function () {
        alert();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.less")]
    }),
    __metadata("design:paramtypes", [])
], LoginComponent);

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.get = function (path) {
        return this.http.get(path)
            .map(function (data) { return data.text() ? data.json() : data; })
            .catch(this.handleError);
    };
    ApiService.prototype.post = function (path, body) {
        return this.http.post(path, body)
            .map(function (data) { return data.text() ? data.json() : data; })
            .catch(this.handleError);
    };
    ApiService.prototype.handleError = function (error) {
        var errMsg = '';
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message || error.toString();
        }
        console.log(errMsg);
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return ApiService;
}());
ApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === "function" && _a || Object])
], ApiService);

var _a;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__window_service__ = __webpack_require__("../../../../../src/app/services/window.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = (function () {
    function AuthService(winRef, userService) {
        this.winRef = winRef;
        this.userService = userService;
        this.authHook = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        console.log('Native window obj', winRef.nativeWindow);
        winRef.nativeWindow.authHook = this.authHook;
    }
    AuthService.prototype.setAuthHook = function () {
        var _this = this;
        this.authHook
            .switchMap(function (authToken) { return _this.userService.getCredentials(authToken); })
            .subscribe(function (credentials) { console.log('credentials !!! ', credentials); });
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__window_service__["a" /* WindowRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__window_service__["a" /* WindowRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
/*
      .subscribe(authToken => {
        console.log('authToken !!! ', authToken)
        this.userService.getCredentials(authToken)
          .subscribe( accessToken => {console.log('accessToken !!! ', accessToken)

        });
      });*/
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__("../../../../../src/app/services/api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService(api) {
        this.api = api;
        this.path = '/users';
    }
    UserService.prototype.getCredentials = function (authToken) {
        console.log('--');
        return this.api.post(this.path + '/get-credentials', { token: authToken });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__api_service__["a" /* ApiService */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/window.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowRef; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function _window() {
    // return the global native browser window object
    return window;
}
var WindowRef = (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    return WindowRef;
}());
WindowRef = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], WindowRef);

//# sourceMappingURL=window.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map