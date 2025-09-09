<template>
  <div>

    <!-- <audio autoplay loop>
      <source src="src/assets/games/musics/Arrient_X_ArtJumper---Lost_Souls.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio> -->

    <div id="container" class="home-container">

      <!-- SHEET -->
      <div class="sheet" style="text-align: center; width: fit-content; z-index: 100; position: relative;">
        <div class="head">
          <img src="../assets/img/I.png">
          <h2 class="title"> I'm: <strong class="blink">Fullstack JS Developer</strong>
            <br>
            (React, Vue, Angular, NodeJS) Web-Design, Web-3D, AI
          </h2>
        </div>

        <!-- <div style="text-align: center;">
          <a class="an-1" target="_blank" href="https://github.com/SpiritUrban">My GitHub</a>
        </div> -->

        <div class="super-button-container">
          <SuperButton href="https://github.com/SpiritUrban" />
        </div>

      </div>

      <div class="double-sheet">

        <!-- SHEET -->
        <div class="sheet" style="width: fit-content;">
          <h2 style="text-align: center;"> PERSONAL INFORMATION</h2>
          <br>

          <v-table density="compact">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  <div class="major"><b>Dyachuk Vitaliy</b></div>
                </td>
              </tr>
              <tr>
                <td>Originally from:</td>
                <td>
                  <div class="major">Ukraine, Khmelnytskyi city</div>
                </td>
              </tr>
              <tr>
                <td>Sex:</td>
                <td>
                  <div class="major">Male</div>
                </td>
              </tr>
              <tr>
                <td>Date of birth:</td>
                <td>
                  <div class="major">03/06/1983</div>
                </td>
              </tr>
              <tr>
                <td>Nationality:</td>
                <td>
                  <div class="major">Ukrainian</div>
                </td>
              </tr>
            </tbody>
          </v-table>

        </div>



        <!-- SHEET -->
        <div class="sheet" style="width: fit-content;">
          <h2 style="text-align: center;"> EDUCATION AND TRAINING </h2>
          <br>
          <v-table density="compact">
            <tbody>
              <tr>
                <td>1999-2001</td>
                <td>
                  <div class="major">College</div>
                  <div class="second">Electrician</div>
                </td>
              </tr>
              <tr>
                <td>2001–2005</td>
                <td>
                  <div class="major">Higher education </div>
                  <div class="second">Teacher of physical education and valeology</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

      </div>


      <!-- SHEET -->
      <div class="sheet work-experience">
        <h2 style="text-align: center; ">WORK EXPERIENCE </h2>

        <!-- {{ mobile }} {{ name }} -->

        <v-timeline :side="(name == 'xs' || name == 'sm') ? 'end' : 'undefined'" align="start">
          <v-timeline-item v-for="(item, i) in workExperience" :key="i" :dot-color="'#d2691e'" size="small">
            <template v-slot:opposite>
              <div :class="`pt-1 headline font-weight-bold text-green`" v-text="item.year"></div>
              <!-- <img src="../assets/img/I.png"> -->
            </template>
            <div>
              <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${'orange'}`">
                {{ item.title }}
              </h2>

              <v-table density="compact">
                <tbody>
                  <tr>
                    <td>Company:</td>
                    <td>
                      <b>{{ item.company }}</b> &nbsp;
                      <v-btn v-if="item.companySite" icon :href="item.companySite" target="_blank" size="x-small"
                        variant="outlined">
                        <v-icon icon="mdi-link"></v-icon>
                        &nbsp; Go to site
                      </v-btn>
                    </td>
                  </tr>
                  <tr v-if="item.aboutCompany">
                    <td>About company:</td>
                    <td>
                      <p class="major-2">{{ item.aboutCompany }}</p> &nbsp;
                    </td>
                  </tr>
                  <tr v-if="item.companyAdditionalSources?.length > 0">
                    <td>Additional:</td>
                    <td>
                      <v-btn v-for="(item, i) in item.companyAdditionalSources" :key="i" icon :href="item"
                        target="_blank" size="x-small" variant="outlined">
                        <v-icon icon="mdi-link"></v-icon>
                        &nbsp; {{ i + 1 }}
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>Product:</td>
                    <td>
                      <p class="major-2">{{ item.product }}</p> &nbsp;
                      <v-btn v-if="item.productSite" icon :href="item.productSite" target="_blank" size="x-small"
                        variant="outlined">
                        <v-icon icon="mdi-link"></v-icon>
                        Go to site
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>About product:</td>
                    <td>
                      <p class="major-2">{{ item.aboutProduct }}</p> &nbsp;
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <div>
                <v-chip size="small" class="ma-2" v-for="(unit, index) of item.technologies.split(',')"
                  :key="`${index}-${unit.title}`">
                  {{ unit }}
                </v-chip>
              </div>

            </div>
          </v-timeline-item>
        </v-timeline>

      </div>


      <!-- SHEET -->
      <div class="sheet personal-skils" style=" width: fit-content;">
        <h1> PERSONAL SKILLS </h1>
        <br>

        <div class="units">
          <div class="unit" v-for="(group, index) of personalSkills" :key="`${index}-${group.type}-main`">
            <b>{{ group.type }}</b>
            <br>
            <br>
            <v-table density="compact">
              <tbody>
                <tr v-for="(item, index)  of group.data" :key="`${index}-${group.type}`">
                  <td>
                    <div class="major-2">{{ item.title }}</div>
                  </td>
                  <td :style="item.details ? '' : 'padding:0'">
                    {{ item.details }}
                  </td>
                </tr>
              </tbody>
            </v-table>
            <br>
          </div>
        </div>

      </div>


      <!-- SHEET -->
      <div class="sheet works" style="width: fit-content;">
        <h1>WORKS</h1>

        <div class="units">
          <div class="unit" v-for="(group, index) of works" :key="`${index}-${group.type}-works`">
            <b>{{ group.type }}</b>
            <br>
            <br>
            <v-table density="compact">
              <tbody>
                <tr v-for="(item, index2) of group.data" :key="`${index2}-${group.type}`">
                  <td>
                    <a :href="item.link" :class="item.shutdowned ? 'shutdowned' : 'an-1'" target="_blank">
                      <template v-if="group.type === 'Books'">
                        <div class="book-title">{{ item.title.split(' (')[0] }}</div>
                        <div class="book-series" v-if="item.title.includes('(')">
                          {{ item.title.match(/\(([^)]+)\)/)[1] }}
                        </div>
                      </template>
                      <template v-else>
                        {{ item.title }}
                      </template>
                    </a>
                  </td>
                  <td @mouseover="detailsHover(index, index2)" @mouseleave="detailsLeave(index, index2)"
                    style="position: relative; padding:0;" :style="item.details ? '' : 'padding:0'">
                    <div class="details" :class="{ 'book-details': group.type === 'Books' }">
                      {{ item.details }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <br>
          </div>
        </div>

      </div>

      <br>
      <br>
      <br>
      <br>


    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import SuperButton from '@/components/SuperButton.vue'
import workExperience from '@/assets/data/work-experience.json';
import personalSkills from '@/assets/data/personal-skills.json';
import _works from '@/assets/data/works.json';
workExperience.reverse()
const works = ref(_works);

const { mobile, name } = useDisplay()

onMounted(() => {
  console.log(mobile.value, name.value) // false
})

function detailsHover(i, i2) {
  works.value[i].data[i2].hover = true;
}

function detailsLeave(i, i2) {
  works.value[i].data[i2].hover = false;
}



const THREE = window.THREE;
var mouseX = 0, mouseY = 0,

  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,

  SEPARATION = 200,
  AMOUNTX = 10,
  AMOUNTY = 10,

  camera, scene, renderer;

init();
animate();

function init() {

  var container, separation = 100, amountX = 50, amountY = 50,
    particles, particle;

  container = document.createElement('div');
  document.querySelector('#bg').appendChild(container);

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

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * .05;
  camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}


</script>

<style lang="scss">
main {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
}

.super-button-container {
  margin: 1.2rem auto .5rem auto;
  text-align: center;
  z-index: 100;
}

.major {
  color: rgb(255 255 255 / 88%);
}

.major-2 {
  color: #99cac3;
}



.second {
  color: grey;
  font-size: .8rem;
}

/* Book specific styles */
.book-title {
  font-weight: 500;
  color: #e0e0e0;
  margin-bottom: 2px;
}

.book-series {
  font-size: 0.85em;
  color: #9e9e9e;
  font-style: italic;
}

.book-details {
  max-width: 400px;
  line-height: 1.5;
  font-size: 0.9em;
  color: #bdbdbd;
}

.head {
  text-align: center;
}

img {
  margin: auto;

}

.v-chip {
  margin-bottom: 0 !important;
  margin-top: .7rem !important;
  margin-left: 0 !important;
  color: #cdbfb0 !important;
}

button.v-btn--icon,
a.v-btn--icon {
  width: fit-content !important;
  height: fit-content !important;
  border-radius: 1rem !important;
  padding: 0.1rem 0.4rem 0.1rem 0.4rem !important;
  margin-right: .5rem !important;
  // margin-top: .4rem !important;
  // margin-bottom: .4rem !important;


  &:hover {
    font-weight: 900 !important;
    background: #9afff0 !important;
    border: solid 1px black !important;
  }
}

a {
  width: fit-content;
  // color: #0078ff;
  // padding: 0.5rem;
  // margin: 0.5rem;
  // display: inline-block;
  // border-radius: 0.5rem;
  // font-weight: 500;
}

h1 {
  color: chocolate;
}

h2 {
  // color: #ad6d1d;
  color: chocolate;
}

b {
  //color: #8ac8ff;
  color: #00ad92;
}

strong {
  color: #00ffd2;
  background: black;
}

.home-container {
  position: absolute;
  height: 100%;
  overflow: auto;
  width: 100%;
  margin: auto;

  .title {
    color: #00ad92;
  }

  //   .grid-container {
  //   grid-template-columns: 100px 50px 100px;
  //   grid-template-rows: 80px auto 80px; 
  //   column-gap: 10px;
  //   row-gap: 15px;
  // }

  table {
    background: #00000054;
    color: gray;
  }

  a.an-1 {
    color: #d2a07c;
    border-radius: 0.5rem;
    font-weight: 400;
    // padding: .5rem;
    margin: .5rem;
    display: inline-block;
    // text-shadow: 5px 4px 4px black, 0 0 6px black, 0 0 6px black;
    // background: repeating-linear-gradient(45deg, rgba(39, 39, 39, 0.75), rgba(23, 23, 23, 0.53) 16px, rgba(255, 185, 0, 0.27) 10px, rgba(255, 172, 0, 0.4) 30px);

    &:hover {
      // background: repeating-linear-gradient(45deg, rgba(39, 39, 39, 0.75), rgba(23, 23, 23, 0.53) 16px, red 10px, red 30px);
      color: chocolate;
    }
  }

  .shutdowned {
    color: grey;
    border-radius: 0.5rem;
    font-weight: 400;
    // padding: .5rem;
    margin: .5rem;
    display: inline-block;
    // text-shadow: 5px 4px 4px black, 0 0 6px black, 0 0 6px black;
    // background: repeating-linear-gradient(45deg, rgba(39, 39, 39, 0.75), rgba(23, 23, 23, 0.53) 16px, rgba(105, 105, 105, 0.27) 10px, rgba(131, 131, 131, 0.4) 30px);
    text-decoration: none;

    &:hover {
      // background: repeating-linear-gradient(45deg, rgba(39, 39, 39, 0.75), rgba(23, 23, 23, 0.53) 16px, rgb(128, 128, 128) 10px, rgb(121, 121, 121) 30px);
    }
  }
}

.double-sheet {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;

  .sheet {
    margin: 2rem 1rem 0 1rem;
  }

}


.sheet {
  width: 80%;
  margin: 2em auto 0 auto;
  padding: 1em 2em;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid rgb(113 113 113 / 30%);

  &.work-experience {
    width: fit-content;
    max-width: 80rem;
  }

  &.personal-skils {
    padding: 1em 0;

    h1 {
      margin: 0 2rem;
      text-align: center;
    }

    .units {
      display: flex;
      flex-wrap: wrap;
      padding: 0 1rem;

      .unit {
        margin: 0 1rem;
      }
    }

    .v-table {
      width: fit-content;
      max-width: 30rem;
    }
  }

  &.works {
    padding: 1em 0;

    h1 {
      margin: 0 2rem;
      text-align: center;
    }

    .units {
      display: flex;
      flex-wrap: wrap;
      padding: 0 1rem;

      .unit {
        margin: 0 1rem;
      }
    }

    .v-table {
      width: fit-content;
      max-width: 30rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .sheet {
    margin: 2em 0.5rem 0 0.5rem;

    &.work-experience {
      padding: 1em 0;

      table {
        td {
          padding-right: 0 !important;
          padding-left: .5rem !important;

          // background: red;
        }
      }

    }
  }

  .double-sheet {
    .sheet {
      margin: 2em 0.5rem 0 0.5rem;
    }
  }
}

.gray {
  color: gray;
  display: inline;
}

p {
  display: inline;
}

.unit {
  margin: 5px 0;
}


/* The animation code */
@keyframes example {
  0% {
    opacity: .4
  }

  // 50%  {opacity: .7}
  100% {
    opacity: 1
  }
}

.blink {
  opacity: 1;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

.details {
  padding: 0 1rem;
}

.panel {
  box-sizing: border-box;
  position: absolute;
  background: #2929297a;
  color: black;
  width: 0%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: hidden;
  transition: .3s;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  backdrop-filter: blur(5px);

  .v-btn {
    min-width: unset !important;
    ;
  }
}

.panel-on {
  width: 100%;
}

@media screen and (min-width: 1400px) {}

@media screen and (max-width: 1400px) {}

@media screen and (max-width: 1200px) {}

@media screen and (max-width: 992px) {}

@media screen and (max-width: 768px) {
  .page {}
}

@media screen and (max-width: 576px) {}
</style>