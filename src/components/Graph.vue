<template>
  <div class="graph">
    <div class="graph-title">
      <h1>{{title}}</h1>
      <template v-if="curveInitialized">
        <ManageCurvePanel
          @clear="clearCurve"
          @manage-iteration="manageIteration"
          :iteration="iteration"
          :disabled="generatingInProcess" />
      </template>
      <template v-else>
        <NewCurvePanel @generate="initializeCurve"/>
      </template>
    </div>
    <canvas id="canvas" :width="area.canvasWidth" :height="area.canvasHeight"></canvas>
  </div>
</template>

<script>
import { iterateForward, iterateBackward } from '../utils/curveGenerator';
import { generateGrid, reloadCanvas } from '../utils/manageGrid';
import { addPath, addLine } from '../utils/generateShape';
import generateInitalLine from '../utils/generateInitialLine';
import ManageCurvePanel from './ManageCurvePanel';
import NewCurvePanel from './NewCurvePanel';

export default {
  name: 'Graph',
  components: {
    NewCurvePanel,
    ManageCurvePanel
  },
  data () {
    return {
      title: 'Minkovski Curve',
      area: {
        canvasWidth: 1000,
        canvasHeight: 500,
        gridStep: 25
      },
      initialLineWidth: 500,
      iterationTimeout: 1200,
      context: null,
      curveInitialized: false,
      iteration: 0,
      path: [],
      generatingInProcess: false
    }
  },

  mounted() {
    const canvas = this.$d3.select('#canvas'),
      context = canvas.node().getContext('2d');
    this.context = context;

    generateGrid({
      ctx: this.context,
      gridStep: this.area.gridStep,
      areaWidth: this.area.canvasWidth,
      areaHeight: this.area.canvasHeight
    });
  },

  methods: {
    initializeCurve(data) {
      const initialLineCoords = generateInitalLine({
        coords: {
          x: data.x,
          y: data.y,
        },
        areaWidth: this.area.canvasWidth,
        areaHeight: this.area.canvasHeight,
        lineWidth: this.initialLineWidth,
        ctx: this.context
      });

      if (!initialLineCoords) {
        this.$message.error('Line is out of area', 2500);
        return;
      }

      this.path = initialLineCoords;
      this.curveInitialized = true;
      this.generatingInProcess = true;
      this.iterate({ iterateForward: true, iterations: data.iterations });
    },

    iterate({ iterateForward=true, iterations }) {
      this.generatingInProcess = true;


      const iterationInterval = setInterval(
        iterateForward ? this.nextIteration : this.prevIteration,
        this.iterationTimeout
      );
      setTimeout(() => {
        clearInterval(iterationInterval);
        this.generatingInProcess = false;
      }, Math.abs(iterations) * this.iterationTimeout + this.iterationTimeout / 2);
    },

    nextIteration() {
      this.path = iterateForward(this.path);
      this.iteration += 1
      reloadCanvas({
        ctx: this.context,
        newGridStep: this.area.gridStep,
        areaWidth: this.area.canvasWidth,
        areaHeight: this.area.canvasHeight
      });
      addPath({ctx: this.context, path: this.path});
    },

    prevIteration() {
      this.path = iterateBackward(this.path);
      this.iteration -= 1
      reloadCanvas({
        ctx: this.context,
        newGridStep: this.area.gridStep,
        areaWidth: this.area.canvasWidth,
        areaHeight: this.area.canvasHeight
      });
      addPath({ctx: this.context, path: this.path});
    },

    manageIteration(iterations) {
      this.iterate({ iterateForward: iterations > 0 ? true : false, iterations });
    },

    clearCurve() {
      reloadCanvas({
        ctx: this.context,
        newGridStep: this.area.gridStep,
        areaWidth: this.area.canvasWidth,
        areaHeight: this.area.canvasHeight
      });
      this.curveInitialized = false;
      this.iteration = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/variables';

.graph {
    width: $canvas-width;
    margin: 0 auto;

    .graph-title {
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #canvas {
      border-radius: 5px;
      border: $canvas-border-grid;
      background: $canvas-background;
    }
  }
</style>
